// Lenovo Legion Toolkit Website Script

document.addEventListener("DOMContentLoaded", () => {
  initReleaseFetcher();
  initScreenshotTabs();
  initFaqAccordion();
  initMobileNav();
});

// 1. Fetch Latest Release Details from GitHub
async function initReleaseFetcher() {
  const versionEl = document.getElementById("releaseVersion");
  const downloadBtn = document.getElementById("primaryDownloadBtn");
  const fallbackUrl = "https://github.com/LenovoLegionToolkit-Team/LenovoLegionToolkit/releases/latest";

  try {
    const res = await fetch("https://api.github.com/repos/LenovoLegionToolkit-Team/LenovoLegionToolkit/releases/latest");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    const tagName = data.tag_name || "Latest";
    
    // Find installer asset (.exe)
    let downloadUrl = fallbackUrl;
    if (Array.isArray(data.assets)) {
      const installerAsset = data.assets.find(a => a.name.endsWith(".exe") && !a.name.includes("Dev"));
      if (installerAsset && installerAsset.browser_download_url) {
        downloadUrl = installerAsset.browser_download_url;
      }
    }

    if (versionEl) {
      versionEl.textContent = `Version ${tagName}`;
    }

    if (downloadBtn) {
      downloadBtn.href = downloadUrl;
      const subtext = downloadBtn.querySelector(".version-subtext");
      if (subtext) {
        subtext.textContent = `Download ${tagName} (Windows 10/11)`;
      }
    }
  } catch (err) {
    console.warn("Could not fetch latest release info from GitHub API:", err);
    if (downloadBtn) downloadBtn.href = fallbackUrl;
    if (versionEl) versionEl.textContent = "Latest Release";
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

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(i => i.classList.remove("active"));

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// 4. Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close nav on click of link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}
