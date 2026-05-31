# Panini 2026 World Cup - Sticker Tracker

A responsive, lightweight, and offline-capable single-page web application to track your Panini 2026 World Cup sticker collection progress. Designed for mobile, tablet, and desktop viewports, with a specialized single-page watermark PDF print layout for your missing stickers.

## 🚀 Live Demo
Access the live web application here: **[jortok.github.io/album-panini-fifa-2026/](https://jortok.github.io/album-panini-fifa-2026/)**

---

## ✨ Features

- **Sticker Inventory**: Track all 994 stickers including:
  - 12 Groups (A to L) with 48 countries (20 stickers per country = 960 stickers).
  - Special **FIFA World Cup** (FWC) group (20 stickers: FWC0 to FWC19).
  - Special **Coca-Cola** (CC) group (14 stickers: CC1 to CC14).
- **Three-Tier Persistent Storage**:
  - **localStorage**: Quick instant state synchronization in the browser.
  - **IndexedDB**: Persistent offline recovery cache that maintains browser handles.
  - **File System Access API**: Open and save backing JSON progress files directly to your hard drive with native browser dialogs.
- **Smart Conflict Resolution**: Evaluates timestamps (`lastUpdated`) and total progress counts to prevent data loss across caching levels.
- **Watermark-Based Missing Print Layout**: A specialized `@media print` layout that compiles a clean list of missing stickers, organized by group, with flags, compact number grids, and group watermark letters on the right, formatted to fit a single portrait page.
- **No Build Step Required**: Built with vanilla HTML, JS, CSS, and Tailwind CSS (loaded via CDN). 100% serverless static website.

---

## 📁 Project Structure

```
├── index.html                  # Main entry point (renamed from album-tracker.html)
├── .gitignore                  # Git ignore rules for hidden developer context
├── css/
│   └── styles.css              # Custom print layouts and box dimensions
├── js/
│   ├── app.js                  # App controller, rendering, and database persistence logic
│   └── sticker-names.js        # Static map naming database for the stickers catalog
├── data/
│   ├── panini-2026-data.json   # Clean starting template with all stickers set to false
│   └── panini-wc-2026-catalog.json # Catalog structure index
├── img/
│   ├── World-Cup-2026-Logo.png # Logo image used in header and print layout
│   └── coca-cola-logo.svg      # Logo image for Coca-Cola section
└── assets/
    └── design/                 # Raw SVG and design assets (.xcf, source SVGs)
```

---

## 🛠️ Usage

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/panini-2026-tracker.git
   cd panini-2026-tracker
   ```
2. Double-click `index.html` to run it locally in any modern browser, or run a local static server:
   ```bash
   npx serve .
   ```
3. Mark stickers you own by clicking on them. They will toggle blue (saved).
4. Click **Guardar** (Save) to backup your database to a local `.json` file.
5. Click **Imprimir Faltantes** (Print Missing) to generate your single-page PDF list of missing stickers.

---

## 🌐 Free Deployments

### 1. GitHub Pages (easiest)
1. Push this repository to your GitHub account.
2. In the GitHub repository, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Set the branch to `main` (or `master`) and the folder to `/ (root)`.
5. Click **Save**. Your site will be published at `https://<your-username>.github.io/<your-repo-name>/`.

### 2. Vercel / Netlify
Connect your GitHub account to either Vercel or Netlify, import the repository, and the site will be deployed automatically with continuous delivery whenever you commit changes.

---

## 📝 License
This project is open-source and free to use for personal sticker tracking.
