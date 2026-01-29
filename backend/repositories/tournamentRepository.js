import db from '../db/db.js';

// Créer un nouveau tournoi
export async function createTournamentRepository(name, userId) {
  try {
    const tournament = await db.one(
      `INSERT INTO tournament (name, created_by)
       VALUES ($1, $2)
       RETURNING id, name, created_at, created_by`,
      [name, userId]
    );
    return tournament;
  } catch (error) {
    console.error("Error creating tournament:", error);
    throw new Error(error);
  }
}

// Créer une première phase pour le tournoi
export async function createFirstPhaseRepository(tournamentId, userId) {
  try {
    const phase = await db.one(
      `INSERT INTO step (name, tournament_id, step_position, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, tournament_id, step_position, created_by, created_at`,
      ['Phase 1', tournamentId, 1, userId]
    );
    return phase;
  } catch (error) {
    console.error("Error creating first phase:", error);
    throw new Error(error);
  }
}

// Récupérer tous les tournois d'un utilisateur
export async function getAllTournamentsRepository(userId) {
  try {
    const tournaments = await db.any(
      `SELECT id, name, created_at, created_by 
       FROM tournament 
       WHERE created_by = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    return tournaments;
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    throw new Error(error);
  }
}

// Récupérer un tournoi par ID
export async function getTournamentByIdRepository(tournamentId, userId) {
  try {
    const tournament = await db.oneOrNone(
      `SELECT id, name, created_at, created_by 
       FROM tournament 
       WHERE id = $1 AND created_by = $2`,
      [tournamentId, userId]
    );
    return tournament;
  } catch (error) {
    console.error("Error fetching tournament:", error);
    throw new Error(error);
  }
}

// Supprimer un tournoi (et ses phases en cascade)
export async function deleteTournamentRepository(tournamentId, userId) {
  try {
    const result = await db.result(
      `DELETE FROM tournament 
       WHERE id = $1 AND created_by = $2`,
      [tournamentId, userId]
    );
    return result.rowCount;
  } catch (error) {
    console.error("Error deleting tournament:", error);
    throw new Error(error);
  }
}
