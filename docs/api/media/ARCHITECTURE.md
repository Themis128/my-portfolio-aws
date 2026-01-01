# My Portfolio AWS Architecture

My Portfolio AWS is a modern, cloud-native personal portfolio website built with Next.js and deployed on AWS. The project showcases professional experience, skills, and projects with a focus on cloud technologies and modern web development practices.

## System Overview

The system consists of several main components interacting with each other:

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│  Browser        │◄───────────────►│  AWS Amplify    │
│  (Portfolio)    │   Static Hosting │  (Frontend)     │
└─────────────────┘                  └─────────────────┘
        │                                        │
        │                                        │ CloudFront CDN
        ▼                                        ▼
┌─────────────────┐                     ┌─────────────────┐
│  Next.js App     │                     │  AWS S3         │
│  (SSR/SSG)       │                     │  (Assets)       │
└─────────────────┘                     └─────────────────┘
        │                                        │
        │                                        │ Route 53 DNS
        ▼                                        ▼
┌─────────────────┐                     ┌─────────────────┐
│  TypeScript     │                     │  AWS Certificate│
│  (TypeScript)   │                     │  Manager        │
└─────────────────┘                     └─────────────────┘
```

## Project Structure

The project is organized as a monorepo using:
- **pnpm workspaces** - dependency management
- **Turbo** - build system and caching
- **TypeScript** - primary development language
- **Next.js** - React framework with server-side rendering

### Main Directories

```
my-portfolio-aws/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── icons/             # Dynamic icon routes
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── ModernAboutNew.tsx # Enhanced about section
│   ├── Projects.tsx      # Featured projects
│   └── ThemeSwitcher.tsx # Dark/light theme toggle
├── lib/                  # Shared utilities
│   ├── personal-data.ts  # Professional data
│   ├── theme-context.tsx # Theme management
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── images/           # Project photos
│   └── icons/            # Technology icons
├── styles/               # Global styles
│   └── globals.css       # Tailwind imports
├── config/               # Configuration files
│   ├── biome.jsonc       # Biome linter config
│   └── extensions.json   # VS Code extensions
├── mcp-server/           # Model Context Protocol server
│   ├── index.js          # MCP server implementation
│   └── pdf-extractor.js  # PDF content extraction
└── docs/                 # Documentation
    ├── ARCHITECTURE.md   # This file
    └── AWS_AMPLIFY_SETUP.md
