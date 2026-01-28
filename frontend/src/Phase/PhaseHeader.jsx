import './PhaseHeader.css';

export default function PhaseHeader({ phases, activePhaseId, onPhaseSelect }) {
    return (
        <div className="phase-header">
            <div className="phase-tabs">
                {phases.map(phase => (
                    <span
                        key={phase.id}
                        className={`phase-tab ${activePhaseId === phase.id ? 'active' : ''}`}
                        onClick={() => onPhaseSelect(phase.id)}
                    >
                        {phase.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
