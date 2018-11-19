class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_id, :genre_id, :page_count

  belongs_to :author
  belongs_to :genre

  has_many :ratings

  has_many :reviews

  has_many :read_statuses
  has_many :users, through: :read_statuses

end
