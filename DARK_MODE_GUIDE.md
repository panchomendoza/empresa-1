# Guía de Modo Oscuro con Colores Dinámicos de Storyblok

## 🎨 Cómo funciona

La implementación combina:
- **CSS Variables** para colores dinámicos de Storyblok
- **Tailwind Dark Mode** con clase `dark`
- **Variables semánticas** que cambian según el tema
- **localStorage** para persistir la preferencia del usuario

## 📐 Arquitectura

### 1. Variables de Color Dinámicas (desde Storyblok)
Estas se definen en `MainLayout.astro` y provienen de Storyblok:
- `--brand-primary`: Color primario de la marca
- `--brand-secondary`: Color secundario de la marca
- `--brand-bg`: Color de fondo personalizado
- `--brand-radius`: Radio de borde

### 2. Variables de Tema (claro/oscuro)
Definidas en `global.css`:

**Modo Claro:**
```css
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;
--text-primary: #0f172a;
--text-secondary: #64748b;
```

**Modo Oscuro:**
```css
--bg-primary: #0f172a;
--bg-secondary: #1e293b;
--text-primary: #f8fafc;
--text-secondary: #cbd5e1;
```

## 🛠️ Uso en Componentes

### Clases de Tailwind disponibles:

#### Colores de Marca (desde Storyblok):
```html
<button class="bg-brand-primary text-white">
  Botón con color primario
</button>

<div class="bg-brand-secondary">
  Fondo con color secundario
</div>
```

#### Colores de Tema (cambian con dark mode):
```html
<!-- Fondo que se adapta al tema -->
<div class="bg-primary">
  Este fondo es blanco en modo claro y oscuro en modo oscuro
</div>

<!-- Texto que se adapta al tema -->
<p class="text-primary">
  Este texto es oscuro en modo claro y claro en modo oscuro
</p>

<p class="text-secondary">
  Texto secundario que también se adapta
</p>
```

#### Variantes Dark de Tailwind:
```html
<div class="bg-white dark:bg-gray-900">
  Fondo blanco en modo claro, gris oscuro en modo oscuro
</div>

<h2 class="text-gray-900 dark:text-white">
  Título que cambia de color
</h2>

<button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
  Botón con estados hover para ambos modos
</button>
```

## 📦 Componentes Creados

### ThemeToggle.astro
Botón para cambiar entre modo claro y oscuro:
```astro
import ThemeToggle from './ThemeToggle.astro';

<ThemeToggle />
```

Ya está incluido en el `Header.astro`.

## 🎯 Mejores Prácticas

### 1. Para Fondos
```html
<!-- Usa variables semánticas -->
<div class="bg-primary">
  Se adapta automáticamente al tema
</div>

<!-- O usa variantes dark -->
<div class="bg-white dark:bg-slate-900">
  Control manual por tema
</div>
```

### 2. Para Textos
```html
<!-- Variables semánticas -->
<p class="text-primary">Texto principal</p>
<p class="text-secondary">Texto secundario</p>

<!-- Variantes dark -->
<h1 class="text-gray-900 dark:text-white">Título</h1>
```

### 3. Para Bordes
```html
<div class="border border-gray-200 dark:border-gray-700">
  Borde que se adapta
</div>
```

### 4. Para Componentes de Storyblok
En tus componentes de Storyblok (como Hero.astro, etc.):

```astro
<section class="py-16 bg-primary">
  <div class="container">
    <h1 class="text-brand-primary">
      {blok.title}
    </h1>
    <p class="text-secondary">
      {blok.description}
    </p>
    <button class="bg-brand-primary text-white px-6 py-3 rounded-brand">
      {blok.cta_text}
    </button>
  </div>
</section>
```

## 🔧 Personalización

### Agregar colores de tema personalizados en Storyblok

Si quieres que ciertos colores también cambien en modo oscuro, puedes:

1. **Agregar campos en Storyblok** (en settings):
   - `color_primary_dark`
   - `color_secondary_dark`

2. **Actualizar MainLayout.astro**:
```astro
const primaryDark = branding?.color_primary_dark || '#ffffff';
const secondaryDark = branding?.color_secondary_dark || '#e0e0e0';
```

3. **Aplicar en el style**:
```astro
<style is:global define:vars={{ 
  primary, 
  secondary, 
  primaryDark, 
  secondaryDark,
  backgroundColor, 
  borderRadius 
}}>
  :root {
    --brand-primary: var(--primary);
    --brand-secondary: var(--secondary);
  }
  
  .dark {
    --brand-primary: var(--primaryDark);
    --brand-secondary: var(--secondaryDark);
  }
</style>
```

## 🚀 Testing

Para probar:
1. Haz clic en el botón de sol/luna en el header
2. El tema debería cambiar inmediatamente
3. Recarga la página - la preferencia se mantiene
4. Abre en modo incógnito - respeta la preferencia del sistema operativo

## 📱 Adaptación por Sistema

El script en `MainLayout.astro` detecta automáticamente:
- Si hay preferencia guardada en localStorage
- Si no, usa la preferencia del sistema operativo (`prefers-color-scheme`)
