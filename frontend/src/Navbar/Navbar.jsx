import { useNavigate} from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title = false }) {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div>
                    <button onClick={() => navigate("/home")} id='buttonAccueil'>
                        Accueil
                    </button>
            </div>
            
            <div>
                <h1>{title}</h1>
            </div>

            <div>
                <img src='/thornament.png' alt='Logo' id='logoApp'  onClick={() => navigate("/home")}></img>
            </div>
        </nav>
    );
}
