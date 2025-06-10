use super::*;
use crate::{
    impl_crud,
    impl_create, impl_get_by_id, impl_get_all, impl_update, impl_delete,
    models::Materia
};

impl_crud!(Materia, "materias");