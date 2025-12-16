# Blog Pessoal

O **Blog Pessoal** é uma API RESTful desenvolvida com **NestJS**, projetada para gerenciar postagens, temas e usuários de um blog. O projeto inclui autenticação segura, documentação via Swagger e testes automatizados de ponta a ponta (E2E).

## 🚀 Deploy

A aplicação está disponível online através do link:
> **[https://blogpessoal-8bel.onrender.com](https://blogpessoal-8bel.onrender.com)**

Para visualizar a documentação interativa (Swagger), acesse:
> **[https://blogpessoal-8bel.onrender.com/swagger](https://blogpessoal-8bel.onrender.com/swagger)**

## 🛠️ Tecnologias Utilizadas

As principais ferramentas e bibliotecas utilizadas no desenvolvimento foram:

* **[NestJS](https://nestjs.com/)**: Framework Node.js para construção de aplicações server-side eficientes e escaláveis.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[TypeORM](https://typeorm.io/)**: ORM (Object-Relational Mapper) para interação com banco de dados.
* **Bancos de Dados Suportados**: MySQL (`mysql2`), PostgreSQL (`pg`) e SQLite (`sqlite3`).
* **Autenticação**: `Passport`, `JWT` (@nestjs/jwt) e `Bcrypt` para criptografia de senhas.
* **Testes**: `Jest` e `Supertest` para testes unitários e E2E.
* **Documentação**: `Swagger` (@nestjs/swagger).

## ✨ Funcionalidades

A API está estruturada nos seguintes módulos:

* **Usuários**: Cadastro, Login (Autenticação JWT), Atualização de perfil e Listagem.
* **Postagens**: CRUD completo (Criar, Ler, Atualizar, Deletar) de postagens.
* **Temas**: Organização das postagens por temas.
* **Segurança**: Rotas protegidas que exigem token Bearer para acesso.

## 🧪 Testes E2E (End-to-End)

O projeto inclui testes automatizados para validar os fluxos principais da aplicação, garantindo que as rotas funcionem conforme o esperado.

Os cenários cobertos nos testes de Usuário (`usuario.e2e-spec.ts`) são:

1.  **Cadastrar Usuário**: Verifica se é possível registrar um novo usuário com sucesso (Status 201).
2.  **Evitar Duplicidade**: Garante que não seja possível cadastrar dois usuários com o mesmo e-mail (Status 400).
3.  **Login**: Valida a autenticação do usuário e o recebimento do token JWT (Status 200).
4.  **Listar Usuários**: Testa o acesso à rota protegida `/usuarios/all` utilizando o token gerado (Status 200).
5.  **Atualizar Usuário**: Verifica a atualização dos dados de um usuário autenticado.

### Executando os testes

Para rodar os testes E2E localmente:

```bash
npm run test:e2e
```

## 🏁 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação em sua máquina local.

### Pré-requisitos
* **Node.js** (Versão 18 ou superior)
* **NPM** (Gerenciador de pacotes)
* **Banco de dados** MySQL ou PostgreSQL (Opcional, caso use SQLite para dev)

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/Dan2a/blog_pessoal.git](https://github.com/Dan2a/blog_pessoal.git)
   cd blog_pessoal
   ```
   
2. **Instale as dependências:**
   
    ```bash
    npm install
    ```

3. Configuração de **Variáveis de Ambiente**: Crie um arquivo *.env* na raiz do projeto com as configurações do seu banco de dados. Exemplo:
   
    ```Snippet de código
    PORT=4000
    DB_TYPE=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=sua_senha
    DB_DATABASE=blog_pessoal_db
    JWT_SECRET=sua_chave_secreta
    ```
  >Nota: O servidor roda por padrão na porta 4000 e fuso horário -03:00.

4. Execute a aplicação:
   
     ```bash
     npm run start:dev
     ```

  👨‍💻 Autor
  
  Daniel Almeida Andrade
  
  **Github: [https://github.com/Dan2a](https://github.com/Dan2a)**
  
  **Linkedin: [https://www.linkedin.com/in/d2aa1303/](https://www.linkedin.com/in/d2aa1303/)**
