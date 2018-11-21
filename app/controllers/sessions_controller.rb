class SessionsController < ApplicationController

  include SessionsHelper
  include ApplicationHelper

  before_action :require_login
  skip_before_action :require_login, only: [:new, :create, :index]


  def new
    if logged_in?
      redirect_to root_path
    else
      @user = User.new
      render 'login'
    end
  end

  def create
    if params[:user] != nil #user logs in with existing Bookable account
      @user = User.find_by(username: params[:user][:username])
      if @user
        login_with_bookable(@user)
      else
        render 'login'
      end
    else #user logs in with Goodreads
      if !!login_with_goodreads
        session[:user_id] = @user.id
        redirect_to root_path
      else
        render 'login'
      end
    end
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
