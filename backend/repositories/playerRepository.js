import db from '../db/db.js';

export async function createPlayerRepository(      
  data,
  user_id
) {
  console.log(data)
  return db.one(
    `
    INSERT INTO players (name, nationality, team, description, created_by) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING id, name, nationality, team, description`,
    [
      data.name, 
      data.nationality, 
      data.team, 
      data.description, 
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

export async function updatePlayerRepository(      
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
    UPDATE players 
    SET ${set}
    WHERE id = $1
    AND created_by = $2
    RETURNING id, name, nationality, team, description`;

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

export async function getAllPlayersRepository(user_id, step_id = null) {

  let query = `SELECT id, name, nationality, team, description
    FROM players
    WHERE created_by = $1`;

  let parameters = [user_id];

  // tdo : implment search for players in a step
  // if (tournament_id) {
  //   query += `
  //   AND tournament_id = $2`
  //   parameters.push(tournament_id);
  // }

  return db.manyOrNone(
    query,
    parameters
    )
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error("Error during player retrieval : ", error)
      throw new Error(error); 
    });
};
