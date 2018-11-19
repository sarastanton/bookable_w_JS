class GenresController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_genre_in_params
  skip_before_action :find_genre_in_params, only: [:new, :create]

  def new
    @genre = Genre.new
    render json: @genre, status: 200
  end

  def create
    @genre = Genre.create(genre_params)
    if @genre.save
      redirect_to genre_path(@genre)
    else
      render 'new'
    end
    render json: @genre, status: 200
  end

  def index
    @genres = Genre.all.sort_by(&:name)
    render json: @genres, status: 200
  end

  def show
    render json: @genre, status: 200
  end

  def edit
    render json: @genre, status: 200
  end

  def update
    redirect_to genre_path(@genre) if @genre.update(genre_params)
    render json: @genre, status: 200
  end

  def destroy
    @genre.destroy
    render json: { genreId: @genre.id }
  end

  private

  def genre_params
    params.require(:genre).permit(:name)
  end

end
