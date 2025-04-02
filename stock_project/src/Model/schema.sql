USE Banco
-- Tabela: Produto
CREATE TABLE Produto (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 0,
    quantidade_pack INTEGER NOT NULL DEFAULT 24,
    ultima_atualizacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    limite_minimo INTEGER NOT NULL DEFAULT 0,
    tipo VARCHAR(20) CHECK (tipo IN ('OPME', 'pack')) NOT NULL
);

-- Tabela: Usuario
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    tipo_permissao VARCHAR(20) CHECK (tipo_permissao IN ('admin', 'comum')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('ativo', 'removido')) NOT NULL
);

-- Tabela: Permissao
CREATE TABLE Permissao (
    id_permissao SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED NOT NULL UNIQUE,
    permissao_estoque_visualizar BOOLEAN NOT NULL DEFAULT FALSE,
    permissao_estoque_editar BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

-- Tabela: Movimentacao
CREATE TABLE Movimentacao (
    id_movimentacao SERIAL PRIMARY KEY,
    id_produto BIGINT UNSIGNED NOT NULL,
    id_usuario BIGINT UNSIGNED NOT NULL,
    quantidade_movimentada INTEGER NOT NULL,
    tipo_movimentacao VARCHAR(20) CHECK (tipo_movimentacao IN ('retirada', 'devolucao')) NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comentarios TEXT,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Tabela: Historico_Alteracoes_Usuario
CREATE TABLE Historico_Alteracoes_Usuario (
    id_historico SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED NOT NULL UNIQUE,
    alteracao TEXT NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    alterado_por BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (alterado_por) REFERENCES Usuario(id_usuario)
);

-- Tabela: Historico_Produto
CREATE TABLE Historico_Produto (
    id_historico_produto SERIAL PRIMARY KEY,
    id_produto BIGINT UNSIGNED NOT NULL UNIQUE,
    alteracao TEXT NOT NULL,
    quantidade_antiga INTEGER,
    quantidade_nova INTEGER,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    alterado_por BIGINT UNSIGNED NOT NULL ,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto),
    FOREIGN KEY (alterado_por) REFERENCES Usuario(id_usuario)
);

CREATE ROLE admin;
CREATE ROLE usuario;

-- Garantindo privilegios
GRANT ALL PRIVILEGES ON *.* TO admin WITH GRANT OPTION;

-- Atribuindo funcoes ao usuario
GRANT SELECT, UPDATE (quantidade_disponivel) ON Produto TO usuario;
GRANT INSERT ON Movimentacao TO usuario;

-- Criando usuarios (a ser modificado)
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'senha_segura';
CREATE USER 'comum_user'@'localhost' IDENTIFIED BY 'senha_segura';

GRANT admin TO 'admin_user'@'localhost';
GRANT usuario TO 'comum_user'@'localhost';

SET DEFAULT ROLE admin FOR 'admin_user'@'localhost';
SET DEFAULT ROLE usuario FOR 'comum_user'@'localhost';

