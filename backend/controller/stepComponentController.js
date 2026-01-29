import { createBRRepository, deleteBRRepository, getAllBRByStepIdRepository, updateBRRepository } from "../repositories/stepComponentRepository.js";
import { getStepByIdRepository } from "../repositories/stepRepository.js";

process.loadEnvFile("./.env");

// BR

const createBR = async (req, res, next) => {
  try {
    let {
      player_id,
      step_id,
      value,
    } = req.body

    const user = req.user;

    if (!player_id) {
      return res.status(400).json({ message: "player_id must exist"});
    }
    if (!step_id) {
      return res.status(400).json({ message: "br_id must exist"});
    }
    if (!value) {
      value = 0;
    }

    if (!getStepByIdRepository(step_id, user.id)){
      return res.status(400).json({ message: "Step doesn't exist for user with step_id : " + step_id});
    }

    //tdo : add verification player isn't already in the step.

    const br = await createBRRepository(
      player_id,
      step_id,
      value,
      user.id
    )
    
    return res.status(201).json({
      message: "BR - player relation created successfuly",
      br: { ...br }
    });
  } catch (e) {
    console.error("Error during BR - player relation creation:", e);
    return res.status(500).json({ message: "Erreur lors de la création de la relation BR - player", error: e.message });
  }
}

const getAllBRByStepId = async (req, res, next) => {
  try {
    const step_id = req.params.id;

    const user = req.user;

    const BRs = await getAllBRByStepIdRepository(step_id, user.id);

    return res.status(201).json({
      message: "BR - player relation retrieved successfuly",
      BRs : BRs
    });
  } catch (e) {
    console.error("Error during BR - player relation retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des BR - player relation", error: e.message });
  }
}

const deleteBR = async (req, res, next) => {
  try {
    const br_id = req.params.id;

    const user = req.user;

    const BRs = await deleteBRRepository(br_id, user.id);

    return res.status(201).json({
      message: "BR - player relation deleted successfully",
    });
  } catch (e) {
    console.error("Error during BR - player relation deleted :", e);
    return res.status(500).json({ message: "Erreur lors de la suppréssion de la relation BR - player", error: e.message });
  }
}

const modifyBR = async (req, res, next) => {
  try {
    let br_id = req.params.id;
    let data = req.body;
    
    if (!data) {
      return res.status(400).json({ message: "Body cannot be empty" });
    }

    const user = req.user;

    const BR = await updateBRRepository(br_id, data, user.id);

    return res.status(201).json({
      message: "BR - player relation modified successfully",
      BR : BR
    });
  } catch (e) {
    console.error("Error during BR - player relation modification:", e);
    return res.status(500).json({ message: "Erreur lors de la modification de la relation BR - player", error: e.message });
  }
}

export default {
  createBR,
  getAllBRByStepId,
  deleteBR,
  modifyBR,
}