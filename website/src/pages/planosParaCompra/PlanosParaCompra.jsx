import "./PlanosParaCompra.css"
import { useEffect, useState } from "react";

export default function PlanosParaCompra() {

	const [materias, setMaterias] = useState([]);  // store the API response
	const [loading, setLoading] = useState(true); // show loading state
	const [error, setError] = useState(null);    // store errors

	useEffect(() => {
	// make the request when the page loads
	fetch("http://localhost:8000/materias/get/")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((json) => {
			setMaterias(json['data']);
			setLoading(false);
		})
		.catch((err) => {
			setError(err.message);
			setLoading(false);
		});
	}, []); // empty dependency array means run once on mount

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<>
		<p className="introducao">Você pode escolher se vai comprar um cenário individual ou todo o pacote de uma matéria!</p>
		<h2>Cenários individuais:</h2>
		<div className="ofertas">
			{materias.map(materia => materia['cenarios'].map(cenario =>
				<div className="card">
					{cenario}
				</div>
			))}
		</div>
		<h2>Comprar por conjunto:</h2>
		<div className="ofertas">
			{materias.map(materia =>
				<div className="card">
					{materia['nome']}
				</div>
			)}
		</div>
		</>
	)
}