'use strict';

function My_Date() {
    var d = document.getElementById(
        "galaxydate").autocomplete = "on";
}
function dateInput() {
    var date = document.getElementById("galaxydate").value;
    //check if the date>today
    getNasadata(date);


}
/*function today() {
    var date = new date();
    return date;
}*/

/*get data from Nasa Api by date */
const getNasadata = function (date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=Niv6BDsywRaqU6rasQ1gAC1j9ByReklPu0m93JdY&date=${date}`).then(
        function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log(data);
            show(data);
        }).catch((err) => console.error(`Fetch problem: ${err.message}`));

}



function show(data) {
    let p = `${data.title}`;
    document.getElementById("employees").innerHTML = p;
}

























//console.log(data);
/*const html = `<main class="container">
<div class="imgdata">

      <article class="nasaData">
        <img class="planetImg" src="${data}" />
        <div class="imgdata">
          <h3 class="title">title</h3>
          <p class="explination">explination</p>
          <h3 class="copyright">copyright<h3>
        </div>
      </article>

</div>`;*/


//const imgdataContainer = document.document.querySelector('.imgdata')