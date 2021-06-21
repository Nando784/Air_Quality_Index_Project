import NoDataImg from "../img/icon/0-No_Data.svg";
import GoodImg from "../img/icon/1-Good.svg";
import ModerateImg from "../img/icon/2-Moderate.svg";
import UnhealthyFsgImg from "../img/icon/3-Unhealthy_For_Sensitive.svg";
import UnhealthyImg from "../img/icon/4-Unhealthy-White.svg";
import VeryUnhealthyImg from "../img/icon/5-Very_Unhealthy-White.svg";
import HazardousImg from "../img/icon/6-Hazardous-White.svg";
import _ from "lodash";
export default class Card {

    _aqi;           //Air Quality Index 0-300+
    _uid;           //Unique Id of the Station
    _country;       //IT,USA,FR,ECC...
    _name;          //"Villa Ada, Roma, Lazio, Italy" - "Roma, Emilia Romagna, Italy" - "Bobigny, Paris"    string.split(",");
    _time;          //"2021-06-03 23:00:00"     string.split(" ");
    _tz;            //Time Zone: "+02:00"
    _latitude;      //Coordinates Array 0->Latitude
    _longitude;     //Coordinates Array 1->Longitude
    _geo;

    constructor(station,isSingle) {

        if (isSingle){
            this._uid=_.get(station,'idx');
        }else{
            this._uid=_.get(station,'uid');
        }

        if (isSingle){
            this._name=_.get(station,'city.name');
        }else{
            this._name=_.get(station,'station.name');
        }

        if (isSingle){
            this._latitude=_.get(station,'city.geo[0]');
            this._longitude=_.get(station,'city.geo[1]');
            this._geo=_.get(station,'city.geo');

        }else{
            this._latitude=_.get(station,'station.geo[0]');
            this._longitude=_.get(station,'station.geo[1]');
            this._geo=_.get(station,'station.geo');
        }



        this._aqi=_.get(station,'aqi');
        this._country=_.get(station,'station.country');

        this._time=_.get(station,'time.s');
        this._tz=_.get(station,'time.tz');

        return this._htmlCreate();
    }
    //Getter e Setter
    toString(){
        return  "\nAQI: "+this._aqi+
                "\nUID: "+this._uid+
                "\nCountry: "+this._country+
                "\nName: "+this._name+
                "\nTime: "+this._time+
                "\nTime-Zone: "+this._tz+
                "\nLongitude: "+this._longitude+
                "\nLatitude: "+this._latitude;
    }


