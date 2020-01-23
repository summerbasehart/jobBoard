function openLink(evt, animName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("job");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(animName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}

function admin() {
  var x;
  x = document.getElementsByClassName("mainContainer");
  if (loginStatus === true) {
    x.style.width = "100%";
  } else {
    x.style.width = "85%";
  }
}