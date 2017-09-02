const pool = require('../pg.js');

const user = {};

user.getUserByEmail = (req, res, next) => {
  try {
    const data = await pool.query(`select * from users where email like $/email/`, req.body);
    console.log('try');
  } catch (e) {
    console.error('getUserByEmail, users.js', e);
  } finally {
    console.log('finally');
    res.data = data.rows;
    next();
  };
};

module.exports = user;
