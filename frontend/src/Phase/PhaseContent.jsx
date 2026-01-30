import { useState, useEffect } from 'react';
import CreateStepModal from './CreateStepModal';
import CompetitionView from './CompetitionView';
import './PhaseContent.css';

export default function PhaseContent({ phase, stepPosition, tournamentId, onStepsLoaded }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(false);

    // Charger les steps du tournoi
    useEffect(() => {
        fetchSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tournamentId, stepPosition]);

    const fetchSteps = async () => {
        if (!tournamentId) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/step/tournament/${tournamentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Filtrer les steps de cette phase (step_position)
                const phaseSteps = data.steps.filter(step => step.step_position === stepPosition);
                setSteps(phaseSteps);
                
                if (onStepsLoaded) {
                    onStepsLoaded(phaseSteps);
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement des steps:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStep = () => {
        setIsModalOpen(true);
    };

    const handleStepCreated = async (stepData) => {
        setIsModalOpen(false);
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/step', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(stepData)
            });

            const data = await response.json();

            if (response.ok) {
                // Recharger les steps
                fetchSteps();
            } else {
                alert(data.message || 'Erreur lors de la création de l\'étape');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    const handleDeleteStep = async (stepId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette étape ?")) return;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/step/${stepId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            setSteps(prevSteps => prevSteps.filter(s => s.id !== stepId));
        } else {
            const data = await response.json();
            alert(data.message || "Erreur lors de la suppression");
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de contacter le serveur");
    }
};

    return (
        <div className="phase-content">
            <div className="phase-container">
                <h2>{phase.name}</h2>
                
                {loading ? (
                    <p className="loading">Chargement des étapes...</p>
                ) : steps.length === 0 ? (
                    <div className="empty-phase">
                        <p>Aucune étape pour le moment</p>
                        <button className="btn-add-instance" onClick={handleAddStep}>
                            + Ajouter une étape
                        </button>
                    </div>
                ) : (
                    <div className="steps-container">
                        <div className="steps-header">
                            <p className="steps-count">Étapes ({steps.length})</p>
                            <button className="btn-add-instance" onClick={handleAddStep}>
                                + Ajouter une étape
                            </button>
                        </div>

                        <div className="steps-list">
                            {steps.map((step) => (
                                <CompetitionView
                                    key={step.id}
                                    stepId={step.id}
                                    stepType={step.step_component_type}
                                    stepName={step.name}
                                    numberOfPlayers={step.number_players}
                                    numberOfGroups={Math.ceil(step.number_players / 4)} // À adapter selon les besoins
                                    participants={[]}
                                    matches={[]}
                                    onDelete={() => handleDeleteStep(step.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <CreateStepModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleStepCreated}
                stepPosition={stepPosition}
                tournamentId={tournamentId}
            />
        </div>
    );
}
