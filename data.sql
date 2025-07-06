-- Datenbank erstellen
CREATE DATABASE IF NOT EXISTS pwa_app;
USE pwa_app;

-- Tabelle: users
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) COLLATE latin1_swedish_ci NOT NULL,
    password VARCHAR(255) COLLATE latin1_swedish_ci NOT NULL,
    PRIMARY KEY (id)
);

-- Tabelle: jobs
CREATE TABLE IF NOT EXISTS jobs (
    id INT(11) NOT NULL AUTO_INCREMENT,
    device_name VARCHAR(255) COLLATE latin1_swedish_ci DEFAULT NULL,
    start_time TIME DEFAULT NULL,
    consumption_kwh FLOAT DEFAULT NULL,
    date DATE DEFAULT NULL,
    PRIMARY KEY (id)
);

-- Beispiel-Insert für Benutzer
INSERT INTO users (username, password) VALUES ('admin', '123456');

-- Beispiel-Insert für Job
INSERT INTO jobs (device_name, start_time, consumption_kwh, date)
VALUES ('Wasserkocher', '08:30:00', 0.5, '2025-07-06');
