const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Inicializa o app Express
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../client/build')));

// Rota para verificar status da API
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online', 
    version: '1.0.0', 
    timestamp: new Date(),
    message: 'FluxControl API está funcionando corretamente!'
  });
});

// Rota para login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Credenciais padrão para demonstração
  if (email === 'admin@fluxcontrol.com' && password === 'admin123') {
    res.json({
      success: true,
      token: 'demo-token-12345',
      user: {
        id: 1,
        name: 'Administrador',
        email: 'admin@fluxcontrol.com',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciais inválidas'
    });
  }
});

// Rota para obter dados de contagem
app.get('/api/counters/current', (req, res) => {
  // Dados simulados para demonstração
  const data = {
    entries: Math.floor(Math.random() * 100),
    exits: Math.floor(Math.random() * 80),
    present: Math.floor(Math.random() * 50) + 20,
    timestamp: new Date()
  };
  
  res.json(data);
});

// Rota para obter eventos
app.get('/api/events', (req, res) => {
  // Dados simulados para demonstração
  const events = [
    {
      id: 1,
      name: 'Feira de Tecnologia',
      date: '2025-05-15',
      location: 'Centro de Convenções',
      expectedAttendees: 500,
      currentAttendees: 320
    },
    {
      id: 2,
      name: 'Exposição de Arte',
      date: '2025-06-10',
      location: 'Galeria Municipal',
      expectedAttendees: 200,
      currentAttendees: 85
    },
    {
      id: 3,
      name: 'Congresso de Segurança',
      date: '2025-07-22',
      location: 'Hotel Central',
      expectedAttendees: 350,
      currentAttendees: 0
    }
  ];
  
  res.json(events);
});

// Rota para todas as outras requisições - serve o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro ao processar sua solicitação'
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Servidor FluxControl rodando em http://${HOST}:${PORT}`);
});

module.exports = app;
