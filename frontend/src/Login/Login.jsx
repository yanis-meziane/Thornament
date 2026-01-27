import { Link } from "react-router-dom"

export default function Login(){
    return(
        <div>
            <h1>Je suis la page Login</h1>

            <p>Si vous n'avez pas de compte, inscrivez-vous <Link to={'/'}>ici</Link></p>
        </div>
    )
}