import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './Login.css';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Stocker les informations utilisateur
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("firstname", data.firstname);
                
                setSuccess('Connexion réussie !');
                
                setTimeout(() => {
                    navigate('/main');
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
                        minLength={8} 
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