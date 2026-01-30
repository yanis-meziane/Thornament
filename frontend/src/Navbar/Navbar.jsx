import { useNavigate} from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title, isConnected = false }) {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div>
                    <button onClick={() => navigate("/home")}>
                        Accueil
                    </button>
            </div>
            
            <div>
                <h1>{title}</h1>
            </div>

            <div>
                <img src='./public/thornament.png' alt='Logo'></img>
            </div>
        </nav>
    );
}
