// ================================
// SLIM (PHP) GENERATORS - VERSÃO SIMPLES (SEM SERVICE)
// ================================

export function generateSlimGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `$app->get('${rota}', function ($request, $response, $args) {
    // ⚠️ ATENÇÃO: Substitua [sua tabela aqui] pelo nome real da tabela
    $sql = "SELECT * FROM [sua tabela aqui]";
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->query($sql);
        $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $response->withJson($dados);
    } catch (PDOException $e) {
        return $response->withJson(['erro' => $e->getMessage()], 500);
    }
});`;
}

export function generateSlimGetById(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `$app->get('${rota}/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "SELECT * FROM tabela WHERE id = ?";
    // $stmt = $conn->prepare($sql);
    // $stmt->execute([$id]);
    $sql = "SELECT * FROM [sua tabela aqui] WHERE id = ?";
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $dado = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$dado) {
            return $response->withJson(['erro' => 'Registro não encontrado'], 404);
        }
        return $response->withJson($dado);
    } catch (PDOException $e) {
        return $response->withJson(['erro' => $e->getMessage()], 500);
    }
});`;
}

export function generateSlimPost(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `$app->post('${rota}', function ($request, $response, $args) {
    $dados = $request->getParsedBody();
    $nome = $dados['nome'];
    $email = $dados['email'];
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "INSERT INTO tabela (nome, email) VALUES (?, ?)";
    // $stmt = $conn->prepare($sql);
    // $stmt->execute([$nome, $email]);
    $sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES (?, ?)";
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nome, $email]);
        $id = $conn->lastInsertId();
        return $response->withJson(['id' => $id, 'nome' => $nome, 'email' => $email], 201);
    } catch (PDOException $e) {
        return $response->withJson(['erro' => $e->getMessage()], 500);
    }
});`;
}

export function generateSlimPut(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `$app->put('${rota}/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    $dados = $request->getParsedBody();
    $nome = $dados['nome'];
    $email = $dados['email'];
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "UPDATE tabela SET nome = ?, email = ? WHERE id = ?";
    // $stmt = $conn->prepare($sql);
    // $stmt->execute([$nome, $email, $id]);
    $sql = "UPDATE [sua tabela aqui] SET nome = ?, email = ? WHERE id = ?";
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nome, $email, $id]);
        $rows = $stmt->rowCount();
        if ($rows == 0) {
            return $response->withJson(['erro' => 'Registro não encontrado'], 404);
        }
        return $response->withJson(['id' => (int)$id, 'nome' => $nome, 'email' => $email]);
    } catch (PDOException $e) {
        return $response->withJson(['erro' => $e->getMessage()], 500);
    }
});`;
}

export function generateSlimDelete(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `$app->delete('${rota}/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "DELETE FROM tabela WHERE id = ?";
    // $stmt = $conn->prepare($sql);
    // $stmt->execute([$id]);
    $sql = "DELETE FROM [sua tabela aqui] WHERE id = ?";
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $rows = $stmt->rowCount();
        if ($rows == 0) {
            return $response->withJson(['erro' => 'Registro não encontrado'], 404);
        }
        return $response->withJson(['mensagem' => 'Registro deletado com sucesso']);
    } catch (PDOException $e) {
        return $response->withJson(['erro' => $e->getMessage()], 500);
    }
});`;
}