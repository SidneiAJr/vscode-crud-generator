// ================================
// EXPRESS GENERATORS - VERSÃO SIMPLES (SEM SERVICE)
// ================================

 export function packjson(){
    return `{
  "name": "Projeto Nome Aqui",
  "version": "1.0.0",
  "description": "Projeto gerado com express mysql2 jsonwebtoken express-rate-limit cors dotenv",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "express-rate-limit": "^6.7.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}` 
}



export function TSImports(): string {
    return `import express, { Express, Request, Response } from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const connection = mysql.createConnection({ 
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || ''
});

`;

}

export function generateExpressGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.get('${rota}', (req: Request, res: Response) => {
    const sql = \`SELECT * FROM [sua tabela aqui]\`;
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(results);
    });
});`;
}

export function generateExpressGetById(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.get('${rota}/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = \`SELECT * FROM [sua tabela aqui] WHERE id = \${id}\`;
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ erro: 'Registro não encontrado' });
        }
        res.json(result[0]);
    });
});`;
}

export function generateExpressPost(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.post('${rota}', (req: Request, res: Response) => {
    const { nome, email } = req.body;
    const sql = \`INSERT INTO [sua tabela aqui] (nome, email) VALUES ('\${nome}', '\${email}')\`;
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.status(201).json({ id: result.insertId, nome, email });
    });
});`;
}

export function generateExpressPut(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.put('${rota}/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const sql = \`UPDATE [sua tabela aqui] SET nome = '\${nome}', email = '\${email}' WHERE id = \${id}\`;
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Registro não encontrado' });
        }
        res.json({ id: Number(id), nome, email });
    });
});`;
}

export function generateExpressDelete(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.delete('${rota}/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = \`DELETE FROM [sua tabela aqui] WHERE id = \${id}\`;
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Registro não encontrado' });
        }
        res.status(204).send();
    });
});`;
}