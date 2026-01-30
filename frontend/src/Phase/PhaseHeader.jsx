import './PhaseHeader.css';

export default function PhaseHeader({ phases, activePhaseId, onPhaseSelect, onPhaseDelete }) {
    const handleDelete = (e, phaseId) => {
        e.stopPropagation();
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette phase ? Toutes les étapes associées seront également supprimées.')) {
            onPhaseDelete(phaseId);
        }
    };

    return (
        <div className="phase-header">
            <div className="phase-tabs">
                {phases.map(phase => (
                    <div
                        key={phase.id}
                        className={`phase-tab-wrapper ${activePhaseId === phase.id ? 'active' : ''}`}
                    >
                        <span
                            className={`phase-tab ${activePhaseId === phase.id ? 'active' : ''}`}
                            onClick={() => onPhaseSelect(phase.id)}
                        >
                            {phase.name}
                        </span>
                        {phases.length > 1 && (
                            <button
                                className="btn-delete-phase"
                                onClick={(e) => handleDelete(e, phase.id)}
                                title="Supprimer cette phase"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}