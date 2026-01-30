import { useState } from 'react';
import './CreateStepModal.css';

const STEP_COMPONENT_TYPES = [
    { value: 'tree', label: 'Arbre éliminatoire' },
    { value: 'br', label: 'Battle Royale' },
    { value: 'league', label: 'Ligue (vs)' }
];

// Retour à la constante initiale
const VICTORY_CONDITIONS = [
    { value: 'max', label: 'Maximum (meilleur score)' },
    { value: 'min', label: 'Minimum (plus bas score)' }
];

export default function CreateStepModal({ isOpen, onClose, onCreate, stepPosition, tournamentId }) {
    const [stepName, setStepName] = useState('');
    const [stepComponentType, setStepComponentType] = useState('tree');
    const [victoryCondition, setVictoryCondition] = useState('max');
    const [numberPlayers, setNumberPlayers] = useState(8);
    const [numberWinners, setNumberWinners] = useState(1);
    
    // States spécifiques selon le type
    const [numRounds, setNumRounds] = useState(3); 
    const [isTwoLegged, setIsTwoLegged] = useState(false);
    const [numGroups, setNumGroups] = useState(1);

    const handleRoundChange = (val) => {
        const rounds = parseInt(val);
        setNumRounds(rounds);
        setNumberPlayers(Math.pow(2, rounds));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // On envoie les clés avec le préfixe 'settings_' pour correspondre à l'API
        onCreate({
            name: stepName,
            tournament_id: tournamentId,
            step_position: stepPosition,
            step_component_type: stepComponentType,
            settings_victory_condition: victoryCondition, // Correction erreur 400
            settings_number_players: parseInt(numberPlayers),
            settings_number_winners: parseInt(numberWinners),
            settings_is_two_legged: isTwoLegged,
            settings_num_groups: parseInt(numGroups),
            settings_num_rounds: parseInt(numRounds)
        });
        
        // Réinitialisation et fermeture
        setStepName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nouvelle Étape — Phase {stepPosition}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nom de l'étape</label>
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="Ex: Huitièmes de finale"
                            value={stepName} 
                            onChange={e => setStepName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Typologie</label>
                            <select className="form-input" value={stepComponentType} onChange={e => setStepComponentType(e.target.value)}>
                                {STEP_COMPONENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Condition de victoire</label>
                            <select className="form-input" value={victoryCondition} onChange={e => setVictoryCondition(e.target.value)}>
                                {VICTORY_CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-separator"></div>

                    {/* Configuration spécifique ARBRE */}
                    {stepComponentType === 'tree' && (
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre de Rounds</label>
                                <input type="number" value={numRounds} onChange={e => handleRoundChange(e.target.value)} min="1" max="10" />
                            </div>
                            <div className="form-info">
                                Cela génère {numberPlayers} emplacements joueurs.
                            </div>
                        </div>
                    )}

                    {/* Configuration spécifique LIGUE */}
                    {stepComponentType === 'league' && (
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre de groupes</label>
                                <input type="number" value={numGroups} onChange={e => setNumGroups(e.target.value)} min="1" />
                            </div>
                            <div className="form-group">
                                <label>Nombre de joueurs total</label>
                                <input type="number" value={numberPlayers} onChange={e => setNumberPlayers(e.target.value)} min="2" />
                            </div>
                        </div>
                    )}

                    {/* Champ commun pour BR ou autres */}
                    {stepComponentType === 'br' && (
                        <div className="form-group">
                            <label>Nombre de participants</label>
                            <input type="number" value={numberPlayers} onChange={e => setNumberPlayers(e.target.value)} min="2" />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Vainqueurs à qualifier</label>
                        <input type="number" value={numberWinners} onChange={e => setNumberWinners(e.target.value)} min="1" />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
                        <button type="submit" className="btn-create">Créer l'étape</button>
                    </div>
                </form>
            </div>
        </div>
    );
}