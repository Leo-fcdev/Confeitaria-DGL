# 🍰 Confeitaria DGL - Sistema de Gerenciamento

Bem-vindo ao repositório do **Sistema de Gestão da Confeitaria DGL**. Este é uma aplicação Fullstack desenvolvida para solucionar problemas reais de um pequeno negócio, como controle de estoque, precificação de produtos e acompanhamento de pedidos.

O projeto foi desenvolvido com foco em **Automação de Processos** e **Experiência do Usuário (UX)**, permitindo que a confeitaria abandone as anotações em papel e tenha controle total sobre seus custos e lucros.

---

## 🚀 Funcionalidades Principais

O sistema conta com 4 módulos integrados:

### 1. 📊 Dashboard Interativo
Uma visão geral do negócio em tempo real.
- Mostra o **Total de Vendas** (quantidade).
- Calcula o **Lucro Estimado** somando os pedidos.
- Alerta sobre **Pedidos Pendentes** que precisam de atenção.

### 2. 📦 Gestão de Insumos (Estoque Inteligente)
Cadastro de ingredientes com controle preciso de unidades.
- Suporte para diferentes medidas: **kg, g, L, ml, un**.
- Registro de **Preço Unitário** (ex: o sistema entende que se você pagou R$ 5,00 no kg, usará R$ 0,005 por grama).

### 3. 🍰 Produtos & Ficha Técnica (O Diferencial)
Esta é a "inteligência" do sistema. Ao criar um produto (ex: Bolo de Cenoura):
- Você seleciona os ingredientes do estoque.
- O sistema **calcula automaticamente o Custo de Produção** baseado na quantidade usada.
- Ao salvar o produto, o sistema **dá baixa automática no estoque** dos insumos utilizados.

### 4. 🧾 Controle de Pedidos (PDV)
- Lançamento rápido de pedidos selecionando produtos cadastrados.
- Cálculo automático do valor total.
- Mudança de status: De **"Pendente"** para **"Entregue"**.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza uma arquitetura moderna baseada em JavaScript:

**Backend (API & Servidor):**
- **Node.js** & **Express**: Para construção da API Restful.
- **MVC Architecture**: Código organizado em Models, Views e Controllers.

**Banco de Dados:**
- **MongoDB Atlas**: Banco de dados NoSQL na nuvem.
- **Mongoose**: Para modelagem dos dados (Schemas).

**Frontend (Interface):**
- **HTML5 & CSS3**: Design responsivo e moderno (Mobile First).
- **JavaScript (Vanilla)**: Para manipulação do DOM e consumo da API (Fetch).
- **Bootstrap 5**: Para estrutura de grid e componentes visuais.

**Hospedagem (Deploy):**
- **Render**: Hospedagem da aplicação web.

---

## ⚙️ Como rodar o projeto localmente

Se você deseja testar este projeto na sua máquina, siga os passos abaixo:

### Pré-requisitos
Você precisa ter o [Node.js](https://nodejs.org/) instalado.

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/confeitaria-dgl.git](https://github.com/SEU-USUARIO/confeitaria-dgl.git)
Instale as dependências Abra o terminal na pasta do projeto e execute:

npm install


Configure as Variáveis de Ambiente Crie um arquivo chamado .env na raiz do projeto e adicione a conexão com seu banco de dados (MongoDB Local ou Atlas):

Snippet de código

MONGO_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/confeitaria
PORT=3000

Inicie o Servidor

npm start
Acesse Abra seu navegador em: http://localhost:3000

☁️ Acesso Online:
O projeto está hospedado e funcional! Você pode acessar a versão de produção através do link abaixo:

🔗 Acessar Confeitaria DGL (Live Demo) (https://confeitaria-dgl.onrender.com/dashboard.html)

👨‍💻 Desenvolvedores
Desenvolvido por Gustavo Costa, Dylan Coelho e Leonardo Freitas.

Projeto criado para fins acadêmicos e de portfólio.
Feito com 💙 e muito café.