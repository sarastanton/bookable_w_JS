require 'rails_helper'

RSpec.describe Rating, :type => :model do

  before(:all) do

    Author.find_or_create_by(
      :name => "Leigh Bardugo",
    )

    Genre.create(
      :name => "YA Fantasy",
    )

    Book.create(
      :title => "Crooked Kingdom",
      :author_id => 1,
      :genre_id => 1,
      :page_count => 536
    )

    User.create(
      :username => "Fiona",
      :password => "test"
    )

  end

  let(:rating) {
    Rating.create(
      :value => 5,
      :user_id => 1,
      :book_id => 1,
    )
  }


  it "is valid with a user, a book, and content" do
    expect(rating).to be_valid
  end

  it "is not valid without a book" do
    expect(Rating.new(value: 1, user_id: 1)).not_to be_valid
  end

  it "is not valid without a user" do
    expect(Rating.new(value: "Meh", book_id: 1)).not_to be_valid
  end

end
