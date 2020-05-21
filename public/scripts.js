const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// Paginação

let totalPages = 20,
  selectedPages = 5,
  pages = [],
  oldPage;

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  const firtsAndLastPage = currentPage == 1 || currentPage == totalPages;
  const pagesAfterSelectedPage = currentPage <= selectedPages + 2;
  const pagesBeforeSelectedPage = currentPage >= selectedPages - 2;

  if (firtsAndLastPage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {
    if (oldPage && currentPage - oldPage > 2) {
      pages.push("...");
    }

    if (oldPage && currentPage - oldPage == 2) {
      pages.push(oldPage + 1);
    }
    pages.push(currentPage);

    oldPage = currentPage;
  }
}

console.log(pages);
