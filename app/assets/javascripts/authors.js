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
    // this.authors = [] // Don't think I need this - array comes from controller?
    this.adapter = new AuthorsAdapter()
    // this.bindEventListeners()
    this.fetchAndLoadAuthors()
  }

  fetchAndLoadAuthors() {
    this.adapter
    .getAuthors()
    .then(authors => {
      authors.forEach(author => renderAuthors(author))
    })
  }

  renderAuthors(author) {
    const $authorsColumn = $("td.col-1")
    const $authorBookCount = $("td.col-2")
    $authorsColumn.text(author["name"])
    $authorBookCount.text(author["books"].length)
  }


}

const authorsApp = new AuthorsApp()
