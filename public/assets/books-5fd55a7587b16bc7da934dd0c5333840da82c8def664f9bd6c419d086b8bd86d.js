$(document).ready(function(){class t{constructor(){this.baseUrl="https://saras-bookable.herokuapp.com/books"}getBooks(){return fetch(`${this.baseUrl}.json`).then(t=>t.json())}getReviews(t){return fetch(`${this.baseUrl}/${t}/reviews.json`).then(t=>t.json())}addToMyBooks(t){return fetch(`${this.baseUrl}/${t}/add_to_my_books.json`,{method:"PUT",headers:{"content-type":"application/json"}}).then(t=>console.log(t))}createDBBook(t,e,a,n){const s={title:t,author_name:e,genre_name:a,page_count:n};return fetch(`${this.baseUrl}.json`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({book:s})}).then(t=>t.json())}updateDBBook(t,e,a,n,s){const o={title:e,author_name:a,genre_name:n,page_count:s};return fetch(`${this.baseUrl}/${t}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({book:o})}).then(t=>t.json())}}class e{constructor(t){this.id=t.id,this.title=t.title,this.authorId=t.author_id,this.authorName=t.author.name,this.genreId=t.genre_id,this.genreName=t.genre.name,this.pageCount=t.page_count,this.ratings=t.ratings,this.reviews=t.reviews,this.users=t.users,this.userIds=[],this.avRating=t.average_rating,this.getUserIds()}getUserIds(){this.users.forEach(t=>this.userIds.push(t.id))}}class a{constructor(){this.adapter=new t,this.fetchAndLoadBooks(),this.listeners(),this.books=[],this.baseUrl="https://saras-bookable.herokuapp.com"}fetchAndLoadBooks(){this.adapter.getBooks().then(t=>{t.forEach(t=>this.books.push(new e(t)))}).then(()=>{this.renderBooks()})}renderTr(t){let e;const a=parseInt($(".login_status")[0].dataset.current_user);return e=t.userIds.includes(a)?`<a href="${this.baseUrl}/users/${a}"> In My Books </a>`:`<button type="button" class="add_to_my_books" data-book_id="${t.id}">Add to My Books</button>`,`<tr><td><a href="${this.baseUrl}/books/${t.id}">${t.title}</a></td>\n      <td><a href="${this.baseUrl}/authors/${t.authorId}">${t.authorName}</a></td>\n      <td><a href="${this.baseUrl}/genres/${t.genreId}">${t.genreName}</a></td>\n      <td>${t.pageCount}</td>\n      <td>${t.avRating}</td>\n      <td>${t.reviews.length}</td>\n      <td>${e}</td><td><a href="" class="edit" data-id="${t.id}">edit</a></td>\n      </tr>`}renderBooks(){const t=$("#books_index_container"),e="<th>Title</th> <th>Author</th> <th>Genre</th> <th>Page Count</th> <th>Average Rating</th> <th>Number of Reviews</th> <th>  </th>",a=this.books.sort((t,e)=>t.title>e.title?1:e.title>t.title?-1:0).map(t=>this.renderTr(t)).join("");jQuery.parseHTML(e+a);t.empty(),t.html(e),t.append(a)}listeners(){$("#new_book").on("submit",this.createNewBook.bind(this)),$(document).on("click",".add_to_my_books",this.addToMyBooks.bind(this)),$(document).on("click","a.edit:contains('edit')",this.makeEditable.bind(this)),$(document).on("click","a:contains('SAVE?')",this.updateBook.bind(this))}addToMyBooks(t){t.preventDefault;const e=parseInt($(".login_status")[0].dataset.current_user),a=document.createElement("a");this.adapter.addToMyBooks(t.target.dataset.book_id),a.setAttribute("href",`${this.baseUrl}/users/${e}`),a.innerHTML="In My Books",t.target.replaceWith(a)}createNewBook(t){t.preventDefault();const a=$("#book_title").val(),n=$("#book_author_name").val(),s=$("#book_genre_name").val(),o=$("#book_page_count").val();this.adapter.createDBBook(a,n,s,o).then(t=>{this.books.push(new e(t)),$("#book_title").val(""),$("#book_author_name").val(""),$("#book_genre_name").val(""),$("#book_page_count").val(""),this.renderBooks()})}makeEditable(t){t.preventDefault();const e=[t.target.parentElement.parentElement.children[0],t.target.parentElement.parentElement.children[1],t.target.parentElement.parentElement.children[2],t.target.parentElement.parentElement.children[3]];t.target.innerHTML="SAVE?",e.forEach(t=>t.classList.add("editable")),e.forEach(t=>t.setAttribute("contenteditable","true")),t.target.classList.add("save")}updateBook(t){t.preventDefault();const a=[t.target.parentElement.parentElement.children[0],t.target.parentElement.parentElement.children[1],t.target.parentElement.parentElement.children[2],t.target.parentElement.parentElement.children[3]],n=[t.target.dataset.id,a[0].innerText,a[1].innerText,a[2].innerText,a[3].innerText];a.forEach(t=>t.setAttribute("contenteditable","false")),a.forEach(t=>t.classList.remove("editable")),t.target.classList.remove("save"),t.target.innerText="edit",this.adapter.updateDBBook(...n).then(t=>{this.books.push(new e(t))})}}new a});