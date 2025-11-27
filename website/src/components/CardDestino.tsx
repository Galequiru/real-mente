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
	// Resolve image by slug using Vite's import.meta.glob (build-time mapping).
	// This allows dynamic selection while still bundling the assets.
	let imageUrl: string | undefined;
	// import all assets in the folder as URLs (eager so it's available synchronously)
	const images = import.meta.glob('../assets/*', { eager: true, as: 'url' }) as Record<string, string>;
	// Try to find an asset that includes `${slug}-1` (e.g. 'pre-historia-1.jpg')
	for (const [path, url] of Object.entries(images)) {
		if (path.includes(`${slug}-1`)) {
			imageUrl = url;
			break;
		}
	}

	const style = imageUrl ? { ['--bg-image' as any]: `url(${imageUrl})` } : undefined;

	return (
		<Link to={`/${materiaSlug}/${slug}`}>
			<div className="cardDestino" style={style}>
				<p className="cardTitulo">{nome}</p>
			</div>
		</Link>
	);
}