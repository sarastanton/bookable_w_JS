$( document ).ready(function(){

  class RatingApp {
    constructor() {
      this.rating = new Rating();
    }
  }

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
        headers: { "value-type": "application/json" },
        body: JSON.stringify({ rating }),
      }).then(response => response.json());
    }

    updateDBRating(newValue, id) {
      const rating = {
        value: newValue,
        id: id
      };
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rating }),
      }).then(response => response.json());
    }

    // deleteDBRating(id) {
    //   return fetch(`${this.baseUrl}/${id}`, {
    //     method: 'DELETE',
    //     headers: { "content-type": "application/json" },
    //   }).then(response => response.json())
    // }

  }

  class SpecificRating {
    constructor(ratingJSON) {
      this.id = ratingJSON.id;
      this.userId = ratingJSON.user_id;
      this.bookId = ratingJSON.book_id;
      this.value = ratingJSON.value;
    }

  }

  class Rating {
    constructor() {
      this.adapter = new RatingAdapter();
      this.fetchAndLoadRating();
      this.listeners();
      this.baseUrl = `http://localhost:3000/books/${window.location.href.split("/")[4]}/ratings`;
    }

    fetchAndLoadRating() {
      this.adapter
      .getRating()
      // .then(rating => {
      //   rating.forEach(rating => this.rating.push(new Rating(rating)))
      // })
      .then(rating => {
        this.renderRating()
      });
    }

    // renderLi(rating) {
      // let edit_delete_link;
      // if($("#rating_user_id").val() == rating.userId) {
      //   edit_delete_link =
      //   `<a href="#" class="edit" data-id="${rating.id}">edit</a> | <a href="" class="delete" data-id="${rating.id}">delete</a><br />`
      // } else {
      //   edit_delete_link = ""
      // };
      // return `<li><strong>${rating.userName}</strong> wrote: <p class="rating_value"> ${rating.value}</p></li>${edit_delete_link}<br />`;
      // console.log("temp message - renderLi")

    // }

    renderRating(rating) {
      if (rating.id != undefined) {
        $(`#rating_value_${}`)
      }
      console.log("temp message - renderRating")
    }

    listeners() {
      $("#new_rating").on("submit", this.decideNewOrUpdate.bind(this));
      // $(document).on("click", "a.edit:contains('edit')", this.makeEditable.bind(this));
      // $(document).on("click", "a.delete:contains('delete')", this.deleteRating.bind(this));
      // $(document).on("click", "a:contains('SAVE?')", this.updateRating.bind(this));
      // $(document).on("click", ".show_rating", this.showRating.bind(this));
      // $(document).on("click", ".hide_rating", this.hideRating.bind(this));
    }

    decideNewOrUpdate(event) {
      event.preventDefault();
      if (rating.id == undefined) {
        createNewRating(rating)
      } else {
        updateRating(rating)
      }

    }

    createNewRating(rating) {
      this.adapter
      .createDBRating(userId, bookId, value)
      .then(rating => {
        this.renderRating();
      });
    }

    updateRating() {
      event.preventDefault();
      const oldValue = event.target.previousElementSibling.children[1];
      const newValue = oldValue.innerText;
      const ratingId = event.target.dataset.id;
      oldValue.valueEditable="false";
      oldValue.classList.remove('editable');
      event.target.classList.remove('save');
      event.target.innerText = "edit";
      this.adapter.updateDBRating(newValue, ratingId)
      .then(rating => {
        this.rating.push(new Rating(rating));
      });
    }

  }

  const ratingApp = new RatingApp();

});
