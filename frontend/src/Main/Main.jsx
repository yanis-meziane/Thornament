import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Main.css';

export default function Main() {
    const userName = "Utilisateur"; // const temporaire en attendant le backend

    return (
        <>
            <Navbar title="Thornament" isConnected={true} />
            <Sidebar />
            <div className="main-container">
                <h1>Bienvenue {userName}</h1>
            </div>
        </>
    );
}
