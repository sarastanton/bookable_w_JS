$( document ).ready(function() {

  class UsersAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'https://saras-bookable.herokuapp.com';
    }

    getUserInfo() {
      const currentUserId = parseInt($(".login_status")[0].dataset.current_user);
      return fetch(`${this.baseUrl}/users/${currentUserId}.json`)
      .then(response => response.json())
      .then(JSON => new User(JSON));
    }

    markAsRead(bookId) {
      return fetch(`${this.baseUrl}/books/${bookId}/mark_as_read.json`, {
        method: 'PUT',
        headers: { "content-type": "application/json" }
      }).then(response => console.log(response))
    }

  }

  class User {
    constructor(userJSON) {
      this.id = userJSON.id;
      this.username = userJSON.username;
      this.pagesRead = userJSON.pages_read;
      this.readBooks = userJSON.my_read_books;
      this.unreadBooks = userJSON.my_unread_books;
    }

  }

  class Users {
    constructor() {
      this.adapter = new UsersAdapter();
      this.fetchAndLoadUsers();
      this.listeners();
      this.baseUrl = 'https://saras-bookable.herokuapp.com';
      this.currentUserId =  parseInt($(".login_status")[0].dataset.current_user);
    }

    fetchAndLoadUsers() {
      this.adapter
      .getUserInfo()
      .then(user => {
        this.renderUserProfile(user);
      });
    }

    renderUserProfile(user) {
      this.renderPagesRead(user);
      this.renderWantToReadTable(user);
      this.renderHaveReadTable(user);
    }

    renderPagesRead(user) {
      const pageCountContainer = $("#page_count_container");
      const pageCountText = `<h3> ${user.pagesRead} pages read so far </h3>`;
      pageCountContainer.html(pageCountText);
    }

    renderWantToReadTr(book) {
      const wantToReadBtn = `<button type="button" class="mark_as_read" data-book_id="${book.id}">Mark as Read</button>`;
      return `<tr>
      <td><a href="${this.baseUrl}/books/${book.id}">${book.title}</a></td>
      <td><a href="${this.baseUrl}/authors/${book.author_id}">${book.author}</a></td>
      <td><a href="${this.baseUrl}/genres/${book.genre_id}">${book.genre}</a></td>
      <td>${book.page_count}</td>
      <td>${wantToReadBtn}</td>
      </tr>`;
    }

    renderWantToReadTable(user) {
      const wantToReadTable = $("#want_to_read");
      const tableHeaders = "<th>Book</th> <th>Author</th> <th>Genre</th> <th>Page Count</th> <th> </th>";
      const wantToRead =[];
      user.unreadBooks.forEach(function(book) {
        wantToRead.push(this.renderWantToReadTr(book))
      }.bind(this));
      const bookString = wantToRead.join("");
      wantToReadTable.html(tableHeaders);
      wantToReadTable.append(bookString);
    }

    renderHaveReadTr(book) {
      let ratingVal;
      let reviewContent;
      if(book.my_rating != "" ){
        ratingVal = book.my_rating
      } else (ratingVal = `<a href="${this.baseUrl}/books/${book.id}">(add rating)</a>`)
      if(book.my_review != null ){
        reviewContent = book.my_review.content
      } else (reviewContent = `<a href="${this.baseUrl}/books/${book.id}">(add review)</a>`)
      return `<tr>
      <td><a href="${this.baseUrl}/books/${book.id}">${book.title}</a></td>
      <td><a href="${this.baseUrl}/authors/${book.author_id}">${book.author}</a></td>
      <td><a href="${this.baseUrl}/genres/${book.genre_id}">${book.genre}</a></td>
      <td>${book.page_count}</td>
      <td>${ratingVal}</td>
      <td>${reviewContent}</td> </tr>`;
    }

    renderHaveReadTable(user) {
      const haveReadTable = $("#have_read");
      const tableHeaders = "<th>Book</th> <th>Author</th> <th>Genre</th> <th>Page Count</th><th> My Rating</th> <th>My Review</th>"
      const haveRead =[];
      user.readBooks.forEach(function(book) {
        haveRead.push(this.renderHaveReadTr(book))
      }.bind(this));
      const bookString = haveRead.join("");
      haveReadTable.html(tableHeaders);
      haveReadTable.append(bookString)
    }

    listeners() {
      $(document).on("click", ".mark_as_read", this.markAsRead.bind(this));
    }

    markAsRead(event) {
      event.preventDefault;
      const currentUserId = parseInt($(".login_status")[0].dataset.current_user);
      const bookId = event.target.dataset.book_id;
      this.adapter.markAsRead(bookId);
      this.fetchAndLoadUsers();
    }

  }

  new Users();

})
