import './Footer.css'

function Footer() {
    return (
        <footer className = "footer">
            <hr className = "linhaF" />
            <div className='footerContent'>
                <p className = "l1">entre em contato:</p>
                <div className = "contatos">
                    <p className = "l2">email@gmail.com</p>
                    <p className = "l3">@instagram</p>
                    <p className = "l4">(19) 99999-9999</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
