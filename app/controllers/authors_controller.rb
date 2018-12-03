class AuthorsController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_author_in_params
  skip_before_action :find_author_in_params, only: [:new, :create]
  protect_from_forgery with: :null_session


  def create
    @author = Author.create(author_params)
    if @author.save
      respond_to do |format|
        format.html { render :index }
        format.json { render json: @author, status: 200 }
      end
    else
      render 'index'
    end
  end

  def index
    @authors = Author.all
    @author = Author.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @authors, status: 200 }
    end
  end

  def show
    
  end

  def update
    @author.update(author_params)
    render json: @author, status: 200
  end

  def destroy
    @author.destroy
    @authors = Author.all
    render json: {authorId: @author.id}
  end

  private

  def author_params
    params.require(:author).permit(:name)
  end


  end
