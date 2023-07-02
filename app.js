const express = require('express');
const app = express();
const Usuario = require('./model/Usuario');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const _ = require('lodash');

app.set('views', path.join('views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

// Rota para exibir a página de login
app.get('/sorteio', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Rota para processar o formulário de login
app.post('/sorteio', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Verificar as credenciais do usuário
  if (email === 'juliocesar@gmail.com' && password === '@julio2023') {
    // Credenciais válidas, redirecionar para a página do sorteio
    Usuario.findAll().then((dados) => {
      const turmas = _.uniq(dados.map((usuario) => usuario.turma));
      const turmasEmbaralhadas = _.shuffle(turmas);
      const tabela = [];
      for (let i = 0; i < turmasEmbaralhadas.length; i += 2) {
        const turma1 = turmasEmbaralhadas[i];
        const turma2 = turmasEmbaralhadas[i + 1] || '';
        tabela.push({ turma1, turma2 });
      }
      res.render('sorteio', { tabela, title: 'Sorteio' });
    });
  } else {
    // Credenciais inválidas, exibir mensagem de erro
    res.send('Credenciais inválidas. Tente novamente.');
  }
});

// Rota para exibir a tabela de turmas cadastradas (requer autenticação)
app.get('/sorteio', (req, res) => {
  Usuario.findAll().then((dados) => {
    const turmas = _.uniq(dados.map((usuario) => usuario.turma));
    const turmasEmbaralhadas = _.shuffle(turmas);
    const tabela = [];
    for (let i = 0; i < turmasEmbaralhadas.length; i += 2) {
      const turma1 = turmasEmbaralhadas[i];
      const turma2 = turmasEmbaralhadas[i + 1] || '';
      tabela.push({ turma1, turma2 });
    }
    res.render('sorteio', { tabela, title: 'Sorteio' });
  });
});



app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/views/cadastro.html');
});

app.post('/cadastro/usuario', (req, res) => {
  Usuario.create({
    nome: req.body.nome,
    matricula: req.body.matricula,
    turma: req.body.turma,
  }).then(() => {
    res.redirect('/pesquisar/' + req.body.turma);  
  });
});

app.get('/pesquisar/:turma', (req, res) => {
  const turma = req.params.turma;
  const turmaDoUsuario = req.query.turma; // Obtém a turma do usuário a partir dos parâmetros de consulta

  Usuario.findAll({ where: { turma: turma } }).then((dados) => {
    res.render('usuarios', { usuarios: dados, title: 'Usuários', turmaDoUsuario: turmaDoUsuario });
  });
});


app.get('/pesquisar', (req, res) =>{
  Usuario.findAll().then((dados) =>{
    res.render('usuarios', {usuarios:dados, title: 'Usuários'})
  })
});

// Rota para processar o sorteio
app.get('/sorteio/sortear', (req, res) => {
  Usuario.findAll().then((dados) => {
    const turmas = _.uniq(dados.map((usuario) => usuario.turma));
    const turmasEmbaralhadas = _.shuffle(turmas);
    const tabela = [];
    for (let i = 0; i < turmasEmbaralhadas.length; i += 2) {
      const turma1 = turmasEmbaralhadas[i];
      const turma2 = turmasEmbaralhadas[i + 1] || '';
      tabela.push({ turma1, turma2 });
    }
    res.render('sorteio', { tabela, title: 'Sorteio' });
  });
});


app.listen(3000, () => {
  console.log("Server run");
});