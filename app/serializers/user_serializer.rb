class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :my_read_books, :my_unread_books

  # has_many :books, through: :read_statuses

  def my_read_books
    read_books = []
    self.object.books.each do |book|
      book.read_statuses.each do |read_status|
         # @read_status = read_status
        if read_status.user_id == self.object.id && read_status.value == true
          read_books << book
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
          unread_books << book
        end
      end
    end
    unread_books
  end

end
