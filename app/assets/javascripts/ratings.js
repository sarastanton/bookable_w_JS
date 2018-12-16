$( document ).ready(function(){

  class RatingAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/ratings`;
    }

    getRating() {
      return fetch(`${this.baseUrl}.json`)
      .then(response => response.json())
      .then(JSON => new SpecificRating(JSON))
    }

    createDBRating(userId, bookId, value) {
      const rating = {
        user_id: userId,
        book_id: bookId,
        value: value
      };
      return fetch(`${this.baseUrl}.json`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rating }),
      }).then(function(response) {
          if(response.ok) {
            $(".success").text( "Rating saved successfully!")
          }
          return response
        })
        .then(response => response.json())
    }

    updateDBRating(id, newValue) {
      const rating = {
        id: id,
        value: newValue
      };
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rating }),
      }).then(function(response) {
          if(response.ok) {
            $(".success").text( "Rating saved successfully!");
          }
          return response
        })
        .then(response => response.json())
    }

  }

  class SpecificRating {
    constructor(ratingJSON) {
      this.id = ratingJSON.id;
      this.userId = ratingJSON.user_id;
      this.bookId = ratingJSON.book_id;
      this.value = ratingJSON.value;
      this.avRating = ratingJSON.average_rating;
    }

  }

  class Rating {
    constructor() {
      this.adapter = new RatingAdapter();
      this.fetchAndLoadRating();
      this.listeners();
      // this.updateRating;
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/ratings`;
    }

    fetchAndLoadRating() {
      this.adapter
      .getRating()
      .then(rating => {
        this.renderRating(rating)
      });
    }

    renderRating(rating) {
      console.log(rating);
      this.renderAverageRating(rating.avRating);
      if (rating.id != undefined) {
        $(`#rating_value_${rating.value}`).attr('checked', 'checked');
        $("#rating_rating_id").val(`${rating.id}`)
      };
    }

    renderAverageRating(avRating) {
      const avRatingContainer = $("#av_rating_container");
      avRatingContainer.empty();
      avRatingContainer.append(`${avRating}`);
    }

    listeners() {
      $("#new_rating").on("submit", this.decideNewOrUpdate.bind(this));
    }

    decideNewOrUpdate(event) {
      const ratingId = $("#rating_rating_id").val();
      // debugger
      event.preventDefault();
      // debugger
      if (ratingId == "") {
        this.createNewRating();
      } else {
        this.updateRating();
      }
    }

    createNewRating() {
      event.preventDefault();
      const value = $(".new_rating :checked").val();
      const userId = $("#rating_user_id").val();
      const bookId = $("#rating_book_id").val();
      this.adapter
      .createDBRating(userId, bookId, value)
      // .then(response => response.json())
      // .then(response => console.log(response))
      .then(rating => this.fetchAndLoadRating());
    }

    updateRating() {
      event.preventDefault();
      const ratingId = $("#rating_rating_id").val();
      const newValue = $(".new_rating :checked").val();
      this.adapter
      .updateDBRating(ratingId, newValue)
      .then(response => response.json())
      .then(rating => this.fetchAndLoadRating());
    }

  }

  new Rating();

});
