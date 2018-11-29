$( document ).on('turbolinks:load', function() {

  class AuthorsApp {
    constructor() {
      this.authors = new Authors()
    }
  }

  class AuthorsAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'http://localhost:3000/authors'
    }

    getAuthors() {
      return fetch(`${this.baseUrl}.json`).then(response => response.json())
    }

    createDBAuthor(name) {
      const author = {
        name: name
      }
      return fetch(`${this.baseUrl}.json`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ author }),
      }).then(response => response.json())
    }

    updateDBAuthor(newName, id) {
      const author = {
        name: newName
      }
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
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

  }

  class Authors {
    constructor() {
      this.adapter = new AuthorsAdapter()
      this.fetchAndLoadAuthors()
      this.listeners()
      this.authors = []
      // this.body = $(document.body)
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

    renderTr(author) {
      return `<tr><td>${author.name}</td>
      <td><a href="#" class="edit" data-id="${author.id}">(edit</a>
         |
        <a href="#" class="delete" data-id="${author.id}">delete)</a></td>
        <td>${author.books.length}</td>
      </tr>`
    }

    renderAuthors() {
      const authorArea = $("#authors_index_container")
      const tableHeader = `<th>Author</th> <th>Options</th> <th>Number of Books</th>`
      const sortedAuthors = this.authors.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      const authorString = sortedAuthors.map(author => this.renderTr(author)).join('');
      const tableContents = jQuery.parseHTML(tableHeader + authorString);
      $("#authors_index_container").html(tableHeader);
      $("#authors_index_container").append(authorString);
    }

    listeners() {
      const body = document.querySelector('body')
      $("#new_author").on("submit", this.createNewAuthor.bind(this));
      $(document).on("click", "a.edit:contains('edit')", this.editAuthor.bind(this));
      body.addEventListener("blur", this.updateAuthor.bind(this), true);
      // $(document).on("blur", this.editAuthor.bind(this));
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
      const authorsById = this.authors.sort((a,b) => (a.id - b.id))
      const oldName = event.target.parentElement.parentElement.firstElementChild;
      // debugger
      event.preventDefault();
      oldName.contentEditable="true"
      oldName.classList.add('editable')
      oldName.focus()
    }

    updateAuthor() {
      const oldName = event.target.parentElement.firstElementChild
      const newName = oldName.innerText
      const authorId = event.target.parentElement.children[1].firstElementChild.dataset.id
      // debugger
      event.preventDefault();
      oldName.contentEditable="false"
      oldName.classList.remove('editable')
      this.adapter.updateDBAuthor(newName, authorId)
      // console.log(newName, authorId)
    }


  }

  const authorsApp = new AuthorsApp()

})
