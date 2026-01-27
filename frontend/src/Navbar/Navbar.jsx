import './Navbar.css';

export default function Navbar({ title }) {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <h1>{title}</h1>
            </div>
        </nav>
    );
}
