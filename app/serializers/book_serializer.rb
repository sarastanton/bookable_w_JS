class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_id, :genre_id, :page_count, :average_rating

  belongs_to :author
  belongs_to :genre

  has_many :ratings

  has_many :reviews

  has_many :read_statuses
  has_many :users, through: :read_statuses

  def average_rating
    if Rating.find_by(book_id: self.id)
      av_rating = 0
      self.ratings.each do |rating|
        av_rating += rating.value
      end
      result = av_rating.to_f / self.ratings.count
      { average_rating: "#{result.round(1)} / 5.0" }
    else
      { average_rating: "none" }
    end
  end

end
