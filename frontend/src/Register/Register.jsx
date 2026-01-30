import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './Register.css';

export default function Register(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mail, setMail] = useState(''); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Nettoyer le localStorage au chargement de la page d'inscription
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userMail');
    }, []);

    const REGISTER_ENDPOINT = {
        url: 'http://localhost:3001/api/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password.length < 8) {
            setError('Le mot de passe doit contenir au minimum 8 caractères.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_\-$!*%&]).{12,}$/;
        if (!passwordRegex.test(password)) {
            setError('Le mot de passe est trop faible ! Il est nécessaire d\'avoir au minimum 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!mailRegex.test(mail)) {
            setError('L\'adresse email n\'est pas valide.');
            return;
        }

        const requestBody = {
            mail: mail,
            password: password
        };

        try {
            const response = await fetch(REGISTER_ENDPOINT.url, {
                method: REGISTER_ENDPOINT.method,
                headers: REGISTER_ENDPOINT.headers,
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Inscription réussie ! Redirection...');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                setError(data.message || 'Erreur lors de l\'inscription');
            }

        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        }
    };

    return(
        <div className="connexion-container ">
            <h1>S'inscrire</h1>
            <form onSubmit={handleSubmit} id="formConnexion">
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                {success && <p className="success-message" style={{color: 'green'}}>{success}</p>}
                
                <div id="divEmail" className="labelRegister">
                    <label htmlFor="email">Email : </label>
                <br />
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email..." 
                        minLength={5} 
                        maxLength={50}
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                        className="inputRegister"
                    />
                </div>

                <div id="divPassword" className="labelRegister">
                    <label htmlFor="password">Mot de passe : </label>
                    <br />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password..." 
                        minLength={12} 
                        maxLength={20} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="inputRegister"
                    />
                </div>

                <div id="divConfirmPassword">
                    <label htmlFor="confirmPassword" className="labelRegister">Confirmer le mot de passe : </label>
                    <br />
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="Confirm Password..." 
                        minLength={12} 
                        maxLength={20} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required  
                        className="inputRegister"
                    />
                </div>

                <button type="submit" id="submitConnexion">S'inscrire</button>

                <p>Si vous avez déjà un compte, connectez-vous <Link to={'/Login'}>ici</Link></p>
            </form>
        </div>
    )
}