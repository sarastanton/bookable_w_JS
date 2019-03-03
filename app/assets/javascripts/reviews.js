$( document ).ready(function() {

  class ReviewsAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = `https://saras-bookable.herokuapp.com/books/${window.location.href.split("/")[4]}/reviews`
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
      this.fetchAndPrepareReviews();
      this.listeners();
      this.reviews = [];
      this.baseUrl = `https://saras-bookable.herokuapp.com/books/${window.location.href.split("/")[4]}/reviews`
    }

    fetchAndPrepareReviews() {
      this.adapter
      .getReviews()
      .then(reviews => {
        reviews.forEach(review => this.reviews.push(new Review(review)))
      })
      .then(reviews => {
        this.prepareReviews()
      });
    }

    fetchAndShowReviews() {
      this.adapter
      .getReviews()
      .then(reviews => {
        reviews.forEach(review => this.reviews.push(new Review(review)))
      })
      .then(reviews => {
        this.showReviews()
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

    prepareReviews() {
      this.updateReviewCount();
      this.hideReviews();
    }

    updateReviewCount() {
      const reviewCount = $("#review_count");
      reviewCount.text(this.reviews.length);
    }

    listeners() {
      $("#new_review").on("submit", this.createNewReview.bind(this));
      $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
      $(document).on("click", "a.delete:contains('delete')", this.deleteReview.bind(this));
      $(document).on("click", "a:contains('SAVE?')", this.updateReview.bind(this));
      $(document).on("click", "#review_btn", this.toggleReviewVisible.bind(this));
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
        this.showReviews();
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
      debugger
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
        this.fetchAndShowReviews();
      });
    }

    toggleReviewVisible() {
      const reviewButton = document.getElementById("review_btn");
      if(reviewButton.classList.contains("show_reviews")) {
        this.showReviews();
      } else if (reviewButton.classList.contains("hide_reviews")) {
          this.hideReviews(event);
      }
    }

    showReviews() {
      const sortedReviews = this.reviews.sort((a, b) => a.id - b.id);
      const reviewString = sortedReviews.map(review => this.renderLi(review)).join('');
      const reviewButton = document.getElementById("review_btn");
      this.updateReviewCount();
      document.getElementById("review_container").innerHTML = reviewString;
      reviewButton.classList.remove("show_reviews");
      reviewButton.classList.add("hide_reviews");
      reviewButton.innerText = "Hide Reviews";
    }

    hideReviews() {
      const reviewButton = document.getElementById("review_btn");
      $("#review_container").empty();
      reviewButton.classList.remove("hide_reviews");
      reviewButton.classList.add("show_reviews");
      reviewButton.innerText = "Show Reviews";
    }

  }

  new Reviews();

})
