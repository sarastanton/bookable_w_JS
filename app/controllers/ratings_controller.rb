class RatingsController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_book_in_params
  before_action :find_user
  protect_from_forgery with: :null_session

  def new
    @rating = Rating.new(book_id: params[:book_id], user_id: helpers.current_user.id)
    # render json: @rating, status: 200
  end

  def index
    @rating = Rating.find_or_initialize_by(book_id: params[:book_id], user_id: helpers.current_user.id)
    render json: @rating, status: 200
  end

  def create
    @rating = Rating.create(rating_params)
    if @rating.save
      render json: @rating, status: 200
    else
      redirect_to 'books_path'
    end
  end

  def edit
    @rating = Rating.find(params[:id])
    if @rating.user == current_user
      render 'edit'
    else
      redirect_to user_path(@user)
    end
    # render json: @rating, status: 200
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update(rating_params)
      render json: @rating, status: 200
    else
      redirect_to 'books_path'
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:user_id, :book_id, :value)
  end

end
