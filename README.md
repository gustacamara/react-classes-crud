# React Classes CRUD

Um sistema completo de gerenciamento de usuários construído com React, TypeScript e Vite. O projeto implementa funcionalidades de autenticação, CRUD de usuários e interface moderna com componentes reutilizáveis.

## Tecnologias Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento da aplicação
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP para comunicação com API

### Estilização e UI
- **TailwindCSS 4.1.12** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e primitivos
- **Lucide React** - Ícones modernos
- **Class Variance Authority** - Variantes de componentes
- **Tailwind Merge** - Merge inteligente de classes CSS

### Validação e Utilitários
- **Zod** - Validação de schemas e variáveis de ambiente
- **Jose** - Manipulação de tokens JWT
- **clsx** - Concatenação condicional de classes

## Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm/yarn
- Backend API rodando (por padrão em `localhost:8880`)

## Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd react-classes-crud
```

### 2. Instale as dependências
```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:8880
```

### 4. Execute o projeto
```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview

# Linting
pnpm lint
```

O projeto estará disponível em `http://localhost:5173`

## Funcionalidades Implementadas

### Sistema de Autenticação
- **Cadastro de usuários** (`/sign-up`)
  - Validação de nome de usuário (mínimo 8 caracteres)
  - Validação de CPF (11 dígitos)
  - Confirmação de senha
  - Campos: username, CPF, email, idade, senha
  
- **Login de usuários** (`/sign-in`)
  - Autenticação via email/senha
  - Armazenamento de token JWT no localStorage
  - Redirecionamento automático após login
  - Interceptador de requisições para adicionar token automaticamente

### Gerenciamento de Usuários
- **Listagem de usuários**
  - Visualização em tabela responsiva
  - Diferentes views para usuários comuns e administradores
  - Usuários comuns: veem apenas seus próprios dados
  - Administradores: veem todos os usuários do sistema

- **Edição de usuários**
  - Modal de edição com formulário completo
  - Campos editáveis: username, email, idade
  - Alteração de senha com confirmação da senha atual
  - Validação de dados antes da atualização

- **Exclusão de usuários**
  - Função de deletar usuários
  - Confirmação necessária para exclusão

### Interface e UX
- **Design System Completo**
  - Componentes reutilizáveis (Button, Input, Label, Table, Dialog)
  - Variantes de botões (default, destructive, outline, secondary, ghost, link)
  - Tamanhos responsivos (sm, default, lg, icon)
  - Sistema de cores consistente com dark mode

- **Navegação Inteligente**
  - Roteamento com React Router
  - Proteção de rotas autenticadas
  - Redirecionamento automático para login quando não autenticado
  - Layout de autenticação separado

- **Experiência do Usuário**
  - Formulários com validação em tempo real
  - Estados de loading durante submissões
  - Feedback visual para ações (alertas, mensagens)
  - Interceptadores para logout automático em caso de token expirado

### Arquitetura e Código
- **Tipagem TypeScript**
  - Interfaces bem definidas para todas as entidades
  - Tipos para formulários e respostas da API
  - Validação de ambiente com Zod

- **Organização Modular**
  - Separação clara entre componentes, páginas e serviços
  - API client configurado com interceptadores
  - Utilitários centralizados
  - Componentes UI reutilizáveis

- **Gerenciamento de Estado**
  - useState para estado local
  - localStorage para persistência de autenticação
  - React Hook Form para estados de formulário

## Estrutura do Projeto

```
src/
├── api/                 # Serviços de API
│   └── user.ts         # Funções CRUD de usuários
├── components/         # Componentes reutilizáveis
│   └── ui/            # Componentes de interface
├── lib/               # Utilitários e configurações
│   ├── axios.ts      # Cliente HTTP configurado
│   └── utils.ts      # Funções utilitárias
├── Pages/            # Páginas da aplicação
│   ├── AuthLayout.tsx    # Layout de autenticação
│   ├── Sign-in.tsx      # Página de login
│   ├── Sign-up.tsx      # Página de cadastro
│   ├── UserDataList.tsx # Lista de usuários
│   └── UserDetatails.tsx # Modal de edição
├── App.tsx           # Componente principal
├── routes.tsx        # Configuração de rotas
├── env.ts           # Validação de ambiente
└── main.tsx         # Ponto de entrada
```

## API Endpoints Utilizados

O projeto consome os seguintes endpoints:

- `POST /auth/signup` - Cadastro de usuários
- `POST /auth/signin` - Autenticação
- `GET /user` - Buscar usuários
- `PUT /updateUser` - Atualizar usuário
- `DELETE /user/:id` - Deletar usuário

## Segurança

- Tokens JWT para autenticação
- Interceptadores automáticos para logout em caso de token expirado
- Validação de dados no frontend
- Proteção de rotas sensíveis
- Headers de autorização automáticos

## Como Usar

1. **Primeiro Acesso**: Crie uma conta em `/sign-up`
2. **Login**: Faça login em `/sign-in` 
3. **Visualização**: Acesse `/` para ver seus dados (usuário comum) ou todos os usuários (administrador)
4. **Edição**: Clique no ícone de lápis para editar informações
5. **Logout**: O logout acontece automaticamente quando o token expira

## Resolução de Problemas

### CORS Error
Se você encontrar erros de CORS, configure seu backend para aceitar requisições da origem do frontend:

```javascript
// Para Express.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Token de Autorização
O sistema adiciona automaticamente o token JWT nas requisições. Certifique-se de que seu backend aceita o header `Authorization: Bearer <token>`.

## Notas de Desenvolvimento

- O projeto usa `pnpm` como gerenciador de pacotes
- TypeScript em modo strict
- ESLint configurado para React
- Vite para build e desenvolvimento
- TailwindCSS para estilização moderna

## Autor

Desenvolvido como projeto educacional - Creative Experience PUCPR

---

**Nota**: Este é um projeto acadêmico com foco em demonstrar conhecimentos em React, TypeScript e desenvolvimento frontend moderno.