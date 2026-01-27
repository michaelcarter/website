## Tech Stack

- **HTML**: Generated from Pug templates
- **CSS**: Generated from SCSS
- **Build**: Webpack 5

## Components & SCSS

### Components
- Each component in `src/mixins` has a corresponding SCSS file in `src/assets/styles/`, e.g. `src/mixins/navigation.pug` has a matching `src/assets/styles/navigation.scss` file

### Entry points
- `main.scss` - Primary stylesheet (imports all components)
- `blog.scss` - Blog-specific styles

### CSS Methodology
We use BEM (Block, Element, Modifier) naming:

```scss
.block {}              // Block
.block__element {}     // Element (double underscore)
.block--modifier {}    // Modifier (double hyphens)
```

Examples from codebase:
```scss
.header {}
.header__title {}
.header__subtitle {}

.button {}
.button--primary {}

.navigation__link {}
.navigation__link--cta {}
.navigation__link--active {}
```

### Commands

```bash
npm run build:assets   # Production build
npm run dev            # Dev server with hot reload
```

## RSS Feed
**Location**: `src/pages/rss.xml`

**Important**: Update RSS feed when adding new blog posts or articles. Add new `<item>` entries with:
- `<title>` - Article title
- `<pubDate>` - RFC 822 date format (e.g., `Mon, 13 Jan 2026 00:00:00 +0000`)
- `<link>` - Full URL
- `<guid>` - Same as link
- `<description>` - Brief summary

## Design Tokens

Variables defined in `_variables.scss`:

## Adding Content

### New Blog Post
1. Create `.pug` file in `src/pages/posts/`
2. Extend `base.pug`, include blog mixins
3. **Update `src/pages/rss.xml`** with new entry
4. Sitemap auto-generates on build

### New Article
1. Create `.pug` file in `src/pages/articles/`
2. **Update `src/pages/rss.xml`** with new entry

## Making visual changes

- The development server runs at http://localhost:3000 (always check whether there’s one running before attempting to start a new one.
- Use the frontend-design skill for any changes that require you build new user interfaces.
- After making visual changes, if "claude in chrome" is enabled, you MUST check for issues at small, medium, and large viewport sizes.
