$(document).ready(function() {
  $(".show_reviews_button").on("click", function(e) {
    e.preventDefault();
    $.get(`${this.action}.json`).done(function(response) {
      console.log(response);
      if(response.length != 0) {
        $("#show-reviews").append(`<li> <%= ${response["user"]["username"]} %> wrote: "${response[content]}" </li>
          <br />
          <% if review.user == current_user %>
            <%= button_to "Edit Review", edit_book_review_path(@book, review), :method => :get %>
            <br />
          <% end %>
        <% end %>`)
      } else {
        $("#show-reviews").append(`<%= @book.title %> does not have any reviews yet. Be the first to review this book!`)
      }
      console.log(response)
    })
  })





})
