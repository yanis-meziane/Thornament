import db from '../db/db.js';

// br
export async function createBRRepository(      
  player_id,
  br_id,
  value,
  user_id
) {
  return db.one(
    `
    INSERT INTO takes_place_in_br (player_id, br_id, value, created_by) 
    VALUES($1, $2, $3, $4)
    RETURNING id, player_id, br_id, value, created_by`,
    [
      player_id,
      br_id,
      value,
      user_id
    ])
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during BR creation : ", error)
        throw new Error(error);
    });
};

// - getAllBRByStepId
export async function getAllBRByStepIdRepository(step_id, user_id) {

  let query = `SELECT id, player_id, br_id, value, created_by
    FROM takes_place_in_br
    WHERE created_by = $1
    AND br_id = $2`;

  let parameters = [user_id, step_id];

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

export async function deleteBRRepository(BR_id, user_id) {
  let query = `DELETE FROM takes_place_in_br 
    WHERE created_by = $2 AND id = $1`;

  let parameters = [user_id, BR_id];

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

export async function updateBRRepository(
  br_id,
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
    UPDATE takes_place_in_br 
    SET ${set}
    WHERE id = $1
    AND created_by = $2
    RETURNING id, player_id, br_id, value, created_by`;

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


// versus
// - create
// - getByStepId
// - delete
// - modify
// versus tree
// - create
// - getByStepId
// - delete
// - modify