use colosseum::unsync::Arena;
use cop::lean::{Clause, Proof};
use cop::role::RoleMap;
use cop::{szs};
use cop::{Lit, Offset};
use log::{info, error};
use crate::{parse, preprocess, Query, Error};
use wasm_logger;

pub fn main(data : &str) -> String {
    /*
     * TODO: error handling
     * possible solution is to return serde_json::Result;
     * that way the frontend would be able to print error message if one occurs.
     */
    wasm_logger::init(wasm_logger::Config::default());
    let query : Query = serde_json::from_str(data).unwrap();
    let arena: Arena<String> = Arena::new();
    info!("{}", &*format!("{:?}", query));

    match run(&query, &arena) {
        Ok(t) => t,
        Err(e) => {
            print!("{}", szs::Status(e.get_kind()));
            if let Some(e) = e.get_error() {
                error!("{}", e);
                return format!("{}", e)
            };
            std::process::exit(1);
        }
    }
}

fn run(query: &Query, arena: &Arena<String>) -> Result<String, Error> {
    let mut forms = RoleMap::default();
    parse::parse_query(&query, &mut forms)?;
    let fm = match forms.join() {
        Some(fm) => fm,
        None => {
            print!("{}", szs::Status(szs::Satisfiable));
            return Ok("".parse().unwrap());
        }
    };
    info!("joined: {}", fm);

    let (matrix, hash) = preprocess::preprocess(fm, query, arena)?;

    let db = matrix.contrapositives().collect();
    info!("db: {}", db);
    let start = Clause::from(hash.clone());
    let start = Offset::new(0, &start);

    let mut infs = Vec::new();
    let cuts = query.get_cuts();
    for lim in query.depths() {
        use cop::lean::search::{Context, Opt, Search, Task};
        info!("search with depth {}", lim);
        let opt = Opt { cuts, lim };
        let mut search = Search::new(Task::new(start), &db, opt);
        let proof = search.prove().cloned();
        let inf = search.inferences();
        info!("depth {} completed after {} inferences", lim, inf);
        infs.push(inf);

        if let Some(steps) = proof {
            let proof = Proof::from_iter(&mut steps.iter().cloned(), &mut 0);

            let hash = Lit::from(hash.clone());
            let hash = Offset::new(0, &hash);
            assert!(proof.check(&search.sub, hash, Context::default()));
            print!("{}", szs::Status(szs::Theorem));
            let proof = proof.display(hash);
            return Ok(proof.to_string())
        }
    }

    Err(Error::from(szs::Incomplete))
}