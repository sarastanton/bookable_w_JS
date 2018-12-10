$( document ).ready(function() {

  class UsersApp {
    constructor() {
      this.users = new Users();
    }
  }

  class UsersAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = 'http://localhost:3000';
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
      }).then(response => response.json());
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
      this.baseUrl = 'http://localhost:3000';
      this.currentUserId =  parseInt($(".login_status")[0].dataset.current_user);
    }

    fetchAndLoadUsers() {
      this.adapter
      .getUserInfo()
      .then(user => {
        this.renderUserProfile(user);
        // this.renderPagesRead(user),
        // this.renderWantToRead(user),
        // this.renderHaveRead(user);
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
      const wantToReadBtn = `<button type="button" class="add_to_my_books" data-book_id="${book.id}">Add to My Books</button>`;
      return `<tr> <td>${book.title}</td> <td>${book.author}</td> <td>${book.genre}</td> <td>${book.page_count}</td> <td>${wantToReadBtn}</td> </tr>`;
    }

    renderWantToReadTable(user) {
      const wantToReadTable = $("#want_to_read");
      const tableHeaders = "<th>Book</th> <th>Author</th> <th>Genre</th> <th>Page Count</th> <th> </th>";
      const unreadBooks =[];
      user.unreadBooks.forEach(function(book) {
        unreadBooks.push(this.renderWantToReadTr(book))
      }.bind(this));
      const bookString = unreadBooks.join("");
      wantToReadTable.html(tableHeaders);
      wantToReadTable.append(bookString);
    }

    renderHaveReadTr(book) {
      let ratingVal;
      let reviewContent;
      if(book.my_rating != null ){
        ratingVal = book.my_rating.value
      } else (ratingVal = "")
      if(book.my_review != null ){
        reviewContent = book.my_review.content
      } else (reviewContent = "")
      return `<tr> <td>${book.title}</td> <td>${book.author}</td> <td>${book.genre}</td> <td>${book.page_count}</td> <td>${ratingVal}</td> <td>${reviewContent}</td> </tr>`;
    }

    renderHaveReadTable(user) {
      const haveReadTable = $("#have_read");
      const tableHeaders = "<th>Book</th> <th>Author</th> <th>Genre</th> <th>Page Count</th><th> My Rating</th> <th>My Review</th>"
      const readBooks =[];
      user.readBooks.forEach(function(book) {
        readBooks.push(this.renderHaveReadTr(book))
      }.bind(this));
      const bookString = readBooks.join("");
      haveReadTable.html(tableHeaders);
      haveReadTable.append(bookString)
    }



//     renderTr(user) {
//       let myUsersOption;
//       const currentUserId = parseInt($(".login_status")[0].dataset.current_user);
//
//       if(user.userIds.includes(currentUserId)) {
//         myUsersOption = `<a href="${this.baseUrl}/users/${currentUserId}"> In My Users </a>`;
//       } else {
//         myUsersOption = `<button type="button" class="add_to_my_users" data-user_id="${user.id}">Add to My Users</button>`
//       };
//       // debugger
//       return `<tr><td><a href="${this.baseUrl}/users/${user.id}">${user.title}</a></td>
//       <td><a href="${this.baseUrl}/authors/${user.authorId}">${user.authorName}</a></td>
//       <td><a href="${this.baseUrl}/genres/${user.genreId}">${user.genreName}</a></td>
//       <td>${user.pageCount}</td>
//       <td>${user.avRating}</td>
//       <td><a href="${this.baseUrl}/users/${user.id}/reviews">${user.reviews.length}</a></td>
//       <td>${myUsersOption}</td><td><a href="" class="edit" data-id="${user.id}">edit</a></td>
//       </tr>`;
//     }
//
//     renderUsers() {
//       const userArea = $("#users_index_container");
//       const tableHeader = `<th>Title</th> <th>Author</th> <th>Genre</th> <th>Page Count</th> <th>Average Rating</th> <th>Number of Reviews</th> <th>  </th>`;
//       const sortedUsers = this.users.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
//       const userString = sortedUsers.map(user => this.renderTr(user)).join('');
//       const tableContents = jQuery.parseHTML(tableHeader + userString);
//       userArea.empty();
//       userArea.html(tableHeader);
//       userArea.append(userString);
//     }

    listeners() {
      // const body = document.querySelector('body');
//       $("#new_user").on("submit", this.createNewUser.bind(this));
//       $(document).on("click", ".add_to_my_users", this.addToMyUsers.bind(this));
//       $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
//       // $(document).on("click", "a.delete:contains('delete')", this.deleteUser.bind(this));
//       $(document).on("click", "a:contains('SAVE?')", this.updateUser.bind(this));
    }
//
//     addToMyUsers(event) {
//       event.preventDefault;
//       alert("click!");
//       console.log(event.target.dataset.user_id)
//       const currentUserId = parseInt($(".login_status")[0].dataset.current_user);
//       const myUsersLink = document.createElement('a');
//       this.adapter.addToMyUsers(event.target.dataset.user_id);
//       myUsersLink.setAttribute('href', `${this.baseUrl}/users/${currentUserId}`);
//       myUsersLink.innerHTML = "In My Users";
//       event.target.replaceWith(myUsersLink)
//     }
//
//     createNewUser(event) {
//       event.preventDefault();
//       const title = $("#user_title").val();
//       const authorName = $("#user_author_name").val();
//       const genreName = $("#user_genre_name").val();
//       const pageCount = $("#user_page_count").val();
//       this.adapter
//       .createDBUser(title, authorName, genreName, pageCount)
//       .then(user => {
//         this.users.push(new User(user));
//         $("#user_title").val("")
//         $("#user_author_name").val("");
//         $("#user_genre_name").val("");
//         $("#user_page_count").val("");
//         this.renderUsers();
//       });
//     }
//
//     makeEditable(event) {
//       event.preventDefault();
//       // debugger
//       const editableUserValues =
//       [event.target.parentElement.parentElement.children[0], event.target.parentElement.parentElement.children[1], event.target.parentElement.parentElement.children[2], event.target.parentElement.parentElement.children[3]];
//       // const usersById = this.users.sort((a,b) => (a.id - b.id));
//       // const oldName = event.target.parentElement.parentElement.firstElementChild;
//       event.target.innerHTML = "SAVE?";
//       editableUserValues.forEach(node => node.classList.add('editable'));
//       editableUserValues.forEach(node => node.setAttribute('contenteditable', 'true'));
//       editableUserValues.forEach(node => console.log(node));
//       event.target.classList.add('save');
//       // oldName.focus();
//     }
//     //
//     updateUser() {
//       event.preventDefault();
//       // alert("clicked SAVE!")
//       const editableUserValues =
//       [event.target.parentElement.parentElement.children[0], event.target.parentElement.parentElement.children[1], event.target.parentElement.parentElement.children[2], event.target.parentElement.parentElement.children[3]];
//       const userId = event.target.dataset.id;
//       const newTitle = editableUserValues[0].innerText;
//       const newAuthor = editableUserValues[1].innerText;
//       const newGenre = editableUserValues[2].innerText;
//       const newPageCount = editableUserValues[3].innerText;
//       const editedUserValues = [userId, newTitle, newAuthor, newGenre, newPageCount];
//       editableUserValues.forEach(node => node.setAttribute('contenteditable', 'false'));
//       // debugger
//     //   oldName.contentEditable="false";
//       editableUserValues.forEach(node => node.classList.remove('editable'));
//       event.target.classList.remove('save');
//       event.target.innerText = "edit";
//       debugger
//       this.adapter.updateDBUser(...editedUserValues)
//       .then(user => {
//         this.users.push(new User(user));
//       });
//     }
//     //
//     // deleteUser() {
//     //   event.preventDefault();
//     //   const userId = event.target.dataset.id;
//     //   this.adapter.deleteDBUser(userId)
//     //   .then(user => {
//     //     this.users = [];
//     //     this.fetchAndLoadUsers();
//     //   });
//     // }
//
  }
//
  const usersApp = new UsersApp();
//
})
