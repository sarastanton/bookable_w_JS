class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :value, :average_rating

  def average_rating
    Book.find(self.object.book_id).average_rating
  end

end
