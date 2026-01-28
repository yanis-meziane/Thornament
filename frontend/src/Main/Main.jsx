import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Main.css';

export default function Main() {
    return (
        <>
            <Navbar title="Thornament" isConnected={true} />
            <Sidebar />
            <div className="main-container">
                <h1>Bienvenue</h1>
            </div>
        </>
    );
}
