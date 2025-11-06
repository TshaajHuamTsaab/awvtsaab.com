function renderBooks(containerId, books) {
  const container = document.getElementById(containerId);
  const grid = document.createElement("div");
  grid.className = "book-grid";

  books.forEach(book => {
    const bookDiv = document.createElement("a");
    bookDiv.href = book.link;
    bookDiv.className = "book";
    bookDiv.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
      </div>
    `;
    grid.appendChild(bookDiv);
  });

  container.appendChild(grid);
}

renderBooks("iqBooks", iqBooks);
renderBooks("eqBooks", eqBooks);
