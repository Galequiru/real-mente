import React, {  } from "react";
import { Link } from "react-router-dom";
import "./CardDestino.css"

/**
 * @param {{
 * 	cenario: {
 *		nome: string,
 *		slug: string
 * 	}
 * }}
 */
export default function CardDestino({cenario: {
	nome, slug
}}) {
	return <>
		<Link to={`/${slug}`}>
		<div className="cardDestino">
			{nome}
		</div>
		</Link>
	</>
}