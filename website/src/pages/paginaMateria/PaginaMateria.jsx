import React, {  } from "react";
import { Link } from "react-router-dom";
import { calcularPrecoPacote } from "../../helpers";
import './PaginaMateria.css'

/**
 * @import {Materia} from '../../index'
 * @param {{
 * 	materia: Materia
 * }}
 */
export default function PaginaMateria({
	materia: {
		nome, slug, cenarios
	}
}) {
	const preco = calcularPrecoPacote(...cenarios.map(c => c.price))
	return <>
		<h2>{nome}</h2>
		<div className="conteudoMateria">
			<aside className="colunaCenarios">
				<h3>Cenários</h3>
				<ul>
					{cenarios.map(cenario =>
						<li key={cenario.slug}>
							<Link to={`/${slug}/${cenario.slug}`}>{cenario.nome}</Link>
						</li>
					)}
				</ul>
			</aside>
			<section>
				<div className="imagem">

				</div>
				<form action="http://localhost:8000/payments/create_payment" method="post">
					<input type="hidden" name="cenarios" value={cenarios.map(c => c.slug)} />
					<input type="hidden" name="price" value={preco} />
					<input type="hidden" name="title" value={nome} />
					<button type="submit">Compre o Pacote desta matéria</button>
				</form>
			</section>
		</div>
	</>
}