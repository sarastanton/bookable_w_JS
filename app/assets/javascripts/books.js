$( document ).ready(function() {

  class BooksApp {
    constructor() {
      this.books = new Books();
    }
  }

  class BooksAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'http://localhost:3000/books';
    }

    getBooks() {
      return fetch(`${this.baseUrl}.json`).then(response => response.json());
    }

    addToMyBooks(id) {
      return fetch(`${this.baseUrl}/${id}/add_to_my_books.json`, {
        method: 'PUT',
        headers: { "content-type": "application/json" }
      }).then(response => response.json());
    }

    markAsRead(id) {
      return fetch(`${this.baseUrl}/${id}/mark_as_read.json`, {
        method: 'PUT',
        headers: { "content-type": "application/json" }
      }).then(response => response.json());
    }

    createDBBook(title, authorName, genreName, pageCount) {
      const book = {
        title: title,
        author_name: authorName,
        genre_name: genreName,
        page_count: pageCount
      };

      return fetch(`${this.baseUrl}.json`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ book }),
      }).then(response => response.json());
    }

    // updateDBBook(id, newTitle, newAuthorName, newGenreName, newPageCount) {
    //   const book = {
    //     id: id,
    //     title: newTitle,
    //     author_name: newAuthorName,
    //     genre_name: newGenreName,
    //     page_count: newPageCount
    //   };
    //   return fetch(`${this.baseUrl}/${id}`, {
    //     method: 'PATCH',
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify({ book }),
    //   }).then(response => response.json());
    // }
    //
    // deleteDBBook(id) {
    //   return fetch(`${this.baseUrl}/${id}`, {
    //     method: 'DELETE',
    //     headers: { "content-type": "application/json" },
    //   }).then(response => response.json());
    // }

  }

  class Book {
    constructor(bookJSON) {
      this.id = bookJSON.id;
      this.title = bookJSON.title;
      this.authorId = bookJSON.author_id;
      this.authorName = bookJSON.author_name;
      this.genreId = bookJSON.genre_id;
      this.genreName = bookJSON.genre.name;
      this.pageCount = bookJSON.page_count;
      this.ratings = bookJSON.ratings;
      this.reviews = bookJSON.reviews;
      this.users = bookJSON.users;
      this.userIds = [];
      this.avRating = bookJSON.average_rating;
      this.getUserIds()
    }

    getUserIds() {
      this.users.forEach(user => this.userIds.push(user.id));
    }

  }

  class Books {
    constructor() {
      this.adapter = new BooksAdapter();
      this.fetchAndLoadBooks();
      this.listeners();
      this.books = [];
      this.baseUrl = 'http://localhost:3000';
    }

    fetchAndLoadBooks() {
      this.adapter
      .getBooks()
      .then(books => {
        books.forEach(book => this.books.push(new Book(book)))
      })
      .then(books => {
        this.renderBooks()
      });
    }

    renderTr(book) {
      let myBooksOption;
      const currentUserId = parseInt($(".login_status")[0].dataset.current_user);

      if(book.userIds.includes(currentUserId)) {
        myBooksOption = `<a href="${this.baseUrl}/users/${currentUserId}"> In My Books </a>`;
      } else {
        myBooksOption = `<button type="button" class="add_to_my_books" data-book_id="${book.id}">Add to My Books</button>`
      };
      // debugger
      return `<tr><td><a href="${this.baseUrl}/books/${book.id}">${book.title}</a></td>
      <td><a href="${this.baseUrl}/authors/${book.authorId}">${book.authorName}</a></td>
      <td><a href="${this.baseUrl}/genres/${book.genreId}">${book.genreName}</a></td>
      <td>${book.pageCount}</td>
      <td>${book.avRating}</td>
      <td><a href="${this.baseUrl}/books/${book.id}/reviews">${book.reviews.length}</a></td>
      <td>${myBooksOption}</td>
      </tr>`;
    }

    renderBooks() {
      const bookArea = $("#books_index_container");
      const tableHeader = `<th>Title</th> <th>Author</th> <th>Genre</th> <th>Page Count</th> <th>Average Rating</th> <th>Number of Reviews</th> <th>  </th>`;
      const sortedBooks = this.books.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      const bookString = sortedBooks.map(book => this.renderTr(book)).join('');
      const tableContents = jQuery.parseHTML(tableHeader + bookString);
      bookArea.empty();
      bookArea.html(tableHeader);
      bookArea.append(bookString);
    }

    listeners() {
      // const body = document.querySelector('body');
      $("#new_book").on("submit", this.createNewBook.bind(this));
      $(document).on("click", ".add_to_my_books", this.addToMyBooks.bind(this));
      // $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
      // $(document).on("click", "a.delete:contains('delete')", this.deleteBook.bind(this));
      // $(document).on("click", "a:contains('SAVE?')", this.updateBook.bind(this));
    }

      addToMyBooks(event) {
        event.preventDefault;
        alert("click!");
        console.log(event.target.dataset.book_id)
        const currentUserId = parseInt($(".login_status")[0].dataset.current_user);
        const myBooksLink = document.createElement('a');
        this.adapter.addToMyBooks(event.target.dataset.book_id);
        myBooksLink.setAttribute('href', `${this.baseUrl}/users/${currentUserId}`);
        myBooksLink.innerHTML = "In My Books";
        event.target.replaceWith(myBooksLink)
      }

    createNewBook(event) {
      event.preventDefault();
      const title = $("#book_title").val();
      const authorName = $("#book_author_name").val();
      const genreName = $("#book_genre_name").val();
      const pageCount = $("#book_page_count").val();
      this.adapter
      .createDBBook(title, authorName, genreName, pageCount)
      .then(book => {
        this.books.push(new Book(book));
        $("#book_title").val("")
        $("#book_author_name").val("");
        $("#book_genre_name").val("");
        $("#book_page_count").val("");
        this.renderBooks();
      });
    }
    //
    // makeEditable(event) {
    //   event.preventDefault();
    //   const booksById = this.books.sort((a,b) => (a.id - b.id));
    //   const oldName = event.target.parentElement.parentElement.firstElementChild;
    //   event.target.innerHTML = "SAVE?";
    //   oldName.contentEditable="true";
    //   oldName.classList.add('editable');
    //   event.target.classList.add('save');
    //   oldName.focus();
    // }
    //
    // updateBook() {
    //   event.preventDefault();
    //   const oldName = event.target.parentElement.parentElement.children[0];
    //   const newName = oldName.innerText;
    //   const bookId = event.target.dataset.id;
    //   oldName.contentEditable="false";
    //   oldName.classList.remove('editable');
    //   event.target.classList.remove('save');
    //   event.target.innerText = "edit";
    //   this.adapter.updateDBBook(newName, bookId)
    //   .then(book => {
    //     this.books.push(new Book(book));
    //   });
    // }
    //
    // deleteBook() {
    //   event.preventDefault();
    //   const bookId = event.target.dataset.id;
    //   this.adapter.deleteDBBook(bookId)
    //   .then(book => {
    //     this.books = [];
    //     this.fetchAndLoadBooks();
    //   });
    // }

  }

  const booksApp = new BooksApp();

})
