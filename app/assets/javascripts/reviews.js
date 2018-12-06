$( document ).on('turbolinks:load', function() {

  class ReviewsApp {
    constructor() {
      this.reviews = new Reviews();
    }
  }

  class ReviewsAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/reviews`;
    }

    getReviews() {
      return fetch(`${this.baseUrl}.json`).then(response => response.json());
    }

    createDBReview(userId, bookId, content) {
      const review = {
        user_id: userId,
        book_id: bookId,
        content: content
      };
      return fetch(`${this.baseUrl}.json`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ review }),
      }).then(response => response.json());
    }

    updateDBReview(newContent, id) {
      const review = {
        content: newContent,
        id: id
      };
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ review }),
      }).then(response => response.json());
    }

    deleteDBReview(id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: { "content-type": "application/json" },
      }).then(response => response.json());
    }

  }

  class Review {
    constructor(reviewJSON) {
      this.id = reviewJSON.id;
      this.userId = reviewJSON.user_id;
      this.bookId = reviewJSON.book_id;
      this.content = reviewJSON.content;
      this.userName = reviewJSON.user.username
    }

  }

  class Reviews {
    constructor() {
      this.adapter = new ReviewsAdapter();
      this.fetchAndLoadReviews();
      this.listeners();
      this.reviews = [];
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/reviews`;
    }

    fetchAndLoadReviews() {
      this.adapter
      .getReviews()
      .then(reviews => {
        reviews.forEach(review => this.reviews.push(new Review(review)))
      })
      .then(reviews => {
        this.renderReviews()
      });
    }

    renderLi(review) {
      let edit_delete_link;
      if($("#review_user_id").val() == review.userId) {
        edit_delete_link =
        `<a href="#" class="edit" data-id="${review.id}">edit</a> | <a href="" class="delete" data-id="${review.id}">delete</a><br />`
      } else {
        edit_delete_link = ""
      };
      return `<li><strong>${review.userName}</strong> wrote: <p class="review_content"> ${review.content}</p></li>${edit_delete_link}<br />`;

    }

    renderReviews() {
      const sortedReviews = this.reviews.sort((a, b) => a.id - b.id);
      const reviewString = sortedReviews.map(review => this.renderLi(review)).join('');
      document.getElementById("review_container").innerHTML = reviewString
    }

    listeners() {
      $("#new_review").on("submit", this.createNewReview.bind(this));
      $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
      $(document).on("click", "a.delete:contains('delete')", this.deleteReview.bind(this));
      $(document).on("click", "a:contains('SAVE?')", this.updateReview.bind(this));
    }

    createNewReview(event) {
      event.preventDefault();
      const formInput = $("#review_content").val();
      const bookId = $("#review_book_id").val();
      const userId = $("#review_user_id").val();
      this.adapter
      .createDBReview(userId, bookId, formInput)
      .then(review => {
        this.reviews.push(new Review(review));
        $("#review_content").val("");
        this.renderReviews();
      });
    }

    makeEditable(event) {
      event.preventDefault();
      const reviewsById = this.reviews.sort((a,b) => (a.id - b.id));
      const oldName = event.target.previousElementSibling.children[1];
      event.target.innerHTML = "SAVE?";
      oldName.contentEditable="true";
      oldName.classList.add('editable');
      event.target.classList.add('save');
      oldName.focus();
    }

    updateReview() {
      event.preventDefault();
      const oldContent = event.target.previousElementSibling.children[1];
      const newContent = oldContent.innerText;
      const reviewId = event.target.dataset.id;
      oldContent.contentEditable="false";
      oldContent.classList.remove('editable');
      event.target.classList.remove('save');
      event.target.innerText = "edit";
      this.adapter.updateDBReview(newContent, reviewId)
      .then(review => {
        this.reviews.push(new Review(review));
      });
    }

    deleteReview() {
      event.preventDefault();
      const reviewId = event.target.dataset.id;
      this.adapter.deleteDBReview(reviewId)
      .then(review => {
        this.reviews = [];
        this.fetchAndLoadReviews();
      });
    }

  }

  const reviewsApp = new ReviewsApp();

})
