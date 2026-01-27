import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Tournois.css';

export default function Tournois() {
    const handleCreateTournoi = () => {
        alert("Création d'un nouveau tournoi");
    };

    return (
        <>
            <Navbar title="Vos Tournois" />
            <Sidebar />
            <div className="tournois-container">
                <div className="tournois-content">
                    <p className="no-tournois">Vous n'avez aucun tournois pour l'instant</p>
                    <button className="btn-create" onClick={handleCreateTournoi}>
                        Créer un nouveau tournoi
                    </button>
                </div>
            </div>
        </>
    );
}
