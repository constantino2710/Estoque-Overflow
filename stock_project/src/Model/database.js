import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// Funções para Produto
export async function getProduto(id_produto) {
    const [rows] = await pool.query(
        `SELECT nome, quantidade_disponivel, quantidade_pack, ultima_atualizacao FROM Produto WHERE id_produto = ?`,
        [id_produto]
    );
    return rows;
}

export async function updateProdutoQuantidade(id_produto, nova_quantidade) {
    const [result] = await pool.query(
        `UPDATE Produto SET quantidade_disponivel = ?, ultima_atualizacao = CURRENT_TIMESTAMP WHERE id_produto = ?`,
        [nova_quantidade, id_produto]
    );
    return result;
}

export async function deleteProduto(id_produto) {
    const [result] = await pool.query(`DELETE FROM Produto WHERE id_produto = ?`, [id_produto]);
    return result;
}

// Funções para Usuário
export async function insertUsuario(nome, email, tipo_permissao) {
    const [result] = await pool.query(
        `INSERT INTO Usuario (nome, email, tipo_permissao, status) VALUES (?, ?, ?, 'ativo')`,
        [nome, email, tipo_permissao]
    );
    return result;
}

export async function updateUsuarioStatus(id_usuario, novo_status) {
    const [result] = await pool.query(
        `UPDATE Usuario SET status = ? WHERE id_usuario = ?`,
        [novo_status, id_usuario]
    );
    return result;
}

export async function deleteUsuario(id_usuario) {
    const [result] = await pool.query(`DELETE FROM Usuario WHERE id_usuario = ?`, [id_usuario]);
    return result;
}

// Funções para Permissão
export async function getPermissaoVisualizar(id_usuario) {
    const [rows] = await pool.query(
        `SELECT permissao_estoque_visualizar FROM Permissao WHERE id_usuario = ?`,
        [id_usuario]
    );
    return rows;
}

export async function getPermissaoEditar(id_usuario) {
    const [rows] = await pool.query(
        `SELECT permissao_estoque_editar FROM Permissao WHERE id_usuario = ?`,
        [id_usuario]
    );
    return rows;
}

export async function updatePermissao(id_usuario, visualizar, editar) {
    const [result] = await pool.query(
        `UPDATE Permissao SET permissao_estoque_visualizar = ?, permissao_estoque_editar = ? WHERE id_usuario = ?`,
        [visualizar, editar, id_usuario]
    );
    return result;
}

// Funções para Movimentação
export async function insertMovimentacao(id_produto, id_usuario, quantidade_movimentada, tipo_movimentacao, comentarios) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Obter quantidade atual do produto
        const [produto] = await connection.query(
            `SELECT quantidade_disponivel FROM Produto WHERE id_produto = ?`,
            [id_produto]
        );

        if (produto.length === 0) throw new Error('Produto não encontrado');

        const quantidade_antiga = produto[0].quantidade_disponivel;
        const quantidade_nova = tipo_movimentacao === 'retirada' 
            ? quantidade_antiga - quantidade_movimentada 
            : quantidade_antiga + quantidade_movimentada;

        if (quantidade_nova < 0) throw new Error('Estoque insuficiente');

        // Inserir movimentação
        await connection.query(
            `INSERT INTO Movimentacao (id_produto, id_usuario, quantidade_movimentada, tipo_movimentacao, comentarios) VALUES (?, ?, ?, ?, ?)`,
            [id_produto, id_usuario, quantidade_movimentada, tipo_movimentacao, comentarios]
        );

        // Atualizar quantidade no estoque
        await connection.query(
            `UPDATE Produto SET quantidade_disponivel = ?, ultima_atualizacao = CURRENT_TIMESTAMP WHERE id_produto = ?`,
            [quantidade_nova, id_produto]
        );

        // Inserir no histórico de produtos
        await connection.query(
            `INSERT INTO Historico_Produto (id_produto, alteracao, quantidade_antiga, quantidade_nova, alterado_por) VALUES (?, ?, ?, ?, ?)`,
            [id_produto, `Movimentação de ${tipo_movimentacao}`, quantidade_antiga, quantidade_nova, id_usuario]
        );

        // Inserir no histórico de alterações de usuário
        await connection.query(
            `INSERT INTO Historico_Alteracoes_Usuario (id_usuario, alteracao, alterado_por) VALUES (?, ?, ?)`,
            [id_usuario, `Movimentou ${quantidade_movimentada} unidades do produto ${id_produto} (${tipo_movimentacao})`, id_usuario]
        );

        await connection.commit();
        return { success: true };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function getMovimentacao(id_produto) {
    const [rows] = await pool.query(`SELECT * FROM Movimentacao WHERE id_produto = ?`, [id_produto]);
    return rows;
}

// Funções para Histórico
export async function getHistoricoAlteracoesUsuario(id_usuario) {
    const [rows] = await pool.query(`SELECT * FROM Historico_Alteracoes_Usuario WHERE id_usuario = ?`, [id_usuario]);
    return rows;
}


