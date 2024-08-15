CREATE DATABASE user_registration;

USE user_registration;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  profile_image VARCHAR(255)
);
