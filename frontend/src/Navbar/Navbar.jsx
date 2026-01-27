import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title, isConnected = false }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {isConnected ? (
                    <button className="btn-thornament" onClick={() => navigate('/home')}>
                        Thornament
                    </button>
                ) : (
                    <span>Paramètres</span>
                )}
            </div>
            <div className="navbar-center">
                <h1>{title}</h1>
            </div>
            <div className="navbar-right">
                {isConnected ? (
                    <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                ) : (
                    <span>Connexion</span>
                )}
            </div>
        </nav>
    );
}
