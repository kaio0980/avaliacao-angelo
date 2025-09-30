-- Usuários
INSERT INTO User (username, password, isAdmin) VALUES 
('admin', '1234', 1),
('user', '1234', 0);

-- Livros
INSERT INTO Book (title, author, available) VALUES 
('1984', 'George Orwell', 1),
('Dom Casmurro', 'Machado de Assis', 1),
('Harry Potter', 'J.K. Rowling', 0),
('Clean Code', 'Robert Martin', 1);
