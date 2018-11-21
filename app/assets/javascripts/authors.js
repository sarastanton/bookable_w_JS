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
      })
    }

  }

  class Author {
    constructor(authorJSON) {
      this.id = authorJSON.id
      this.name = authorJSON.name
      this.books = authorJSON.books
      this.genres = authorJSON.genres
    }
  }

  class Authors {
    constructor() {
      this.adapter = new AuthorsAdapter()
      // this.bindEventListeners()
      this.fetchAndLoadAuthors()
      this.createNewAuthor()
      this.authors = []
    }

      // bindEventListeners() {
      //
      // }

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
      this.authors.sort().forEach(author =>
      $("#authors_index_container").append(`<tr><td>${author["name"]}</td><td>${author["books"].length}</td></tr>`)
    )}

    // createNewAuthor(e) {
    //   e.preventDefault();
    //   const form_input = this.formInput;
    //   this.adapter.createDBAuthor(form_input).then(author => console.log(author))
    //   // this.renderAuthors()
    // }
    createNewAuthor() {
      $("#new_author").on("submit", this.submitAuthorRequest.bind(this))
    }

    submitAuthorRequest(e) {
      e.preventDefault();
      const formInput = $("#author_name").val();
      this.adapter
      .createDBAuthor(formInput)
      .then(response => response.json())
      .then(author => {
        this.authors.push(new Author(author));
        $("#author_name").empty();
        $("#authors_index_container").empty();
      this.renderAuthors()
    });
    }

  }



  const authorsApp = new AuthorsApp()

})
