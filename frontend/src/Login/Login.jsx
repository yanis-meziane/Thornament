import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './Login.css';

export default function Login(){
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    // Nettoyer le localStorage au chargement de la page de connexion
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userMail');
    }, []);
    
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
            mail: mail,
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
                localStorage.setItem('userMail', data.mail);
                
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
        <div className="login-container">
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                {success && <p className="success-message" style={{color: 'green'}}>{success}</p>}
                
                <div className="form-group">
                    <label htmlFor="mail">Email : </label>
                    <input 
                        type="email" 
                        name="mail" 
                        id="mail" 
                        className="form-input"
                        placeholder="Votre email..." 
                        minLength={5} 
                        maxLength={50}
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe : </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="form-input"
                        placeholder="Password..." 
                        minLength={12} 
                        maxLength={20} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-submit">Se connecter</button>

                <p>Si vous n'avez pas de compte, inscrivez-vous <Link to={'/'}>ici</Link></p>
            </form>
        </div>
    )
}