```

## System Components

### 1. Frontend Application (`app/`)

**Purpose**: Modern React application built with Next.js App Router, providing a responsive portfolio interface.

**Key Features**:
- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Static Site Generation (SSG)** - Optimized performance
- **TypeScript** - Type-safe development
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - User preference support

**Architecture**:
```
Next.js App Router
├── app/layout.tsx        # Root layout with theme provider
├── app/page.tsx          # Main page with all sections
├── app/icons/[...slug]/  # Dynamic icon serving
└── app/globals.css       # Global styles and Tailwind
```

### 2. UI Components (`components/`)

**Purpose**: Reusable React components built with ShadCN UI and custom implementations.

**Key Components**:
- **ModernAboutNew.tsx** - Enhanced about section with animations
- **Projects.tsx** - Featured projects display
- **ThemeSwitcher.tsx** - Theme toggle functionality
- **Navigation.tsx** - Responsive navigation menu
- **Hero.tsx** - Hero section with call-to-action

**Technology Stack**:
- **ShadCN UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Modern icon set

### 3. Data Management (`lib/`)

**Purpose**: Centralized data management and utility functions.

**Key Features**:
- **Personal Data** - Professional information and portfolio content
- **Theme Context** - Global theme state management
- **Utility Functions** - Helper functions for formatting and processing

**Data Structure**:
```typescript
interface PersonalData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  // ... other professional data
}
```

### 4. MCP Server (`mcp-server/`)

**Purpose**: Model Context Protocol server for AI integration and file processing.

**Key Features**:
- **PDF Content Extraction** - Extract text from PDF files
- **Cross-Platform File Access** - Bridge Windows and Linux file systems
- **AI Integration** - Support for MCP-compatible AI tools
- **Path Resolution** - Intelligent file path handling

**Architecture**:
```
MCP Server
├── index.js              # Main server implementation
├── pdf-extractor.js      # PDF processing utilities
├── extract-cv-content.js # CV-specific extraction
└── test-mcp-server.js    # Server testing
```

### 5. Cloud Infrastructure

**Purpose**: AWS-based hosting and content delivery.

**AWS Services**:
- **AWS Amplify** - Frontend hosting and CI/CD
- **Amazon S3** - Static asset storage
- **CloudFront** - Global content delivery network
- **Route 53** - DNS management
- **AWS Certificate Manager** - SSL/TLS certificates

**Deployment Features**:
- **Automatic Deployment** - Git-triggered builds
- **Custom Domain** - Professional domain configuration
- **HTTPS** - Secure connections
- **Global CDN** - Fast content delivery worldwide

## Development Workflow

### 1. Local Development
```
1. Clone repository
2. Install dependencies: pnpm install
3. Start development server: npm run dev
4. Hot reload for instant feedback
5. TypeScript checking and linting
```

### 2. Code Quality
- **ESLint** - JavaScript/TypeScript linting
- **Biome** - Fast linter and formatter
- **TypeScript** - Type checking
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks

### 3. Build and Deployment
```
1. Build application: npm run build
2. Deploy to AWS Amplify: Automatic via Git push
3. CDN distribution via CloudFront
4. SSL certificate management
```

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **ShadCN UI** - Component library
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Development Tools
- **pnpm** - Package manager
- **Turbo** - Build system
- **ESLint** - Linting
- **Biome** - Fast linter/formatter
- **Husky** - Git hooks
- **Playwright** - E2E testing

### Cloud Services
- **AWS Amplify** - Frontend hosting
- **Amazon S3** - Asset storage
- **CloudFront** - CDN
- **Route 53** - DNS
- **AWS Certificate Manager** - SSL/TLS

## Performance Optimizations

### 1. Next.js Features
- **Server-Side Rendering** - Fast initial loads
- **Static Site Generation** - Optimized for content
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Bundle optimization

### 2. Frontend Optimizations
- **Lazy Loading** - Component-level code splitting
- **Image Optimization** - WebP format with fallbacks
- **CSS-in-JS** - Scoped styles with Tailwind
- **Bundle Analysis** - Size monitoring

### 3. Cloud Optimizations
- **CDN Caching** - Global content delivery
- **Compression** - Gzip/Brotli compression
- **SSL/TLS** - Secure, fast connections
- **Auto-scaling** - Handle traffic spikes

## Security Features

- **HTTPS** - All connections encrypted
- **Content Security Policy** - XSS protection
- **Input Validation** - Form and data validation
- **Secure Headers** - Security headers configuration
- **Dependency Scanning** - Regular security updates

## Accessibility

- **Semantic HTML** - Proper HTML structure
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Color Contrast** - WCAG compliant colors
- **Responsive Design** - Mobile-friendly interface

## Future Enhancements

- **Blog Section** - Content management system
- **Contact Form** - Backend API integration
- **Analytics** - User behavior tracking
- **Multilingual** - Internationalization support
- **Progressive Web App** - Offline capabilities

## System Overview

The system consists of several main components interacting with each other:

```
┌─────────────────┐    WebSocket/HTTP    ┌─────────────────┐
│  Browser        │◄──────────────────►│  VSCode         │
│  (Toolbar)      │     SRPC Protocol   │  Extension      │
└─────────────────┘                     └─────────────────┘
        │                                        │
        │                                        │ MCP Protocol
        ▼                                        ▼
