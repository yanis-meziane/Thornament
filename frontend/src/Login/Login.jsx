import { Link } from "react-router-dom"
import { useState } from "react"

const handleSubmit = (e) => {
    e.preventDefault();
    alert("Connexion réussie !");
};


export default function Login(){
    const [password, setPassword] = useState('');
    return(
        <div>
            <h1>Je suis la page Login</h1>

            <form onSubmit={handleSubmit}>
                <div id="divEmail">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Votre email..." minLength={5} maxLength={50} />
                </div>

                <div id="divPassword">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Password..." minLength={8} maxLength={20} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">S'inscrire</button>
            </form>

            <p>Si vous n'avez pas de compte, inscrivez-vous <Link to={'/'}>ici</Link></p>
        </div>
    )
}