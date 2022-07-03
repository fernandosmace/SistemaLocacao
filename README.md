# Sistema de Locação

---

### Índice

- [Sistema de Locação](#sistema-de-locação)
    - [Índice](#índice)
  - [Descrição](#descrição)
      - [Tecnologias](#tecnologias)
  - [Como utilizar](#como-utilizar)
    - [Requisitos](#requisitos)
    - [Clonando o repositório](#clonando-o-repositório)
    - [Instalação](#instalação)
    - [Executando o projeto](#executando-o-projeto)
  - [Informações do Desenvolvedor](#informações-do-desenvolvedor)

---

## Descrição

Sistema de gestão de locações, com funcionalidades para realizar o cadastro de filmes, clientes e locações, além de relatórios.

O sistema teve o Backend desenvolvido em .NET 6 com EntityFramework utilizando Repository Pattern e realizando a persistência dos dados em MySql. E, o Frontend foi desenvolvido em ReactJS utilizando a biblioteca [Ant Design](https://ant.design/) e algumas outras auxiliares, como [SweetAlert](https://sweetalert.js.org/) e [MomentJS](https://momentjs.com/).

#### Tecnologias

- C#
- .NET 6
- EntityFramework Core 6
- Javascript
- React
- Ant Design

[Voltar ao começo](#sistema-de-locação)

---

## Como utilizar

### Requisitos

Para realizar a execução do projeto, verifique antes se você possui os requisitos abaixo instalados seu sistema operacional.

- Node.js
- .NET 6
- MySql

[Voltar ao começo](#sistema-de-locação)

### Clonando o repositório

Primeiramente, realize o download do repositório para o seu computador.

```bash
git clone https://github.com/fernandosmace/SistemaLocacao.git
```

[Voltar ao começo](#sistema-de-locação)

### Instalação

1. #### Instale os pacotes necessários para o Frotend

- Acesse o diretório **/ClienteApp** e execute o comando via terminal.

```
npm install
```

[Voltar ao começo](#sistema-de-locação)

2. #### Apontamento do banco de dados

- Altere o campo a ConnectionString DefaultConnection no arquivo **appsettings.json** localizado na raíz do projeto para a do seu banco de dados MySql.

```json
"ConnectionStrings": {
    "DefaultConnection": {Insira aqui a sua ConnectionString}
  }
```

[Voltar ao começo](#sistema-de-locação)

3. #### Gerar o banco de dados

   > Este passo é opcional. Caso você já tenha um banco de dados criado com a modelagem conforme a da aplicação, é possível somente apontar a Connection String, conforme o passo anterior, e pular este.\*

   3.1 Instale a ferramenta de migrações do Entity Framework via terminal em qualquer diretório.

   ```powershell
   dotnet tool install --global dotnet-ef
   ```

   3.2 Acesse o diretório raíz do projeto e execute via terminal o comando para gerar o banco de dados automaticamente.

   ```sql
   dotnet ef database update
   ```

[Voltar ao começo](#sistema-de-locação)

### Executando o projeto

Acesse o diretório raíz do projeto e execute via terminal o comando inicializar a aplicação.

```
dotnet run
```

- Acesse o Swagger pelo navegador.

  ```
  https://localhost:7273/swagger
  ```

- Acesse a interface web pelo navegador.

  > Ao realizar este acesso, o dotnet irá realizar a inicialização da interface web via **npm start** no diretório ClienteApp e automaticamente você será redirecionado para a porta 7274.

  ```
  https://localhost:7273
  ```

[Voltar ao começo](#sistema-de-locação)

---

## Informações do Desenvolvedor

- LinkedIn - [Fernando Macedo](https://www.linkedin.com/in/fsoaresmacedo/)

[Voltar ao começo](#sistema-de-locação)
