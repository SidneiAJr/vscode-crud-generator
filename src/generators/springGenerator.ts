// ================================
// SPRING (JAVA) GENERATORS - VERSÃO SIMPLES COM JDBC
// ================================

export function generateSpringGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `@GetMapping
public ResponseEntity<List<Map<String, Object>>> listar() {
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
    String sql = "SELECT * FROM [sua tabela aqui] WHERE id = " + id;
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
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
    String sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES ('" + nome + "', '" + email + "')";
    try (Statement stmt = conn.createStatement()) {
        stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
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
    String sql = "UPDATE [sua tabela aqui] SET nome = '" + nome + "', email = '" + email + "' WHERE id = " + id;
    try (Statement stmt = conn.createStatement()) {
        int rows = stmt.executeUpdate(sql);
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
    String sql = "DELETE FROM [sua tabela aqui] WHERE id = " + id;
    try (Statement stmt = conn.createStatement()) {
        int rows = stmt.executeUpdate(sql);
        if (rows == 0) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    } catch (SQLException e) {
        return ResponseEntity.status(500).build();
    }
}`;
}