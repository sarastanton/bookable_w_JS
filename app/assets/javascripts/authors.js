// <table class="table">
//   <th> Author </th>
//   <th> Number of Books </th>
//
//   <% @authors.each do |author| %>
//   <tr>
//     <td> <%= link_to author.name, author_path(author) %> </td>
//     <td> <%= author.books.count %> </td>
//   </tr>
//   <% end %>
// </table>
