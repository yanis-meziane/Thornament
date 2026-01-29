import {
  createTournamentRepository,
  createFirstPhaseRepository,
  getAllTournamentsRepository,
  getTournamentByIdRepository,
  deleteTournamentRepository
} from '../repositories/tournamentRepository.js';

process.loadEnvFile("./.env");

const createTournament = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // Récupéré du JWT par authMiddleware

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: "Le nom du tournoi est requis" });
    }

    // Créer le tournoi
    const tournament = await createTournamentRepository(name, userId);

    // const firstPhase = await createFirstPhaseRepository(tournament.id, userId);

    return res.status(201).json({
      message: "Tournoi créé avec succès",
      tournament: {
        id: tournament.id,
        name: tournament.name,
        created_at: tournament.created_at,
      }
    });
  } catch (e) {
    console.error("Error creating tournament:", e);
    return res.status(500).json({ message: "Erreur lors de la création du tournoi", error: e.message });
  }
}

const getAllTournaments = async (req, res, next) => {
  try {
    const userId = req.user.id; // Récupéré du JWT par authMiddleware

    const tournaments = await getAllTournamentsRepository(userId);

    return res.status(200).json({
      message: "Tournois récupérés avec succès",
      tournois: tournaments
    });
  } catch (e) {
    console.error("Error fetching tournaments:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des tournois", error: e.message });
  }
}

const getTournamentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Récupéré du JWT par authMiddleware

    const tournament = await getTournamentByIdRepository(id, userId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi non trouvé" });
    }

    return res.status(200).json({
      message: "Tournoi récupéré avec succès",
      tournament
    });
  } catch (e) {
    console.error("Error fetching tournament:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération du tournoi", error: e.message });
  }
}

const deleteTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Récupéré du JWT par authMiddleware

    const rowCount = await deleteTournamentRepository(id, userId);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Tournoi non trouvé ou accès non autorisé" });
    }

    return res.status(200).json({ message: "Tournoi supprimé avec succès" });
  } catch (e) {
    console.error("Error deleting tournament:", e);
    return res.status(500).json({ message: "Erreur lors de la suppression du tournoi", error: e.message });
  }
}

export default {
  getAllTournaments,
  createTournament,
  getTournamentById,
  deleteTournament,
}
