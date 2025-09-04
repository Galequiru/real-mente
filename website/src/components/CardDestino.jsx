import { Link } from "react-router-dom";
import "./CardDestino.css"

/**
 * @import { Cenario } from '../index'
 * @param {{
 * 	cenario: Cenario & {
 * 		materiaSlug: string
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