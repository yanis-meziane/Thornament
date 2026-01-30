/**
 * Génère la structure d'un arbre éliminatoire (Round 0 = Finale à droite)
 */
export function generateTreeBracket(numberOfPlayers, players = []) {
    const rounds = Math.ceil(Math.log2(numberOfPlayers));
    const matches = [];
    let matchId = 1;
    
    // On génère du premier tour vers la finale
    for (let round = 0; round < rounds; round++) {
        const matchesInRound = Math.pow(2, rounds - round - 1);
        for (let i = 0; i < matchesInRound; i++) {
            const p1Idx = (matchId - 1) * 2;
            const p2Idx = (matchId - 1) * 2 + 1;
            matches.push({
                id: matchId++,
                round: round, // Le round 0 sera le plus à gauche dans le rendu
                player1: players[p1Idx]?.name || `Attente...`,
                player2: players[p2Idx]?.name || `Attente...`,
                player1_score: null,
                player2_score: null,
                winner: null
            });
        }
    }
    return matches;
}

/**
 * Génère des groupes de ligue dynamiques
 */
export function generateLeagueGroups(totalPlayers, numGroups, participants = []) {
    const groups = [];
    const playersPerGroup = Math.ceil(totalPlayers / numGroups);
    
    for (let g = 0; g < numGroups; g++) {
        const groupParticipants = [];
        for (let p = 0; p < playersPerGroup; p++) {
            const idx = g * playersPerGroup + p;
            if (idx < totalPlayers) {
                groupParticipants.push({
                    id: participants[idx]?.id || idx + 1,
                    name: participants[idx]?.name || `Joueur ${idx + 1}`,
                    points: 0,
                    wins: 0,
                    losses: 0,
                    qualified: false
                });
            }
        }
        groups.push({
            name: `Groupe ${String.fromCharCode(65 + g)}`,
            participants: groupParticipants
        });
    }
    return groups;
}

export function generateBattleRoyale(numberOfPlayers, participants = []) {
    return Array.from({ length: numberOfPlayers }, (_, i) => ({
        id: participants[i]?.id || i + 1,
        name: participants[i]?.name || `Joueur ${i + 1}`,
        score: 0,
        status: 'participant'
    }));
}