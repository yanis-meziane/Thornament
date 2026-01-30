import { createBRRepository, createVersusRepository, createVersusTreeRepository, deleteBRRepository, deleteVersusRepository, getAllBRByStepIdRepository, getAllVersusByStepIdRepository, getAllVersusTreeByStepIdRepository, updateBRRepository, updateVersusRepository, updateVersusTreeRepository } from "../repositories/stepComponentRepository.js";
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

    // if (!player_id) {
    //   return res.status(400).json({ message: "player_id must exist"});
    // }
    if (!step_id) {
      return res.status(400).json({ message: "step_id must exist"});
    }
    if (!value) {
      value = 0;
    }

    if (!getStepByIdRepository(step_id, user.id)){
      return res.status(400).json({ message: "Step doesn't exist for user with step_id : " + step_id});
    }

    //tdo : add verification player isn't already in the step.
    //tdo : add verification step isn't full already.
    let data = {
      player_id,
      step_id,
      value,
    }
    const br = await createBRRepository(
      data,
      user.id
    )
    
    return res.status(201).json({
      message: "BR - player relation created successfuly",
      step_component: { ...br }
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
      step_component : BRs
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
      step_component : BR
    });
  } catch (e) {
    console.error("Error during BR - player relation modification:", e);
    return res.status(500).json({ message: "Erreur lors de la modification de la relation BR - player", error: e.message });
  }
}

// Versus

const createVersus = async (req, res, next) => {
  try {
    const data = {
      player1_id : req.body.player1_id ?? null,
      player2_id : req.body.player2_id ?? null,
      player1_value : req.body.player1_value ?? 0,
      player2_value : req.body.player2_value ?? 0,
      step_id : req.body.step_id ?? null
    }

    const user = req.user;

    // if (!data.player1_id || !data.player2_id) {
    //   return res.status(400).json({ message: "player1_id and player1_id must exist"});
    // }
    if (!data.step_id) {
      return res.status(400).json({ message: "step_id must exist"});
    }

    const step = await getStepByIdRepository(data.step_id, user.id);

    if (!step){
      return res.status(400).json({ message: "Step doesn't exist for user with step_id : " + step_id});
    }
    if (step.step_component_type != 'league'){
      return res.status(400).json({ message: "Wrong type 'versus' for corresponding step with type : " + step.step_component_type});
    }

    //tdo : add verification player isn't already in the step.
    //tdo : add verification step isn't full already.

    const versus = await createVersusRepository(
      data,
      user.id
    )
    
    return res.status(201).json({
      message: "Versus relation created successfuly",
      step_component : { ...versus }
    });
  } catch (e) {
    console.error("Error during versus relation creation:", e);
    return res.status(500).json({ message: "Erreur lors de la création de la relation versus", error: e.message });
  }
}

const getAllVersusByStepId = async (req, res, next) => {
  try {
    const step_id = req.params.id;

    const user = req.user;

    const versus = await getAllVersusByStepIdRepository(step_id, user.id);

    return res.status(201).json({
      message: "Versus relation retrieved successfuly",
      step_component : versus
    });
  } catch (e) {
    console.error("Error during versus relation retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des versus relation", error: e.message });
  }
}

const deleteVersus = async (req, res, next) => {
  try {
    const versus_id = req.params.id;

    const user = req.user;

    const versus = await deleteVersusRepository(versus_id, user.id);

    return res.status(201).json({
      message: "Versus relation deleted successfully",
    });
  } catch (e) {
    console.error("Error during versus relation deleted :", e);
    return res.status(500).json({ message: "Erreur lors de la suppréssion de la relation versus", error: e.message });
  }
}

const modifyVersus = async (req, res, next) => {
  try {
    let versus_id = req.params.id;
    let data = req.body;
    
    if (!data) {
      return res.status(400).json({ message: "Body cannot be empty" });
    }

    const user = req.user;

    const BR = await updateVersusRepository(versus_id, data, user.id);

    return res.status(201).json({
      message: "Versus relation modified successfully",
      step_component : BR
    });
  } catch (e) {
    console.error("Error during versus relation modification:", e);
    return res.status(500).json({ message: "Erreur lors de la modification de la relation versus", error: e.message });
  }
}

