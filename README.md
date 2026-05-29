# Basic Crud Generator | Crud Basico de Rotas

---
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

## 🎯 Para quem é essa extensão?

Esta extensão foi criada para **acelerar o aprendizado e a prototipagem**.

Ela é ideal para:
- 🧑‍🎓 **Estudantes** que querem ver a estrutura de um CRUD funcionando
- ⚡ **Desenvolvedores** que precisam de um ponto de partida rápido para uma POC (prova de conceito)
- 🧪 **Testes** de integração ou validação de modelos

**Ela NÃO foi feita para:**
- ❌ Gerar código pronto para produção sem revisão
- ❌ Ignorar boas práticas de segurança
- ❌ Substituir a necessidade de entender o que o código faz

👉 **Use como base, estude o código gerado, adapte para seu contexto e só então coloque em produção.**

O código gerado é um ponto de partida, não um produto final.

Gera CRUD completo (GET, POST, PUT, DELETE) para múltiplos frameworks.

---

## 🚀 Frameworks suportados

- **Express** (Node.js/JavaScript)
- **Spark** (Java)
- **Spring Boot** (Java)
- **Slim** (PHP)
- **Laravel** (PHP)
- **ASP.NET Core** (C#)

---

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
