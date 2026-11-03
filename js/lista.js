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

    data_f.forEach(element => {
      if (localStorage.getItem(element.id) != "true") {
        const datum_k = new Date(element.kezdo_datum)
        const datum_v = new Date(element.kezdo_datum)
        datum_v.setMonth(datum_v.getMonth() + element.idotartam)
        ki.innerHTML += `
            <div class="card">
                <img src="${data_a[element.auto_id-1].kep}" alt="${data_a[element.auto_id-1].gyarto} ${data_a[element.auto_id-1].modell}" style="width:100%">
                <div class="container">
                    <h4><b>${element.ugyfel.nev}</b></h4>
                    <p>${data_a[element.auto_id-1].gyarto} ${data_a[element.auto_id-1].modell}</p>
                    <p>${datum_k.toLocaleDateString()} - ${datum_v.toLocaleDateString()}</p>
                    <p>${element.ar} Ft</p>
                </div>
            </div>`
}});
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
    if (localStorage.getItem(element.id) != "true") {
      temp.innerHTML += `<tr> <td>${data_a[element.auto_id-1].gyarto} ${data_a[element.auto_id-1].modell}</td> <td>${element.kezdo_datum}</td> <td>${element.idotartam}</td> <td>${element.ar} Ft</td> <td>${element.ugyfel.nev}</td> <td>${element.ugyfel.telefonszam}</td> <td><button value=${element.id} class="torles" >Törlés</button></td></tr>`
    }
  });

    ki.appendChild(temp)


    for (const element of document.getElementsByClassName("torles")) {
        element.addEventListener("click", () =>
            del(element.value)
        )
    }

}

const del = (val) => {
  localStorage.setItem(val, "true")
  list()
}

card_v.addEventListener("click",cards)
list_v.addEventListener("click",list)
window.addEventListener("load", cards)



var teto = document.getElementById("teto")

const scroll20 = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    teto.style.display = "block";
  } else {
    teto.style.display = "none";
  }
}

window.addEventListener("scroll", scroll20)

teto.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear()
  if (ki.classList.contains("grid")) {
    cards()
  }else{
    list()
  }
})
