CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(100) NOT NULL,
  expected_attendees INTEGER DEFAULT 0,
  current_attendees INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE counters (
  id SERIAL PRIMARY KEY,
  entries INTEGER DEFAULT 0,
  exits INTEGER DEFAULT 0,
  present INTEGER DEFAULT 0,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário administrador padrão
INSERT INTO users (name, email, password, role) 
VALUES ('Administrador', 'admin@fluxcontrol.com', 'admin123', 'admin');

-- Inserir alguns eventos de exemplo
INSERT INTO events (name, date, location, expected_attendees, current_attendees)
VALUES 
  ('Feira de Tecnologia', '2025-05-15', 'Centro de Convenções', 500, 320),
  ('Exposição de Arte', '2025-06-10', 'Galeria Municipal', 200, 85),
  ('Congresso de Segurança', '2025-07-22', 'Hotel Central', 350, 0);
