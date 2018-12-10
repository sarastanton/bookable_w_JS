class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :pages_read, :my_read_books, :my_unread_books

  def my_read_books
    read_books = []


    self.object.books.each do |book|
      book.read_statuses.each do |read_status|
        if read_status.user_id == self.object.id && read_status.value == true
          read_books << {
            id: book.id,
            title: book.title,
            author: Author.find(book.author_id).name,
            author_id: book.author_id,
            genre: Genre.find(book.genre_id).name,
            genre_id: book.genre_id,
            page_count: book.page_count,
            my_rating: "#{rating_value(self.object.id, book)}",
            my_review: Review.find_by(user_id: current_user.id, book_id: book.id) }
        end
      end
    end
    read_books
   end

  def my_unread_books
    unread_books = []
    self.object.books.each do |book|
      book.read_statuses.each do |read_status|
        if read_status.user_id == self.object.id && read_status.value == false
          unread_books << { id: book.id, title: book.title, author: Author.find(book.author_id).name, genre: Genre.find(book.genre_id).name, page_count: book.page_count }
        end
      end
    end
    unread_books
  end

  private

  def rating_value(user_id, book)
    !!Rating.find_by(user_id: user_id, book_id: book.id) ?
      "#{Rating.find_by(user_id: user_id, book_id: book.id).value}.0 / 5.0" : ""
  end

  def review_content
    !!Review.find_by(user_id: current_user.id, book_id: book.id) ? "#{Review.find_by(user_id: current_user.id, book_id: book.id).content}" : ""
  end

end
