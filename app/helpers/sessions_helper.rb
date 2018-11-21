module SessionsHelper

  def login_status_display
		if logged_in?
			username = User.find_by(id: session[:user_id]).username
			login_status = "You are logged in as #{username} "
		else
			login_status = "You are NOT logged in"
		end
	end

  def login_with_bookable(user)
    if user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      @user.errors[:base] << "Invalid username and/or password"
      render 'login'
    end
  end

   def login_with_goodreads
    @user = User.find_or_create_by(username: auth[:info][:name]) do |u|
      u.username = auth['info']['name'] + " " + auth['uid']
      u.password = SecureRandom.hex
    end
  end

end
