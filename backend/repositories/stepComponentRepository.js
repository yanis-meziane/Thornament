import db from '../db/db.js';

// br
export async function createBRRepository(      
  data,
  user_id
) {
  return db.one(
    `
    INSERT INTO takes_place_in_br (player_id, br_id, value, created_by) 
    VALUES($1, $2, $3, $4)
    RETURNING id, player_id, br_id, value`,
    [
      data.player_id,
      data.step_id,
      data.value,
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
      console.error("Error during brs retrieval : ", error)
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
      console.error("Error during br deletion : ", error)
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
  let params = [br_id, user_id];

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
    RETURNING id, player_id, br_id, value`;

  return db.one(
    query,
    params
  )
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during br update : ", error)
        throw new Error(error); 
    });
};


// versus
export async function createVersusRepository(      
  data,
  user_id
) {
  return db.one(
    `
    INSERT INTO versus (player1_id, player2_id, player1_value, player2_value, step_id, created_by) 
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING id, player1_id, player2_id, player1_value, player2_value, step_id`,
    [
      data.player1_id,
      data.player2_id,
      data.player1_value,
      data.player2_value,
      data.step_id,
      user_id
    ])
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during Versus creation : ", error)
        throw new Error(error);
    });
};

// - getAllBRByStepId
export async function getAllVersusByStepIdRepository(step_id, user_id) {

  let query = `SELECT id, player1_id, player2_id, player1_value, player2_value, step_id
    FROM versus
    WHERE created_by = $1
    AND step_id = $2`;

  let parameters = [user_id, step_id];

  return db.manyOrNone(
    query,
    parameters
    )
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error during versus retrieval : ", error)
      throw new Error(error); 
    });
};

export async function deleteVersusRepository(versus_id, user_id) {
  let query = `DELETE FROM versus 
    WHERE created_by = $2 AND id = $1`;

  let parameters = [user_id, versus_id];

  return db.manyOrNone(
    query,
    parameters
    )
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error during versus deletion : ", error)
      throw new Error(error); 
    });
};

export async function updateVersusRepository(
  versus_id,
  data,
  user_id
) {  
  let query = ``;
  let set = ``;
  let params = [versus_id, user_id];

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
    UPDATE versus 
    SET ${set}
    WHERE id = $1
    AND created_by = $2
    RETURNING id, player1_id, player2_id, player1_value, player2_value, step_id`;

  return db.one(
    query,
    params
  )
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during versus update : ", error)
        throw new Error(error); 
    });
};

// versus tree
export async function createVersusTreeRepository(      
  data,
  user_id
) {
  return db.one(
    `
    INSERT INTO versus_tree (player1_id, player2_id, player1_value, player2_value, tree_position, tree_id, created_by) 
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, player1_id, player2_id, player1_value, player2_value, tree_position, tree_id`,
    [
      data.player1_id,
      data.player2_id,
      data.player1_value,
      data.player2_value,
      data.tree_position,
      data.step_id,
      user_id
    ])
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during versus-tree creation : ", error)
        throw new Error(error);
    });
};

// - getAllBRByStepId
export async function getAllVersusTreeByStepIdRepository(step_id, user_id) {

  let query = `SELECT id, player1_id, player2_id, player1_value, player2_value, tree_position, tree_id
    FROM versus_tree
    WHERE created_by = $1
    AND tree_id = $2`;

  let parameters = [user_id, step_id];

  return db.manyOrNone(
    query,
    parameters
    )
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error during versus-tree retrieval : ", error)
      throw new Error(error); 
    });
};

export async function deleteVersusTreeRepository(versus_id, user_id) {
  let query = `DELETE FROM versus_tree
    WHERE created_by = $2 AND id = $1`;

  let parameters = [user_id, versus_id];

  return db.manyOrNone(
    query,
    parameters
    )
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error during versus-tree deletion : ", error)
      throw new Error(error); 
    });
};

export async function updateVersusTreeRepository(
  versus_tree_id,
  data,
  user_id
) {  
  let query = ``;
  let set = ``;
  let params = [versus_tree_id, user_id];

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
    UPDATE versus_tree
    SET ${set}
    WHERE id = $1
    AND created_by = $2
    RETURNING id, player1_id, player2_id, player1_value, player2_value, tree_position, tree_id`;

  return db.one(
    query,
    params
  )
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error during versus-tree update : ", error)
        throw new Error(error); 
    });
};