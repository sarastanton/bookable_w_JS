class BooksController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_user
  before_action :find_book_in_params
  skip_before_action :find_book_in_params, only: [:new, :create]

  def new
    @book = Book.new
    render json: @book, status: 200
  end

  def create
    @book = Book.new
    @book = Book.create(book_params)
    if @book.save
      redirect_to book_path(@book)
    else
      render 'new'
    end
    render json: @book, status: 200
  end

  def index
    @books = Book.all.sort_by(&:title)
    if params[:add_to_my_books]
      @book.add_to_my_books(@user)
    end
    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: @books, status: 200 }
    end
  end

  def show
    @review = Review.new(book_id: params[:book_id], user_id: helpers.current_user.id)
    respond_to do |format|
      format.html { render 'show' }
      format.json { render json: @books, status: 200 }
    end  end

  def edit
    respond_to do |format|
      format.html { render 'edit' }
      format.json { render json: @books, status: 200 }
    end
  end

  def update
    redirect_to book_path(@book) if @book.update(book_params)
    render json: @book, status: 200
  end

  def destroy
    @book.destroy
    render json: { bookId: @book.id}
  end

  private

  def book_params
    params.require(:book).permit(:title, :author_name, :genre_name, :page_count)
  end


end
