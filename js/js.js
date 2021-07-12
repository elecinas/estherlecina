function showImg(img) {
  var image = new Image();
  image.src = img;/* asignamos la dirección recibida al objeto imagen */
  var image_width = image.width;/* obtenemos el ancho de la imagen */
  /*var pos_x = window.scrollX;*/
  /*var pos_y = window.scrollY;*/
  var x = document.getElementById("modal1");
  var firstIMG = document.getElementById('modal1').getElementsByTagName('img')[0];
  if (x.style.display === "none") {
    x.style.display = "block";
    /*window.scroll(pos_x, 100);*/
    /*firstIMG.style.top = "20px";*/
    /*firstIMG.style.left = 'calc(50% - ' + image_width + 'px/2)';*/
    $("body").addClass("no_scroll");
  } else {
    x.style.display = "none";
    $("body").removeClass("no_scroll");
  }
}