$( document ).ready(function() {

  class ReviewsApp {
    constructor() {
      this.reviews = new Reviews();
    }
  }

  class ReviewsAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/reviews`
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
      this.userName = reviewJSON.username
    }

  }

  class Reviews {
    constructor() {
      this.adapter = new ReviewsAdapter();
      this.fetchAndLoadReviews();
      this.listeners();
      this.reviews = [];
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/reviews`
    }

    fetchAndLoadReviews() {
      this.adapter
      .getReviews()
      .then(reviews => {
        reviews.forEach(review => this.reviews.push(new Review(review)))
      })
      .then(reviews => {
        this.renderReviews();
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
      const reviewCount = $("#review_count");
      const reviewButton = document.getElementById("review_btn");
      document.getElementById("review_container").innerHTML = reviewString;
      reviewCount.text(this.reviews.length);
      if(reviewButton.classList.contains("show_reviews")) {
        reviewButton.classList.remove("show_reviews");
        reviewButton.classList.add("hide_reviews");
        reviewButton.innerText = "Hide Reviews";
      }
    }

    listeners() {
      $("#new_review").on("submit", this.createNewReview.bind(this));
      $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
      $(document).on("click", "a.delete:contains('delete')", this.deleteReview.bind(this));
      $(document).on("click", "a:contains('SAVE?')", this.updateReview.bind(this));
      $(document).on("click", ".show_reviews", this.showReviews.bind(this));
      $(document).on("click", ".hide_reviews", this.hideReviews.bind(this));
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
      const oldContent = event.target.previousElementSibling.children[1];
      event.target.innerHTML = "SAVE?";
      oldContent.contentEditable="true";
      oldContent.classList.add('editable');
      event.target.classList.add('save');
      oldContent.focus();
    }

    updateReview(event) {
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

    deleteReview(event) {
      event.preventDefault();
      const reviewId = event.target.dataset.id;
      this.adapter.deleteDBReview(reviewId)
      .then(review => {
        this.reviews = [];
        this.fetchAndLoadReviews();
      });
    }

    showReviews(event) {
      event.preventDefault();
      const sortedReviews = this.reviews.sort((a, b) => a.id - b.id);
      const reviewString = sortedReviews.map(review => this.renderLi(review)).join('');
      document.getElementById("review_container").innerHTML = reviewString
      event.target.classList.remove("show_reviews");
      event.target.classList.add("hide_reviews");
      event.target.innerText = "Hide Reviews";
    }

    hideReviews(event) {
      event.preventDefault();
      $("#review_container").empty();
      event.target.classList.remove("hide_reviews");
      event.target.classList.add("show_reviews");
      event.target.innerText = "Show Reviews";
    }

  }

  const reviewsApp = new ReviewsApp();

})
