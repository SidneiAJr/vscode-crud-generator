// ================================
// SPARK (JAVA) GENERATORS - VERSÃO SIMPLES (SEM SERVICE)
// ================================

export function generateSparkGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `get("${rota}", (req, res) -> {
    String sql = "SELECT * FROM [sua tabela aqui]";
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        List<Map<String, Object>> lista = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", rs.getInt("id"));
            item.put("nome", rs.getString("nome"));
            item.put("email", rs.getString("email"));
            lista.add(item);
        }
        return new Gson().toJson(lista);
    } catch (SQLException e) {
        return new Gson().toJson(Map.of("erro", e.getMessage()));
    }
});`;
}

export function generateSparkGetById(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `get("${rota}/:id", (req, res) -> {
    int id = Integer.parseInt(req.params(":id"));
    String sql = "SELECT * FROM [sua tabela aqui] WHERE id = " + id;
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        if (rs.next()) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", rs.getInt("id"));
            item.put("nome", rs.getString("nome"));
            item.put("email", rs.getString("email"));
            return new Gson().toJson(item);
        } else {
            return new Gson().toJson(Map.of("erro", "Registro não encontrado"));
        }
    } catch (SQLException e) {
        return new Gson().toJson(Map.of("erro", e.getMessage()));
    }
});`;
}

export function generateSparkPost(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `post("${rota}", (req, res) -> {
    Gson gson = new Gson();
    Map<String, String> dados = gson.fromJson(req.body(), Map.class);
    String nome = dados.get("nome");
    String email = dados.get("email");
    String sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES ('" + nome + "', '" + email + "')";
    try (Statement stmt = conn.createStatement()) {
        int rows = stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
        ResultSet rs = stmt.getGeneratedKeys();
        int id = 0;
        if (rs.next()) id = rs.getInt(1);
        return new Gson().toJson(Map.of("id", id, "nome", nome, "email", email));
    } catch (SQLException e) {
        return new Gson().toJson(Map.of("erro", e.getMessage()));
    }
});`;
}

export function generateSparkPut(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `put("${rota}/:id", (req, res) -> {
    int id = Integer.parseInt(req.params(":id"));
    Gson gson = new Gson();
    Map<String, String> dados = gson.fromJson(req.body(), Map.class);
    String nome = dados.get("nome");
    String email = dados.get("email");
    String sql = "UPDATE [sua tabela aqui] SET nome = '" + nome + "', email = '" + email + "' WHERE id = " + id;
    try (Statement stmt = conn.createStatement()) {
        int rows = stmt.executeUpdate(sql);
        if (rows == 0) {
            return new Gson().toJson(Map.of("erro", "Registro não encontrado"));
        }
        return new Gson().toJson(Map.of("id", id, "nome", nome, "email", email));
    } catch (SQLException e) {
        return new Gson().toJson(Map.of("erro", e.getMessage()));
    }
});`;
}

export function generateSparkDelete(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `delete("${rota}/:id", (req, res) -> {
    int id = Integer.parseInt(req.params(":id"));
    String sql = "DELETE FROM [sua tabela aqui] WHERE id = " + id;
    try (Statement stmt = conn.createStatement()) {
        int rows = stmt.executeUpdate(sql);
        if (rows == 0) {
            return new Gson().toJson(Map.of("erro", "Registro não encontrado"));
        }
        return "Registro deletado com sucesso";
    } catch (SQLException e) {
        return new Gson().toJson(Map.of("erro", e.getMessage()));
    }
});`;
}