
import './Navbar.css';

export default function Navbar({ title, isConnected = false }) {
    

    return (
        <nav className="navbar">
            
            <div className="navbar">
                <h1>{title}</h1>
            </div>
        </nav>
    );
}
