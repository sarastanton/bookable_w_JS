$( document ).ready(function() {

  class GenresApp {
    constructor() {
      this.genres = new Genres();
    }
  }

  class GenresAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'http://localhost:3000/genres';
    }

    getGenres() {
      return fetch(`${this.baseUrl}.json`).then(response => response.json());
    }

    getSpecificGenre(id) {
      return fetch(`${window.location.href}.json`).then(response => response.json());
    }

    createDBGenre(name) {
      const genre = {
        name: name
      };
      return fetch(`${this.baseUrl}.json`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ genre }),
      }).then(response => response.json());
    }

    updateDBGenre(newName, id) {
      const genre = {
        name: newName
      };
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ genre }),
      }).then(response => response.json());
    }

    deleteDBGenre(id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: { "content-type": "application/json" },
      }).then(response => response.json());
    }

  }

  class Genre {
    constructor(genreJSON) {
      this.id = genreJSON.id;
      this.name = genreJSON.name;
      this.books = genreJSON.books;
      this.genres = genreJSON.genres;
    }

  }

  class Genres {
    constructor() {
      this.adapter = new GenresAdapter();
      this.fetchAndLoadGenres();
      this.listeners();
      this.genres = [];
      this.baseUrl = 'http://localhost:3000/genres';
    }

    fetchAndLoadGenres() {
      this.adapter
      .getGenres()
      .then(genres => {
        genres.forEach(genre => this.genres.push(new Genre(genre)))
      })
      .then(genres => {
        this.renderGenres()
      });
    }

    renderTr(genre) {
      return `<tr><td><a href="${this.baseUrl}/${genre.id}">${genre.name}</a></td>
      <td><a href="" class="edit" data-id="${genre.id}">edit</a>
         |
        <a href="" class="delete" data-id="${genre.id}">delete</a></td>
        <td> ${genre.books.length} </td>
      </tr>`;
    }

    renderGenres() {
      const genreArea = $("#genres_index_container");
      const tableHeader = `<th>Genre</th> <th>Options</th> <th>Number of Books</th>`;
      const sortedGenres = this.genres.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      const genreString = sortedGenres.map(genre => this.renderTr(genre)).join('');
      const tableContents = jQuery.parseHTML(tableHeader + genreString);
      genreArea.empty();
      genreArea.html(tableHeader);
      genreArea.append(genreString);
    }

    // renderGenreShow(genre, element) {
    //   debugger
    //   console.log(genre, element)
    // }

    listeners() {
      // const body = document.querySelector('body');
      $("#new_genre").on("submit", this.createNewGenre.bind(this));
      $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
      $(document).on("click", "a.delete:contains('delete')", this.deleteGenre.bind(this));
      $(document).on("click", "a:contains('SAVE?')", this.updateGenre.bind(this));
      // $(document).on("click", "a.showGenre", this.showGenre.bind(this));
    }

    createNewGenre(event) {
      event.preventDefault();
      const formInput = $("#genre_name").val();
      this.adapter
      .createDBGenre(formInput)
      .then(genre => {
        this.genres.push(new Genre(genre));
        $("#genre_name").val("");
        this.renderGenres();
      });
    }

    makeEditable(event) {
      event.preventDefault();
      const genresById = this.genres.sort((a,b) => (a.id - b.id));
      const oldName = event.target.parentElement.parentElement.firstElementChild;
      event.target.innerHTML = "SAVE?";
      oldName.contentEditable="true";
      oldName.classList.add('editable');
      event.target.classList.add('save');
      oldName.focus();
    }

    updateGenre() {
      event.preventDefault();
      const oldName = event.target.parentElement.parentElement.children[0];
      const newName = oldName.innerText;
      const genreId = event.target.dataset.id;
      oldName.contentEditable="false";
      oldName.classList.remove('editable');
      event.target.classList.remove('save');
      event.target.innerText = "edit";
      this.adapter.updateDBGenre(newName, genreId)
      .then(genre => {
        this.genres.push(new Genre(genre));
      });
    }

    deleteGenre() {
      event.preventDefault();
      const genreId = event.target.dataset.id;
      this.adapter.deleteDBGenre(genreId)
      .then(genre => {
        this.genres = [];
        this.fetchAndLoadGenres();
      });
    }

    // showGenre() {
    //   event.preventDefault();
    //   const cell = event.target;
    //   this.adapter.getSpecificGenre(cell.dataset.id)
    //   .then(genre => {
    //     this.renderGenreShow(genre, cell);
    //   })
    // }

  }

  const genresApp = new GenresApp();

})
