import { Link } from "react-router-dom";
import type { Cenario, Materia } from "../../types";

export default function PaginaCenario({
	materia, cenario
}: {
	materia: Materia,
	cenario: Cenario
}) {
	return <>
		<h2><Link to={`/${materia.slug}`}>{materia.nome}</Link> ❯ {cenario.nome}</h2>

	</>
}