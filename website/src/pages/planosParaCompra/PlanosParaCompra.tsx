import LinhaOfertasMateria from "../../components/LinhaOfertasMateria"
import type { Materia } from "../../types"
import "./PlanosParaCompra.css"

export default function PlanosParaCompra({
	materias
}: {
	materias: Materia[]
}) {
	return <>
		<p className="introducao">Você pode escolher se vai comprar um cenário individual ou todo o pacote de uma matéria!</p>
		{materias.map(materia => <div key={materia.slug}>
			<h2>{materia.nome}</h2>
			<LinhaOfertasMateria materia={materia} />
		</div>)}
	</>
}