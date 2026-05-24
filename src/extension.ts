import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { generateExpressGet as generateExpressGetJS, generateExpressPost as generateExpressPostJS, generateExpressPut as generateExpressPutJS, generateExpressDelete as generateExpressDeleteJS, packjson, getJSImports } from './generators/expressGeneratorJS';
import { generateExpressGet as generateExpressGetTS, generateExpressPost as generateExpressPostTS, generateExpressPut as generateExpressPutTS, generateExpressDelete as generateExpressDeleteTS, TSImports } from './generators/expressGeneratorTS';
import { generateSparkGet, generateSparkPost, generateSparkPut, generateSparkDelete, pomxml } from './generators/sparkGenerator';
import { generateSpringGet, generateSpringPost, generateSpringPut, generateSpringDelete } from './generators/springGenerator';
import { generateSlimGet, generateSlimPost, generateSlimPut, generateSlimDelete } from './generators/slimGenerator';
import { generateLaravelGet, generateLaravelPost, generateLaravelPut, generateLaravelDelete } from './generators/laravelGenerator';
import { generateCSharpGet, generateCSharpPost, generateCSharpPut, generateCSharpDelete } from './generators/aspnetGenerator';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 CRUD Generator ativado!');

    let disposable = vscode.commands.registerCommand('crud-generator.gerar', async () => {

        // 1. Usuário escolhe o framework
        const framework = await vscode.window.showQuickPick(
            [
                { label: '🚀 Express (Node.js/JavaScript)', value: 'express' },
                { label: '☕ Spark (Java)', value: 'spark' },
                { label: '🍃 Spring Boot (Java)', value: 'spring' },
                { label: '🐘 Slim (PHP)', value: 'slim' },
                { label: '🦉 Laravel (PHP)', value: 'laravel' },
                { label: '🔷 ASP.NET Core (C#)', value: 'aspnet' }
            ],
            { placeHolder: '📌 Selecione o framework' }
        );
        if (!framework) return;

        // 2. Usuário digita o nome do modelo
        const modelName = await vscode.window.showInputBox({
            prompt: '📦 Nome do modelo (ex: Usuario, Produto)',
            placeHolder: 'Usuario'
        });
        if (!modelName) return;

        // 3. Usuário digita a rota
        const rota = await vscode.window.showInputBox({
            prompt: '🔗 Rota base (ex: /usuarios)',
            placeHolder: `/${modelName.toLowerCase()}s`,
            value: `/${modelName.toLowerCase()}s`
        });
        if (!rota) return;

        // ================================
        // EXTRA: GERAR package.json / pom.xml / IMPORTS
        // ================================
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const dirPath = path.dirname(editor.document.uri.fsPath);
            const isTypeScript = editor.document.languageId === 'typescript';

            // Express: package.json + imports
            if (framework.value === 'express') {
                // Pergunta sobre package.json
                const gerarPackage = await vscode.window.showInformationMessage(
                    '📦 Gerar package.json com dependências (Express, MySQL, JWT, bcrypt)?',
                    'Sim', 'Não'
                );
                if (gerarPackage === 'Sim') {
                    const packagePath = path.join(dirPath, 'package.json');
                    fs.writeFileSync(packagePath, packjson());
                    vscode.window.showInformationMessage('✅ package.json criado! Rode `npm install`');
                }

                // Pergunta sobre imports
                const gerarImports = await vscode.window.showInformationMessage(
                    '🔌 Adicionar imports padrão (Express, MySQL, JWT, bcrypt)?',
                    'Sim', 'Não'
                );
                if (gerarImports === 'Sim') {
                    const imports = isTypeScript ? TSImports() : getJSImports();
                    const edit = new vscode.WorkspaceEdit();
                    edit.insert(editor.document.uri, new vscode.Position(0, 0), imports + '\n\n');
                    await vscode.workspace.applyEdit(edit);
                }
            }

            // Spark: pom.xml
            if (framework.value === 'spark') {
                const gerarPom = await vscode.window.showInformationMessage(
                    '📦 Gerar pom.xml com dependências (Spark, Gson, MySQL, Lombok)?',
                    'Sim', 'Não'
                );
                if (gerarPom === 'Sim') {
                    const pomPath = path.join(dirPath, 'pom.xml');
                    fs.writeFileSync(pomPath, pomxml());
                    vscode.window.showInformationMessage('✅ pom.xml criado! Rode `mvn compile`');
                }
            }
        }

        // 4. Gera os 4 CRUDs
        let codigo = '';
        const isTypeScript = editor ? editor.document.languageId === 'typescript' : false;

        switch (framework.value) {
            case 'express':
                if (isTypeScript) {
                    codigo = `
${generateExpressGetTS(rota, modelName)}
${generateExpressPostTS(rota, modelName)}
${generateExpressPutTS(rota, modelName)}
${generateExpressDeleteTS(rota, modelName)}`;
                } else {
                    codigo = `
${generateExpressGetJS(rota, modelName)}
${generateExpressPostJS(rota, modelName)}
${generateExpressPutJS(rota, modelName)}
${generateExpressDeleteJS(rota, modelName)}`;
                }
                break;
            case 'spark':
                codigo = `
${generateSparkGet(rota, modelName)}
${generateSparkPost(rota, modelName)}
${generateSparkPut(rota, modelName)}
${generateSparkDelete(rota, modelName)}`;
                break;
            // ... outros frameworks
        }

        // 5. Insere o código no arquivo
        if (editor) {
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, codigo);
            });
            vscode.window.showInformationMessage(`✅ CRUD completo gerado para ${modelName} em ${framework.label}!`);
        } else {
            vscode.window.showErrorMessage('❌ Abra um arquivo primeiro!');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}