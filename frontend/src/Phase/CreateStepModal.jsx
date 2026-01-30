import { useState } from 'react';
import './CreateStepModal.css';

const STEP_COMPONENT_TYPES = [
    { value: 'tree', label: 'Arbre éliminatoire' },
    { value: 'br', label: 'Battle Royale' },
    { value: 'league', label: 'Ligue (vs)' }
];

export default function CreateStepModal({ isOpen, onClose, onCreate, stepPosition, tournamentId }) {
    const [stepName, setStepName] = useState('');
    const [stepComponentType, setStepComponentType] = useState('tree');
    const [victoryCondition, setVictoryCondition] = useState('max');
    const [numberPlayers, setNumberPlayers] = useState(8);
    const [numberWinners, setNumberWinners] = useState(1);
    
    // States spécifiques
    const [numRounds, setNumRounds] = useState(3); // 2^3 = 8 joueurs
    const [isTwoLegged, setIsTwoLegged] = useState(false);
    const [numGroups, setNumGroups] = useState(1);
    const [brFormat] = useState('points'); // 'points' ou 'last_man'

    // Synchronisation Arbre : Rounds <-> Joueurs
    const handleRoundChange = (val) => {
        setNumRounds(val);
        setNumberPlayers(Math.pow(2, val));
    };

    const handlePlayerChange = (val) => {
        setNumberPlayers(val);
        if (stepComponentType === 'tree') {
            setNumRounds(Math.ceil(Math.log2(val)));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            name: stepName,
            tournament_id: tournamentId,
            step_position: stepPosition,
            step_component_type: stepComponentType,
            settings: {
                victory_condition: victoryCondition,
                number_players: parseInt(numberPlayers),
                number_winners: parseInt(numberWinners),
                is_two_legged: isTwoLegged,
                num_groups: parseInt(numGroups),
                br_format: brFormat,
                num_rounds: parseInt(numRounds)
            }
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nouvelle Étape - Phase {stepPosition}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom de l'étape</label>
                        <input type="text" value={stepName} onChange={e => setStepName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Typologie de compétition</label>
                        <select value={stepComponentType} onChange={e => setStepComponentType(e.target.value)}>
                            {STEP_COMPONENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                    </div>

                    <div className="form-separator" />

                    {/* --- CONFIGURATION DYNAMIQUE --- */}
                    
                    {/* Section Commune : Victoire & Joueurs */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Condition de victoire</label>
                            <select value={victoryCondition} onChange={e => setVictoryCondition(e.target.value)}>
                                <option value="max">Plus haut score (Points/Buts)</option>
                                <option value="min">Plus bas score (Temps/Rang)</option>
                                {stepComponentType === 'br' && <option value="last_man">Dernier Survivant</option>}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Joueurs Total</label>
                            <input type="number" value={numberPlayers} onChange={e => handlePlayerChange(e.target.value)} />
                        </div>
                    </div>

                    {/* Champs spécifiques : ARBRE */}
                    {stepComponentType === 'tree' && (
                        <div className="form-row">
                            <div className="form-group">
                                <label>Débuter en :</label>
                                <select value={numRounds} onChange={e => handleRoundChange(e.target.value)}>
                                    <option value="1">Finale (2 joueurs)</option>
                                    <option value="2">Demi-finales (4 joueurs)</option>
                                    <option value="3">Quarts de finale (8 joueurs)</option>
                                    <option value="4">8èmes de finale (16 joueurs)</option>
                                    <option value="5">16èmes de finale (32 joueurs)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Format Match</label>
                                <select onChange={e => setIsTwoLegged(e.target.value === 'true')}>
                                    <option value="false">Match Simple</option>
                                    <option value="true">Aller-Retour</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Champs spécifiques : LIGUE */}
                    {stepComponentType === 'league' && (
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre de groupes</label>
                                <input type="number" value={numGroups} onChange={e => setNumGroups(e.target.value)} min="1" />
                            </div>
                            <div className="form-info">
                                Taille par groupe : {Math.ceil(numberPlayers / numGroups)} joueurs
                            </div>
                        </div>
                    )}

                    {/* Section Commune : Vainqueurs à retenir */}
                    <div className="form-group">
                        <label>Vainqueurs à retenir (pour la phase suivante)</label>
                        <input type="number" value={numberWinners} onChange={e => setNumberWinners(e.target.value)} min="1" />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-create">Créer</button>
                        <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
}