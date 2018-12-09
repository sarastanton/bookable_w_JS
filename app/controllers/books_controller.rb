class BooksController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_user
  before_action :find_book_in_params
  skip_before_action :find_book_in_params, only: [:new, :create]
  protect_from_forgery with: :null_session

  def new

  end

  def create
    @book = Book.new
    @book = Book.create(book_params)
    if @book.save
      render json: @book, status: 200
    else
      render 'new'
    end
  end

  def index
    @book = Book.new
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
    end
  end

  def edit
    respond_to do |format|
      format.html { render 'edit' }
      format.json { render json: @books, status: 200 }
    end
  end

  def update
    if @book.update(book_params)
      render json: @book, status: 200
    else
      render 'show'
    end
  end

  def destroy
    @book.destroy
    render json: { bookId: @book.id}
  end

  def add_to_my_books
    book_id = params[:id]
    current_user.books << Book.find(book_id)
    @read_status = ReadStatus.find_or_create_by(book_id: book_id, user_id: current_user.id)
  end

  def mark_as_read
    book_id = params[:id]
    @read_status = ReadStatus.find_by(book_id: book_id, user_id: current_user.id)
    @read_status.value = true
    @read_status.save
  end

  private

  def book_params
    params.require(:book).permit(:title, :author_name, :genre_name, :page_count)
  end


end
