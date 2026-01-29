import db from '../db/db.js';

export async function createStepRepository(      
  name, 
  description, 
  tournament_id, 
  step_position, 
  step_component_type, 
  settings_id, 
  user_id
) {
  return db.one(
    // WITH inserted AS : allows insertion and then to inner join in a select
    `
    WITH inserted AS (
      INSERT INTO step (name, description, tournament_id, step_position, step_component_type, step_setting_id, created_by) 
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, description, tournament_id, step_position, step_component_type, step_setting_id
    )
    SELECT step.*, settings.victory_condition, settings.number_players, settings.number_winners
    FROM inserted step
    LEFT JOIN step_settings settings ON settings.id = step.step_setting_id;`,
    [  
      name, 
      description, 
      tournament_id, 
      step_position, 
      step_component_type, 
      settings_id, 
      user_id
    ])
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during step creation : ", error)
        throw new Error(error);
    });
};

export async function getAllStepsRepository(user_id, tournament_id = null) {

  let query = `SELECT s.id, s.name, s.description, s.tournament_id, s.step_position, s.step_component_type, s.step_setting_id, settings.victory_condition, settings.number_players, settings.number_winners
    FROM step s
    LEFT JOIN step_settings settings ON settings.id = s.step_setting_id
    WHERE s.created_by = $1`;

  let parameters = [user_id];

  if (tournament_id) {
    query += `
    AND tournament_id = $2`
    parameters.push(tournament_id);
  }

  return db.manyOrNone(
    query,
    parameters
    )
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error during steps retrieval : ", error)
      throw new Error(error); 
    });
};

export async function getStepByIdRepository(
  step_id,
  user_id
) {
  return db.one(
    `SELECT s.id, s.name, s.description, s.tournament_id, s.step_position, s.step_component_type, s.step_setting_id, settings.victory_condition, settings.number_players, settings.number_winners
    FROM step s
    LEFT JOIN step_settings settings ON settings.id = s.step_setting_id
    WHERE s.created_by = $1
    AND s.id = $2`,
    [
      user_id,
      step_id
    ])
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during step retrieval : ", error)
        throw new Error(error); 
    });
};

export async function createStepSettingsRepository(
  settings_victory_condition,
  settings_number_players,
  settings_number_winners,
  user_id
) {
  return db.one(
    `INSERT INTO step_settings (victory_condition, number_players, number_winners, created_by) 
      VALUES($1, $2, $3, $4) 
      RETURNING id, victory_condition, number_players, number_winners`,
    [
      settings_victory_condition,
      settings_number_players,
      settings_number_winners,
      user_id
    ])
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during step_settings creation : ", error)
        throw new Error(error); 
    });
};

export async function updateSettingsRepository(
  settings_id,
  data,
  user_id
) {  
  let query = ``;
  let set = ``;
  let params = [settings_id, user_id];

  for (const [i, [key, value]] of Object.entries(data).entries()) {
    set += `
      ${key} = $${i+3}
      `
    if (i+1 < Object.keys(data).length) {
      set += ","
    }
    params.push(value);
  }

  query = `
    UPDATE step_settings 
    SET ${set}
    WHERE id = $1
    AND created_by = $2
    RETURNING id, victory_condition, number_players, number_winners`;

  return db.one(
    query,
    params
  )
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during step_settings creation : ", error)
        throw new Error(error); 
    });
};