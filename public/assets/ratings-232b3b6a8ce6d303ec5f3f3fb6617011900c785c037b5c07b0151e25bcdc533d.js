$(document).ready(function(){class t{constructor(){this.baseUrl=`http://localhost:3000/books/${window.location.href.split("/")[4]}/ratings`}getRating(){return fetch(`${this.baseUrl}.json`).then(t=>t.json()).then(t=>new e(t))}createDBRating(t,e,n){const a={user_id:t,book_id:e,value:n};return fetch(`${this.baseUrl}.json`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({rating:a})}).then(function(t){return t.ok&&$(".success").text("Rating saved successfully!"),t}).then(t=>t.json())}updateDBRating(t,e){const n={id:t,value:e};return fetch(`${this.baseUrl}/${t}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({rating:n})}).then(function(t){return t.ok&&$(".success").text("Rating saved successfully!"),t}).then(t=>t.json())}}class e{constructor(t){this.id=t.id,this.userId=t.user_id,this.bookId=t.book_id,this.value=t.value,this.avRating=t.average_rating}}class n{constructor(){this.adapter=new t,this.fetchAndLoadRating(),this.listeners(),this.baseUrl=`http://localhost:3000/books/${window.location.href.split("/")[4]}/ratings`}fetchAndLoadRating(){this.adapter.getRating().then(t=>{this.renderRating(t)})}renderRating(t){this.renderAverageRating(t.avRating),t.id!=undefined&&($(`#rating_value_${t.value}`).attr("checked","checked"),$("#rating_rating_id").val(`${t.id}`))}renderAverageRating(t){const e=$("#av_rating_container");e.empty(),e.append(`${t}`)}listeners(){$("#new_rating").on("submit",this.decideNewOrUpdate.bind(this))}decideNewOrUpdate(t){const e=$("#rating_rating_id").val();t.preventDefault(),""==e?this.createNewRating():this.updateRating()}createNewRating(){event.preventDefault();const t=$(".new_rating :checked").val(),e=$("#rating_user_id").val(),n=$("#rating_book_id").val();this.adapter.createDBRating(e,n,t).then(()=>this.fetchAndLoadRating())}updateRating(){event.preventDefault();const t=$("#rating_rating_id").val(),e=$(".new_rating :checked").val();this.adapter.updateDBRating(t,e).then(()=>this.fetchAndLoadRating())}}new n});