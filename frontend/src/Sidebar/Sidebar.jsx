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

                        <li onClick={()=> handleNavigate('/')}>
                            Se déconnecter
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
