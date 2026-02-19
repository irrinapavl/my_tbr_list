CREATE DATABASE tbr;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  author VARCHAR(50) NOT NULL,
  cover VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished BOOLEAN DEFAULT FALSE,
  finished_at TIMESTAMP,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,      
  type VARCHAR(20) NOT NULL,         
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP
);

ALTER TABLE user_tokens ADD CONSTRAINT unique_user_token_type UNIQUE (user_id, type);

INSERT INTO books (name, author, cover, user_id) 
VALUES 
('Корабль судьбы', 'Робин Хобб', 'https://cdn.litres.ru/pub/c/cover_415/24314020.webp', 20),
('Теория всего', 'Стивен Хокинг', 'https://imo10.labirint.ru/books/618944/cover.jpg/2000-0', 20),
('Властелин колец', 'Дж.Р.Р. Толкин', 'http://imo10.labirint.ru/books/524024/cover.jpg/2000-0', 20),
('Имя ветра', 'Патрик Ротфусс', 'https://imo10.labirint.ru/books/802403/cover.jpg/2000-0', 20),
('Темная башня', 'Стивен Кинг', 'https://imo10.labirint.ru/books/183517/cover.jpg/484-0', 20),
('Проект «Аве Мария»', 'Энди Вейер', 'https://cdn.litres.ru/pub/c/cover/66986536.jpg', 20),
('Око мира', 'Роберт Джордан', 'https://xlm.ru/storage/uploads/images/2021/10/25/ibuuL3qSVfg4uXszW1DUebntN2ac8IbBYE1rlkZU.jpeg', 20),
('Сады луны', 'Стивен Эриксон', 'https://cdn.litres.ru/pub/c/cover/17077910.jpg', 20),
('Меч предназначения', 'Анджей Сапковский', 'https://cdn.litres.ru/pub/c/cover/122541.jpg', 20),
('Дюна', 'Фрэнк Герберт', 'https://www.belykrolik.ru/media/catalog/product_images/14900811_1_dyuna.jpg', 20),
('Игра престолов', 'Джордж Мартин', 'https://cdn.litres.ru/pub/c/cover/248812.jpg', 20);

INSERT INTO books (name, author, cover, user_id) 
VALUES 
('Эгоистичный ген', 'Ричард Докинз', 'https://cdn.litres.ru/pub/c/cover/129015.jpg', 2),
('Джеймс Джойс', 'Улисс', 'https://cdn.litres.ru/pub/c/cover/136177.jpg', 2),
('Япония изнутри', 'Марина Чижова', 'https://cdn.litres.ru/pub/c/cover/69230518.jpg', 2),
('Шантарам', 'Грегори Дэвид Робертс', 'https://cdn.litres.ru/pub/c/cover/5815016.jpg', 2),
('Путь королей', 'Брэндон Сандерсон', 'https://cdn.litres.ru/pub/c/cover/21162101.jpg', 2),
('Антидемон', 'Серж Винтеркей', 'https://cdn.litres.ru/pub/c/cover/68810199.jpg', 2),
('Летос', 'Алексей Пехов', 'https://cdn.litres.ru/pub/c/cover/8481292.jpg', 2);
