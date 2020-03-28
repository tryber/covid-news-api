CREATE DATABASE IF NOT EXISTS news_api;
USE news_api;

CREATE TABLE news (
  `idnews` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fonte` VARCHAR(255) NULL,
  `title` TEXT(255) NULL,
  `description` TEXT(255) NULL,
  `url_to_link` VARCHAR(255) NULL,
  `url_to_image` VARCHAR(255) NULL,
  `published_at` VARCHAR(45) NULL
) ENGINE = InnoDB;


