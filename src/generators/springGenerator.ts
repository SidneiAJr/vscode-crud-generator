export function generateSpringGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `@GetMapping
public ResponseEntity<List<Map<String, Object>>> listar() {
    // ⚠️ ATENÇÃO: Substitua [sua tabela aqui] pelo nome real da tabela
    String sql = "SELECT * FROM [sua tabela aqui]";
    List<Map<String, Object>> resultados = new ArrayList<>();
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        while (rs.next()) {
            Map<String, Object> row = new HashMap<>();
            row.put("id", rs.getInt("id"));
            row.put("nome", rs.getString("nome"));
            row.put("email", rs.getString("email"));
            resultados.add(row);
        }
    } catch (SQLException e) {
        return ResponseEntity.status(500).body(null);
    }
    return ResponseEntity.ok(resultados);
}`;
}

export function generateSpringGetById(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `@GetMapping("/{id}")
public ResponseEntity<Map<String, Object>> buscar(@PathVariable Long id) {
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: PreparedStatement stmt = conn.prepareStatement("SELECT * FROM tabela WHERE id = ?");
    // stmt.setLong(1, id);
    String sql = "SELECT * FROM [sua tabela aqui] WHERE id = ?";
    try (PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setLong(1, id);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            Map<String, Object> row = new HashMap<>();
            row.put("id", rs.getInt("id"));
            row.put("nome", rs.getString("nome"));
            row.put("email", rs.getString("email"));
            return ResponseEntity.ok(row);
        }
    } catch (SQLException e) {
        return ResponseEntity.status(500).body(null);
    }
    return ResponseEntity.notFound().build();
}`;
}

export function generateSpringPost(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `@PostMapping
public ResponseEntity<Map<String, Object>> criar(@RequestBody Map<String, String> dados) {
    String nome = dados.get("nome");
    String email = dados.get("email");
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: PreparedStatement stmt = conn.prepareStatement("INSERT INTO tabela (nome, email) VALUES (?, ?)");
    // stmt.setString(1, nome);
    // stmt.setString(2, email);
    String sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES (?, ?)";
    try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
        stmt.setString(1, nome);
        stmt.setString(2, email);
        stmt.executeUpdate();
        ResultSet rs = stmt.getGeneratedKeys();
        int id = rs.next() ? rs.getInt(1) : 0;
        return ResponseEntity.status(201).body(Map.of("id", id, "nome", nome, "email", email));
    } catch (SQLException e) {
        return ResponseEntity.status(500).body(null);
    }
}`;
}

export function generateSpringPut(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `@PutMapping("/{id}")
public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id, @RequestBody Map<String, String> dados) {
    String nome = dados.get("nome");
    String email = dados.get("email");
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: PreparedStatement stmt = conn.prepareStatement("UPDATE tabela SET nome = ?, email = ? WHERE id = ?");
    // stmt.setString(1, nome);
    // stmt.setString(2, email);
    // stmt.setLong(3, id);
    String sql = "UPDATE [sua tabela aqui] SET nome = ?, email = ? WHERE id = ?";
    try (PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setString(1, nome);
        stmt.setString(2, email);
        stmt.setLong(3, id);
        int rows = stmt.executeUpdate();
        if (rows == 0) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of("id", id, "nome", nome, "email", email));
    } catch (SQLException e) {
        return ResponseEntity.status(500).body(null);
    }
}`;
}

export function generateSpringDelete(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `@DeleteMapping("/{id}")
public ResponseEntity<Void> deletar(@PathVariable Long id) {
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: PreparedStatement stmt = conn.prepareStatement("DELETE FROM tabela WHERE id = ?");
    // stmt.setLong(1, id);
    String sql = "DELETE FROM [sua tabela aqui] WHERE id = ?";
    try (PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setLong(1, id);
        int rows = stmt.executeUpdate();
        if (rows == 0) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    } catch (SQLException e) {
        return ResponseEntity.status(500).build();
    }
}`;
}