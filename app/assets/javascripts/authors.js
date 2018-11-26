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
      $("#new_author").on("submit", this.createNewAuthor.bind(this));
      $(document).on("click", "a.edit:contains('edit')", this.editAuthor);
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
      console.log(this.dataset.id)
      // $(".edit").on("click", function(e) {
      // e.preventDefault;
      // alert("click!")
    }

  }

  const authorsApp = new AuthorsApp()

})


//     this.notesContainer.addEventListener('dblclick', this.handleNoteClick.bind(this))
    // this.body.addEventListener('blur', this.updateNote.bind(this), true)

//     handleNoteClick(e) {
//   this.toggleNote(e)
// }
//
// toggleNote(e) {
//   const li = e.target
//   li.contentEditable = true
//   li.focus()
//   li.classList.add('editable')
// }
//
// updateNote(e) {
//   const li = e.target
//   li.contentEditable = false
//   li.classList.remove('editable')
//   const newValue = li.innerHTML
//   const id = li.dataset.id
//   //console.log(id)
//   this.adapter.updateNote(newValue, id)
// }
