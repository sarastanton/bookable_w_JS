Rails.application.routes.draw do

  resources :read_statuses
  resources :genres
  resources :users
  resources :books
  resources :authors

  resources :books do
    resources :reviews
    resources :ratings
  end

  get '/login' => 'sessions#new'
  get '/auth/goodreads2/callback' => 'sessions#create'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  # get '/my_books' => 'books#index'

  put '/books/:id/add_to_my_books' => 'books#add_to_my_books'
  put '/books/:id/mark_as_read' => 'books#mark_as_read'


  root 'sessions#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
