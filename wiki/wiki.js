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

  const setOpen = (open) => {
    sidebar.classList.toggle("open", open);
    toggleBtn.setAttribute("aria-expanded", String(open));
  };

  toggleBtn.addEventListener("click", () => {
    setOpen(!sidebar.classList.contains("open"));
  });

  sidebar.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function initScrollHighlight() {
  const sections = document.querySelectorAll("article section[id]");
  const navLinks = document.querySelectorAll(".sidebar-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  let scheduled = false;

  const highlight = () => {
    scheduled = false;

    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    let currentId = "";

    if (atBottom) {
      currentId = sections[sections.length - 1].getAttribute("id");
    } else {
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          currentId = section.getAttribute("id");
        }
      });
    }

    if (!currentId) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(highlight);
  });

  highlight();
}
