# 🍰 Backend - Confeitaria DGL

API desenvolvida em Node.js para o sistema de gestão da Confeitaria. Este projeto é responsável por gerenciar o estoque (insumos), precificação e o catálogo de vendas.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:
* **Node.js** (Versão 18 ou superior)
* **Git**

---

## 🚀 Passo a Passo de Instalação

### 1. Clonar e Instalar
Baixe o projeto e instale as bibliotecas necessárias:

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO_GITHUB/NOME_DO_REPO.git

# Entre na pasta
cd NOME_DO_REPO

# Instale as dependências
npm install
```

### 2. Configuração de Segurança (.env) ⚠️ IMPORTANTE

O arquivo de configuração com as senhas **não** está no GitHub por segurança. Você precisa criar esse arquivo manualmente.

1.  Crie um arquivo chamado `.env` na **raiz** do projeto (na mesma pasta do `package.json`).
2.  Copie o conteúdo abaixo e cole dentro dele.
3.  **Substitua** `SEU_USUARIO` e `SUA_SENHA` pelas credenciais que mandei no grupo do WhatsApp.

```env
# Configuração do Banco de Dados
MONGO_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.zn2dwdu.mongodb.net/confeitaria?retryWrites=true&w=majority

# Porta do Servidor
PORT=3001
```

### 3. Rodar o Servidor
Agora é só iniciar a API. Use o comando abaixo para que o servidor reinicie automaticamente se você alterar algum código:

```bash
npm run dev
```

Se tudo der certo, você verá no terminal:
> 🚀 Servidor rodando na porta 3001
> ✅ BANCO DE DADOS CONECTADO!

---

## 🔗 Documentação da API (Endpoints)

Aqui estão as rotas que o Frontend deve consumir.

### 📦 1. Insumos (Estoque)
Gerenciamento de matéria-prima (ex: Farinha, Leite Condensado).

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `http://localhost:3001/insumos` | Lista todo o estoque. |
| **POST** | `http://localhost:3001/insumos` | Cadastra um item novo. |

**Exemplo de JSON para Cadastro (POST):**
```json
{
  "nome": "Leite Condensado",
  "unidade": "lata",
  "preco": 6.50,
  "quantidade_estoque": 10
}
```

### 🎂 2. Produtos (Cardápio)
Gerenciamento dos doces à venda. Cada produto tem uma ficha técnica (receita).

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `http://localhost:3001/produtos` | Lista o cardápio completo. |
| **POST** | `http://localhost:3001/produtos` | Cria um produto vinculado aos ingredientes. |

**Exemplo de JSON para Cadastro (POST):**
*Nota: Para preencher o `insumo_id`, copie o ID de um insumo criado anteriormente.*

```json
{
  "nome": "Bolo de Pote - Brigadeiro",
  "imagem": "https://link-da-imagem.com/foto.jpg",
  "preco_venda": 15.00,
  "ingredientes": [
    {
      "insumo_id": "65e8a1b2c3d4e5f6...", 
      "nome_insumo": "Leite Condensado",
      "qtd_necessaria": 0.5
    },
    {
      "insumo_id": "65e8a1b2c3d4e5f7...", 
      "nome_insumo": "Chocolate em Pó",
      "qtd_necessaria": 50
    }
  ]
}
```

---

## ❓ Solução de Problemas

**Erro: "MongoServerError: bad auth"**
* **Causa:** Usuário ou senha errados no arquivo `.env`.
* **Solução:** Verifique se não tem espaços extras na senha e se você colocou o usuário correto.

**Erro: "MongooseError: The `uri` parameter... must be a string"**
* **Causa:** O sistema não achou o arquivo `.env`.
* **Solução:** Verifique se o arquivo `.env` está na raiz (junto com `package.json`) e não dentro da pasta `src`.

---

## 🛠 Tecnologias
* Node.js + Express
* MongoDB Atlas + Mongoose
* Cors