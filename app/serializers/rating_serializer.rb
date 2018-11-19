class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :value

  belongs_to :user
  belongs_to :book

end
