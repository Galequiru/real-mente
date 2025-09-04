import React from "react";

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
		{cenario.nome}
	</>
}