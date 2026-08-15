# Desafio Fullstack Veritas - Mini Kanban

Este projeto é uma aplicação de Mini Kanban, desenvolvida como parte de um desafio fullstack. A aplicação permite aos usuários criar, ler, atualizar e excluir tarefas (CRUD), bem como movê-las entre as colunas "A Fazer", "Em Progresso" e "Concluídas".

## Estrutura do Projeto

A aplicação adota uma arquitetura Cliente-Servidor (Client-Server), com os códigos separados em dois diretórios principais:

- `backend`: API RESTful desenvolvida em Go.
- `frontend`: Single Page Application (SPA) desenvolvida em React com Vite.

---

## Como Rodar a Aplicação

### Pré-requisitos
- [Go](https://go.dev/dl/) (versão 1.20+ recomendada)
- [Node.js](https://nodejs.org/en/) (versão 18+ recomendada)

### 1. Rodando o Backend (API)

O backend roda na porta `8080`. Siga os passos abaixo:

1. Abra um terminal e navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Baixe as dependências do Go (opcional, pois o `go run` já resolve):
   ```bash
   go mod tidy
   ```
3. Inicie o servidor:
   ```bash
   go run main.go
   ```
A API estará disponível em `http://localhost:8080/tasks`.

### 2. Rodando o Frontend (Interface)

O frontend utiliza o Vite e roda, por padrão, na porta `5173`.

1. Abra um novo terminal e navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
Acesse a aplicação no navegador através do endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## Decisões Técnicas Tomadas

### Frontend
- **React + Vite**: A escolha pelo Vite junto ao React se deu pela velocidade no build e pelo Hot Module Replacement (HMR) extremamente rápido, o que agiliza significativamente o desenvolvimento em comparação com outras ferramentas.
- **Gerenciamento de Estado**: Utilizou-se os hooks nativos do React (`useState`, `useEffect`) para o gerenciamento de estados locais e busca de dados, mantendo a aplicação leve e sem a necessidade imediata de bibliotecas complexas como Redux.
- **Fetch API**: As requisições HTTP para a API foram feitas utilizando o `fetch` nativo do JavaScript, reduzindo o tamanho do bundle por não adicionar dependências extras como Axios para um caso de uso simples.

### Backend
- **Go + Gin Framework**: Go foi escolhido pela sua alta performance, simplicidade e excelente suporte à concorrência. O framework **Gin** foi utilizado para facilitar a criação e o gerenciamento das rotas HTTP, bem como a manipulação de JSON e configuração de middlewares (como o CORS).
- **Armazenamento em Memória (Prototipagem Rápida)**: Para agilizar a entrega do MVP (Produto Mínimo Viável) e focar no funcionamento da integração entre frontend e backend, os dados das tarefas estão sendo salvos temporariamente na memória RAM usando um *slice* (lista) de structs. 
- **Preparação para Banco de Dados**: Apesar de utilizar dados em memória na versão atual, o arquivo `go.mod` já conta com a dependência oficial do MongoDB (`go.mongodb.org/mongo-driver/v2`), indicando que a arquitetura foi planejada para que a camada de persistência seja facilmente substituída por um banco de dados real em futuras iterações (MongoDB).
- **Separação de Responsabilidades (MVC/Controller)**: O código foi estruturado dividindo a lógica de rotas (`main.go`), as definições de modelo (`model/TarefaModel.go`) e a regra de negócio e tratamentos das requisições (`controller/TarefaController.go`). Isso garante um código mais legível e escalável.
