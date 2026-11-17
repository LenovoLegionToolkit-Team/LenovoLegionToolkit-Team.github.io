# Lenovo Legion Toolkit — Official Website

This folder contains the complete source code for the Lenovo Legion Toolkit landing page, hosted at:
**`https://lenovolegiontoolkit-team.github.io/`**

---

## 🛠️ How to Preview Locally

Because the website is built with vanilla HTML5, CSS3, and modern JavaScript, it has **zero dependencies** and requires no build steps:

1. **Directly in Browser:** Double-click `index.html` to open it in Chrome, Edge, or Firefox.
2. **Or via Local Web Server (Recommended):**
   ```bash
   # Using Python:
   python -m http.server 8000

   # Or using Node / npx:
   npx serve .
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🚀 How to Publish to GitHub Pages

To publish this website under your official organization URL (`https://lenovolegiontoolkit-team.github.io/`):

1. **Create the repository on GitHub:**
   * Go to [GitHub New Repository](https://github.com/organizations/LenovoLegionToolkit-Team/repositories/new).
   * Name the repository exactly: **`lenovolegiontoolkit-team.github.io`**.
   * Make it **Public**.
2. **Push the `website/` folder to that repository:**
   Open a terminal inside the `website/` folder:
   ```bash
   cd website
   git init -b main
   git add .
   git commit -m "Initial commit of Lenovo Legion Toolkit landing page"
   git remote add origin https://github.com/LenovoLegionToolkit-Team/lenovolegiontoolkit-team.github.io.git
   git push -u origin main
   ```
3. **Enable GitHub Pages (if not automatically enabled):**
   * On GitHub, go to your new repo: **Settings** $\rightarrow$ **Pages**.
   * Under **Build and deployment > Source**, select **Deploy from a branch**.
   * Select branch: **`main`** and folder: **`/ (root)`**, then click **Save**.

Your site will be live within 60 seconds at `https://lenovolegiontoolkit-team.github.io/`!

---

## 🎨 Theme & Architecture
* **Theme Colors:** Deep slate (`#090B0E`), card surfaces (`#161A23`), and iconic Legion Red accent (`#FF2121`, matching LLT's native Windows 11 `ThemeManager.cs`).
* **Dynamic GitHub Integration:** `script.js` queries the GitHub Releases API on page load to automatically display the latest version tag and direct installer link.
* **Responsive Layout:** Optimized for mobile phones, tablets, and ultra-wide desktop monitors.
