function showImg() {
  var x = document.getElementById("modal1");
  //var firstIMG = document.getElementById('modal1').getElementsByTagName('img')[0];
  if (x.style.display === "none") {
    x.style.display = "block";
    $("body").addClass("no_scroll");
  } else {
    x.style.display = "none";
    $("body").removeClass("no_scroll");
  }
}