import React from 'react';
import './TreeBracket.css';

export default function TreeBracket({ matches = [], tournamentName = '' }) {
    if (!matches || matches.length === 0) {
        return (
            <div className="tree-bracket">
                <p className="no-matches">Aucun match pour le moment</p>
            </div>
        );
    }

    // Organiser les matchs par niveau (round)
    const levels = {};
    matches.forEach(match => {
        if (!levels[match.round]) levels[match.round] = [];
        levels[match.round].push(match);
    });

    const sortedLevels = Object.keys(levels)
        .sort((a, b) => a - b)
        .map(key => levels[key]);

    return (
        <div className="tree-bracket">
            <h2 className="bracket-title">{tournamentName || 'Arbre Éliminatoire'}</h2>
            
            <div className="bracket-container">
                {sortedLevels.map((level, levelIndex) => (
                    <div key={levelIndex} className="bracket-level">
                        <div className="level-title">
                            {levelIndex === sortedLevels.length - 1 
                                ? 'Finale' 
                                : `Round ${levelIndex + 1}`}
                        </div>
                        
                        <div className="matches-column">
                            {level.map((match, matchIndex) => (
                                <div key={match.id} className="match-card">
                                    <div className={`player ${match.winner === match.player1 ? 'winner' : ''}`}>
                                        <span className="player-name">{match.player1 || '?'}</span>
                                        <input 
                                            type="number" 
                                            className="player-score" 
                                            placeholder="Score"
                                            defaultValue={match.player1_score || ''}
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div className="vs">vs</div>
                                    
                                    <div className={`player ${match.winner === match.player2 ? 'winner' : ''}`}>
                                        <span className="player-name">{match.player2 || '?'}</span>
                                        <input 
                                            type="number" 
                                            className="player-score" 
                                            placeholder="Score"
                                            defaultValue={match.player2_score || ''}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
