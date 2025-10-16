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