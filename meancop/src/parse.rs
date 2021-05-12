use crate::{Error, Query};
use cop::fof::SForm;
use cop::role::{Role, RoleMap};
use cop::szs;
use log::info;
use tptp::{top, TPTPIterator};

fn get_role_formula(annotated: top::AnnotatedFormula) -> (Role, SForm) {
    use top::AnnotatedFormula::*;
    match annotated {
        Fof(fof) => (Role::from(fof.0.role), SForm::from(*fof.0.formula)),
        Cnf(_cnf) => todo!(), //(Role::from(cnf.role), todo!()),
    }
}

fn parse_bytes(bytes: &[u8], forms: &mut RoleMap<Vec<SForm>>) -> Result<(), Error> {
    let mut parser = TPTPIterator::<()>::new(&bytes);
    for input in &mut parser {
        let input = input.map_err(|_| Error::from(szs::SyntaxError))?;
        match input {
            top::TPTPInput::Include(_include) => {}
            top::TPTPInput::Annotated(ann) => {
                let (role, formula) = get_role_formula(*ann);
                info!("loading formula: {}", formula);
                forms.get_mut(role).push(formula);
            }
        };
    }
    if parser.remaining.is_empty() {
        Ok(())
    } else {
        Err(Error::from(szs::SyntaxError))
    }
}

pub fn parse_query(query: &Query, forms: &mut RoleMap<Vec<SForm>>) -> Result<(), Error> {
    info!("parsing {:?}", query.problem);

    let mut problem = query.problem.clone();
    problem = problem.replace('\n', "\r\n"); // LF input expected, remove if input is CRLF
    problem.push_str("\r\n");

    let bytes: Vec<u8> = problem.as_bytes().to_vec();
    parse_bytes(&bytes, forms)
}