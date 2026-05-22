import * as vscode from 'vscode';
import { generateExpressGet, generateExpressPost, generateExpressPut, generateExpressDelete } from './generators/expressGeneratorJS';
import { generateSparkGet, generateSparkPost, generateSparkPut, generateSparkDelete } from './generators/sparkGenerator';
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

        // 4. Gera os 4 CRUDs
        let codigo = '';

        switch (framework.value) {
            case 'express':
                codigo = `
${generateExpressGet(rota, modelName)}
${generateExpressPost(rota, modelName)}
${generateExpressPut(rota, modelName)}
${generateExpressDelete(rota, modelName)}`;
                break;
            case 'spark':
                codigo = `
${generateSparkGet(rota, modelName)}
${generateSparkPost(rota, modelName)}
${generateSparkPut(rota, modelName)}
${generateSparkDelete(rota, modelName)}`;
                break;
            case 'spring':
                codigo = `
${generateSpringGet(rota, modelName)}
${generateSpringPost(rota, modelName)}
${generateSpringPut(rota, modelName)}
${generateSpringDelete(rota, modelName)}`;
                break;
            case 'slim':
                codigo = `
${generateSlimGet(rota, modelName)}
${generateSlimPost(rota, modelName)}
${generateSlimPut(rota, modelName)}
${generateSlimDelete(rota, modelName)}`;
                break;
            case 'laravel':
                codigo = `
${generateLaravelGet(rota, modelName)}
${generateLaravelPost(rota, modelName)}
${generateLaravelPut(rota, modelName)}
${generateLaravelDelete(rota, modelName)}`;
                break;
            case 'aspnet':
                codigo = `
${generateCSharpGet(rota, modelName)}
${generateCSharpPost(rota, modelName)}
${generateCSharpPut(rota, modelName)}
${generateCSharpDelete(rota, modelName)}`;
                break;
        }

        // 5. Insere no arquivo
        const editor = vscode.window.activeTextEditor;
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