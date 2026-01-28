import './PhaseContent.css';

export default function PhaseContent({ phase, onAddInstance }) {
    return (
        <div className="phase-content">
            <div className="phase-container">
                <h2>{phase.name}</h2>
                
                {phase.instances.length === 0 && (
                    <div className="empty-phase">
                        <p>Aucune étape pour le moment</p>
                        <button className="btn-add-instance" onClick={onAddInstance}>
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
        </div>
    );
}
