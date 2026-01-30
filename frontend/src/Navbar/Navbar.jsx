import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title = false, showLogout = false }) {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Supprimer toutes les données de l'utilisateur
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userMail');
        
        // Rediriger vers la page de connexion
        navigate('/login');
    };

    return (
        <nav className="navbar">
            
                <button onClick={() => navigate("/home")} id='buttonAccueil'>
                    Accueil
                </button>
            
                <h1>{title}</h1>
            
                {showLogout && (
                    <button onClick={handleLogout} className="btn-logout">
                        Déconnexion
                    </button>
                )}
                <img 
                    src='/thornament.png' 
                    alt='Logo' 
                    id='logoApp' 
                    onClick={() => navigate("/home")}
                />
        </nav>
    );
}