class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :value

end
