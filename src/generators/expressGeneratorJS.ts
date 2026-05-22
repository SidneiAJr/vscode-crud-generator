// ================================
// EXPRESS GENERATORS - VERSÃO SIMPLES (SEM SERVICE)
// ================================

export function generateExpressGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.get('${rota}', (req, res) => {
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
    
    return `app.get('${rota}/:id', (req, res) => {
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
    
    return `app.post('${rota}', (req, res) => {
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
    
    return `app.put('${rota}/:id', (req, res) => {
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
    
    return `app.delete('${rota}/:id', (req, res) => {
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