# 🚀 Portal Multi-filiales (Astro + Storyblok)

Este proyecto es una plataforma única de código base (**Single Codebase**) diseñada para servir a **5 filiales diferentes**. Utiliza Astro como framework y Storyblok como CMS headless para generar sitios estáticos independientes, inyectando branding y configuraciones específicas mediante variables de entorno.

---

## 🛠 Requisitos del Sistema

Para garantizar la consistencia entre los desarrollos de las 5 filiales, este proyecto requiere:

- **Node.js**: Versión definida en `.nvmrc` (v20+)
- **Gestor de paquetes**: **pnpm** (obligatorio). El uso de `npm` o `yarn` está bloqueado por script
- **Storyblok**: Tokens de acceso configurados para cada empresa y ambiente

### Instalación

```bash
# Usar la versión correcta de Node
nvm use

# Instalar dependencias (solo con pnpm)
pnpm install
```

---

## 📂 Estructura del Proyecto

```
/
├── env/                     # 🔐 Variables de entorno organizadas
│   ├── empresa1/
│   │   ├── .env.local       # Desarrollo local
│   │   ├── .env.qa          # QA
│   │   ├── .env.production  # Producción
│   │   └── .env.example     # Plantilla
│   ├── empresa2/
│   ├── empresa3/
│   ├── empresa4/
│   └── empresa5/
├── dist/                    # Salidas de build (una carpeta por empresa/ambiente)
│   ├── empresa1/
│   │   ├── qa/
│   │   └── production/
│   └── empresa2/...
├── public/
│   └── assets/
│       ├── empresa1/        # Assets específicos por empresa
│       ├── empresa2/
│       └── ...
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── layouts/             # MainLayout.astro (Layout principal)
│   ├── pages/               # Páginas Astro
│   │   ├── index.astro
│   │   └── [...slug].astro  # Rutas dinámicas de Storyblok
│   ├── storyblok/           # Componentes de Storyblok
│   └── styles/              # Estilos globales
├── astro.config.mjs         # Configuración de Astro + dotenv
├── .nvmrc                   # Versión de Node.js
└── package.json             # Scripts multi-empresa
```

---

## ⚙️ Variables de Entorno

Cada empresa tiene 3 archivos de configuración (local, qa, production) dentro de `env/empresaX/`:

### Estructura de archivos .env

```bash
env/
├── empresa1/
│   ├── .env.local       # Para desarrollo local (draft)
│   ├── .env.qa          # Para ambiente QA (draft)
│   ├── .env.production  # Para producción (published)
│   └── .env.example     # Plantilla de referencia
└── ...
```

### Variables requeridas

```env
# Token de acceso a Storyblok (NO incluir prefijo PUBLIC_)
STORYBLOK_TOKEN=tu_token_aqui

# Carpeta de la empresa en Storyblok (con prefijo PUBLIC_)
PUBLIC_SITE_FOLDER=empresa-1

# Nombre del sitio
PUBLIC_SITE_NAME="Empresa 1"

# Versión de contenido de Storyblok
PUBLIC_STORYBLOK_VERSION=draft  # o 'published' en producción
```

### Configuración inicial

1. Copia `.env.example` para cada ambiente:
   ```bash
   cp env/empresa1/.env.example env/empresa1/.env.local
   ```

2. Edita el archivo y configura las variables con los valores correctos

3. **Importante:** Los archivos `.env.*` están en `.gitignore` y **nunca deben subirse a Git**

---

## 🧞 Comandos Disponibles

### Desarrollo (Local)

```bash
pnpm dev        # Empresa 1 (por defecto)
pnpm dev:1      # Empresa 1 - Carga env/empresa1/.env.local
pnpm dev:2      # Empresa 2 - Carga env/empresa2/.env.local
```

Servidor local: **http://localhost:4321**

### Build por Ambiente

```bash
# QA
pnpm build:1:qa      # Empresa 1 QA → dist/empresa1/qa
pnpm build:2:qa      # Empresa 2 QA → dist/empresa2/qa

# Producción
pnpm build:1:prod    # Empresa 1 PROD → dist/empresa1/production
pnpm build:2:prod    # Empresa 2 PROD → dist/empresa2/production
```

### Vista previa del build

```bash
pnpm preview
```

---

## 🎨 Lógica de Branding (Theming)

El proyecto utiliza variables CSS dinámicas que se inyectan desde las variables de entorno:

### Variables de entorno de branding

```env
PUBLIC_COLOR_PRIMARY="#0055ff"
PUBLIC_COLOR_SECONDARY="#0033AA"
PUBLIC_SITE_NAME="Empresa 1"
```

### Uso en CSS

Estas variables se transforman automáticamente en:

```css
:root {
  --brand-primary: #0055ff;
  --brand-secondary: #0033AA;
}
```

### En componentes

```astro
<div style="background-color: var(--brand-primary);">
  {import.meta.env.PUBLIC_SITE_NAME}
</div>
```

**Importante:** Siempre usar las variables CSS (`var(--brand-primary)`) en lugar de colores hardcodeados para mantener el sistema multi-empresa funcionando correctamente.

---

## 🔐 Seguridad

### Variables públicas vs privadas

- **`PUBLIC_*`**: Accesibles en el cliente (frontend)
- **Sin prefijo**: Solo accesibles en el servidor (backend/build)

```env
STORYBLOK_TOKEN=xxx              # ❌ NO expuesto al cliente (seguro)
PUBLIC_SITE_FOLDER=empresa-1     # ✅ Expuesto al cliente (público)
```

### Git y secretos

- ✅ Todos los archivos `.env.*` están en `.gitignore`
- ✅ Solo `.env.example` se sube al repositorio
- ❌ **Nunca** hagas commit de archivos `.env` reales
- ✅ Usa servicios de CI/CD para inyectar variables en producción

---

## 🚀 Despliegue

### AWS S3 / CloudFront

Cada empresa se puede desplegar a su propio bucket/distribución:

```bash
# Build de producción
pnpm build:1:prod

# Subir a S3 (ejemplo)
aws s3 sync dist/empresa1/production/ s3://empresa1-bucket/
```

### Variables en CI/CD

En lugar de archivos `.env`, configura las variables directamente en tu plataforma:

- **GitHub Actions**: Repository secrets
- **AWS CodeBuild**: Variables de entorno
- **Vercel/Netlify**: Environment variables en el dashboard

---

## 📚 Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web estático
- **[Storyblok](https://www.storyblok.com)** - CMS headless
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS
- **[pnpm](https://pnpm.io)** - Gestor de paquetes
- **[dotenv](https://github.com/motdotla/dotenv)** - Carga de variables de entorno

---

## 🤝 Contribución

1. Crea una rama desde `main`
2. Realiza tus cambios
3. Asegúrate de probar con **todas las empresas** afectadas
4. Haz commit sin incluir archivos `.env`
5. Crea un Pull Request

---

## 📄 Licencia

MIT