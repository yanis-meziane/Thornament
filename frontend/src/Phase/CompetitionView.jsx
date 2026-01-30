import React, { useState } from 'react';
import TreeBracket from './TreeBracket';
import BattleRoyaleTable from './BattleRoyaleTable';
import LeagueTable from './LeagueTable';
import { generateTreeBracket, generateBattleRoyale, generateLeagueGroups } from './bracketUtils';
import './CompetitionView.css';

/**
 * Composant CompetitionView - Affiche la compétition appropriée selon le type
 * et permet de la configurer
 */

export default function CompetitionView({ 
    stepType = 'tree', // 'tree', 'br', 'league'
    stepName = '',
    numberOfPlayers = 8,
    numberOfGroups = 2,
    participants = [],
    matches = [],
    onDelete = []
}) {
    const [isSetupMode, setIsSetupMode] = useState(false);
    const [config, setConfig] = useState({
        numberOfPlayers,
        numberOfGroups
    });
    
    // Générer les données en fonction du type
    const generateCompetitionData = () => {
        if (stepType === 'tree') {
            return generateTreeBracket(config.numberOfPlayers, participants);
        } else if (stepType === 'br') {
            return generateBattleRoyale(config.numberOfPlayers, participants);
        } else if (stepType === 'league') {
            return generateLeagueGroups(config.numberOfPlayers, config.numberOfGroups, participants);
        }
        return null;
    };

    const competitionData = generateCompetitionData();

    return (
        <div className="competition-view">
            <div className="competition-header">
                <h2>{stepName || 'Compétition'}</h2>
                <div className="header-actions"> {/* Conteneur pour les boutons */}
                    <button 
                        className="btn-setup" 
                        onClick={() => setIsSetupMode(!isSetupMode)}
                    >
                        {isSetupMode ? 'Annuler' : 'Configurer'}
                    </button>
                    
                    <button 
                        className="btn-delete-step" 
                        onClick={onDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </div>

            {isSetupMode ? (
                <div className="setup-panel">
                    <div className="setup-form">
                        {(stepType === 'tree' || stepType === 'br') && (
                            <div className="form-group">
                                <label>Nombre de joueurs:</label>
                                <input 
                                    type="number" 
                                    min="2" 
                                    value={config.numberOfPlayers}
                                    onChange={(e) => setConfig({ 
                                        ...config, 
                                        numberOfPlayers: parseInt(e.target.value) || 2 
                                    })}
                                />
                            </div>
                        )}

                        {stepType === 'league' && (
                            <>
                                <div className="form-group">
                                    <label>Nombre total de joueurs:</label>
                                    <input 
                                        type="number" 
                                        min="2" 
                                        value={config.numberOfPlayers}
                                        onChange={(e) => setConfig({ 
                                            ...config, 
                                            numberOfPlayers: parseInt(e.target.value) || 2 
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nombre de groupes:</label>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max={config.numberOfPlayers}
                                        value={config.numberOfGroups}
                                        onChange={(e) => setConfig({ 
                                            ...config, 
                                            numberOfGroups: parseInt(e.target.value) || 1 
                                        })}
                                    />
                                </div>

                                <div className="form-info">
                                    <p>
                                        {Math.ceil(config.numberOfPlayers / config.numberOfGroups)} joueurs par groupe
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="competition-display">
                    {stepType === 'tree' && (
                        <TreeBracket 
                            matches={competitionData}
                            tournamentName={stepName}
                        />
                    )}
                    
                    {stepType === 'br' && (
                        <BattleRoyaleTable 
                            participants={competitionData}
                            stepName={stepName}
                        />
                    )}
                    
                    {stepType === 'league' && (
                        <LeagueTable 
                            groups={competitionData}
                            stepName={stepName}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
