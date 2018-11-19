class ReadStatusSerializer < ActiveModel::Serializer
  attributes :id, :value, :user_id, :book_id

  belongs_to :user
  belongs_to :book

end
