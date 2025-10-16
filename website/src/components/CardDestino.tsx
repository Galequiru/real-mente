import { Link } from "react-router-dom";
import "./CardDestino.css"
import type { Cenario } from "../types";

export default function CardDestino({
	cenario: {
		nome, slug, materiaSlug
	},
}: {
	cenario: Cenario & {
		materiaSlug: string
	}
}) {
	return <>
		<Link to={`/${materiaSlug}/${slug}`}>
		<div className="cardDestino">
			{nome}
		</div>
		</Link>
	</>
}