    _htmlCreate(){
        let card=document.createElement('div');
        let preview=document.createElement('div');
        let img=document.createElement('img');
        img.setAttribute('class','card-img');
        let title=document.createElement('h1');

        //Make the Card and The Preview
        if(this._aqi==="-"||typeof this._aqi==="undefined"){                        //No Data Card
            card.setAttribute('class','card-not-info');
            preview.setAttribute('class','preview-dark');
            img.setAttribute('src',NoDataImg);
            title.innerHTML="No Info";

        }else if(this._aqi>=0&&this._aqi<=50){      //Good Card
            card.setAttribute('class','card-good');
            preview.setAttribute('class','preview-dark');
            img.setAttribute('src',GoodImg);
            title.innerHTML="Good";

        }else if(this._aqi>=51&&this._aqi<=100){    //Moderate Card
            card.setAttribute('class','card-moderate');
            preview.setAttribute('class','preview-dark');
            img.setAttribute('src',ModerateImg);
            title.innerHTML="Moderate";

        }else if(this._aqi>=101&&this._aqi<=150){   //Unhealthy for Sensitive Group Card
            card.setAttribute('class','card-unhealthy-fSG');
            preview.setAttribute('class','preview-dark');
            img.setAttribute('src',UnhealthyFsgImg);
            title.innerHTML="Unhealthy for Sensitive Group";

        }else if(this._aqi>=151&&this._aqi<=200){   //Unhealthy Card
            card.setAttribute('class','card-unhealthy');
            preview.setAttribute('class','preview-light');
            img.setAttribute('src',UnhealthyImg);
            title.innerHTML="Unhealthy";

        }else if(this._aqi>=201&&this._aqi<=300){   //Very Unhealthy Card
            card.setAttribute('class','card-very-unhealthy');
            preview.setAttribute('class','preview-light');
            img.setAttribute('src',VeryUnhealthyImg);
            title.innerHTML="Very Unhealthy";

        }else if(this._aqi>300){                    //Hazardous Card
            card.setAttribute('class','card-hazardous');
            preview.setAttribute('class','preview-light');
            img.setAttribute('src',HazardousImg);
            title.innerHTML="Hazardous";

        }



        //Common Attributes

        //Station Id Info Box Creation
            let h4Id=document.createElement("h4");                 //Title
                h4Id.innerHTML="Station ID";

            let h5Id=document.createElement("h5");                 //Station ID
                if(typeof this._uid!=="undefined")  {
                    h5Id.innerHTML=""+this._uid;
                }else{
                    h5Id.innerHTML="-";
                }


            let subId=document.createElement('div');               //Color Div & Insert Element Inside It
                subId.appendChild(h5Id);

            let infoCellId=document.createElement('div');          //Info Cell & Insert Color Div Inside It
                infoCellId.setAttribute('class','info-cell');
                infoCellId.appendChild(h4Id);
                infoCellId.appendChild(subId);

        //End Station Id Info Box Creation


        //Time Info Box Creation
            let time;

            if(typeof this._time!=="undefined")  {
                time=this._time+"";
            }else{
                time="- -";
            }

            let vTime=time.split(" ");

            let h4Time=document.createElement("h4");                    //Title
                h4Time.innerHTML="Capture Date";

            let h5Day=document.createElement("h5");                     //Day
                h5Day.innerHTML=""+vTime[0];

            let h5Hour=document.createElement("h5");                    //Hour
                h5Hour.innerHTML=""+vTime[1];

            let subTime=document.createElement('div');                  //Color Div & Insert Element Inside It
                subTime.appendChild(h5Day);
                subTime.appendChild(h5Hour);

            let infoCellTime=document.createElement('div');             //Info Cell & Insert Color Div Inside It
                infoCellTime.setAttribute('class','info-cell');
                infoCellTime.appendChild(h4Time);
                infoCellTime.appendChild(subTime);

        //End Time Info Box Creation


        //Time Zone Info Box Creation
            let h4TimeZone=document.createElement("h4");                 //Title
            h4TimeZone.innerHTML="Time Zone";

            let h5TimeZone=document.createElement("h5");                 //Time Zone
                if(typeof this._tz!=="undefined")  {
                    h5TimeZone.innerHTML=""+this._tz;
                }else{
                    h5TimeZone.innerHTML="-";
                }

            let subTimeZone=document.createElement('div');               //Color Div & Insert Element Inside It
            subTimeZone.appendChild(h5TimeZone);

            let infoCellTimeZone=document.createElement('div');          //Info Cell & Insert Color Div Inside It
            infoCellTimeZone.setAttribute('class','info-cell');
            infoCellTimeZone.appendChild(h4TimeZone);
            infoCellTimeZone.appendChild(subTimeZone);
        //End Time Zone Info Box Creation


        //Coordinates Info Box Creation
            let h4Coordinates=document.createElement("h4");                 //Title
                h4Coordinates.innerHTML="Coordinates";

            let h5Lat=document.createElement("h5");                         //Latitude
                if(typeof this._geo!=="undefined")  {
                    h5Lat.innerHTML="Lat: "+this._latitude.toFixed(3);
                }else{
                    h5Lat.innerHTML="Lat: -";
                }

            let h5Lon=document.createElement("h5");                         //Longitude
                if(typeof this._geo!=="undefined")  {
                    h5Lon.innerHTML="Lon: "+this._longitude.toFixed(3);
                }else{
                    h5Lon.innerHTML="Lon: -";
                }

            let subCoordinates=document.createElement('div');               //Color Div & Insert Element Inside It
                subCoordinates.appendChild(h5Lat);
                subCoordinates.appendChild(h5Lon);

            let infoCellCoordinates=document.createElement('div');          //Info Cell & Insert Color Div Inside It
                infoCellCoordinates.setAttribute('class','info-cell info-cell-coordinates');
                infoCellCoordinates.appendChild(h4Coordinates);
                infoCellCoordinates.appendChild(subCoordinates);
        //End Coordinates Info Box Creation



        //Insert Info Cell Inside The Container
            let infoSecondContainer=document.createElement('div');
                infoSecondContainer.setAttribute('class','info-second-container');
            let infoFirstContainer=document.createElement('div');
                infoFirstContainer.setAttribute('class','info-first-container');

            infoFirstContainer.appendChild(infoCellId);
            infoFirstContainer.appendChild(infoCellTime);
            infoSecondContainer.appendChild(infoCellTimeZone);
            infoSecondContainer.appendChild(infoCellCoordinates);

            let infoFullContainer=document.createElement('div');
                infoFullContainer.setAttribute('class','info-full-container');

            infoFullContainer.appendChild(infoFirstContainer);
            infoFullContainer.appendChild(infoSecondContainer);

        //End


        //Create Location and Insert Info
            let s=this._name+"";
            s=s.replace(';', ',');

            let v=s.split(",");
            let name=v[0];
            v.shift();
            let general=_.join(v,',');


            let locationName=document.createElement('p');
                locationName.setAttribute('class','location-name');
                if(typeof this._name!=="undefined")  {
                    locationName.innerHTML=""+name;
                }else{
                    locationName.innerHTML="-";
                }


            let locationGeneral=document.createElement('p');
                locationGeneral.setAttribute('class','location-general');
                if(typeof this._name!=="undefined")  {
                    locationGeneral.innerHTML=""+general;
                }else{
                    locationGeneral.innerHTML="-";
                }


            let location=document.createElement('div');
                location.setAttribute('class','location');

                location.appendChild(locationName);
                location.appendChild(locationGeneral);
        //End


        //Insert Element Into Details
            let details=document.createElement('div');
                details.setAttribute('class','details');

                details.appendChild(location);
                details.appendChild(infoFullContainer);
        //End

        //Insert Country into Nation Sign
            let h3Country=document.createElement('h3');
                if(typeof this._country!=="undefined")  {
                    h3Country.innerHTML=this._country;
                }else{
                    h3Country.innerHTML="-";
                }

            let nationSign=document.createElement('div');
                nationSign.setAttribute('class','nation-sign');
                nationSign.appendChild(h3Country);
        //End

        //Insert Element Into Preview
            let pAqi=document.createElement('p');
                if(typeof this._aqi!=="undefined")  {
                    pAqi.innerHTML=this._aqi;
                }else{
                    pAqi.innerHTML="-";
                }


            preview.appendChild(nationSign);
            preview.appendChild(img);
            preview.appendChild(pAqi);
            preview.appendChild(title);
        //End

        //Insert Element Into Card
            card.appendChild(preview);
            card.appendChild(details);
            card.addEventListener('click',()=>{
                window.location="details.html?lat="+this._latitude+"&lon="+this._longitude+"";
            })
        //End

        return card;
    }

}