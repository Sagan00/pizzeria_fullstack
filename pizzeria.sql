-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 22 Cze 2023, 21:51
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `pizzeria`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pizze`
--

CREATE TABLE `pizze` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) DEFAULT NULL,
  `skladniki` varchar(200) DEFAULT NULL,
  `cena` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `pizze`
--

INSERT INTO `pizze` (`id`, `nazwa`, `skladniki`, `cena`) VALUES
(1, 'Margherita', 'sos pomidorowy, ser, oregano', '20.90'),
(2, 'Capriciosa', 'sos pomidorowy, ser, szynka, pieczarki, oregano', '25.90'),
(3, 'Napoletana', 'sos pomidorowy, ser, salami, oliwki zielone, papryczki jalapenos, oregano', '31.90'),
(4, 'Roma', 'sos pomidorowy, ser, szynka, pieczarki, oregano', '22.90'),
(5, 'Semplicita', 'sos pomidorowy, ser, szynka, oregano', '23.90');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL,
  `login` varchar(50) DEFAULT NULL,
  `haslo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id`, `login`, `haslo`) VALUES
(1, 'Adam123', 'Helikopter15'),
(2, 'sagan', 'sagan1'),
(3, 'Tomek111', 'Lodzianin1'),
(4, 'Miszczu', 'Miszczak00'),
(5, 'Malysz555', 'Kubacki12'),
(6, 'Samsung', 'Samsung12'),
(7, 'Saganek00', 'Saganek00'),
(9, 'Muszelka', 'Kapselek1');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id` int(11) NOT NULL,
  `pizza` int(11) DEFAULT NULL,
  `ilosc` int(11) DEFAULT NULL,
  `sos` varchar(50) DEFAULT NULL,
  `imie` varchar(50) DEFAULT NULL,
  `nazwisko` varchar(50) DEFAULT NULL,
  `adres` varchar(100) DEFAULT NULL,
  `telefon` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `uwagi` varchar(200) DEFAULT NULL,
  `uzytkownikId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `zamowienia`
--

INSERT INTO `zamowienia` (`id`, `pizza`, `ilosc`, `sos`, `imie`, `nazwisko`, `adres`, `telefon`, `email`, `uwagi`, `uzytkownikId`) VALUES
(1, 3, 2, 'czosnkowy', 'Jan', 'Kowalski', 'ul. Kwiatowa 1', '444555123', 'jan@kowalski.pl', 'Brak uwag', 1),
(2, 2, 1, 'czosnkowy', 'Anna', 'Nowak', 'ul. Słoneczna 2', '123456111', 'anna@nowak.pl', ' bez cebuli', 3),
(3, 1, 3, 'pomidorowy', 'Piotr', 'Wiosna', 'ul. Ogrodowa 3', '555444321', 'piotr@wisniewski.pl', '', 2),
(15, 3, 2, 'Pomidorowy', 'Anna', 'Nowak', 'Źrodlana 13', '444666321', 'nowak@op.pl', '', 2),
(16, 5, 5, 'pomidorowy', 'Lukasz', 'Kopytko', 'Niciarniana 122', '155488777', 'kopytko@gmail.com', 'Przekrojone na 2 kawałki', 5),
(17, 4, 3, 'Czosnkowy', 'Dawid', 'Patko', 'ul. Magnoliowa 88', '555999145', 'paris@gmail.com', 'Na cienkim cieście', NULL),
(19, 1, 5, 'Czosnkowy', 'Łukasz', 'Brzęczyszczykiewicz', 'ul. Koperkowa 12', '555478962', 'trudne@gmail.com', 'Szybko', NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `pizze`
--
ALTER TABLE `pizze`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pizza` (`pizza`),
  ADD KEY `uzytkownikId` (`uzytkownikId`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `pizze`
--
ALTER TABLE `pizze`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD CONSTRAINT `zamowienia_ibfk_3` FOREIGN KEY (`uzytkownikId`) REFERENCES `uzytkownicy` (`id`),
  ADD CONSTRAINT `zamowienia_ibfk_4` FOREIGN KEY (`pizza`) REFERENCES `pizze` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
