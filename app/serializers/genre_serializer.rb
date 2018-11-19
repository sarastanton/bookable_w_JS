class GenreSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :books
  has_many :authors, through: :books
  
end
