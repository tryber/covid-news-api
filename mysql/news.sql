CREATE DATABASE IF NOT EXISTS news_api;
USE news_api;

CREATE TABLE news (
  `idnews` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fonte` VARCHAR(255) NULL,
  `title` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `url_to_link` VARCHAR(255) NULL,
  `url_to_image` TEXT NULL,
  `published_at` VARCHAR(40) NULL,
  UNIQUE KEY `news_unique_index` (`title`,`fonte`)
) ENGINE = InnoDB;
