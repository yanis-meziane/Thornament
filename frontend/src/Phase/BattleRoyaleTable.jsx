import React from 'react';
import './BattleRoyaleTable.css';

/**
 * Composant BattleRoyaleTable pour afficher les résultats Battle Royale
 * Format tableau simple type classement
 */

export default function BattleRoyaleTable({ participants = [], stepName = '' }) {
    if (!participants || participants.length === 0) {
        return (
            <div className="br-table">
                <p className="no-data">Aucun participant pour le moment</p>
            </div>
        );
    }

    // Trier les participants par score (décroissant)
    const sortedParticipants = [...participants].sort((a, b) => {
        if (b.score === undefined || b.score === null) return -1;
        if (a.score === undefined || a.score === null) return 1;
        return b.score - a.score;
    });

    return (
        <div className="br-table">
            <h2 className="table-title">{stepName || 'Battle Royale'}</h2>
            
            <table className="participants-table">
                <thead>
                    <tr>
                        <th className="rank">Rang</th>
                        <th className="name">Nom du Participant</th>
                        <th className="score">Score</th>
                        <th className="status">Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedParticipants.map((participant, index) => (
                        <tr key={participant.id || index} className={participant.status === 'winner' ? 'winner-row' : ''}>
                            <td className="rank">#{index + 1}</td>
                            <td className="name">{participant.name || '?'}</td>
                            <td className="score">{participant.score ?? '-'}</td>
                            <td className="status">
                                <span className={`badge ${participant.status || 'participant'}`}>
                                    {participant.status === 'winner' ? '🏆 Vainqueur' : 'Participant'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
