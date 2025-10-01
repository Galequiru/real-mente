use mongodb::bson::{doc, oid::ObjectId, Bson};
use rocket::serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct PendingPayment {
    pub payment_id: String,
    pub products: Vec<String>
}

impl Into<Bson> for PendingPayment {
    fn into(self) -> Bson {
        let payment_doc = doc! {
            "payment_id": self.payment_id,
            "products": self.products,
        };
        Bson::Document(payment_doc)
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Proveedor {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub email: String,
    pub senha: String,
    pub nome: String,
    pub pendings: Vec<PendingPayment>,
    pub cenarios: Vec<String>,
}

impl Proveedor {
    pub fn new(email: String, senha: String, nome: String) -> Self {
        Proveedor {
            id: None,
            email: email,
            senha: senha,
            nome: nome,
            pendings: vec![],
            cenarios: vec![]
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Cenario {
    pub nome: String,
    pub slug: String,
    pub price: f64,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Materia {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub nome: String,
    pub slug: String,
    pub cenarios: Vec<Cenario>
}