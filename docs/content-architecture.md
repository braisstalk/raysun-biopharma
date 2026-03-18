# Content Architecture

This directory contains the CMS-ready content architecture for the Raysun Biopharma website.

## Overview

The content system is designed to be easily swappable between different content sources:

1. **Local (Development)** - Content stored in config files
2. **Strapi (Production)** - Content from Strapi CMS (future)
3. **Other CMS** - Easy to add new adapters

## Directory Structure

```
src/lib/content/
├── index.ts              # Main exports
├── models/               # Content type definitions
│   ├── global.ts         # Site settings, navigation
│   ├── home.ts          # Home page content model
│   ├── products.ts      # Products content model
│   ├── pages.ts        # News, Resources, Verify, Order, AI Assistant
│   └── index.ts        # Model exports
├── adapters/            # Content source adapters
│   ├── local.ts        # Local config adapter (current)
│   └── strapi.ts      # Strapi CMS adapter (placeholder)
└── services/
    └── content.ts      # Unified content service
```

## How It Works

### Current (Local Adapter)

Pages read content through the content service, which currently uses the local adapter:

```typescript
import { getHomePageContentSync } from '@/lib/content'

const content = getHomePageContentSync()
```

### Future (Strapi CMS)

To switch to Strapi:

1. Set `CONTENT_SOURCE=strapi` environment variable
2. Configure `STRAPI_URL` in environment
3. Implement the Strapi adapter to fetch from your CMS

The content service will automatically route to the appropriate adapter.

## Content Models

### Global
- Site settings (name, description, logo, contact, social)
- Navigation structure

### Home Page
- Hero section
- Stats
- About section
- Video section
- Features
- CTA sections

### Products
- Categories
- Product list with filtering
- Product detail fields
- Related products

### Pages
- News (categories, articles)
- Resources (categories, documents)
- Verify (verification types, result states)
- Order (order types, payment methods)
- AI Assistant (quick prompts, mock replies)

## Adding New Content

1. Define the model in `src/lib/content/models/`
2. Add the data to the local adapter in `src/lib/content/adapters/local.ts`
3. The page will automatically use the new content

## AI Worker / Content API

The content service provides synchronous access to content, making it easy for AI workers to:

- Read content for AI-generated responses
- Access product data for comparisons
- Get navigation structure for dynamic routing

Future API routes can be built on top of this service layer.

## Migration to Production CMS

To migrate from local content to a production CMS:

1. Set up your CMS (Strapi, Contentful, Sanity, etc.)
2. Add the adapter in `src/lib/content/adapters/`
3. Update `getContentSource()` to return your adapter
4. Configure environment variables

No changes to pages are required - the content service handles the routing.
