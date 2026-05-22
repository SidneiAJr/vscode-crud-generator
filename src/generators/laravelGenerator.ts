// ================================
// LARAVEL (PHP) GENERATORS - VERSÃO SIMPLES
// ================================

export function generateLaravelGet(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::get('${rota}', function () {
    $sql = "SELECT * FROM [sua tabela aqui]";
    $dados = DB::select($sql);
    return response()->json($dados);
});`;
}

export function generateLaravelGetById(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::get('${rota}/{id}', function ($id) {
    $sql = "SELECT * FROM [sua tabela aqui] WHERE id = {$id}";
    $dado = DB::select($sql);
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
    $sql = "INSERT INTO [sua tabela aqui] (nome, email) VALUES ('{$request->nome}', '{$request->email}')";
    DB::insert($sql);
    return response()->json(['mensagem' => 'Registro criado com sucesso'], 201);
});`;
}

export function generateLaravelPut(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::put('${rota}/{id}', function (Request $request, $id) {
    $sql = "UPDATE [sua tabela aqui] SET nome = '{$request->nome}', email = '{$request->email}' WHERE id = {$id}";
    $linhas = DB::update($sql);
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
    $sql = "DELETE FROM [sua tabela aqui] WHERE id = {$id}";
    $linhas = DB::delete($sql);
    if ($linhas == 0) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    return response()->json(['mensagem' => 'Registro deletado com sucesso']);
});`;
}

// ================================
// LARAVEL VERSÃO COM MODEL (se quiser algo mais perto do real)
// ================================

export function generateLaravelModelGet(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::get('${rota}', function () {
    $dados = ${modelUpper}::all();
    return response()->json($dados);
});`;
}

export function generateLaravelModelGetById(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::get('${rota}/{id}', function ($id) {
    $dado = ${modelUpper}::find($id);
    if (!$dado) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    return response()->json($dado);
});`;
}

export function generateLaravelModelPost(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::post('${rota}', function (Request $request) {
    $dados = ${modelUpper}::create($request->all());
    return response()->json($dados, 201);
});`;
}

export function generateLaravelModelPut(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::put('${rota}/{id}', function (Request $request, $id) {
    $dado = ${modelUpper}::find($id);
    if (!$dado) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    $dado->update($request->all());
    return response()->json($dado);
});`;
}

export function generateLaravelModelDelete(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `Route::delete('${rota}/{id}', function ($id) {
    $linhas = ${modelUpper}::destroy($id);
    if ($linhas == 0) {
        return response()->json(['erro' => 'Registro não encontrado'], 404);
    }
    return response()->json(['mensagem' => 'Registro deletado com sucesso']);
});`;
}