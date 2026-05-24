// ================================
// SPARK (JAVA) GENERATORS - VERSÃO SIMPLES (SEM SERVICE)
// ================================

export function pomxml(){
    return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.exemplo</groupId>
    <artifactId>spark-api</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- Spark Framework -->
        <dependency>
            <groupId>com.sparkjava</groupId>
            <artifactId>spark-core</artifactId>
            <version>2.9.4</version>
        </dependency>

        <!-- Gson (JSON) -->
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.10.1</version>
        </dependency>

        <!-- Lombok (getter/setter/builder automático) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.30</version>
            <scope>provided</scope>
        </dependency>

        <!-- BCrypt (senha) -->
        <dependency>
            <groupId>org.mindrot</groupId>
            <artifactId>jbcrypt</artifactId>
            <version>0.4</version>
        </dependency>

        <!-- ================= BANCOS ================= -->
        
        <!-- MySQL -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.33</version>
        </dependency>

        <!-- PostgreSQL -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>42.6.0</version>
        </dependency>

        <!-- H2 (banco em memória para testes) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>2.2.224</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>1.18.30</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
}

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