const connection = require('./dbconexao');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const multer  = require('multer')
const upload = multer();


const port = 3002;

app.use(express.json());
app.use(cors());



 // Criando a rota para inserir dados no banco de dados
app.post('/cliente/gravar', upload.any(), (req, res) => {
  const { nome, telefone, email, cep, logradouro, bairro, cidade, uf, numero, complemento, tipos } = req.body;

  const sql = 'INSERT INTO clientes (nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nome, telefone, email, cep, logradouro, bairro, cidade, uf, numero, complemento, tipos], (err, result) => {
    // tratamento de erros
    if (err) {
      console.log(`Erro ao inserir dados no banco de dados: ${err.message}`);
      res.status(500).send('Erro interno do servidor');
    } else {
      //sucesso na inserção de dados
      if (result.affectedRows > 0) {
        console.log(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
      } else {
        // erro na inserção de dados
        console.log(`Erro ao inserir dados no banco de dados. Nenhum registro foi afetado.`);
        console.log(`Campo que causou o erro: ${err.sqlMessage}`);
      }
      res.status(200).send(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
    }
  });
});
    

app.listen(port);
console.log('API funcionando!');


function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'mysqlnx',
    port     : 3306,
    user     : 'claudia',
    password : 'clau123',
    database : 'bd'
    });
   
    connection.query(sqlQry, (error, results, fields) => {
        if(error)
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou aleluiaaa!');
    });
  } 