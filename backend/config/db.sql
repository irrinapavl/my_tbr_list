CREATE DATABASE tbr;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO books (name, author, cover, user_id) 
VALUES 
('Корабль судьбы', 'Робин Хобб', 'https://cdn.litres.ru/pub/c/cover_415/24314020.webp', 4),
('Теория всего', 'Стивен Хокинг', 'https://imo10.labirint.ru/books/618944/cover.jpg/2000-0', 4),
('Властелин колец', 'Дж.Р.Р. Толкин', 'http://imo10.labirint.ru/books/524024/cover.jpg/2000-0', 4),
('Имя ветра', 'Патрик Ротфусс', 'https://imo10.labirint.ru/books/802403/cover.jpg/2000-0', 4),
('Темная башня', 'Стивен Кинг', 'https://imo10.labirint.ru/books/183517/cover.jpg/484-0', 4),
('Проект «Аве Мария»', 'Энди Вейер', 'https://cdn.litres.ru/pub/c/cover/66986536.jpg', 4),
('Око мира', 'Роберт Джордан', 'https://xlm.ru/storage/uploads/images/2021/10/25/ibuuL3qSVfg4uXszW1DUebntN2ac8IbBYE1rlkZU.jpeg', 4),
('Сады луны', 'Стивен Эриксон', 'https://cdn.litres.ru/pub/c/cover/17077910.jpg', 4),
('Меч предназначения', 'Анджей Сапковский', 'https://cdn.litres.ru/pub/c/cover/122541.jpg', 4),
('Дюна', 'Фрэнк Герберт', 'https://www.belykrolik.ru/media/catalog/product_images/14900811_1_dyuna.jpg', 4),
('Игра престолов', 'Джордж Мартин', 'https://cdn.litres.ru/pub/c/cover/248812.jpg', 4);

