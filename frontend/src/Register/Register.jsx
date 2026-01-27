import { Link } from "react-router-dom"

export default function Register(){
    return(
        <div>
            <h1>Je suis la page register</h1>

            <form>
                <div id="divFirstname">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" placeholder="Firstname..." name="lastname" id="firstname" minLength={1} maxLength={50}/>
                </div>

                <div id="divLastname">
                    <label htmlFor="lastname">Nom de famille</label>
                    <input type="text" name="lastname" id="lastname" placeholder="Lastname..." minLength={1} maxLength={30} />
                </div>
            </form>

            <p>Si vous avez déjà un compte, connectez-vous <Link to={'/Login'}>ici</Link></p>
        </div>
    )
}