class AuthorsController < ApplicationController

  include ApplicationHelper
  before_action :require_login
  before_action :find_author_in_params
  skip_before_action :find_author_in_params, only: [:new, :create]

  # def new
  #   @author = Author.new
  #   respond_to do |format|
  #     format.html { render :new }
  #     format.json { render json: @author, status: 200 }
  #   end
  # end

  def create
    @author = Author.create(author_params)
    if !@author.save
      render 'new'
    end
  end

  def index
    @authors = Author.all.sort_by(&:name)
    @author = Author.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @authors, status: 200 }
    end
  end

  def show
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @author, status: 200 }
    end
  end

  def edit
    respond_to do |format|
      format.html { render :edit }
      format.json { render json: @author, status: 200 }
    end
  end

  def update
    if @author.update(author_params)
      redirect_to author_path(@author)
    end
    render json: @author, status: 200
  end

  def destroy
    @author.destroy
    render json: {authorId: @author.id}
  end

  private

  def author_params
    params.require(:author).permit(:name)
  end


  end
