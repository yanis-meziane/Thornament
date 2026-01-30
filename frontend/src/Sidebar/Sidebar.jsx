import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const handleLogout = () => {
        // Supprimer toutes les données de l'utilisateur du localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userMail');
        
        
        // Rediriger vers la page de connexion
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            {isOpen && (
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => handleNavigate('/tournament')}>
                            Vos Tournois
                        </li>

                        <li onClick={handleLogout}>
                            Se déconnecter
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}