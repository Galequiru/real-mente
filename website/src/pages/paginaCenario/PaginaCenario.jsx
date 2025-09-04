import React from "react";
import { Link } from "react-router-dom";

/**
 * @import {Materia, Cenario} from '../../index'
 * @param {{
 *	materia: Materia
 *	cenario: Cenario
 * }}
 */
export default function PaginaCenario({
	materia, cenario
}) {
	return <>
		<h2><Link to={`/${materia.slug}`}>{materia.nome}</Link> ❯ {cenario.nome}</h2>

	</>
}