import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './Login.css';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    const LOGIN_ENDPOINT = {
        url: 'http://localhost:3001/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');


        const requestBody = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(LOGIN_ENDPOINT.url, {
                method: LOGIN_ENDPOINT.method,
                headers: LOGIN_ENDPOINT.headers,
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                // Stocker les informations utilisateur
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.id);
                localStorage.setItem('userRole', data.role);
                
                setSuccess('Connexion réussie !');
                
                setTimeout(() => {
                    navigate('/home');
                }, 500);

            } else {
                setError(data.message || 'Erreur lors de la connexion');
            }

        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        }
    };
    
    return(
        <div className="connexion-container">
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit} id="formConnexion">
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                
                <div id="divEmail">
                    <label htmlFor="email">Email : </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Votre email..." 
                        minLength={5} 
                        maxLength={50}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div id="divPassword">
                    <label htmlFor="password">Mot de passe : </label>
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
                    />
                </div>

                <button type="submit" id="submitConnexion">Se connecter</button>

                <p>Si vous n'avez pas de compte, inscrivez-vous <Link to={'/'}>ici</Link></p>
            </form>
        </div>
    )
}