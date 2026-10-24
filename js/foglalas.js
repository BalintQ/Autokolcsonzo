import data_a from "../json/autok.json" with {type:'json'};
import data_f from "../json/foglalasok.json" with {type:'json'};

const nev = document.getElementById("name")
const email = document.getElementById("email")
const telefon = document.getElementById("phone")
const datum = document.getElementById("date")
const modell = document.getElementById("model")
const idotartam = document.getElementById("duration")
const osszeg = document.getElementById("price")
const adatkezeles = document.getElementById("privacy")
const kuldes = document.getElementById("kuldes")
const uzenet = document.getElementById("uzenet")

const ma = new Date().toISOString().split("T")[0]
datum.min = ma

for (let i = 1; i <= 12; i++) {
    idotartam.innerHTML += `<option value="${i}">${i} hónap</option>`
}

const foglalt = (auto_id) => {
    if (datum.value == "") {
        return false
    }

    const kezdo = new Date(datum.value)
    const veg = new Date(datum.value)
    veg.setMonth(veg.getMonth() + Number(idotartam.value))

    var utkozik = false

    data_f.forEach(element => {
        if (element.auto_id == auto_id && localStorage.getItem(element.id) != "true") {
            const f_kezdo = new Date(element.kezdo_datum)
            const f_veg = new Date(element.kezdo_datum)
            f_veg.setMonth(f_veg.getMonth() + element.idotartam)

            if (kezdo < f_veg && f_kezdo < veg) {
                utkozik = true
            }
        }
    });

    return utkozik
}

const autok_feltoltese = () => {
    var kivalasztott = modell.value

    modell.innerHTML = `<option value="">-- Válassz autót --</option>`

    data_a.forEach(element => {
        if (foglalt(element.id)) {
            modell.innerHTML += `<option value="${element.id}" disabled>${element.gyarto} ${element.modell} (foglalt)</option>`
            if (kivalasztott == element.id) {
                kivalasztott = ""
            }
        } else {
            modell.innerHTML += `<option value="${element.id}">${element.gyarto} ${element.modell} - ${element.ar} Ft/hó</option>`
        }
    });

    modell.value = kivalasztott
}

const ar_szamitas = () => {
    if (modell.value == "") {
        osszeg.value = "0 Ft"
    } else {
        const auto = data_a[modell.value - 1]
        osszeg.value = `${auto.ar * idotartam.value} Ft`
    }
}

const frissites = () => {
    autok_feltoltese()
    ar_szamitas()
}

var hibas = false

const ellenoriz = (mezo, helyes) => {
    if (helyes) {
        mezo.classList.remove("is-invalid")
    } else {
        mezo.classList.add("is-invalid")
        hibas = true
    }
}


const email_minta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const telefon_minta = /^(\+36|06)?\s?(20|30|31|50|70)\s?\d{3}\s?\d{4}$/

const elkuldes = () => {
    hibas = false

    ellenoriz(nev, nev.value.trim().length >= 3)
    ellenoriz(email, email_minta.test(email.value))
    ellenoriz(telefon, telefon_minta.test(telefon.value))
    ellenoriz(datum, datum.value != "" && datum.value >= ma)
    ellenoriz(modell, modell.value != "")
    ellenoriz(adatkezeles, adatkezeles.checked)

    uzenet.classList.remove("rejtett")

    if (hibas) {
        uzenet.classList.remove("alert-success")
        uzenet.classList.add("alert-danger")
        uzenet.innerHTML = "Kérjük, töltsd ki helyesen a pirossal jelölt mezőket!"
        return
    }

    const auto = data_a[modell.value - 1]
    const teljes_ar = auto.ar * idotartam.value

    data_f.push({
        id: data_f.length,
        auto_id: auto.id,
        kezdo_datum: datum.value,
        idotartam: Number(idotartam.value),
        ar: teljes_ar,
        ugyfel: {
            nev: nev.value,
            email: email.value,
            telefonszam: telefon.value
        }
    })

    uzenet.classList.remove("alert-danger")
    uzenet.classList.add("alert-success")
    uzenet.innerHTML = `
        <h4>Köszönjük a foglalást!</h4>
        <p>
            <b>Név:</b> ${nev.value}<br>
            <b>E-mail:</b> ${email.value}<br>
            <b>Telefonszám:</b> ${telefon.value}<br>
            <b>Autó:</b> ${auto.gyarto} ${auto.modell}<br>
            <b>Kezdő dátum:</b> ${datum.value}<br>
            <b>Bérlési idő:</b> ${idotartam.value} hónap<br>
            <b>Teljes ár:</b> ${teljes_ar} Ft
        </p>`

    nev.value = ""
    email.value = ""
    telefon.value = ""
    datum.value = ""
    modell.value = ""
    idotartam.value = "1"
    adatkezeles.checked = false
    frissites()
}

datum.addEventListener("change", frissites)
idotartam.addEventListener("change", frissites)
modell.addEventListener("change", ar_szamitas)
kuldes.addEventListener("click", elkuldes)

frissites()