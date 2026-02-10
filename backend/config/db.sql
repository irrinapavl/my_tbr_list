CREATE DATABASE tbr;

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (name, author, cover) 
VALUES 
('Корабль судьбы', 'Робин Хобб', 'https://cdn.litres.ru/pub/c/cover_415/24314020.webp'),
('Теория всего', 'Стивен Хокинг', 'https://imo10.labirint.ru/books/618944/cover.jpg/2000-0'),
('Властелин колец', 'Дж.Р.Р. Толкин', 'http://imo10.labirint.ru/books/524024/cover.jpg/2000-0'),
('Имя ветра', 'Патрик Ротфусс', 'https://imo10.labirint.ru/books/802403/cover.jpg/2000-0'),
('Темная башня', 'Стивен Кинг', 'https://imo10.labirint.ru/books/183517/cover.jpg/484-0'),
('Проект «Аве Мария»', 'Энди Вейер', 'https://cdn.litres.ru/pub/c/cover/66986536.jpg'),
('Око мира', 'Роберт Джордан', 'https://xlm.ru/storage/uploads/images/2021/10/25/ibuuL3qSVfg4uXszW1DUebntN2ac8IbBYE1rlkZU.jpeg'),
('Сады луны', 'Стивен Эриксон', 'https://cdn.litres.ru/pub/c/cover/17077910.jpg'),
('Меч предназначения', 'Анджей Сапковский', 'https://cdn.litres.ru/pub/c/cover/122541.jpg'),
('Дюна', 'Фрэнк Герберт', 'https://www.belykrolik.ru/media/catalog/product_images/14900811_1_dyuna.jpg'),
('Игра престолов', 'Джордж Мартин', 'https://cdn.litres.ru/pub/c/cover/248812.jpg');

