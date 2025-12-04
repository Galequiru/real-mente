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
	_id: {
		"$oid": string
	},
	email: string,
	senha: string,
	nome: string,
	pendings: PendingPayment[],
	products: string[]
}
