

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :goodreads3, ENV['GOODREADS_KEY'], ENV['GOODREADS_SECRET']
end
