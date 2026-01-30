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
            
            // Récupérer toutes les steps du tournoi
            const stepsResponse = await fetch(`http://localhost:3001/api/step/tournament/${id}`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            const stepsData = await stepsResponse.json();

            if (stepsResponse.ok && stepsData.steps) {
                // Extraire les phases uniques à partir des steps
                const uniquePhases = [...new Set(stepsData.steps.map(step => step.step_position))];
                const phasesArray = uniquePhases.map(position => ({
                    id: position,
                    name: `Phase ${position}`,
                    instances: []
                }));

                setPhases(phasesArray.length > 0 ? phasesArray : [{ id: 1, name: 'Phase 1', instances: [] }]);
                setActivePhaseId(phasesArray.length > 0 ? phasesArray[0].id : 1);
            } else {
                // Initialiser avec une phase par défaut
                setPhases([{ id: 1, name: 'Phase 1', instances: [] }]);
                setActivePhaseId(1);
            }
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

    const addPhase = () => {
        const newPhaseId = Math.max(...phases.map(p => p.id), 0) + 1;
        setPhases([...phases, { id: newPhaseId, name: `Phase ${newPhaseId}`, instances: [] }]);
    };

    const deletePhase = async (phaseId) => {
        if (phases.length <= 1) {
            alert('Impossible de supprimer la dernière phase');
            return;
        }

        try {
            // Récupérer toutes les steps de cette phase
            const stepsResponse = await fetch(`http://localhost:3001/api/step/tournament/${id}`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            const stepsData = await stepsResponse.json();

            if (stepsResponse.ok && stepsData.steps) {
                const phaseSteps = stepsData.steps.filter(step => step.step_position === phaseId);

                // Supprimer toutes les steps de cette phase
                const deletePromises = phaseSteps.map(step =>
                    fetch(`http://localhost:3001/api/step/${step.id}`, {
                        method: 'DELETE',
                        headers: getAuthHeaders()
                    })
                );

                await Promise.all(deletePromises);
            }

            // Mettre à jour l'état local
            const updatedPhases = phases.filter(p => p.id !== phaseId);
            setPhases(updatedPhases);

            // Si la phase active est supprimée, basculer vers la première phase restante
            if (activePhaseId === phaseId) {
                setActivePhaseId(updatedPhases[0].id);
            }

            alert('Phase supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la phase:', error);
            alert('Erreur lors de la suppression de la phase');
        }
    };

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

    const goToNextPhase = () => {
        const currentIndex = phases.findIndex(p => p.id === activePhaseId);
        if (currentIndex < phases.length - 1) {
            setActivePhaseId(phases[currentIndex + 1].id);
        }
    };

    const goToPrevPhase = () => {
        const currentIndex = phases.findIndex(p => p.id === activePhaseId);
        if (currentIndex > 0) {
            setActivePhaseId(phases[currentIndex - 1].id);
        }
    };

    const currentIndex = phases.findIndex(p => p.id === activePhaseId);

    return (
        <div className="tournament-page">
            <Navbar title={tournamentName} isConnected={true} />
            
            <div className="tournament-content">
                <PhaseHeader 
                    phases={phases} 
                    activePhaseId={activePhaseId}
                    onPhaseSelect={setActivePhaseId}
                    onPhaseDelete={deletePhase}
                />

                {/* Nouveau bouton central pour ajouter une phase */}
                <div className="add-phase-container-center">
                    <button className="btn-add-phase-inline" onClick={addPhase}>
                        + Nouvelle Phase
                    </button>
                </div>
                
                {/* Flèche Gauche */}
                {currentIndex > 0 && (
                    <button className="nav-arrow left" onClick={goToPrevPhase}>‹</button>
                )}

                {activePhase && (
                    <PhaseContent 
                        phase={activePhase}
                        stepPosition={activePhaseId}
                        tournamentId={id}
                    />
                )}
                
                {/* Flèche Droite ou Bouton Ajouter (Side) */}
                {currentIndex < phases.length - 1 ? (
                    <button className="nav-arrow right" onClick={goToNextPhase}>›</button>
                ) : (
                    <button className="btn-add-phase-side" onClick={addPhase} title="Ajouter une phase">
                        +
                    </button>
                )}
            </div>
        </div>
    );
}