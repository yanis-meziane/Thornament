import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import CreateTournamentModal from '../Phase/CreateTournamentModal';
import './Tournament.css';

const TOURNOIS_ENDPOINTS = {
    getAll: {
        url: 'http://localhost:3001/api/tournament',
        method: 'GET'
    },
    create: {
        url: 'http://localhost:3001/api/tournament',
        method: 'POST'
    },
    getById: {
        url: 'http://localhost:3001/api/tournament/:id', 
        method: 'GET'
    },
    delete: {
        url: 'http://localhost:3001/api/tournament/:id', 
        method: 'DELETE'
    }
};

export default function Tournament() {
    const navigate = useNavigate();
    const [tournois, setTournament] = useState([]);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchTournament = useCallback(async () => {
        setError('');

        try {
            const response = await fetch(TOURNOIS_ENDPOINTS.getAll.url, {
                method: TOURNOIS_ENDPOINTS.getAll.method,
                headers: getAuthHeaders()
            });

            const data = await response.json();

            if (response.ok) {
                setTournament(data.tournois || []);
            } else {
                setError(data.message || 'Erreur lors du chargement');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        }
    }, []);

    useEffect(() => {
        fetchTournament();
    }, [fetchTournament]);

    //Création de tournois
    const handleCreateTournament = async (tournamentName, tournamentDescription = "") => {
        setIsModalOpen(false);

        
        const requestBody = {
            name: tournamentName,
            description: tournamentDescription
        };

        try {
            const response = await fetch(TOURNOIS_ENDPOINTS.create.url, {
                method: TOURNOIS_ENDPOINTS.create.method,
                headers: getAuthHeaders(),
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                // Rediriger vers le tournoi créé
                navigate(`/tournament/${data.tournament.id}`);
            } else {
                alert(data.message || 'Erreur lors de la création');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    const handleDeleteTournament = async (tournoiId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce tournoi ?')) {
            return;
        }

        try {
            const url = TOURNOIS_ENDPOINTS.delete.url.replace(':id', tournoiId);
            
            const response = await fetch(url, {
                method: TOURNOIS_ENDPOINTS.delete.method,
                headers: getAuthHeaders()
            });

            const data = await response.json();

            if (response.ok) {
                alert('Tournoi supprimé !');
                fetchTournament(); // Recharger la liste
            } else {
                alert(data.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    };


    return (
        <>
            <Navbar title="Vos Tournois" isConnected={true} />
            <Sidebar />
            <div className="tournois-container">
                <div className="tournois-content">
                   
                    {error && <p className="error-message">{error}</p>}
                    
                    {tournois.length === 0 ? (
                        <>
                            <p className="no-tournois">Vous n'avez aucun tournois pour l'instant</p>
                            <button className="btn-create" onClick={() => setIsModalOpen(true)}>
                                Créer un nouveau tournoi
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>Vos Tournois ({tournois.length})</h2>
                            <button className="btn-create" onClick={() => setIsModalOpen(true)}>
                                Créer un nouveau tournoi
                            </button>
                            
                            <div className="tournois-list">
                                {tournois.map((tournoi) => (
                                    <div key={tournoi.id} className="tournoi-card">
                                        <h3>{tournoi.name}</h3>
                                        <p>{tournoi.description}</p>
                                        <p>Status: {tournoi.status}</p>
                                        <div className="tournoi-actions">
                                            <button className="btnAction" onClick={() => navigate(`/tournament/${tournoi.id}`)}>
                                                Ouvrir
                                            </button>
                                            <button className="btnAction" onClick={() => handleDeleteTournament(tournoi.id)}>
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
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