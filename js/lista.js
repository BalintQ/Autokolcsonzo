import data_a from "../json/autok.json" with {type:'json'};
import data_f from "../json/foglalasok.json" with {type:'json'};

const ki = document.getElementById("ki")
const card_v = document.getElementById("card_v")
const list_v = document.getElementById("list_v")

const cards = () => {
    ki.classList.remove("lista")
    ki.classList.add("grid")
    card_v.classList.add("active")
    list_v.classList.remove("active")
    
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

const list = () => {
    ki.classList.add("lista")
    ki.classList.remove("grid")
    card_v.classList.remove("active")
    list_v.classList.add("active")

    ki.innerHTML = ""  
    
    var temp = document.createElement("table")

    temp.innerHTML += `<tr> <th>Autó</th> <th>Kezdő dátum</th> <th>Időtartam (hónap)</th> <th>Teljes ár</th> <th>Ügyfél neve</th> <th>Ügyfél telefonszáma</th> </tr>`
    
    data_f.forEach(element => {
        temp.innerHTML += `<tr> <td>${data_a[element.auto_id-1].gyarto} ${data_a[element.auto_id-1].modell}</td> <td>${element.kezdo_datum}</td> <td>${element.idotartam}</td> <td>${element.ar}</td> <td>${element.ugyfel.nev}</td> <td>${element.ugyfel.telefonszam}</td> <td><button value=${element.id} class="torles" >Törlés</button></td></tr>`
    });

    ki.appendChild(temp)


    for (const element of document.getElementsByClassName("torles")) {
        element.addEventListener("click", () =>
            del(element.value)
        )
    }

}

const del = (val) => {
    localStorage.setItem(val,"true")
}

card_v.addEventListener("click",cards)
list_v.addEventListener("click",list)