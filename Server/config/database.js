const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tiktak123',
  database: 'library'
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
    connection.release();
  }
});

// export the pool for reuse
module.exports = pool;
