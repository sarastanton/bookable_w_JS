# Bookable

## OVERVIEW

Bookable is a Ruby on Rails application that lets users create a list of books (including author, genre, and page count) that they either have or would like to read. Users can also track the number of pages they have read, as well as leave ratings and reviews for books they have read. Users can create an account through a traditional signup form, or log in with an existing Goodreads account.

## INSTALLATION

Clone or download this repository and run ```bundle install``` to install the gems necessary for this application. Run ```rake db:migrate``` to create database tables and ```rake db:seed``` to load seed data into the database. Preview the application in your web browser at http://localhost:3000/ using ```rails s``` .

## GOODREADS OMNIAUTH
**NOTE ON GOODREADS OMNIAUTH LOGIN:** The "login with Goodreads" feature on the application's login and signup pages will NOT work out of the box. This is because a Goodreads API developer key is required, and I will not publicly post my individual developer key. If you would like to configure the application to get the Goodreads login working, you will need to configure the application to use your own Goodreads API developer key and secret. Here's how:

### CONFIGURE DEVELOPER KEY

  1) Sign up for a developer key for the Goodreads API: https://www.goodreads.com/api/keys
     * Application URL: https://localhost:3000/
     * Callback URL: https://localhost:3000/auth/goodreads/callback

  2) Create a file within the root directory of the application called **.env** that contains the following two lines:

    GOODREADS_KEY=[insert key from Goodreads here, without brackets]
    GOODREADS_SECRET=[insert secret from Goodreads here, without brackets]

  _If you are going to save your project to version control and/or push to a publicly visible repository, you can add the **.env** file to **.gitignore** so that it is not made public._

  3) Once you have added your **.env** file with your own individual developer key and secret from Goodreads, use  ```thin start --ssl ``` to preview the application in your browser at https://localhost:3000/ with an HTTPS connection.


## CONTRIBUTING

Bug reports and pull requests are welcome on GitHub at https://github.com/sarastanton/bookable_w_JS. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## LICENSE

The application is available as open source under the terms of the [MIT License](https://github.com/sarastanton/bookable_w_JS/blob/master/LICENSE).

## CODE OF CONDUCT

Everyone interacting in the Bookable project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/sarastanton/bookable_w_JS/blob/master/CODE_OF_CONDUCT.md).
