import { createPlayerRepository, getAllPlayersRepository, updatePlayerRepository } from '../repositories/playerRepository.js';

process.loadEnvFile("./.env");

const createPlayer = async (req, res, next) => {
  try {
    const data = {
      name : req.body.name ?? null, 
      nationality : req.body.nationality ?? null, 
      team: req.body.team ?? null, 
      description: req.body.description ?? null, 
    }

    if (!data.name) {
      throw new Error("Name cannot be null");
    }

    const user = req.user;
    
    const player = await createPlayerRepository(data, user.id);

    return res.status(201).json({
      message: "Player created successfuly",
      player: player
    });
  } catch (e) {
    console.error("Error during player creation:", e);
    return res.status(500).json({ message: "Erreur lors de la création du joueur", error: e.message });
  }
}

const modifyPlayer = async (req, res, next) => {
  try {
    const data = {
      name : req.body.name ?? null, 
      nationality : req.body.nationality ?? null, 
      team: req.body.team ?? null, 
      description: req.body.description ?? null, 
    }

    if (!data.name) {
      throw new Error("Name cannot be null");
    }

    const player_id = req.params.id;
    const user = req.user;

    const player = await updatePlayerRepository(player_id, data, user.id);

    return res.status(201).json({
      message: "Player modify successfuly",
      player: player
    });
  } catch (e) {
    console.error("Error during player modification:", e);
    return res.status(500).json({ message: "Erreur lors de la modification du joueur", error: e.message });
  }
}

const getAllPlayers = async (req, res, next) => {
  try {
    const user = req.user;
    
    const player = await getAllPlayersRepository(user.id);

    return res.status(201).json({
      message: "Players retrieved successfuly",
      player: player
    });
  } catch (e) {
    console.error("Error during player retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération du joueur", error: e.message });
  }
}

export default {
  createPlayer,
  modifyPlayer,
  getAllPlayers,
}