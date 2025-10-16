/**
 * calcula o valor de um pacote a partir de um conjunto de preços
 * usando desconto acumulativo, mas nunca dando um desconto maior
 * que 15%
 * @param precos
 * @returns o preço total do pacote, este número nunca terá mais de duas casas decimais
 */
export function calcularPrecoPacote(...precos: number[]): number {
	if (precos.length === 0) return 0;
	if (precos.length === 1) return precos[0];
	const soma = precos.reduce((a, b) => a + b, 0);

	// desconto: 3% da soma para cada cenário extra, acumulativo
	let desconto = 0.03 * soma * (precos.length - 1);

	// desconto máximo: 85% do total
	const minimo = soma * 0.85;

	// ajusta o preco para duas casas decimais
	return Math.ceil(100*Math.max(soma - desconto, minimo))/100;
}