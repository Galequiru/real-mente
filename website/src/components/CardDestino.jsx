import React, {  } from "react";
import { Link } from "react-router-dom";
import "./CardDestino.css"

/**
 * @param {{
 * 	cenario: {
 *		nome: string,
 *		slug: string,
 * 		materiaSlug: string,
 * 	},
 * }}
 */
export default function CardDestino({
	cenario: {
		nome, slug, materiaSlug
	},
}) {
	return <>
		<Link to={`/${materiaSlug}/${slug}`}>
		<div className="cardDestino">
			{nome}
		</div>
		</Link>
	</>
}