import React from "react"
import './ComoFunciona.css'

function ComoFunciona(){
    return(
        <div className = "comoFunc">
            <div className = "containerComoFunc">
                <div className = "infoUm">
                    <div className = "infoEsq">
                        <h2>TRANSFORME A MANEIRA DE APRENDER COM REALIDADE VIRTUAL</h2>
                        <p>
                            RealMente é um projeto que tem como objetivo implementar A Realidade Virtual (RV) como didática para escolas, 
                            representando uma nova forma de aprendizado para os alunos. Transformando conteúdos teóricos em experiências visuais e dinâmicas, 
                            nosso intuito é proporcionar uma nova forma de aprendizagem além da tradicional, inserindo na vida de estudantes tecnologia junto do aprendizado.
                        </p>
                    </div>
                    <div className="imageBox"></div>
                </div>

                <div className="infoDois">
                    <div className="imageBox"></div>
                        <div className="infoDir">
                            <h2>POR QUE REALIDADE VIRTUAL NO ENSINO É BENÉFICO?</h2>
                            <p>
                                Um dos principais é a possibilidade de tornar o aprendizado muito mais envolvente e interativo, permitindo que os estudantes participem ativamente das aulas e se conectem emocionalmente com o conteúdo. 
                                Além disso, a RV facilita a compreensão de conceitos complexos ao apresentar informações de forma visual e tridimensional, o que torna mais fácil assimilar temas abstratos. 
                                Outro benefício importante é a chance de realizar atividades práticas sem riscos, como simulações de laboratório, experiências científicas ou procedimentos técnicos, tudo de forma segura e acessível.
                            </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ComoFunciona