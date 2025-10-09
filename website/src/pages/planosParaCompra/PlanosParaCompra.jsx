import LinhaOfertasMateria from "../../components/LinhaOfertasMateria"
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
		{materias.map(materia => <div key={materia.slug}>
			<h2>{materia.nome}</h2>
			<LinhaOfertasMateria materia={materia} />
		</div>)}
	</>
}