function checkEmpty(value, idEle, message) {
    if (value == "") {
      document.getElementById(idEle).style.display = "block";
      document.getElementById(idEle).innerHTML = message;
      return false;
    } else {
      document.getElementById(idEle).style.display = "none";
      document.getElementById(idEle).innerHTML = "";
      return true;
    }
  }
  
  function checkLength(value, idEle, message, min, max) {
    if (!(value.length >= min && value.length <= max)) {
      document.getElementById(idEle).style.display = "block";
      document.getElementById(idEle).innerHTML = message;
      return false;
    } else {
      document.getElementById(idEle).style.display = "none";
      document.getElementById(idEle).innerHTML = "";
      return true;
    }
  }
  
