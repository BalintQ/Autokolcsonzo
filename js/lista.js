import data_a from "../json/autok.json" with {type:'json'};
import data_f from "../json/foglalasok.json" with {type:'json'};

const ki = document.getElementById("ki")
const card_v = doc-getElementById("card_v")
const list_v = doc-getElementById("list_v")

const cards = () => {
    ki.classList.remove("lista")
    ki.classList.add("grid")

    ki.innerHTML = ""

    data_a.forEach(element => {
        ki.innerHTML += `
            <div class="card">
                <img src="${element.kep}" alt="Avatar" style="width:100%">
                <div class="container">
                    <h4><b>${element.gyarto} ${element.modell}</b></h4> 
                    <p>${element.ar} Ft/hó</p> 
                </div>
            </div>`
    });
}

cards();