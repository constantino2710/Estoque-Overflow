import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

}).promise()

async function getProduto(){
    const [rows] = await pool.query(``)
    return rows
}

async function getTotalProduto(){
    const [rows] = await pool.query(``)
    return rows
}


