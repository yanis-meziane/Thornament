import { Link } from "react-router-dom"
import { useState } from "react"
import './Login.css';


export default function Login(){
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Connexion réussie !");
    };
    
    return(
        <div className="connexion-container">
            <form onSubmit={handleSubmit} id="formConnexion">
                <div id="divEmail">
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" placeholder="Votre email..." minLength={5} maxLength={50} />
                </div>

                <div id="divPassword">
                    <label htmlFor="password">Mot de passe : </label>
                    <input type="password" name="password" id="password" placeholder="Password..." minLength={8} maxLength={20} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" id="submitConnexion">Se connecter</button>

                <p>Si vous n'avez pas de compte, inscrivez-vous <Link to={'/'}>ici</Link></p>
            </form>
        </div>
    )
}