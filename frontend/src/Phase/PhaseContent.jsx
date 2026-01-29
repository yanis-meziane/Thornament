import { useState } from 'react';
import CreateStepModal from './CreateStepModal';
import './PhaseContent.css';

export default function PhaseContent({ phase, stepPosition, tournamentId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddStep = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="phase-content">
            <div className="phase-container">
                <h2>{phase.name}</h2>
                
                {phase.instances.length === 0 && (
                    <div className="empty-phase">
                        <p>Aucune étape pour le moment</p>
                        <button className="btn-add-instance" onClick={handleAddStep}>
                            + Ajouter une étape
                        </button>
                    </div>
                )}
                
                <div className="instances-list">
                    {phase.instances.map((instance, index) => (
                        <div key={index} className="instance-card">
                            {/* Contenu des instances à implémenter */}
                        </div>
                    ))}
                </div>
            </div>

            <CreateStepModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={(stepData) => {
                    // Le formulaire affiche les données, la création est gérée ailleurs
                    console.log('Données du formulaire:', stepData);
                    setIsModalOpen(false);
                }}
                stepPosition={stepPosition}
                tournamentId={tournamentId}
            />
        </div>
    );
}
