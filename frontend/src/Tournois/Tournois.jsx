import { useState, useEffect, useCallback } from 'react';
//import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import CreateTournamentModal from '../Tournament/CreateTournamentModal';
import './Tournois.css';

const TOURNOIS_ENDPOINTS = {
    getAll: {
        url: 'http://localhost:3001/api/tournois',
        method: 'GET'
    },
    create: {
        url: 'http://localhost:3001/api/tournois',
        method: 'POST'
    },
    getById: {
        url: 'http://localhost:3001/api/tournois/:id', 
        method: 'GET'
    },
    delete: {
        url: 'http://localhost:3001/api/tournois/:id', 
        method: 'DELETE'
    }
};

export default function Tournois() {
    const [tournois, setTournois] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const navigate = useNavigate();

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchTournois = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(TOURNOIS_ENDPOINTS.getAll.url, {
                method: TOURNOIS_ENDPOINTS.getAll.method,
                headers: getAuthHeaders()
            });

            const data = await response.json();

            if (response.ok) {
                setTournois(data.tournois || []);
            } else {
                setError(data.message || 'Erreur lors du chargement');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTournois();
    }, [fetchTournois]);

    //Création de tournois
    const handleCreateTournament = async (tournamentName) => {
        setIsModalOpen(false);
        setLoading(true);
        
        const requestBody = {
            name: tournamentName,
            description: ""
        };

        try {
            const response = await fetch(TOURNOIS_ENDPOINTS.create.url, {
                method: TOURNOIS_ENDPOINTS.create.method,
                headers: getAuthHeaders(),
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Tournoi créé avec succès !');
                fetchTournois();
            } else {
                alert(data.message || 'Erreur lors de la création');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTournoi = async (tournoiId) => {
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
                fetchTournois(); // Recharger la liste
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
                    {loading && <p>Chargement...</p>}
                    {error && <p className="error-message">{error}</p>}
                    
                    {!loading && tournois.length === 0 && (
                        <>
                            <p className="no-tournois">Vous n'avez aucun tournois pour l'instant</p>
                            <button className="btn-create" onClick={() => setIsModalOpen(true)}>
                                Créer un nouveau tournoi
                            </button>
                        </>
                    )}

                    {!loading && tournois.length > 0 && (
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
                                            <button onClick={() => handleDeleteTournoi(tournoi.id)}>
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