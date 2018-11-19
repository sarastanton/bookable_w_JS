1) Must render at least one index page (index resource - 'list of things') via JavaScript and an Active Model Serialization JSON Backend.
    -- Books index
    -- Authors index
    -- Genres index


2) Must render at least one show page (show resource - 'one specific thing') via JavaScript and an Active Model Serialization JSON Backend.
    -- Review show page
    -- Book show page


3) Your Rails application must dynamically render on the page at least one 'has-many' relationship through JSON using JavaScript.
    -- Review show page


4) Must use your Rails application and JavaScript to render a form for creating a resource that submits dynamically.
    -- Review form
    -- New author form ** how to sort?
    -- New genre form
    -- New book form?


5) Must translate the JSON responses into JavaScript Model Objects using either ES6 class or constructor syntax. The Model Objects must have at least one method on the prototype. Formatters work really well for this.
    -- Borrowing from the blog domain example, instead of plainly taking the JSON response of the newly created comment and appending it to the DOM, you would create a Comment prototype object and add a function to that prototype to perhaps concatenate (format) the comments authors first and last name. You would then use the object to append the comment information to the DOM.



Rails App with JavaScript Frontend Spec
Project Specs:
[ ]  Must have a Rails Backend and new requirements implemented through    JavaScript.
[ ]  Makes use of ES6 features as much as possible(e.g Arrow functions, Let & Const, Constructor Functions)
[ ]  Must translate the JSON responses into Javascript Model Objects using either ES6 class or constructor syntax.
[ ]  Must render at least one index page (index resource - 'list of things') via JavaScript and an Active Model Serialization JSON Backend.
[ ]  Must render at least one show page (show resource - 'one specific thing') via JavaScript and an Active Model Serialization JSON Backend.
[ ]  Your Rails application must reveal at least one `has-many` relationship through JSON that is then rendered to the page.
[ ]  Must use your Rails application to render a form for creating a resource that is submitted dynamically through JavaScript.
[ ]  At least one of the JS Model Objects must have a method on the prototype.

Project Repo Specs:
Read Me file contains:
[ ]  Application Description
[ ]  Installation guide (e.g. fork and clone repo, migrate db, bundle install, etc)
[ ]  Contributors guide (e.g. file an issue, file an issue with a pull request, etc)
[ ]  Licensing statement at the bottom (e.g. This project has been licensed under the MIT open source license.)

Repo General
[ ]  You have a large number of small Git commits
[ ]  Your commit messages are meaningful
[ ]  You made the changes in a commit that relate to the commit message
[ ]  You don't include changes in a commit that aren't related to the commit message
