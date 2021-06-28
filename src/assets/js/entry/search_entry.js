//<div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

//Dev Import
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../sass/main.scss';
import request from "../request";

import imgGps from "../../img/icon/Navigation.svg";
import imgInput from "../../img/icon/Search.svg";
import imgIco from "../../img/page_icon.png";

function initialize() {


    try {

        let gpsImg = document.getElementById('nav-ico');
        gpsImg.setAttribute('src', imgGps);

        let inputImg = document.getElementById('search-icon');
        inputImg.setAttribute('src', imgInput);

        let gpsBtn = document.getElementById('gps-btn');
        gpsBtn.addEventListener('click', request.sentCurrentPosition);

        let inputBtn = document.getElementById("input-btn");
        inputBtn.addEventListener('click', request.sentCity);

        //Animation
        let inputTxt = document.getElementById('city-txt');
        inputTxt.addEventListener('focusin', () => {
            inputTxt.setAttribute('style', 'animation: showInput 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;')
            inputBtn.setAttribute('style', 'visibility: visible; animation: showBtn 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;');
        });
        inputTxt.addEventListener('focusout', () => {
            setTimeout(() => {
                inputTxt.setAttribute('style', 'animation: hideInput 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;')
                inputBtn.setAttribute('style', ' visibility: visible; animation: hideBtn 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;');
            }, 300)
        });

    } catch (e) {
    }

}

//Set Page Icon
let ico = document.createElement('link');
ico.setAttribute('href', imgIco);
ico.setAttribute('rel', 'icon');
ico.setAttribute('type', 'image/ico');
document.head.appendChild(ico);

//Initialize Element
window.addEventListener('DOMContentLoaded', initialize);