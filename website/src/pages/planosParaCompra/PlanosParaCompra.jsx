import "./PlanosParaCompra.css"

/**
 * @import { Materia } from '../../index'
 * @param {{
 *	materias: Materia[]
 * }}
 */
export default function PlanosParaCompra({
	materias
}) {
	return <>
		<p className="introducao">Você pode escolher se vai comprar um cenário individual ou todo o pacote de uma matéria!</p>
		<h2>Cenários individuais:</h2>
		<div className="ofertas">
			{materias.map(materia => materia['cenarios'].map(cenario =>
				<div className="card">
					{cenario}
				</div>
			))}
		</div>
		<h2>Comprar por conjunto:</h2>
		<div className="ofertas">
			{materias.map(materia =>
				<div className="card">
					{materia['nome']}
				</div>
			)}
		</div>
	</>
}