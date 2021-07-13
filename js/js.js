function showImg(img) {
  var scroll_position = window.scrollY;//guardem la posició actual de l'scroll
  var x = document.getElementById(img);//obtenim l'element enviat
  var clase = document.querySelectorAll('.fondo_modal');//seleccionem la classe
  clase.forEach(element => {
    element.style.top = Math.round(scroll_position) + "px";//possició de l'scroll := posició de la imatge
  });
  if (x.style.display === "none") {
    x.style.display = "block";//ensenyem l'imatge
    $("body").addClass("no_scroll");//bloquegem l'scroll
  } else {
    x.style.display = "none";//amaguem l'imatge
    $("body").removeClass("no_scroll");//desbloquegem l'scroll
  }
}