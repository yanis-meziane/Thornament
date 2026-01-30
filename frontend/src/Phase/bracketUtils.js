/**
 * Utilitaires pour générer les structures de compétition
 * en fonction de la taille et des paramètres
 */

/**
 * Génère la structure d'un arbre éliminatoire
 * @param {number} numberOfPlayers - Nombre de joueurs
 * @param {array} players - Liste des joueurs (optionnel)
 * @returns {array} Structure des matchs avec ids organizés par round
 */
export function generateTreeBracket(numberOfPlayers, players = []) {
    // Arrondir au nombre de puissance de 2 supérieure
    const rounds = Math.ceil(Math.log2(numberOfPlayers));
    const totalSpots = Math.pow(2, rounds);
    
    const matches = [];
    let matchId = 1;
    
    for (let round = 0; round < rounds; round++) {
        const matchesInRound = Math.pow(2, rounds - round - 1);
        
        for (let i = 0; i < matchesInRound; i++) {
            const playerIndex1 = (matchId - 1) * 2;
            const playerIndex2 = (matchId - 1) * 2 + 1;
            
            matches.push({
                id: matchId,
                round: round,
                player1: players[playerIndex1]?.name || `Joueur ${playerIndex1 + 1}`,
                player2: players[playerIndex2]?.name || `Joueur ${playerIndex2 + 1}`,
                player1_id: players[playerIndex1]?.id || null,
                player2_id: players[playerIndex2]?.id || null,
                winner: null,
                player1_score: null,
                player2_score: null
            });
            
            matchId++;
        }
    }
    
    return matches;
}

/**
 * Génère la structure pour une compétition Battle Royale
 * @param {number} numberOfParticipants - Nombre de participants
 * @param {array} participants - Liste des participants (optionnel)
 * @returns {array} Liste des participants avec positions
 */
export function generateBattleRoyale(numberOfParticipants, participants = []) {
    const slots = [];
    
    for (let i = 0; i < numberOfParticipants; i++) {
        slots.push({
            id: participants[i]?.id || i + 1,
            name: participants[i]?.name || `Participant ${i + 1}`,
            score: participants[i]?.score || 0,
            status: 'participant',
            position: i + 1
        });
    }
    
    return slots;
}

/**
 * Génère la structure pour une compétition Ligue/Groupes
 * @param {number} numberOfParticipants - Nombre total de participants
 * @param {number} numberOfGroups - Nombre de groupes
 * @param {array} participants - Liste des participants (optionnel)
 * @returns {array} Structure des groupes
 */
export function generateLeagueGroups(numberOfParticipants, numberOfGroups, participants = []) {
    const playersPerGroup = Math.ceil(numberOfParticipants / numberOfGroups);
    const groups = [];
    let participantIndex = 0;
    
    for (let g = 0; g < numberOfGroups; g++) {
        const groupParticipants = [];
        
        for (let p = 0; p < playersPerGroup && participantIndex < numberOfParticipants; p++) {
            groupParticipants.push({
                id: participants[participantIndex]?.id || participantIndex + 1,
                name: participants[participantIndex]?.name || `Joueur ${participantIndex + 1}`,
                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                points: 0,
                qualified: false
            });
            participantIndex++;
        }
        
        groups.push({
            name: `Groupe ${String.fromCharCode(65 + g)}`,
            participants: groupParticipants
        });
    }
    
    return groups;
}

/**
 * Valide si le nombre de joueurs est valide pour un arbre
 * @param {number} numberOfPlayers
 * @returns {boolean}
 */
export function isValidForTree(numberOfPlayers) {
    return numberOfPlayers >= 2;
}

/**
 * Valide si le nombre de joueurs est valide pour une ligue
 * @param {number} numberOfPlayers
 * @param {number} numberOfGroups
 * @returns {boolean}
 */
export function isValidForLeague(numberOfPlayers, numberOfGroups) {
    return numberOfPlayers >= numberOfGroups && numberOfGroups >= 1;
}

/**
 * Calcule le nombre minimum de rounds dans un arbre
 * @param {number} numberOfPlayers
 * @returns {number}
 */
export function calculateRounds(numberOfPlayers) {
    return Math.ceil(Math.log2(numberOfPlayers));
}
