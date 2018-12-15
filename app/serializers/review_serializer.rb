class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :content, :username

  def username
    User.find(self.object.user_id).username
  end

end
