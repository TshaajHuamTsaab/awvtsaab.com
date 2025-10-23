// Book data and rendering logic
    // Book data
    const completedBooks = [
      { title:"趋吉避凶-叔敖", author:"叶夫根尼·普里戈任", cover:"https://i.postimg.cc/x1jWMsn3/images.jpg", link:"wagner.html?book=book1" },
      { title:"21世纪21堂课", author:"Yuval Noah Harari", cover:"https://i.postimg.cc/vTQ1GFwy/6.jpg", link:"21century.html" },
      { title:"乌合之众", author:"古斯塔夫·勒庞", cover:"https://i.postimg.cc/qMN7SM1m/image.jpg", link:"reader2.html?book=book1&chapter=cover" },
      { title:"低调影人", author:"叔敖", cover:"https://i.postimg.cc/tT5TPWr9/1.jpg", link:"reader2.html?book=book2&chapter=cover" },
      { title:"人性的弱点", author:"戴尔·卡耐基", cover:"https://i.postimg.cc/d3pK4r6P/5.jpg", link:"reader2.html?book=book3&chapter=cover" },
      { title:"习惯的力量", author:"查尔斯·杜希格", cover:"https://i.postimg.cc/k5KscCrG/image.jpg", link:"reader2.html?book=book4&chapter=cover" },
      { title:"自私的基因", author:"理查德·道金斯", cover:"https://i.postimg.cc/y8cm6FHD/image.jpg", link:"reader2.html?book=book5&chapter=cover" },
      { title:"社会性动物", author:"大卫·迈尔斯", cover:"https://i.postimg.cc/RhgzG866/image.jpg", link:"reader2.html?book=book6&chapter=cover" },
      { title:"人类简史", author:"尤瓦尔·赫拉利", cover:"https://i.postimg.cc/ydn5zRV2/image.jpg", link:"reader2.html?book=book7&chapter=cover" },
      { title:"自卑与超越", author:"阿尔弗雷德·阿德勒", cover:"https://i.postimg.cc/3rBLV3kD/image.jpg", link:"reader2.html?book=book8&chapter=cover" },
      { title:"利维坦", author:"托马斯·霍布斯", cover:"https://i.postimg.cc/pT1ZZJVV/image.jpg", link:"reader2.html?book=book9&chapter=cover" },
      { title:"君主论", author:"马基雅维利", cover:"https://i.postimg.cc/k52F5tFk/image.png", link:"reader2.html?book=book10&chapter=cover" },
      { title:"罪与罚", author:"陀思妥耶夫斯基", cover:"https://ik.imagekit.io/x8rf00rvnn/%E7%BD%AA%E4%B8%8E%E7%BD%9A.jpeg?updatedAt=1760285524524", link:"reader2.html?book=book11&chapter=cover" },
      { title:"存在与虚无", author:"萨特", cover:"https://ik.imagekit.io/x8rf00rvnn/%E5%AD%98%E5%9C%A8%E4%B8%8E%E8%99%9A%E6%97%A0.png?updatedAt=1760285826430&tr=w-1104%2Ch-736%2Cfo-auto", link:"reader2.html?book=book12&chapter=cover" },
      { title:"黄石公三略", author:"黄石公", cover:"https://ik.imagekit.io/x8rf00rvnn/%E9%BB%84%E7%9F%B3%E5%85%AC%E4%B8%89%E7%95%A5.png?updatedAt=1760286324534", link:"reader2.html?book=book13&chapter=cover" }
    ];

    // Function to render books
    function renderBooks(books) {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';
      
      books.forEach((book, index) => {
        const bookCard = document.createElement('a');
        bookCard.className = 'book-card';
        bookCard.href = book.link;
        bookCard.style.animationDelay = `${(index + 1) * 0.1}s`;
        
        bookCard.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x300/667eea/ffffff?text=封面加载失败'">
          <div class="book-info">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
          </div>
        `;
        
        bookList.appendChild(bookCard);
      });
      
      // Update book count
      document.getElementById('book-count').textContent = books.length;
    }

    // Function to filter books
    function filterBooks() {
      const searchTerm = document.getElementById('search-input').value.toLowerCase();
      
      const filteredBooks = completedBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
      );
      
      renderBooks(filteredBooks);
    }

    // Initialize page
    document.addEventListener('DOMContentLoaded', () => {
      // Render all books initially
      renderBooks(completedBooks);
      
      // Add event listener for search
      document.getElementById('search-input').addEventListener('input', filterBooks);
    });
 