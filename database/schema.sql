-- Setta / Painel de Eficiência da Máquina

CREATE DATABASE IF NOT EXISTS setta_eficiencia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE setta_eficiencia;
CREATE TABLE IF NOT EXISTS leituras (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  data_hora    DATETIME       NOT NULL,
  temperatura  DECIMAL(5,2)   NOT NULL,
  eficiencia   DECIMAL(5,2)   NOT NULL,
  status       VARCHAR(20)    NOT NULL,
  criado_em    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leituras_data_hora ON leituras (data_hora DESC);
