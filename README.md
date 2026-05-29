# CRUD Generator - VS Code Extension

## ⚠️ AVISO IMPORTANTE

Este gerador cria um **ESQUELETO** de código para agilizar o desenvolvimento.

**Antes de usar em produção, você DEVE:**
- Substituir concatenação de strings por **prepared statements** (`?` + array de valores)
- Adicionar **validação de dados** (nunca confie no usuário)
- Implementar **autenticação e autorização**
- Configurar **tratamento de erros adequado**

O código gerado é um **ponto de partida**, não um produto final.

🔒 **Segurança é sua responsabilidade.**

---

O código gerado é um ponto de partida, não um produto final.

Gera CRUD completo (GET, POST, PUT, DELETE) para múltiplos frameworks.

## 🚀 Frameworks suportados

- **Express** (Node.js/JavaScript)
- **Spark** (Java)
- **Spring Boot** (Java)
- **Slim** (PHP)
- **Laravel** (PHP)
- **ASP.NET Core** (C#)

## 📦 Como usar

1. Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
2. Digite `CRUD Generator: Criar CRUD`
3. Selecione o framework desejado
4. Digite o nome do modelo (ex: `Usuario`, `Produto`)
5. Digite a rota base (ex: `/usuarios`)
6. O código será gerado automaticamente no arquivo aberto!

## 🔧 Requisitos

- VS Code 1.115.0 ou superior
- Node.js instalado

## 📄 Licença

MIT

## 👨‍💻 Autor

🔗 [GitHub](https://github.com/SidneiAJr/vscode-crud-generator)
