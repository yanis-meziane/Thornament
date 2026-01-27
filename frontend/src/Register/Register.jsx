import { Link } from "react-router-dom"
import { useState } from "react"

export default function Register(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [setError] = useState('');

    const [mail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password.length < 8){
            setError('Le mot de passe doit contenir au minimum 8 caractères.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_\-$!*%&]).{8,}$/;
        if(!passwordRegex.test(password)){
            setError('Le mot de passe est trop faible ! Il est nécessaire d\'avoir au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
            return;
        }

        if(password !== confirmPassword){
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!mailRegex.test(mail)){
            setError('L\'adresse email n\'est pas valide.');
            return;
        }
        
        setError('');
        alert("Inscription réussie !");
    };

    return(
        <div>
            <h1>Je suis la page register</h1>

            <form onSubmit={handleSubmit}>
                
                <div id="divEmail">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email..." minLength={5} maxLength={50} />
                </div>

                <div id="divPassword">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Password..." minLength={8} maxLength={20} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div id="divConfirmPassword">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password..." minLength={8} maxLength={20} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <button type="submit">S'inscrire</button>
            </form>

            <p>Si vous avez déjà un compte, connectez-vous <Link to={'/Login'}>ici</Link></p>
        </div>
    )
}