┌─────────────────┐                     ┌─────────────────┐
│  Web App        │                     │  AI Agents      │
│  (User's Site)  │                     │  (Cursor/Cline) │
└─────────────────┘                     └─────────────────┘
```

## Monorepo Structure

The project is organized as a monorepo using:
- **pnpm workspaces** - dependency management
- **Turbo** - build system and caching
- **TypeScript** - primary development language

### Main Directories

```
21st-extension/
├── apps/                    # Applications
│   └── vscode-extension/    # VSCode/Cursor extension
├── packages/                # Shared packages
│   ├── srpc/               # Simple RPC system
│   ├── extension-toolbar-srpc-contract/  # Communication contract
│   ├── ui/                 # UI components
│   └── typescript-config/  # TypeScript configurations
├── toolbar/                 # Browser toolbar
│   ├── core/               # Core toolbar logic
│   ├── react/              # React integration
│   ├── vue/                # Vue integration
│   └── next/               # Next.js integration
├── plugins/                 # Framework plugins
│   ├── react/              # React plugin
│   ├── vue/                # Vue plugin
│   └── angular/            # Angular plugin
└── examples/               # Usage examples
```

## System Components

### 1. VSCode Extension (`apps/vscode-extension/`)

**Purpose**: Extension for code editors (VSCode, Cursor, Windsurf) that provides the connection between toolbar and AI agents.

**Key Features**:
- Launch HTTP/WebSocket server for toolbar communication
- AI agent integration through MCP (Model Context Protocol)
- Automatic toolbar setup in projects
- Editor window discovery and switching
- Telemetry and analytics

**Архитектура**:
```
Extension
├── activation/          # Активация расширения
├── http-server/        # HTTP сервер для коммуникации
│   ├── handlers/       # Обработчики запросов (MCP, SSE)
│   └── middleware/     # Middleware (error handling)
├── mcp/               # Model Context Protocol сервер
├── services/          # Сервисы (аналитика, storage, workspace)
├── utils/             # Утилиты (агенты, парсеры, discovery)
└── webviews/          # Веб-панели для VSCode
```

**Протоколы коммуникации**:
- **HTTP REST API** - базовая коммуникация с toolbar
- **WebSocket** - реальное время обновления через SRPC
- **Server-Sent Events (SSE)** - потоковая передача данных
- **MCP** - интеграция с AI агентами

### 2. Toolbar (`toolbar/core/`)

**Назначение**: Браузерная панель инструментов, которая внедряется в веб-приложения для визуального взаимодействия с кодом.

**Ключевые возможности**:
- Выбор DOM элементов на странице
- Визуальная аннотация элементов
- Отправка промптов AI агентам с контекстом
- Поиск и подключение к расширению
- Плагинная архитектура

**Технологии**:
- **Preact** - легковесная альтернатива React
- **Shadow DOM** - изоляция стилей от основного приложения
- **Tailwind CSS** - стилизация
- **Framer Motion** - анимации

**Архитектура**:
```
Toolbar Core
├── components/         # UI компоненты
│   ├── toolbar/       # Основная toolbar
│   ├── dom-context/   # DOM селекторы
│   └── layouts/       # Макеты (desktop/mobile)
├── hooks/             # React хуки
├── services/          # Внешние сервисы (Supabase)
├── plugin-ui/         # API для плагинов
└── utils/             # Утилиты
```

### 3. SRPC (`packages/srpc/`)

**Назначение**: Simple RPC система для типизированной коммуникации между toolbar и расширением через WebSocket.

**Особенности**:
- Типизированные контракты с Zod валидацией
- Автоматическая серializация/десериализация
- Поддержка потоковых обновлений
- Обработка ошибок и переподключений

**Архитектура**:
```
SRPC
├── core.ts            # Базовые типы и WebSocket мост
├── server.ts          # Серверная часть (VSCode Extension)
├── client.ts          # Клиентская часть (Toolbar)
├── zod-contract.ts    # Создание типизированных контрактов
└── zod-bridge.ts      # Zod интеграция
```

### 4. Плагины (`plugins/*/`)

**Назначение**: Расширения функциональности toolbar для конкретных фреймворков.

**Возможности плагинов**:
- Анализ DOM элементов с учетом фреймворка
- Извлечение метаданных компонентов
- Генерация контекстной информации для AI
- Кастомные аннотации элементов

**Пример React плагина**:
```typescript
export const ReactPlugin: ToolbarPlugin = {
  displayName: 'React',
  description: 'Adds React-specific metadata',
  iconSvg: <ReactLogo />,
  pluginName: 'react',
  onContextElementHover: getSelectedElementAnnotation,
  onContextElementSelect: getSelectedElementAnnotation,
  onPromptSend: (prompt) => ({
    contextSnippets: [{
      promptContextName: 'elements-react-component-info',
      content: getSelectedElementsPrompt(prompt.contextElements),
    }]
  }),
};
```

## Поток данных

### 1. Инициализация
```
1. VSCode Extension активируется
2. Запускается HTTP сервер на порту 5746+
3. Toolbar внедряется в веб-приложение
4. Toolbar находит расширение через ping endpoint
5. Устанавливается WebSocket соединение
```

### 2. Взаимодействие с UI
```
1. Пользователь выбирает элемент на странице
2. Плагины анализируют элемент
3. Toolbar показывает аннотации
4. Пользователь пишет промпт
5. Контекст + промпт отправляется в расширение
6. Расширение передает данные AI агенту
7. Результат возвращается пользователю
```

### 3. Система плагинов
```
1. Toolbar загружает плагины из конфигурации
2. При наведении/выборе элемента вызываются хуки плагинов
3. Плагины возвращают метаданные элемента
4. При отправке промпта плагины добавляют контекст
5. Все данные агрегируются и отправляются агенту
```

## Технологические решения

### Коммуникация
- **WebSocket** - основной канал связи с расширением
- **SRPC** - типизированная RPC система поверх WebSocket
- **Zod** - валидация и типизация контрактов
- **Server-Sent Events** - потоковая передача от агентов

### UI и Frontend
- **Preact** - легковесная библиотека для toolbar
- **Shadow DOM** - изоляция стилей
- **Tailwind CSS** - утилитарный CSS фреймворк
- **Framer Motion** - библиотека анимаций

### Сборка и разработка
- **Turbo** - monorepo система сборки
- **pnpm** - пакетный менеджер
- **Vite** - сборщик для фронтенда
- **Webpack** - сборщик для VSCode расширения
- **TypeScript** - типизация

### AI интеграция
- **MCP (Model Context Protocol)** - стандарт коммуникации с AI
- Поддержка агентов: Cursor, Cline, GitHub Copilot, Windsurf, Roo Code

## Безопасность

- **CORS** - настроен для локальной разработки
- **Shadow DOM** - изоляция toolbar от основного приложения
- **Локальная коммуникация** - только между localhost компонентами
- **Валидация данных** - через Zod схемы
- **Телеметрия** - анонимная, с возможностью отключения

## Развертывание

### VSCode Extension
- Публикуется в VS Code Marketplace
- Автоматическая активация при запуске редактора
- Поддерживает auto-update

### Toolbar
- Устанавливается как npm пакет
- Интегрируется в существующие приложения
- Работает только в development режиме

### Плагины
- Отдельные npm пакеты для каждого фреймворка
- Подключаются через конфигурацию toolbar
- Могут быть кастомными для проекта

## Масштабируемость

- **Плагинная архитектура** - легко добавлять поддержку новых фреймворков
- **Monorepo** - переиспользование кода между компонентами
- **Типизированные контракты** - безопасные изменения API
- **Модульная структура** - независимые компоненты

## Мониторинг

- **Телеметрия** - анонимные метрики использования
- **Error Handling** - централизованная обработка ошибок
- **Логирование** - подробные логи для отладки
- **Analytics Service** - отслеживание ключевых событий
