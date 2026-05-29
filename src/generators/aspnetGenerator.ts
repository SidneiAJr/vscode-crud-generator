export function generateCSharpGet(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `[HttpGet]
public async Task<ActionResult<IEnumerable<${modelUpper}>>> Get${modelUpper}s()
{
    var sql = "SELECT * FROM [sua tabela aqui]";
    var dados = await _context.${modelUpper}s.FromSqlRaw(sql).ToListAsync();
    return Ok(dados);
}`;
}

export function generateCSharpGetById(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `[HttpGet("{id}")]
public async Task<ActionResult<${modelUpper}>> Get${modelUpper}ById(int id)
{
    var sql = $"SELECT * FROM [sua tabela aqui] WHERE Id = {id}";
    var dado = await _context.${modelUpper}s.FromSqlRaw(sql).FirstOrDefaultAsync();
    if (dado == null) return NotFound();
    return Ok(dado);
}`;
}

export function generateCSharpPost(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `[HttpPost]
public async Task<ActionResult<${modelUpper}>> Create${modelUpper}([FromBody] ${modelUpper} dados)
{
    var sql = $@"INSERT INTO [sua tabela aqui] (Nome, Email) 
                 VALUES ('{dados.Nome}', '{dados.Email}')";
    await _context.Database.ExecuteSqlRawAsync(sql);
    return Ok(dados);
}`;
}

export function generateCSharpPut(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `[HttpPut("{id}")]
public async Task<IActionResult> Update${modelUpper}(int id, [FromBody] ${modelUpper} dados)
{
    var sql = $@"UPDATE [sua tabela aqui] 
                 SET Nome = '{dados.Nome}', Email = '{dados.Email}' 
                 WHERE Id = {id}";
    var linhas = await _context.Database.ExecuteSqlRawAsync(sql);
    if (linhas == 0) return NotFound();
    return Ok(dados);
}`;
}

export function generateCSharpDelete(rota: string, modelName: string): string {
    const modelUpper = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase();
    
    return `[HttpDelete("{id}")]
public async Task<IActionResult> Delete${modelUpper}(int id)
{
    var sql = $"DELETE FROM [sua tabela aqui] WHERE Id = {id}";
    var linhas = await _context.Database.ExecuteSqlRawAsync(sql);
    if (linhas == 0) return NotFound();
    return NoContent();
}`;
}

// ================================
// ASP.NET CORE MINIMAL API (mais simples ainda)
// ================================

export function generateCSharpMinimalGet(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.MapGet("${rota}", async (AppDbContext db) =>
{
    var sql = "SELECT * FROM [sua tabela aqui]";
    var dados = await db.${modelName}s.FromSqlRaw(sql).ToListAsync();
    return Results.Ok(dados);
});`;
}

export function generateCSharpMinimalGetById(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.MapGet("${rota}/{id}", async (int id, AppDbContext db) =>
{
    var sql = $"SELECT * FROM [sua tabela aqui] WHERE Id = {id}";
    var dado = await db.${modelName}s.FromSqlRaw(sql).FirstOrDefaultAsync();
    return dado is null ? Results.NotFound() : Results.Ok(dado);
});`;
}

export function generateCSharpMinimalPost(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.MapPost("${rota}", async (${modelName} dados, AppDbContext db) =>
{
    var sql = $@"INSERT INTO [sua tabela aqui] (Nome, Email) 
                 VALUES ('{dados.Nome}', '{dados.Email}')";
    await db.Database.ExecuteSqlRawAsync(sql);
    return Results.Created($"{rota}/1", dados);
});`;
}

export function generateCSharpMinimalPut(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.MapPut("${rota}/{id}", async (int id, ${modelName} dados, AppDbContext db) =>
{
    var sql = $@"UPDATE [sua tabela aqui] 
                 SET Nome = '{dados.Nome}', Email = '{dados.Email}' 
                 WHERE Id = {id}";
    var linhas = await db.Database.ExecuteSqlRawAsync(sql);
    return linhas == 0 ? Results.NotFound() : Results.Ok(dados);
});`;
}

export function generateCSharpMinimalDelete(rota: string, modelName: string): string {
    const tableName = modelName.toLowerCase();
    
    return `app.MapDelete("${rota}/{id}", async (int id, AppDbContext db) =>
{
    var sql = $"DELETE FROM [sua tabela aqui] WHERE Id = {id}";
    var linhas = await db.Database.ExecuteSqlRawAsync(sql);
    return linhas == 0 ? Results.NotFound() : Results.NoContent();
});`;
}