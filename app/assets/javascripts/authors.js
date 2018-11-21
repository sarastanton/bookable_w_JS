$(document).ready(function() {

  class AuthorsApp {
    constructor() {
      this.authors = new Authors()
    }
  }

  class AuthorsAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'http://localhost:3000/authors.json'
    }

    getAuthors() {
      return fetch(this.baseUrl).then(response => response.json())
    }

    createDBAuthor(name) {
      const author = {
        name: name,
      }
      return fetch(this.baseUrl, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ author }),
      }).then(response => response.json())
    }

  }

  class Author {
    constructor(authorJSON) {
      this.id = authorJSON.id
      this.name = authorJSON.name
      this.books = authorJSON.books
      this.genres = authorJSON.genres
    }

    renderTr() {
      return `<tr><td>${this.name}</td><td>${this.books.length}</td></tr>`
    }
  }

  class Authors {
    constructor() {
      this.adapter = new AuthorsAdapter()
      this.fetchAndLoadAuthors()
      this.createNewAuthor()
      this.authors = []
    }

    fetchAndLoadAuthors() {
      this.adapter
      .getAuthors()
      .then(authors => {
        authors.forEach(author => this.authors.push(new Author(author)))
      })
      .then(authors => {
        this.renderAuthors()
      })
    }

    renderAuthors() {
      const authorString = this.authors.sort().map(author => author.renderTr()).join('');
      $("#authors_index_container").html() = authorString
      );
    }

    createNewAuthor() {
      $("#new_author").on("submit", this.submitAuthorRequest.bind(this))
    }

    submitAuthorRequest(event) {
      event.preventDefault();
      const formInput = $("#author_name").val();
      this.adapter
      .createDBAuthor(formInput)
      .then(author => {
        this.authors.push(new Author(author));
        $("#author_name").val("");
        $("#authors_index_container").empty();
        this.renderAuthors()
    });
    }

  }



  const authorsApp = new AuthorsApp()

})
