import imgHumidity from "../../img/icon/humidity.svg";
import imgTemperature from "../../img/icon/temp.svg";
import imgWind from "../../img/icon/wind.svg";
import imgPressure from "../../img/icon/pressure.svg";
import imgBack from "../../img/icon/back.svg";

import request from "../request";


//Function
function printNotValidStation() {
  console.log("Invalid Id Value");
  let div = document.getElementById('container-details');
  div.parentNode.removeChild(div);  //TODO Vedi perché non rimuove il div
  document.getElementById('ui').innerHTML="<div style='height: 420px; width: 420px; display: flex; justify-content: center; align-items: center; flex-direction: column;'><h1>Ooops...</h1><br><h1> 404 Stations and This One is Not Found Here</h1></div>"
}



/*---------- Main ----------*/
window.addEventListener("DOMContentLoaded", main);

function main() {
  let urlParams = new URLSearchParams(window.location.search);
  let stationId =urlParams.get("id");


  //Load UI Img
  document.getElementById('h_img').setAttribute('src',imgHumidity);
  document.getElementById('t_img').setAttribute('src',imgTemperature);
  document.getElementById('w_img').setAttribute('src',imgWind);
  document.getElementById('p_img').setAttribute('src',imgPressure);
  document.getElementById('back_img').setAttribute('src',imgBack);


  if (stationId !== "undefined"&&stationId!=="null") {
      request.sentName('@'+stationId);
  }else{
      printNotValidStation();
  }
}