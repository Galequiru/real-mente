import { Link } from 'react-router-dom'
import './LinhaOfertasMateria.css'

/**
 * @import { Materia } from '../index'
 * @param {{
 *	materia: Materia
 * }}
 */
export default function LinhaOfertasMateria({
	materia: {
		nome, slug, cenarios
	}
}) {
	return <>
		<div className='linhaOfertas'>
			<div className='cardMateria'>
				<div className='textoMateria'>{nome}</div>
				<Link to={`/${slug}`}>Saiba mais</Link>
			</div>
			<div className='coluna'>
				<div className='incluido'>cenários incluídos no pacote:</div>
				<div className='miniCards'>
					{cenarios.map(cenario =>
						<Link key={cenario.slug} to={`/${slug}/${cenario.slug}`}>
							<div className='miniCard'>
								{cenario.nome}
							</div>
						</Link>
					)}
				</div>
			</div>
		</div>
	</>
}