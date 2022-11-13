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
    console.log(date)
    // fetch(`https://api.nasa.gov/planetary/apod?api_key=Niv6BDsywRaqU6rasQ1gAC1j9ByReklPu0m93JdY&date=${date}`).then(
    //     function (response) {
    //         console.log(response);
    //         return response.json();
    //     }).then(function (getData) {
    //         console.log(getData);

    //         show(getData);
    //     }).catch((err) => console.error(`Fetch problem: ${err.message}`));
    fetch(`https://api.nasa.gov/planetary/apod?api_key=Niv6BDsywRaqU6rasQ1gAC1j9ByReklPu0m93JdY&start_date=${date}`).then(
        function (response) {
            console.log(response);
            return response.json();
        }).then(function (getData) {
            console.log(getData);
            data = getData;
            autocomplete(document.getElementById("myInput"), getData)

        }).catch((err) => console.error(`Fetch problem: ${err.message}`));

}

function show(getData) {



    // Loop to access all rows 

    let tab = `
        <p>Copyright: ${getData.copyright} </p>
        <p>Date: ${getData.date}</p>
        <p>Explanation: ${getData.explanation}</p> 
        
              
    `;
    if (getData.media_type = "image") {
        tab += `<img src="${getData.hdurl}"/>`
    }
    // Setting innerHTML as tab variable
    document.getElementById("getData").innerHTML = tab;


}

var data;
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].title.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].title + "</strong>";
                b.innerHTML += arr[i].title.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].title + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;

                    show(data.filter(x => x.title == inp.value)[0])
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
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