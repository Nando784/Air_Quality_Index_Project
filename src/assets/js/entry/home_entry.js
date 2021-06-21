//Dev Import
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../sass/main.scss';

import img2_5 from "../../img/PM2_5.png";
import img10 from "../../img/PM10.png";
import imgO3 from "../../img/O3.png";
import imgNo2 from "../../img/NO2.png";


function initialize() {

    let Pm2_5Img=document.getElementById('pm2_5-img');
        Pm2_5Img.setAttribute('src',img2_5);

    let Pm10Img=document.getElementById('pm10-img');
        Pm10Img.setAttribute('src',img10);

    let o3Img=document.getElementById('o3-img');
        o3Img.setAttribute('src',imgO3);

    let No2Img=document.getElementById("no2-img");
        No2Img.setAttribute('src',imgNo2);
}


window.addEventListener('DOMContentLoaded',initialize);