import imgBack from "../../img/icon/back.svg";

window.process = {
    env: {
        NODE_ENV: 'development'
    }
}

window.addEventListener('DOMContentLoaded',main);

function main() {
    document.getElementById('back_img_map').setAttribute('src',imgBack);
}