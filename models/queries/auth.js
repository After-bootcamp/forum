const pool = require('../pg.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const auth = {};

(async () => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { rows } = await client.query('SELECT NOW()')
    await client.query('COMMIT')
    console.log('===================================');
    console.log(rows);
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
})catch(e => console.error(e.stack))


auth.createSecure = (email, password, callback) => {
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash){
      callback(email, hash);
    });
  });
};


auth.createUser = (req, res, next) => {
  auth.createSecure(req.body.email, req.body.password, (email, hash) => {
    (async () => {
      const client = await pool.connect()
      try {
        const data = await client.query(`INSERT INTO users (email, password_hash)
            VALUES ($1, $2)`, [email, hash])
      } catch (e) {
        throw e;
      } finally {
        client.release();
        next();
      };
    })().catch((e) => {
      console.log(e.stack);
      next();
    });
  });
};

auth.login = (req, res, next) => {
  var email = req.body.email
  var password = req.body.password
  (async () => {
    const client = await pool.connect()
    try {
      const data = await client.query(`SELECT * FROM users WHERE email LIKE $/email/`, req.body)
    } catch (e) {
      throw e;
    } finally {
      if (bcrypt.compareSync(password, data.password_hash)) {
        res.data = data.rows;
        next();
      } else {
        res.send('password and email do not match');
      };
    };
  })().catch((e) => {
    console.log(e.stack);
    next();
  });
};

module.exports = auth;
