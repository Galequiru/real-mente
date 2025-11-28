export type Cenario = {
	nome: string,
	slug: string,
	price: number
}

export type Materia = {
	nome: string,
	slug: string,
	cenarios: Cenario[]
}

export type PendingPayment = {
	payment_id: string,
	products: string[]
}

export type Usuario = {
	email: string,
	senha: string,
	nome: string,
	pendings: PendingPayment[],
	products: string[]
}
