import { useState } from 'react';
import './CreateStepModal.css';

// Options statiques pour le formulaire
const STEP_COMPONENT_TYPES = [
    { value: 'versus', label: 'Versus (1v1)' },
    { value: 'battleroyale', label: 'Battle Royale' },
    { value: 'arbre_eliminatoire', label: 'Arbre éliminatoire' }
];

const VICTORY_CONDITIONS = [
    { value: 'max', label: 'Maximum (meilleur score)' },
    { value: 'min', label: 'Minimum (plus bas score)' }
];

export default function CreateStepModal({ isOpen, onClose, onCreate, stepPosition, tournamentId }) {
    const [stepName, setStepName] = useState('');
    const [stepDescription, setStepDescription] = useState('');
    const [stepComponentType, setStepComponentType] = useState('versus');
    const [victoryCondition, setVictoryCondition] = useState('max');
    const [numberPlayers, setNumberPlayers] = useState('');
    const [numberWinners, setNumberWinners] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (stepName.trim()) {
            onCreate({
                name: stepName,
                description: stepDescription,
                tournament_id: tournamentId,
                step_position: stepPosition,
                step_component_type: stepComponentType,
                settings_victory_condition: victoryCondition,
                settings_number_players: numberPlayers ? parseInt(numberPlayers) : null,
                settings_number_winners: numberWinners ? parseInt(numberWinners) : null
            });
            // Reset form
            setStepName('');
            setStepDescription('');
            setStepComponentType('versus');
            setVictoryCondition('max');
            setNumberPlayers('');
            setNumberWinners('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Créer une nouvelle étape (Phase {stepPosition})</h2>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nom de l'étape *</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Ex: Qualifications, Demi-finales..."
                            value={stepName}
                            onChange={(e) => setStepName(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-input"
                            placeholder="Description de l'étape (optionnel)"
                            value={stepDescription}
                            onChange={(e) => setStepDescription(e.target.value)}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Type de composant *</label>
                        <select
                            className="form-input"
                            value={stepComponentType}
                            onChange={(e) => setStepComponentType(e.target.value)}
                            required
                        >
                            {STEP_COMPONENT_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-section-title">Paramètres de l'étape</div>

                    <div className="form-group">
                        <label>Condition de victoire *</label>
                        <select
                            className="form-input"
                            value={victoryCondition}
                            onChange={(e) => setVictoryCondition(e.target.value)}
                            required
                        >
                            {VICTORY_CONDITIONS.map((condition) => (
                                <option key={condition.value} value={condition.value}>
                                    {condition.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre de joueurs *</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="Ex: 8"
                                value={numberPlayers}
                                onChange={(e) => setNumberPlayers(e.target.value)}
                                min="2"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Nombre de gagnants *</label>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="Ex: 2"
                                value={numberWinners}
                                onChange={(e) => setNumberWinners(e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn-create-step">
                        Créer l'étape
                    </button>
                </form>
            </div>
        </div>
    );
}
