use clap::Clap;
use colosseum::unsync::Arena;
use cop::lean::{Clause, Proof};
use cop::role::RoleMap;
use cop::szs;
use cop::{Lit, Offset};
use log::info;
use crate::{parse, preprocess, Cli, Error};
use std::fs::File;
use std::io::Write;

pub fn test() {
    info!("test");
}

pub fn wasm_main() {

}

pub fn main() {
    use env_logger::Env;
    // log warnings and errors by default, do not print timestamps
    env_logger::from_env(Env::default().filter_or("LOG", "warn"))
        .format_timestamp(None)
        .init();

    let cli = Cli::parse();
    let arena: Arena<String> = Arena::new();

    let result = run(&cli, &arena);
    if let Err(e) = result {
        print!("{}", szs::Status(e.get_kind()));
        if let Some(e) = e.get_error() {
            cli.output(e).unwrap()
        };
        std::process::exit(1);
    }
}

pub fn run(cli: &Cli, arena: &Arena<String>) -> Result<(), Error> {
    let mut forms = RoleMap::default();
    parse::parse_file(&cli.file, &mut forms)?;
    let fm = match forms.join() {
        Some(fm) => fm,
        None => {
            print!("{}", szs::Status(szs::Satisfiable));
            return Ok(());
        }
    };
    info!("joined: {}", fm);

    let (matrix, hash) = preprocess::preprocess(fm, cli, arena)?;

    let db = matrix.contrapositives().collect();
    info!("db: {}", db);
    let start = Clause::from(hash.clone());
    let start = Offset::new(0, &start);

    let mut infs = Vec::new();
    let cuts = cli.get_cuts();
    for lim in cli.depths() {
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
            let changes: Vec<_> = steps.changes().cloned().collect();

            if let Some(file) = &cli.stats {
                let mut f = File::create(file)?;
                let infs = serde_json::to_string(&infs).unwrap();
                let changes = serde_json::to_string(&changes).unwrap();
                writeln!(f, r#"{{ "infs": {}, "changes": {} }}"#, infs, changes)?;
            };

            let hash = Lit::from(hash.clone());
            let hash = Offset::new(0, &hash);
            assert!(proof.check(&search.sub, hash, Context::default()));
            print!("{}", szs::Status(szs::Theorem));
            let proof = proof.display(hash);
            cli.output(proof)?;
            return Ok(());
        }
    }

    Err(Error::from(szs::Incomplete))
}