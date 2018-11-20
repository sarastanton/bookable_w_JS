// <table class="table">
//   <th> Author </th>
//   <th> Number of Books </th>
//
//   <tr div id="authors_index_container">
//     <td> </td>
//     <td> </td>
//   </tr>
// </table>
//////////////////////////////////////

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

}

class Authors {
  constructor() {
    this.adapter = new AuthorsAdapter()
    // this.bindEventListeners()
    this.fetchAndLoadAuthors()
    this.authors = []
  }

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

  //


}

const authorsApp = new AuthorsApp()
