import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

}).promise()

export async function getProduto(id_produto){
    const [rows] = await pool.query(`
        SELECT nome, quantidade_disponivel, quantidade_pack, ultima_atualizacao
        FROM Produto
        WHERE id_produto = ?
        `, [id])
    return rows
}

export async function getTotalProduto(id_produto){
    const [rows] = await pool.query(`
        SELECT quantidade_disponivel
        FROM Produto
        WHERE id_produto = ?
        `, [id])
    return rows
}

export async function getPermissaoVisualizar(id_usuario){
    const [rows] = await pool.query(`
        SELECT permissao_estoque_visualizar
        FROM Permissao
        WHERE id_usuario = ?
        `, [id])
    return rows
}

export async function getPermissaoEditar(id_usuario){
    const [rows] = await pool.query(`
        SELECT permissao_estoque_editar
        FROM Permissao
        WHERE id_usuario = ?
        `, [id])
    return rows
}

export async function getMovimentacao(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Movimentacao
        WHERE id_produto = ?
        `, [id])
    return rows
}

export async function getHistorico_Alteracoes_Usuario(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Historico_Alteracoes_Usuario
        WHERE id_usuario = ?
        `, [id])
    return rows
}

export async function insertUsuario(nome, email){
    const result = await pool.query(`
        INSERT INTO Usuario (nome, email, status)
        VALUES (?, ?, ativo)
        `, [nome, email])
    return result
}