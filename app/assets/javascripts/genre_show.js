$( document ).ready(function() {

  class GenresAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'https://saras-bookable.herokuapp.com/genres';
    }

    getSpecificGenre() {
      return fetch(`${window.location.href}.json`)
      .then(response => response.json())
      .then(JSON => new SpecificGenre(JSON))
    }

  }

  class SpecificGenre {
    constructor(genreJSON) {
      this.id = genreJSON.id;
      this.name = genreJSON.name;
      this.authors = genreJSON.authors;
      this.bookArray = [];
      genreJSON.books.forEach(book => {
        this.bookArray.push({title: book.title, author: book.author_name, id: book.id, author_id: book.author_id})
      });
    }

  }

  class Genres {
    constructor() {
      this.adapter = new GenresAdapter();
      this.fetchAndLoadGenreInfo();
      this.baseUrl = 'https://saras-bookable.herokuapp.com';
    }

    fetchAndLoadGenreInfo() {
      this.adapter
      .getSpecificGenre()
      .then(specificGenre => {
        this.showGenreInfo(specificGenre);
      })
    }

    showGenreInfo(specificGenre) {
      const genreShowTable = $("#genre_show_table");
      const tableHeader = `<th>Book Title</th> <th>Author</th>`;
      const genreBooksString = specificGenre.bookArray.map(book => this.renderTr(book)).join('')
      genreShowTable.html(tableHeader);
      genreShowTable.append(genreBooksString);
    }

    renderTr(genreBook) {
      return `<tr><td><a href="https://saras-bookable.herokuapp.com/books/${genreBook.id}">${genreBook.title}</a></td><td><a href="https://saras-bookable.herokuapp.com/authors/${genreBook.author_id}">${genreBook.author}</a></td></tr>`
    }

  }

  new Genres();

})
