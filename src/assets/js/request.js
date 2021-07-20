import _ from "lodash";
import Card from "./Card";
import axios from 'axios';
import NoDataImg from "../img/icon/0-No_Data.svg";
import GoodImg from "../img/icon/1-Good.svg";
import ModerateImg from "../img/icon/2-Moderate.svg";
import UnhealthyFsgImg from "../img/icon/3-Unhealthy_For_Sensitive.svg";
import UnhealthyImg from "../img/icon/4-Unhealthy-White.svg";
import VeryUnhealthyImg from "../img/icon/5-Very_Unhealthy-White.svg";
import HazardousImg from "../img/icon/6-Hazardous-White.svg";
// const axios = require('axios').default;
let cardDiv = document.getElementById('card-div');
let request;

export default request = {
//Method 1 - First Element Start
    async sentCity() {
        //Empty Input Check
        if (document.getElementById('city-txt').value === "") {
            alert("Insert City");
            let v = document.getElementById('city-txt').classList;
            if (v.contains('is-valid')) {
                v.replace('is-valid', 'is-invalid');
            } else {
                v.add('is-invalid');
            }
            return;
        } else {  //If Not Empty Set To Valid
            let v = document.getElementById('city-txt').classList;
            v.add('is-valid');
        }

        //Send Request
        try {
            const response = await axios.get('https://api.waqi.info/search/?keyword=' + document.getElementById('city-txt').value.toLowerCase() + '&token=' + process.env.API_KEY)
                .catch(function (error) {
                    alert('Sorry, ' + error.message);
                });

            //Check if The Station Is Valid
            if (_.get(response, 'data.status') === "error") {
                alert('Sorry, No Station Found With This Name');                //Alert "Not Valid Input"

                let v = document.getElementById('city-txt').classList;    //Set Not Valid Input
                if (v.contains('is-valid')) {
                    v.replace('is-valid', 'is-invalid');
                } else {
                    v.add('is-invalid');
                }

                return;                                                         //Close the Function
            } else {  //If Not Error Set To Valid
                let v = document.getElementById('city-txt').classList;
                if (v.contains('is-invalid')) {
                    v.replace('is-invalid', 'is-valid');
                } else {
                    v.add('is-valid');
                }
            }


            //Print Response in Console
            console.log(response);


            cardDiv.innerHTML = "";

            let resArray = _.get(response, 'data.data');
            if (resArray.length !== 0) {
                resArray.forEach(element => {
                    let station = new Card(element, false);
                    cardDiv.appendChild(station);
                });
            } else {
                let element = {
                    aqi: undefined,
                    station: {
                        country: undefined,
                        geo: undefined,
                        name: undefined,
                    },
                    time: {
                        stime: undefined,
                        tz: undefined,
                    },
                    uid: undefined,
                };
                let station = new Card(element, false);
                cardDiv.appendChild(station);
            }

        } catch (error) {
            console.error(error);
        }
    },
//First Element End

//Method 2 - Second Element Start
    async sentCurrentPosition() {
        //Clear Input Form
        document.getElementById('city-txt').value = "";
        let v = document.getElementById('city-txt').classList;
        if (v.contains('is-valid')) {
            v.remove('is-valid');
        } else if (v.contains('is-invalid')) {
            v.remove('is-invalid');
        }

        try {
            //Geolocation Option
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(async (position) => {
                //pageParagraph.innerHTML="Your GPS Position: <br> Latitude: "+position.coords.latitude+"<br>Longitude: "+position.coords.longitude;

                const response = await axios.get('https://api.waqi.info/feed/geo:' + position.coords.latitude + ';' + position.coords.longitude + '/?token=' + process.env.API_KEY)
                    .catch(function (error) {
                        console.log('Sorry, ' + error.message);
                    });

                console.log(response.data.data);

                cardDiv.innerHTML = "";

                let element = _.get(response, 'data.data');
                if (typeof element !== "undefined") {
                    let station = new Card(element, true);
                    cardDiv.appendChild(station);
                } else {
                    let element = {
                        aqi: undefined,
                        station: {
                            country: undefined,
                            geo: undefined,
                            name: undefined,
                        },
                        time: {
                            stime: undefined,
                            tz: undefined,
                        },
                        uid: undefined,
                    };
                    let station = new Card(element, false);
                    cardDiv.appendChild(station);
                }

            }, (error) => {
                alert('Sorry, ' + error.message);
            }, options);

        } catch (error) {
            console.error(error);
            console.log('Sorry, ' + error.message);
        }
    },
//Second Element End

//Method 3 - Third Element Start
    async sentGeo(Latitude, Longitude) {

        //Send Request
        try {

            const response = await axios.get('https://api.waqi.info/feed/geo:' + Latitude + ';' + Longitude + "/?token=" + process.env.API_KEY)
                .catch(function (error) {
                    alert('Sorry, ' + error.message);
                });

            //Print Response in Console
            console.log(response);

        } catch (error) {
            console.error(error);
        }
    },
//Third Element End


//Method 4 - Fourth Element Start
    async sentName(stationName) {
        const response = await axios.get('https://api.waqi.info/feed/' + stationName + '/?token=' + process.env.API_KEY)
            .catch(function (error) {
                alert('Sorry, ' + error.message);
            });

        console.log(response);

        //Get Info
        let name = _.get(response, 'data.data.city.name');
        let info = _.get(response, 'data.data.iaqi');

        //Insert Title and Subtitle
        let s = name + "";
        s = s.replace(';', ',');
        let v = s.split(",");
        let nameSpecific = v[0];
        v.shift();
        let nameGeneral = _.join(v, ',');
        try {
            if (typeof nameSpecific !== "undefined" && nameSpecific !== "") {
                document.getElementById('title').innerHTML = nameSpecific + '';
            } else {
                document.getElementById('title').innerHTML = "-";
            }

            if (typeof nameGeneral !== "undefined" && nameGeneral !== "") {
                document.getElementById('subtitle').innerHTML = nameGeneral + '';
            } else {
                document.getElementById('subtitle').innerHTML = '-';
            }
        } catch {
            //Fine
        }
        //End Of Set Title & Subtitle


        //Set the Four Corner (Humidity, Temp, Wind, Pressure)
        if (typeof _.get(info, 'h.v')!=='undefined'){
            document.getElementById('h').innerHTML = _.get(info, 'h.v') + '%';
        }else {document.getElementById('h').innerHTML = '-';}

        if (typeof _.get(info, 'w.v')!=='undefined'){
            document.getElementById('w').innerHTML = _.get(info, 'w.v') + '';
        }else {document.getElementById('w').innerHTML = '-';}

        if (typeof _.get(info, 't.v')!=='undefined'){
            document.getElementById('t').innerHTML = _.get(info, 't.v') + '&#x2103';
        }else {document.getElementById('t').innerHTML = '-';}

        if (typeof _.get(info, 'p.v')!=='undefined'){
            document.getElementById('p').innerHTML = _.get(info, 'p.v') + '';
        }else {document.getElementById('p').innerHTML = '-';}


        //Set the aqi (Central)
        //console.log('' + _.get(response, 'data.data.aqi'));

        document.getElementById('aqi').innerHTML = _.get(response, 'data.data.aqi') + '';
        document.getElementById('aqi_description').innerHTML = _.get(response, 'data.data.aqi') + '';
        if (_.get(response, 'data.data.aqi') === "-" || typeof _.get(response, 'data.data.aqi') === "undefined") {                        //No Data Card
            document.getElementById('aqi').innerHTML = '-';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #D3D3D3; background-color: #DCDCDC; color: #121212;'); //Imposta i colori
            document.getElementById('aqi_description').innerHTML = '-';

        } else if (_.get(response, 'data.data.aqi') >= 0 && _.get(response, 'data.data.aqi') <= 50) {      //Good Card
            document.getElementById('aqi_description').innerHTML = 'Good';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #508875; background-color: #68A691; color: #121212;'); //Imposta i colori
            document.getElementById('aqi').setAttribute('style', 'border: 10px solid #68A691;');

        } else if (_.get(response, 'data.data.aqi') >= 51 && _.get(response, 'data.data.aqi') <= 100) {    //Moderate Card
            document.getElementById('aqi_description').innerHTML = 'Moderate';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #C7CC02; background-color: #F7FD04; color: #121212;'); //Imposta i colori
            document.getElementById('aqi').setAttribute('style', 'border: 10px solid #F7FD04;');

        } else if (_.get(response, 'data.data.aqi') >= 101 && _.get(response, 'data.data.aqi') <= 150) {   //Unhealthy for Sensitive Group Card
            document.getElementById('aqi_description').innerHTML = 'Un.F.S.Group';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #FF4014; background-color: #FF785A; color: #121212;'); //Imposta i colori
            document.getElementById('aqi').setAttribute('style', 'border: 10px solid #FF785A;');

        } else if (_.get(response, 'data.data.aqi') >= 151 && _.get(response, 'data.data.aqi') <= 200) {   //Unhealthy Card
            document.getElementById('aqi_description').innerHTML = 'Unhealthy';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #7C2111; background-color: #9B2915; color: #F5F5F5;'); //Imposta i colori
            document.getElementById('aqi').setAttribute('style', 'border: 10px solid #9B2915;');

        } else if (_.get(response, 'data.data.aqi') >= 201 && _.get(response, 'data.data.aqi') <= 300) {   //Very Unhealthy Card
            document.getElementById('aqi_description').innerHTML = 'Very Unhealthy';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #44041F; background-color: #550527; color: #F5F5F5;'); //Imposta i colori
            document.getElementById('aqi').setAttribute('style', 'border: 10px solid #550527;');

        } else if (_.get(response, 'data.data.aqi') > 300) {                    //Hazardous Card
            document.getElementById('aqi_description').innerHTML = 'Hazardous';
            document.getElementById('aqi_description').setAttribute('style', 'border: 2px solid #260820; background-color: #2F0A28; color: #F5F5F5;'); //Imposta i colori
            document.getElementById('aqi').setAttribute('style', 'border: 10px solid #2F0A28;');
        }


        //Set the Specific Info
        if (typeof _.get(info, 'o3.v')!=='undefined'){
            document.getElementById('o3').innerHTML = _.get(info, 'o3.v') + '';
        }else {document.getElementById('o3').innerHTML = '-';}

        if (typeof _.get(info, 'pm10.v')!=='undefined'){
            document.getElementById('pm10').innerHTML = _.get(info, 'pm10.v') + '';
        }else {document.getElementById('pm10').innerHTML = '-';}

        if (typeof _.get(info, 'pm25.v')!=='undefined'){
            document.getElementById('pm25').innerHTML = _.get(info, 'pm25.v') + '';
        }else {document.getElementById('pm25').innerHTML = '-';}

        if (typeof _.get(info, 'no2.v')!=='undefined'){
            document.getElementById('no2').innerHTML = _.get(info, 'no2.v') + '';
        }else {document.getElementById('no2').innerHTML = '-';}

        if (typeof _.get(info, 'so2.v')!=='undefined'){
            document.getElementById('so2').innerHTML = _.get(info, 'so2.v') + '';
        }else {document.getElementById('so2').innerHTML = '-';}

        if (typeof _.get(info, 'co.v')!=='undefined'){
            document.getElementById('co').innerHTML = _.get(info, 'co.v') + '';
        }else {document.getElementById('co').innerHTML = '-';}


        //Primary Pollutant
        if (typeof _.get(response, 'data.data.dominentpol')!=="undefined"){
            document.getElementById('primary_pollutant').innerHTML =' '+ _.get(response, 'data.data.dominentpol') + '';
        }else {document.getElementById('primary_pollutant').innerHTML = '-';}
        //console.log(_.get(response, 'data.data.dominentpol'));








        //Fourth Element End

    }
}



