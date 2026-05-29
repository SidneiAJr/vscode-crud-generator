export function generateLaravelGet(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::get('${rota}', function () {
    // ⚠️ ATENÇÃO: Substitua [sua tabela aqui] pelo nome real da tabela
    $sql = "SELECT * FROM [sua tabela aqui]";
    $dados = DB::select($sql);
    return response()->json($dados);
});`;
}

export function generateLaravelGetById(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::get('${rota}/{id}', function ($id) {
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "SELECT * FROM tabela WHERE id = ?";
    // $dado = DB::select($sql, [$id]);
    $sql = "SELECT * FROM [sua tabela aqui] WHERE id = ?";
    $dado = DB::select($sql, [$id]);
    if (empty($dado)) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    return response()->json($dado[0]);
});`;
}

export function generateLaravelPost(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::post('${rota}', function (Request $request) {
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "INSERT INTO tabela (nome, email) VALUES (?, ?)";
    // DB::insert($sql, [$request->nome, $request->email]);
    $sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES (?, ?)";
    DB::insert($sql, [$request->nome, $request->email]);
    return response()->json(['mensagem' => 'Registro criado com sucesso'], 201);
});`;
}

export function generateLaravelPut(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::put('${rota}/{id}', function (Request $request, $id) {
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "UPDATE tabela SET nome = ?, email = ? WHERE id = ?";
    // DB::update($sql, [$request->nome, $request->email, $id]);
    $sql = "UPDATE [sua tabela aqui] SET nome = ?, email = ? WHERE id = ?";
    $linhas = DB::update($sql, [$request->nome, $request->email, $id]);
    if ($linhas == 0) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    return response()->json(['mensagem' => 'Registro atualizado com sucesso']);
});`;
}

export function generateLaravelDelete(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::delete('${rota}/{id}', function ($id) {
    // ⚠️ ATENÇÃO: Use prepared statements em produção!
    // Exemplo correto: $sql = "DELETE FROM tabela WHERE id = ?";
    // DB::delete($sql, [$id]);
    $sql = "DELETE FROM [sua tabela aqui] WHERE id = ?";
    $linhas = DB::delete($sql, [$id]);
    if ($linhas == 0) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    return response()->json(['mensagem' => 'Registro deletado com sucesso']);
});`;
}

