// Lenovo Legion Toolkit - Wiki Script

document.addEventListener("DOMContentLoaded", () => {
  initWikiSearch();
  initSidebarToggle();
  initScrollHighlight();
});

function initWikiSearch() {
  const searchInput = document.getElementById("wikiSearch");
  const menuLinks = document.querySelectorAll(".sidebar-link");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    menuLinks.forEach((link) => {
      const text = link.textContent.toLowerCase();
      const parentLi = link.parentElement;

      if (!query || text.includes(query)) {
        parentLi.style.display = "";
      } else {
        parentLi.style.display = "none";
      }
    });
  });
}

function initSidebarToggle() {
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".wiki-sidebar");

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

function initScrollHighlight() {
  const sections = document.querySelectorAll("article section[id]");
  const navLinks = document.querySelectorAll(".sidebar-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener("scroll", () => {
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    if (!currentId) return;

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}
