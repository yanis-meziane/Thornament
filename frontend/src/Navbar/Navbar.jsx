import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title, isConnected = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Ne pas afficher le bouton de retour sur la page d'accueil
    const showBackButton = location.pathname !== '/' && location.pathname !== '/tournament';

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {showBackButton && (
                    <button className="btn-back" onClick={() => navigate(-1)} title="Retour">
                        Accueil
                    </button>
                )}
            </div>
            
            <div className="navbar-center">
                <h1>{title}</h1>
            </div>
            
            <div className="navbar-right">
                {/* Espace réservé pour la symétrie */}
            </div>
        </nav>
    );
}
