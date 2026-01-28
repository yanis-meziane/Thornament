import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import CreateTournamentModal from '../Tournament/CreateTournamentModal';
import './Tournois.css';

export default function Tournois() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreateTournament = (tournamentName) => {
        // À implémenter : sauvegarder le tournoi et rediriger
        console.log('Nouveau tournoi créé :', tournamentName);
        setIsModalOpen(false);
        // navigate('/tournament'); // À ajouter une fois la logique implémentée
    };

    return (
        <>
            <Navbar title="Vos Tournois" isConnected={true} />
            <Sidebar />
            <div className="tournois-container">
                <div className="tournois-content">
                    <p className="no-tournois">Vous n'avez aucun tournois pour l'instant</p>
                    <button className="btn-create" onClick={() => setIsModalOpen(true)}>
                        Créer un nouveau tournoi
                    </button>
                </div>
            </div>
            
            <CreateTournamentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateTournament}
            />
        </>
    );
}
