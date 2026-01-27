import pgPromise from 'pg-promise';
process.loadEnvFile("./.env");

const db_port = process.env.DB_HOSTPORT;
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD || "";

const pgp = pgPromise({
  /* Initialization Options */
  error(error, e) {
    if (e.cn) {
        // A connection-related error;
        //
        // Connections are reported back with the password hashed,
        // for safe errors logging, without exposing passwords.
        console.log('CN:', e.cn);
        console.log('EVENT:', error.message || error);
    }
  }
});

const db = pgp(`postgres://${db_user}:${db_password}@${db_port}/${db_name}`)


db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;
        console.log(serverVersion);
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

export default db;