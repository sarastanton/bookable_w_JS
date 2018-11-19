$(document).ready(function() {
  $(".show_reviews_button").on("click", function(e) {
    e.preventDefault();
    $.get(`${this.action}.json`).done(function(response) {
      console.log(response);
      if(response.length != 0) {
        response.forEach(function(review) {
          console.log(review["content"])
          $("#show-reviews").append(`<li> <strong> ${review["user"]["username"]} wrote: </strong> "${review["content"]}" </li> <br />`)
          $("#show-reviews").append("<form class='button_to' method='get' action='/books/11/reviews/21/edit'><input type='submit' value='Edit Review'></form>")

            // if(review.user == current_user) { //how to get current_user into JS
            //   $("#show-reviews").append("<br /><form class='button_to' method='get' action='books/3/reviews/new'><input type='submit' value='Add Review'></form> <br />")
            //  } else {
            //    $("#show-reviews").append(`<%= @book.title %> does not have any reviews yet. Be the first to review this book!`)
            //  }
      console.log(response)
        })
      }
    })
  })
})
