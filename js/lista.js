serverurl='php/';
produkter=[{"id":1,"namn":"Smör","checked":0},
            {"id":2,"namn":"Korv","checked":0},
            {"id":3,"namn":"Bröd","checked":0}];

window.onload = function(){
    getProducts();
}

function getProducts(){
    //radera vid fungerande php
    appendProducts(produkter);

    fetch(serverurl+'hamtaAlla.php')
      .then(function (response) {
        if (response.status == 200) {
            return response.json();
        }
      })
      .then(function (data) {
        //appendProducts(data);
      })
}

function appendProducts(data){

    //hämtar tabellbody elementet från html dokumentet och tömmer den
    tabell=document.getElementById("varorbody");
    tabell.innerHTML="";

    //loopar igenom data arrayn och skapar produktrader
    for(let i=0;i<data.length;i++){
        let rad=document.createElement("tr");

        let checkboxtd=document.createElement("td");
        let checkbox=document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.onclick=function(){
            checkProduct(data[i].id);
        }
        checkboxtd.appendChild(checkbox);

        let texttd=document.createElement("td");
        texttd.innerHTML=data[i].namn;

        let redigeratd=document.createElement("td");
        let redigeraicon=document.createElement("i");
        redigeraicon.classList.add("material-icons");
        redigeraicon.innerHTML="edit";
        redigeraicon.onclick=function(){
            editProduct(data[i].id);
        }
        redigeratd.appendChild(redigeraicon);

        let raderatd=document.createElement("td");
        let raderaicon=document.createElement("i");
        raderaicon.classList.add("material-icons");
        raderaicon.innerHTML="delete";
        raderaicon.onclick=function(){
            deleteProduct(data[i].id);
        }
        raderatd.appendChild(raderaicon);

        rad.appendChild(checkboxtd);
        rad.appendChild(texttd);
        rad.appendChild(redigeratd);
        rad.appendChild(raderatd);
        tabell.appendChild(rad);
    }
}