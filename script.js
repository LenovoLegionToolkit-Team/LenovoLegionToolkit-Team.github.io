// Lenovo Legion Toolkit Website Script

const LATEST_RELEASE_URL = "https://api.github.com/repos/LenovoLegionToolkit-Team/LenovoLegionToolkit/releases/latest";
const RELEASES_PAGE_URL = "https://github.com/LenovoLegionToolkit-Team/LenovoLegionToolkit/releases/latest";
const INSTALLER_PATTERN = /^LenovoLegionToolkitSetup-.*\.exe$/i;

document.addEventListener("DOMContentLoaded", () => {
  initReleaseFetcher();
  initScreenshotTabs();
  initFaqAccordion();
  initMobileNav();
  initCopyrightYear();
});

// 1. Fetch Latest Release Details from GitHub
async function initReleaseFetcher() {
  const versionEl = document.getElementById("releaseVersion");
  const downloadBtn = document.getElementById("primaryDownloadBtn");
  const navDownloadBtn = document.getElementById("navDownloadBtn");

  try {
    const res = await fetch(LATEST_RELEASE_URL, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const tagName = typeof data.tag_name === "string" ? data.tag_name : "";
    const assets = Array.isArray(data.assets) ? data.assets : [];
    const executables = assets.filter(asset => typeof asset.name === "string" && asset.name.toLowerCase().endsWith(".exe"));
    const installer = executables.find(asset => INSTALLER_PATTERN.test(asset.name)) ?? executables[0];

    if (installer?.browser_download_url) {
      if (downloadBtn) downloadBtn.href = installer.browser_download_url;
      if (navDownloadBtn) navDownloadBtn.href = installer.browser_download_url;
    }

    if (versionEl) {
      versionEl.textContent = tagName
        ? `Version ${tagName} \u2022 Windows 10 / 11 (x64)`
        : "Windows 10 / 11 (x64)";
    }
  } catch (err) {
    console.warn("Could not fetch latest release info from GitHub API:", err);
    if (downloadBtn) downloadBtn.href = RELEASES_PAGE_URL;
    if (versionEl) versionEl.textContent = "Windows 10 / 11 (x64)";
  }
}

// 2. Interactive Screenshot Tab Switcher
function initScreenshotTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const previewImage = document.getElementById("mockupImage");

  if (!previewImage || tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all tabs
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Switch image source with gentle fade
      const targetSrc = btn.getAttribute("data-src");
      const targetAlt = btn.getAttribute("data-alt");

      previewImage.style.opacity = "0.4";
      setTimeout(() => {
        previewImage.src = targetSrc;
        previewImage.alt = targetAlt || "Lenovo Legion Toolkit Screenshot";
        previewImage.style.opacity = "1";
      }, 120);
    });
  });
}

// 3. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.setAttribute("aria-expanded", String(item.classList.contains("active")));

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove("active");
        const otherBtn = other.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// 4. Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleBtn || !navLinks) return;

  const setOpen = open => {
    navLinks.classList.toggle("open", open);
    toggleBtn.setAttribute("aria-expanded", String(open));
  };

  toggleBtn.addEventListener("click", () => {
    setOpen(!navLinks.classList.contains("open"));
  });

  // Close nav on click of link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
}

// 5. Copyright Year
function initCopyrightYear() {
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