// Versus tree

const createVersusTree = async (req, res, next) => {
  try {
    const data = {
      player1_id : req.body.player1_id ?? null,
      player2_id : req.body.player2_id ?? null,
      player1_value : req.body.player1_value ?? 0,
      player2_value : req.body.player2_value ?? 0,
      tree_position : req.body.tree_position ?? null,
      step_id : req.body.step_id ?? null
    }

    const user = req.user;

    // if (!data.player1_id || !data.player2_id) {
    //   return res.status(400).json({ message: "player1_id and player1_id must exist"});
    // }
    if (!data.tree_position) {
      return res.status(400).json({ message: "tree_position must exist"});
    }
    if (!data.step_id) {
      return res.status(400).json({ message: "step_id must exist"});
    }

    const step = await getStepByIdRepository(data.step_id, user.id);

    if (!step){
      return res.status(400).json({ message: "Step doesn't exist for user with step_id : " + step_id});
    }
    if (step.step_component_type != 'tree'){
      return res.status(400).json({ message: "Wrong type 'tree' for corresponding step with type : " + step.step_component_type});
    }

    //tdo : add verification player isn't already in the step.
    //tdo : add verification tree_position works in the step boundaries (step with size 4 has 2 tree_position).
    //tdo : add verification step isn't full already.

    const versusTree = await createVersusTreeRepository(
      data,
      user.id
    )
    
    return res.status(201).json({
      message: "Versus-tree relation created successfuly",
      step_component : { ...versusTree }
    });
  } catch (e) {
    console.error("Error during versus-tree relation creation:", e);
    return res.status(500).json({ message: "Erreur lors de la création de la relation versus-tree", error: e.message });
  }
}

const getAllVersusTreeByStepId = async (req, res, next) => { 
  try {
    const step_id = req.params.id;

    const user = req.user;

    const versusTree = await getAllVersusTreeByStepIdRepository(step_id, user.id);

    return res.status(200).json({
      message: "Versus-tree relation retrieved successfuly",
      step_component : versusTree
    });
  } catch (e) {
    console.error("Error during versus-tree relation retrieval:", e);
    return res.status(500).json({ message: "Erreur lors de la récupération des versus-tree relation", error: e.message });
  }
}

const deleteVersusTree = async (req, res, next) => {
  try {
    const versus_tree_id = req.params.id;

    const user = req.user;

    const versus_tree = await deleteVersusRepository(versus_tree_id, user.id);

    return res.status(201).json({
      message: "Versus-tree relation deleted successfully",
    });
  } catch (e) {
    console.error("Error during versus-tree relation deleted :", e);
    return res.status(500).json({ message: "Erreur lors de la suppréssion de la relation versus-tree", error: e.message });
  }
}

const modifyVersusTree = async (req, res, next) => {
  try {
    let versus_tree_id = req.params.id;
    let data = req.body;
    
    if (!data) {
      return res.status(400).json({ message: "Body cannot be empty" });
    }

    const user = req.user;

    const BR = await updateVersusTreeRepository(versus_tree_id, data, user.id);

    return res.status(201).json({
      message: "Versus-tree relation modified successfully",
      step_component : BR
    });
  } catch (e) {
    console.error("Error during versus-tree relation modification:", e);
    return res.status(500).json({ message: "Erreur lors de la modification de la relation versus-tree", error: e.message });
  }
}

export default {
  createBR,
  getAllBRByStepId,
  deleteBR,
  modifyBR,
  createVersus,
  getAllVersusByStepId,
  deleteVersus,
  modifyVersus,
  createVersusTree,
  getAllVersusTreeByStepId,
  deleteVersusTree,
  modifyVersusTree
}