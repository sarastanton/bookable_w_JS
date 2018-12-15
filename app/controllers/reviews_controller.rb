class ReviewsController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_book_in_params
  before_action :find_user
  protect_from_forgery with: :null_session

  def create
    @review = Review.create(review_params)
    if @review.save
      if ReadStatus.find_by(user_id: @user.id, book_id: @book.id) == nil
        @book.add_to_my_books(@user)
        @book.mark_as_read(@user)
      end
    else
      render 'new'
    end
    render json: @review, status: 200
  end

  def index
    @review = Review.new(book_id: params[:book_id], user_id: helpers.current_user.id)
    @reviews = Review.where(book_id: params[:book_id])
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @reviews, status: 200 }
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render json: @review, status: 200
    else
      render 'index'
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    @reviews = Review.all
    render json: {reviewId: @review.id}
  end


  private

  def review_params
    params.require(:review).permit(:user_id, :book_id, :content)
  end
end
