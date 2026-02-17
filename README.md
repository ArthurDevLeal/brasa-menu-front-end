# 🍽️ Virtual Menu System

Sistema completo de **cardápio virtual** para restaurantes, desenvolvido com foco em performance, escalabilidade e experiência do usuário. Permite que administradores gerenciem produtos, categorias, imagens e configurações do estabelecimento, além de visualizar métricas em tempo real.

---

## 📑 Sumário
- [✨ Visão Geral](#-visão-geral)
- [🛠️ Tecnologias](#️-tecnologias)
- [⚙️ Funcionalidades](#️-funcionalidades)
- [🔐 Autenticação](#-autenticação)
- [🖼️ Upload de Imagens](#️-upload-de-imagens)
- [📊 Métricas](#-métricas)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Como Executar](#-como-executar)
- [📌 Futuras Melhorias](#-futuras-melhorias)

---

## ✨ Visão Geral
Este sistema foi desenvolvido para digitalizar cardápios físicos, oferecendo uma solução moderna onde restaurantes podem:

- Gerenciar itens do menu
- Organizar categorias
- Controlar dados do restaurante
- Visualizar estatísticas de uso
- Atualizar conteúdo em tempo real

---

## 🛠️ Tecnologias

| Camada | Stack |
|------|------|
Frontend | React + Next.js |
Linguagem | TypeScript |
Estilização | Tailwind CSS |
Estado | Zustand |
Backend | Express |
ORM | Prisma |
Auth | JWT |
Storage | Supabase + PostgreSQL |

---

## ⚙️ Funcionalidades

### 👨‍💼 Painel Administrativo
- CRUD de produtos
- CRUD de categorias
- Configurações do restaurante
- Upload de imagens
- Visualização de métricas

### 📱 Interface do Cliente
- Navegação por categorias
- Visualização rápida de itens
- Layout responsivo
- URLs públicas para imagens

---

## 🔐 Autenticação
Sistema seguro utilizando:

- JSON Web Token (JWT)
- Rotas protegidas
- Validação de sessão

---

## 🖼️ Upload de Imagens
Integração com **Supabase Storage** para:

- Upload otimizado
- Armazenamento em nuvem
- Geração automática de URLs públicas

---

## 📊 Métricas
Painel com dados relevantes como:

- Quantidade de visualizações
- Produtos mais acessados
- Uso geral do sistema


---

## 🚀 Como Executar

### 1️⃣ Clonar repositório
```bash
git clone <repo-url>
````

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um `.env` com:

```
NEXT_PUBLIC_DB_HOST=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=
```

### 4️⃣ Rodar projeto

```bash
npm run dev
```

---

## 👨‍💻 Autor

Desenvolvido por **Arthur Leal Fernandes**

---

> Projeto criado com foco em arquitetura escalável, código limpo e experiência de usuário moderna.

