$( document ).on('turbolinks:load', function() {

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
        name: name
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
      return `<tr><td>${this.name}</td>
      <td><a href="" class="edit" data-id="${this.id}">(edit |</a>
        <a href="#" class="delete" data-id="${this.id}"> delete)</a></td>
        <td>${this.books.length}</td>
      </tr>`
    }
  }

  class Authors {
    constructor() {
      this.adapter = new AuthorsAdapter()
      this.fetchAndLoadAuthors()
      this.listeners()
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
      const sortedAuthors = this.authors.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      const tableHeader = `<th>Author</th> <th>Edit/Delete</th> <th>Number of Books</th>`
      const authorString = sortedAuthors.map(author => author.renderTr()).join('');
      const tableContents = tableHeader + authorString
      debugger
      $("#authors_index_container").html(tableContents)
    }

    listeners() {
      $("#new_author").on("submit", this.createNewAuthor.bind(this));
      $(".edit").on("click", this.editAuthor.bind(this));
    }

    createNewAuthor(event) {
      event.preventDefault();
      const formInput = $("#author_name").val();
      this.adapter
      .createDBAuthor(formInput)
      .then(author => {
        this.authors.push(new Author(author));
        $("#author_name").val("");
        this.renderAuthors()
      });
    }

    editAuthor(event) {
      event.preventDefault();
      alert("Click!")
      // console.log(this.id)
      $(".edit").on("click", function(e) {
      e.preventDefault;
      alert("click!")
})
    }

  }

  const authorsApp = new AuthorsApp()

})
