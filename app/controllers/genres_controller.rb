class GenresController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_genre_in_params
  skip_before_action :find_genre_in_params, only: [:new, :create]
  protect_from_forgery with: :null_session

  def create
    @genre = Genre.create(genre_params)
    if @genre.save
      respond_to do |format|
        format.html { render :index }
        format.json { render json: @genre, status: 200 }
      end
    else
      render 'index'
    end
  end

  def index
    @genres = Genre.all
    @genre = Genre.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @genres, status: 200 }
    end
  end

  def show
  end

  def update
    @genre.update(genre_params)
    render json: @genre, status: 200
  end

  def destroy
    @genre.destroy
    @genres = Genre.all
    render json: {genreId: @genre.id}
  end

  private

  def genre_params
    params.require(:genre).permit(:name)
  end


  end
