import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import PhaseHeader from './PhaseHeader';
import PhaseContent from './PhaseContent';
import './Tournament.css';

export default function Tournament() {
    const [tournamentName] = useState('Mon Tournoi');
    const [phases, setPhases] = useState([
        { id: 1, name: 'Phase 1', instances: [] }
    ]);
    const [activePhaseId, setActivePhaseId] = useState(1);

    const activePhase = phases.find(phase => phase.id === activePhaseId);

    const addPhase = () => {
        const newPhaseId = Math.max(...phases.map(p => p.id)) + 1;
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
