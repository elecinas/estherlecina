function showImg(img) {
  var x = document.getElementById("xfrd_Luna_07_08");
  //var firstIMG = document.getElementById('xfrd_Luna_07_08').getElementsByTagName('img')[0];
  if (x.style.display === "none") {
    x.style.display = "block";
    $("body").addClass("no_scroll");
  } else {
    x.style.display = "none";
    $("body").removeClass("no_scroll");
  }
}