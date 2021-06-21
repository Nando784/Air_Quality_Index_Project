import _ from "lodash";
import Card from "./Card";

const axios = require('axios').default;
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

            //const response = await axios.get('http://api.waqi.info/feed/' + document.getElementById('city-txt').value.toLowerCase() + '/?token=' + process.env.API_KEY)
            const response = await axios.get('http://api.waqi.info/search/?keyword=' + document.getElementById('city-txt').value.toLowerCase() + '&token=' + process.env.API_KEY)
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
                    let station = new Card(element,false);
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
                let station = new Card(element,false);
                cardDiv.appendChild(station);
            }

        } catch (error) {
            console.error(error);
        }
    },
//First Element End

//Method 2 - Second Element Start
    async sentCurrentPosition() {
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
                if (typeof element!=="undefined") {
                    let station = new Card(element,true);
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
                    let station = new Card(element,false);
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
    async sentGeo(Latitude,Longitude) {

        //Send Request
        try {

            const response = await axios.get('https://api.waqi.info/feed/geo:' + Latitude + ';' + Longitude + "/?token="+process.env.API_KEY)
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
}

