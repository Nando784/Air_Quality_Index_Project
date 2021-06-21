import request from "../request";

let urlParams = new URLSearchParams(window.location.search);   //Parse the URL and Create an obj that let us get the args
request.sentGeo(urlParams.get('lat'),urlParams.get('lon'));
