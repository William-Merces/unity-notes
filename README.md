# Unity Notes - Documentação Completa

## Visão Geral
Unity Notes é uma aplicação web desenvolvida para facilitar o acompanhamento de aulas da Escola Dominical. Os professores podem selecionar discursos, marcar destaques e criar perguntas, enquanto os alunos podem acompanhar em tempo real, participar de discussões e adicionar suas próprias anotações.

## Estrutura do Projeto

```
unity-notes/
├── package.json                # Configurações e dependências do projeto
├── tsconfig.json              # Configurações do TypeScript
├── next.config.js             # Configurações do Next.js
├── tailwind.config.ts         # Configurações do Tailwind CSS
├── public/                    # Arquivos estáticos
└── src/                       # Código fonte
    ├── app/                   # Diretório principal do Next.js
    ├── components/            # Componentes React
    ├── contexts/              # Contextos globais
    ├── types/                 # Definições de tipos
    └── utils/                 # Utilitários
```

## Detalhamento dos Arquivos

### Configuração
1. **package.json**
   ```json
   {
     "dependencies": {
       "@emotion/react": "^11.11.1",
       "@mui/material": "^5.14.20",
       "next": "14.0.4",
       "react": "^18.2.0",
       "tailwindcss": "^3.0.0"
     }
   }
   ```
   - Gerencia dependências e scripts
   - Define configurações do projeto

2. **next.config.js**
   - Configurações do Next.js
   - Otimizações de build
   - Configurações de ambiente

### Estrutura src/

#### 1. app/
- **layout.tsx**
  - Layout principal da aplicação
  - Configurações globais de tema
  - Providers principais

- **page.tsx**
  - Página inicial da aplicação
  - Ponto de entrada principal
  - Configuração de rotas

- **globals.css**
  - Estilos globais
  - Configurações do Tailwind
  - Variáveis CSS customizadas

#### 2. components/

##### Layout/
- **AppBar.tsx** & **DynamicAppBar.tsx**
  - Barra superior da aplicação
  - Título e navegação principal
  - Menu de opções

- **BottomNav.tsx**
  - Navegação inferior
  - Acesso às principais seções
  - Design mobile-first

- **MuiLayout.tsx**
  - Configuração do Material-UI
  - Tema e estilos base
  - Estrutura comum

- **ShareDialog.tsx**
  - Dialog de compartilhamento
  - Integração com redes sociais
  - Opções de compartilhamento

##### Lesson/
- **BasicInfo.tsx**
  - Informações básicas da aula
  - Detalhes de orações e hinos
  - Links relevantes

- **Highlights.tsx**
  - Destaques do discurso
  - Sistema de marcação
  - Compartilhamento de trechos

- **Questions.tsx**
  - Sistema de perguntas
  - Enquetes interativas
  - Perguntas anônimas

- **Scriptures.tsx**
  - Gerenciamento de escrituras
  - Referências e textos
  - Sistema de busca

- **TalkSelector.tsx**
  - Seleção de discursos
  - Interface de busca
  - Visualização de conteúdo

##### UI/
- **ContentCard.tsx**
  - Componente base para conteúdo
  - Layout padronizado
  - Estilos reutilizáveis

- **LoadingSpinner.tsx**
  - Indicador de carregamento
  - Feedback visual
  - Estados de loading

#### 3. contexts/
- **LessonContext.tsx**
  - Estado global da aula
  - Gerenciamento de dados
  - Compartilhamento de estado

#### 4. types/
- **index.ts**
  - Tipos TypeScript
  - Interfaces do sistema
  - Definições de dados

#### 5. utils/
- **constants.ts**
  - Constantes globais
  - URLs base
  - Configurações estáticas

- **createEmotionCache.ts**
  - Cache do Emotion
  - Otimização de CSS
  - Configuração do MUI

- **scriptureUtils.ts**
  - Funções para escrituras
  - Parse de referências
  - Formatação de textos

- **share.ts**
  - Funções de compartilhamento
  - Integração social
  - URLs dinâmicas

## Funcionalidades Principais

1. **Gestão de Aulas**
   - Seleção de discursos
   - Marcação de destaques
   - Criação de perguntas

2. **Interatividade**
   - Participação em tempo real
   - Enquetes e discussões
   - Perguntas anônimas

3. **Compartilhamento**
   - Integração com redes sociais
   - Compartilhamento de destaques
   - Exportação de anotações

4. **Acessibilidade**
   - Design responsivo
   - Interface intuitiva
   - Suporte mobile

## Dependências Principais

1. **Framework**
   - Next.js 14
   - React 18
   - TypeScript

2. **UI/UX**
   - Material-UI
   - Tailwind CSS
   - Emotion

3. **Utilitários**
   - ESLint
   - Prettier
   - TypeScript

## Configuração de Desenvolvimento

1. **Instalação**
   ```bash
   npm install
   ```

2. **Desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

## Próximos Passos

1. **Funcionalidades Planejadas**
   - Sistema de autenticação
   - Persistência de dados
   - Modo offline
   - Notificações push
   - Histórico de aulas

2. **Melhorias Técnicas**
   - Otimização de performance
   - Testes automatizados
   - PWA
   - Cache avançado

3. **Expansões**
   - Suporte a múltiplas classes
   - Sistema de administração
   - Analytics
   - Exportação de dados