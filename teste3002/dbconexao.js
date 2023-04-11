const mysql      = require('mysql2');
const connection = mysql.createConnection({
    host     : '192.168.2.7',
    port     : 3306,
    user     : 'claudia',
    password : 'clau123',
    database : 'bd'
});






connection.connect((err) => {
  if(err) return console.log('Erro ao tentar se conectar com o banco de dados');
  console.log('conectado ao banco de dados!');
});




module.exports = connection; 