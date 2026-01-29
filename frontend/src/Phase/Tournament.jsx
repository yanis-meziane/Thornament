import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PhaseHeader from './PhaseHeader';
import PhaseContent from './PhaseContent';
import './Tournament.css';

export default function Tournament() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tournamentName, setTournamentName] = useState('Chargement...');
    const [phases, setPhases] = useState([]);
    const [activePhaseId, setActivePhaseId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    // Charger le tournoi et ses phases
    const fetchTournamentData = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError('');

        try {
            // Récupérer le tournoi
            const response = await fetch(`http://localhost:3001/api/tournament/${id}`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors du chargement du tournoi');
                return;
            }

            setTournamentName(data.tournament.name);
            
            // TODO: Récupérer les phases du tournoi depuis le backend
            // Pour maintenant, initialiser avec une phase vierge
            setPhases([
                { id: 1, name: 'Phase 1', instances: [] }
            ]);
            setActivePhaseId(1);
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTournamentData();
    }, [fetchTournamentData]);

    if (loading) {
        return (
            <div className="tournament-page">
                <Navbar title="Chargement..." isConnected={true} />
                <div className="tournament-content">
                    <p>Chargement du tournoi...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="tournament-page">
                <Navbar title="Erreur" isConnected={true} />
                <div className="tournament-content">
                    <p className="error-message">{error}</p>
                    <button onClick={() => navigate('/tournament')}>Retour</button>
                </div>
            </div>
        );
    }

    const activePhase = phases.find(phase => phase.id === activePhaseId);

    const addPhase = () => {
        const newPhaseId = Math.max(...phases.map(p => p.id), 0) + 1;
        setPhases([...phases, { id: newPhaseId, name: `Phase ${newPhaseId}`, instances: [] }]);
    };

    return (
        <div className="tournament-page">
            <Navbar title={tournamentName} isConnected={true} />
            
            <div className="tournament-content">
                <PhaseHeader 
                    phases={phases} 
                    activePhaseId={activePhaseId}
                    onPhaseSelect={setActivePhaseId}
                />
                
                {activePhase && (
                    <PhaseContent 
                        phase={activePhase}
                        onAddInstance={() => {
                            // À implémenter : ajout d'une instance
                        }}
                    />
                )}
                
                <button className="btn-add-phase-side" onClick={addPhase} title="Ajouter une phase">
                    +
                </button>
            </div>
        </div>
    );
}
