import './Navbar.css';

export default function Navbar({ title }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span>Paramètres</span>
            </div>
            <div className="navbar-center">
                <h1>{title}</h1>
            </div>
            <div className="navbar-right">
                <span>Connexion</span>
            </div>
        </nav>
    );
}
