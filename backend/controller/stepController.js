import jwt from "jsonwebtoken"
import {
  createStepRepository,
  createStepSettingsRepository,
  getAllStepsRepository,
  getStepByIdRepository,
  updateSettingsRepository
} from '../repositories/stepRepository.js';
import { getTournamentByIdRepository } from "../repositories/tournamentRepository.js";


process.loadEnvFile("./.env");

const createStep = async (req, res, next) => {
  try {
    let {
      name, 
      description, 
      tournament_id, 
      step_position, 
      step_component_type, 
      settings_victory_condition,
      settings_number_players,
      settings_number_winners
    } = req.body

    const user = req.user;

    if (settings_victory_condition != "min" && settings_victory_condition != "max") {
      return res.status(400).json({ message: "settings_victory_condition must be 'min' or 'max'"});
    }
    if (settings_number_players < 2) {
      return res.status(400).json({ message: "settings_number_players must be more than 1"});
    }
    if (settings_number_winners < 1) {
      return res.status(400).json({ message: "settings_number_winners must be more than 0"});
    }
    if (step_component_type != "tree" && step_component_type != "league" && step_component_type != "br") {
      return res.status(400).json({ message: "settings_victory_condition must be 'tree', 'league', 'br'"});
    }
    if (step_position < 1) {
      return res.status(400).json({ message: "step_position must be more than 0"});
    }
    
    if (!getTournamentByIdRepository(tournament_id, user.id)){
      return res.status(400).json({ message: "tournament doesn't exist for user with tournament_id : " + tournament_id});
    }
    // tdo : faire une fonction pour empecher step_position = n+1 si step_position = n n'existe pas 

    const settings = await createStepSettingsRepository(
      settings_victory_condition,
      settings_number_players,
      settings_number_winners,
      user.id
    )
    
    const step = await createStepRepository(
      name, 
      description, 
      tournament_id, 
      step_position, 
      step_component_type, 
      settings.id, 
      user.id
    );

    return res.status(201).json({
      message: "Step created successfuly",
      step: { ...step }
    });
  } catch (e) {
    console.error("Error during steps creation:", e);
    return res.status(500).json({ message: "Erreur lors de la création du l'etape", error: e.message });
  }
}

const getAllSteps = async (req, res, next) => {
  try {
    const user = req.user;

    const steps = await getAllStepsRepository(user.id)

    return res.status(201).json({
      message: "Steps retrieved successfuly",
      steps : steps
    });
  } catch (e) {
    console.error("Error during steps retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des l'etapes", error: e.message });
  }
}

const getAllStepsByTournamentId = async (req, res, next) => {
  try {
    const tournament_id = req.params.id;

    const user = req.user;

    const settings = await getAllStepsRepository(user.id, tournament_id);

    return res.status(201).json({
      message: "Steps retrieved successfuly",
      steps : steps
    });
  } catch (e) {
    console.error("Error during steps retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des l'etapes", error: e.message });
  }
}

const getStepById = async (req, res, next) => {
  try {
    let step_id = req.params.id;

    const user = req.user;

    const step = await getStepByIdRepository(step_id, user.id);

    //tdo : retrieve les steps component correspondant au à la step id avec le bon type si déjà existant

    return res.status(201).json({
      message: "Steps retrieved successfuly",
      steps : step
    });
  } catch (e) {
    console.error("Error during steps retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des l'etapes", error: e.message });
  }
}

const modifySettings = async (req, res, next) => {
  try {
    let settings_id = req.params.id;
    let data = req.body;
    
    if (!data) {
      return res.status(400).json({ message: "Body cannot be empty" });
    }

    const user = req.user;

    const settings = await updateSettingsRepository(settings_id, data, user.id);

    return res.status(201).json({
      message: "Steps retrieved successfuly",
      settings : settings
    });
  } catch (e) {
    console.error("Error during steps retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des l'etapes", error: e.message });
  }
}

export default {
  createStep,
  getAllSteps,
  getStepById,
  getAllStepsByTournamentId,
  modifySettings,
}