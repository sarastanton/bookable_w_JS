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
      body: name,
    }
    return fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify({ author }),
      headers: { "content-type": "application/json" }
    })
  }

}

class Authors {
  constructor() {
    this.adapter = new AuthorsAdapter()
    // this.bindEventListeners()
    this.fetchAndLoadAuthors()
  }

    // bindEventListeners() {
    //
    // }

  fetchAndLoadAuthors() {
    this.adapter
    .getAuthors()
    .then(authors => {
      this.renderAuthors(authors)
    })
  }

  renderAuthors(authors) {
    authors.forEach(author =>
    $("#authors_index_container").append(`<tr><td>${author["name"]}</td><td>${author["books"].length}</td></tr>`)
  )}

  // createNewAuthor(e) {
  //   e.preventDefault();
  //   const form_input = this.formInput;
  //   this.adapter.createDBAuthor(form_input).then(author => console.log(author))
  //   // this.renderAuthors()
  // }
  createNewAuthor() {
    $(document).ready(function() {
      $("#new_author").on("submit", function(e) {
        e.preventDefault();
        formInput = $("#author_name").val();
        this.adapter.createDBAuthor(form_input).then(author => console.log(author))
      })
    })
  }



}

const authorsApp = new AuthorsApp()
