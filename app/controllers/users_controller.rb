class UsersController < ApplicationController

  include ApplicationHelper
  include UsersHelper

  before_action :require_login
  skip_before_action :require_login, only: [:new, :create]

  def new
    if !logged_in?
      @user = User.new
      render 'signup'
    else
      redirect_to root_path
    end
  end

  def create
    @user = User.create(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :signup
    end
  end

  def show
    @user = User.find(params[:id])
    if @user == current_user
      respond_to do |format|
        format.html { render :profile }
        format.json { render json: @user, status: 200 }
      end
    else
      redirect_to root_path
    end
  end

  def index
    respond_to do |format|
      format.html { render :profile }
      format.json { render json: @user, status: 200 }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

end
