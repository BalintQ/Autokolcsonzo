// Vissza a tetejére gomb

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
