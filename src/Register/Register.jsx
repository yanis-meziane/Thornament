import { Link } from "react-router-dom"

export default function Register(){
    return(
        <div>
            <h1>Je suis la page register</h1>

            <p>Si vous avez déjà un compte, connectez-vous <Link to={'/Login'}>ici</Link></p>
        </div>
    )
}