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
      <td><a href="" class="edit" data-id="${author.id}">(edit |</a>
        <a href="#" class="delete" data-id="${author.id}"> delete)</a></td>
        <td>${author.books.length}</td>
      </tr>`
    }

    renderAuthors() {
      const authorArea = $("#authors_index_container")
      const sortedAuthors = this.authors.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      sortedAuthors.forEach(author => authorArea.append(this.renderTr(author)))
      // sortedAuthors.map(author => author.renderTr()).join('');
      // const tableContents = jQuery.parseHTML(tableHeader + authorString)
      // debugger
      // $("#authors_index_container").html(tableContents)
    }

    listeners() {
      $("#new_author").on("submit", this.createNewAuthor.bind(this));
      $(".edit").on("click", this.editAuthor.bind(this));
    }

    createNewAuthor(event) {
      event.preventDefault();
      const formInput = $("#author_name").val();
      const tableHeader = `<th>Author</th> <th>Edit/Delete</th> <th>Number of Books</th>`
      this.adapter
      .createDBAuthor(formInput)
      .then(author => {
        this.authors.push(new Author(author));

        $("#author_name").val("");
        $("#authors_index_container").empty();
        $("#authors_index_container").append(tableHeader);
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
