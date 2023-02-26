use heyme;

CREATE TABLE IF NOT EXISTS Videos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    send_at DATE NOT NULL,
    sent TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    video_url VARCHAR(255) NOT NULL,
    send_to ENUM('yourself', 'someone_else') NOT NULL
);
