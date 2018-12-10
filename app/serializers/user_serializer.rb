class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :my_read_books, :my_unread_books

  # has_many :books, through: :read_statuses

  # has_many :ratings
  # has_many :reviews

  def my_read_books
    read_books = []
    self.object.books.each do |book|
      book.read_statuses.each do |read_status|
         # @read_status = read_status
        if read_status.user_id == self.object.id && read_status.value == true
          read_books << { id: book.id, title: book.title, author: Author.find(book.author_id).name, genre: Genre.find(book.genre_id).name, page_count: book.page_count, my_rating: Rating.find_by(user_id: self.object.id, book_id: book.id), my_review: Review.find_by(user_id: current_user.id, book_id: book.id) }
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
          # binding.pry
        end
      end
    end
    unread_books
  end

end
