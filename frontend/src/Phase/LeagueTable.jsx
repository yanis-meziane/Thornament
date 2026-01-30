import React from 'react';
import './LeagueTable.css';

/**
 * Composant LeagueTable pour afficher les groupes/ligues
 * Peut afficher plusieurs groupes avec classement
 */

export default function LeagueTable({ groups = [], stepName = '' }) {
    if (!groups || groups.length === 0) {
        return (
            <div className="league-table">
                <p className="no-data">Aucun groupe pour le moment</p>
            </div>
        );
    }

    return (
        <div className="league-table">
            <h2 className="table-title">{stepName || 'Ligue / Groupes'}</h2>
            
            <div className="groups-container">
                {groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="group-section">
                        <h3 className="group-name">{group.name || `Groupe ${String.fromCharCode(65 + groupIndex)}`}</h3>
                        
                        <table className="group-table">
                            <thead>
                                <tr>
                                    <th className="rank">Pos</th>
                                    <th className="name">Équipe/Joueur</th>
                                    <th className="played">J</th>
                                    <th className="wins">G</th>
                                    <th className="draws">N</th>
                                    <th className="losses">P</th>
                                    <th className="points">Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(group.participants || [])
                                    .sort((a, b) => (b.points || 0) - (a.points || 0))
                                    .map((participant, index) => (
                                        <tr key={participant.id || index} className={participant.qualified ? 'qualified' : ''}>
                                            <td className="rank">{index + 1}</td>
                                            <td className="name">{participant.name || '?'}</td>
                                            <td className="played">{participant.played || 0}</td>
                                            <td className="wins">{participant.wins || 0}</td>
                                            <td className="draws">{participant.draws || 0}</td>
                                            <td className="losses">{participant.losses || 0}</td>
                                            <td className="points">{participant.points || 0}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}
