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

	/** @param {SubmitEvent} e */
	async function handleSubmit(e) {
		e.preventDefault();

		const payload = {
			"cenarios": cenarios.map(c => c.slug),
			"price": preco,
			"title": nome,
		};
		try {
			const res = await fetch("http://localhost:8000/payments/create_payment", {
				method: "post",
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const data = await res.text().then(text => {
				try {
					return JSON.parse(text)
				} catch {
					throw new Error(text)
				}
			})

			// erro ao mandar pagamento para a api
			if (data['status'] === 'error')
				throw new Error(data['message']);

			window.location.href = data['data']['init_point'];
		} catch (error) {
			alert("Tivemos um problema ao processar seu pedido: "+error.message);
		}
	}

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
				<form onSubmit={handleSubmit}>
					<button type="submit">Compre o Pacote desta matéria</button>
				</form>
			</section>
		</div>
	</>
}