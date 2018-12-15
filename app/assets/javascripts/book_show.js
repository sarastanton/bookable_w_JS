$( document ).ready(function() {

  class BookAdapter {
    // connects to API/backend
    constructor() {
      this.baseUrl = `${window.location.href}.json`;
    }

    getBookInfo() {
      return fetch(`${this.baseUrl}`).then(response => response.json())
      .then(JSON => new Book(JSON))
    }

  }

  class Book {
    constructor(bookJSON) {
      this.id = bookJSON.id;
      this.reviews = bookJSON.reviews;
      this.avRating = bookJSON.average_rating;
    }

  }

  class SpecificBook {
    constructor() {
      this.adapter = new BookAdapter();
      this.fetchAndLoadBook();
      // this.listeners();
    }

    fetchAndLoadBook() {
      this.adapter
      .getBookInfo()
      .then(book => {
        this.renderAverageRating(book)
      });
    }

    renderAverageRating(book) {
      const avRatingContainer = $("#av_rating_container");
      avRatingContainer.append(`${book.avRating}`);
    }

    // listeners() {
    //
    // }

  }

  new SpecificBook();

})
