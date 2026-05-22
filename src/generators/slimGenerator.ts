// ================================
// SLIM (PHP) GENERATORS - VERSÃO SIMPLES (SEM SERVICE)
// ================================

export function generateSlimGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `$app->get('${rota}', function ($request, $response, $args) {
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
    $sql = "SELECT * FROM [sua tabela aqui] WHERE id = " . $id;
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->query($sql);
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
    $sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES ('" . $nome . "', '" . $email . "')";
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec($sql);
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
    $sql = "UPDATE [sua tabela aqui] SET nome = '" . $nome . "', email = '" . $email . "' WHERE id = " . $id;
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rows = $conn->exec($sql);
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
    $sql = "DELETE FROM [sua tabela aqui] WHERE id = " . $id;
    try {
        $conn = new PDO("mysql:host=localhost;dbname=meubanco", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rows = $conn->exec($sql);
        if ($rows == 0) {
            return $response->withJson(['erro' => 'Registro não encontrado'], 404);
        }
        return $response->withJson(['mensagem' => 'Registro deletado com sucesso']);
    } catch (PDOException $e) {
        return $response->withJson(['erro' => $e->getMessage()], 500);
    }
});`;
}