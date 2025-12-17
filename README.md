# 🚀 Portal Multi-filiales (Astro Architecture)

Este proyecto es una plataforma única de código base (**Single Codebase**) diseñada para servir a **5 filiales diferentes**. Utiliza Astro para generar sitios estáticos independientes, inyectando branding y configuraciones específicas mediante variables de entorno.

## 🛠 Requisitos del Sistema

Para garantizar la consistencia entre los desarrollos de las 5 filiales, este proyecto impone las siguientes reglas:

- **Node.js**: Versión definida en el archivo `.nvmrc` (v22+).
- **Gestor de paquetes**: **pnpm** (obligatorio). El uso de `npm` o `yarn` está bloqueado por script.

```bash
# Para asegurar el uso de la versión de Node correcta
nvm use

# Instalación de dependencias (solo con pnpm)
pnpm install
```

## 📂 Estructura del Proyecto

/
├── dist/                # Salidas de producción (una carpeta por filial)
├── src/
│   ├── layouts/         # MainLayout.astro (Puente entre .env y CSS)
│   ├── pages/           # Rutas comunes (index.astro, etc.)
│   ├── styles/          # base.css (Estilos globales compartidos)
│   └── components/      # Componentes UI reutilizables
├── .env.empresa1...5    # Variables de branding por filial (Ignorados en Git)
├── .nvmrc               # Versión de Node.js fijada
├── .npmrc               # Configuración estricta de pnpm/engines
└── package.json         # Orquestador de scripts multi-sitio
```

## 🧞 Comandos de Desarrollo

Para trabajar en una filial específica, usa el comando correspondiente. Esto cargará los colores y el nombre de dicha empresa:
**Servidor local:** `localhost:4321`

| Comando | Descripción |
|---------|-------------|
| `pnpm dev:1` | Inicia Empresa 1 |
| `pnpm dev:2` | Inicia Empresa 2 |
| `pnpm dev:3` | Inicia Empresa 3 |
| `pnpm dev:4` | Inicia Empresa 4 |
| `pnpm dev:5` | Inicia Empresa 5 |

## `/dist`. Esto permite subir cada filial a un Bucket de S3 o distribución de CloudFront distinta.

**Build individual:** `pnpm build:1` (Genera `/dist/empresa1`)

**Build total:** `pnpm build:all` (Compila las 5 filiales secuencialmente)

## 
Build total: pnpm build:all (Compila las 5 filiales secuencialmente)

🎨 Lógica de Branding (Theming)`.env.empresaX` debe contener:

```env
PUBLIC_SITE_NAME="Nombre Real de la Empresa"
PUBLIC_COLOR_PRIMARY="#HEX_AQUI"
PUBLIC_COLOR_SECONDARY="#HEX_AQUI"
```

Estas variables se transforman en el Layout a:

- `var(--brand-primary)`
- `var(--brand-secondary)`

Cualquier componente nuevo debe utilizar estas variables para asegurar que cambie de color automáticamente según la filial ejecutada.

## 🔒 Seguridad y Git

- **Variables:** Solo las variables con prefijo `PUBLIC_` son accesibles en el frontend.
- **Git:** Los archivos `.env.empresa*` están en el `.gitignore`. Nunca subas estos archivos al repositorio.
- **Ejemplo:** Usa `.env.example`presa* están en el .gitignore. Nunca subas estos archivos al repositorio.

Ejemplo: Usa .env.example como plantilla para configurar nuevas estaciones de trabajo.