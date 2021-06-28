//Dev Import
import '../../sass/main.scss';

function initialize() {
    window.process = {
        env: {
            NODE_ENV: 'development'
        }
    }

    setMap();
}

function setMap(){
    function initMap() {
        // Create the location of Rome
        const rome = {lat: 41.902782, lng: 12.496366};
        let map;


        try {
            // Create the Map, centered at Rome
            map = new google.maps.Map(document.getElementById("map"), {
                mapId: 'ec696390e2f16895',
                center: rome,
                zoom: 5,
                disableDefaultUI: true,
                minZoom: 2,
            });

            // Request and Insert the Info from Aqicn in the Map
            const waqiMapOverlay = new google.maps.ImageMapType({
                getTileUrl: function (coord, zoom) {
                    return 'https://tiles.aqicn.org/tiles/usepa-aqi/' + zoom + "/" + coord.x + "/" + coord.y + ".png?token=" + process.env.API_KEY + "";
                },
                name: "Air Quality",
            });
            map.overlayMapTypes.push(waqiMapOverlay);
        } catch (e) {}

        let worldButton = document.getElementById("world");
            let worldPos = new google.maps.LatLng(0, 0); //Makes a latlng
            worldButton.addEventListener('click',()=>{map.panTo(worldPos); map.setZoom(2);});

        let nAmericaButton = document.getElementById("northAmerica");
            let nAmericaPos = new google.maps.LatLng(40.480, -103.819);
            nAmericaButton.addEventListener('click',()=>{
                if(map.getCenter().equals(worldPos)||map.getCenter().equals(nAmericaPos)){
                    map.panTo(nAmericaPos);
                    map.setZoom(4);
                }else{
                    map.setZoom(2);
                    setTimeout(()=>{
                        map.panTo(nAmericaPos);
                        map.setZoom(4);
                    },400);
                }
            });

        let sAmericaButton = document.getElementById("southAmerica");
            let sAmericaPos = new google.maps.LatLng(-16.346, -59.820);
            sAmericaButton.addEventListener('click',()=>{
                if(map.getCenter().equals(worldPos)||map.getCenter().equals(sAmericaPos)){
                    map.panTo(sAmericaPos);
                    map.setZoom(4);
                }else{
                    map.setZoom(2);
                    setTimeout(()=>{
                        map.panTo(sAmericaPos);
                        map.setZoom(4);
                    },400);
                }
            });

        let europaButton = document.getElementById("europa");
            let europaPos = new google.maps.LatLng(48.263, 7.969);
            europaButton.addEventListener('click',()=>{
                if(map.getCenter().equals(worldPos)||map.getCenter().equals(europaPos)){
                    map.panTo(europaPos);
                    map.setZoom(4);
                }else{
                    map.setZoom(2);
                    setTimeout(()=>{
                        map.panTo(europaPos);
                        map.setZoom(4);
                    },400);
                }
            });
        let africaButton = document.getElementById("africa");
            let africaPos = new google.maps.LatLng(5.067, 15.971);
            africaButton.addEventListener('click',()=>{
                if(map.getCenter().equals(worldPos)||map.getCenter().equals(africaPos)){
                    map.panTo(africaPos);
                    map.setZoom(4);
                }else{
                    map.setZoom(2);
                    setTimeout(()=>{
                        map.panTo(africaPos);
                        map.setZoom(4);
                    },400);
                }
            });
        let middleEastButton = document.getElementById("middleEast");
        let middleEastPos = new google.maps.LatLng(32.084, 52.241);
        middleEastButton.addEventListener('click',()=>{
            if(map.getCenter().equals(worldPos)||map.getCenter().equals(middleEastPos)){
                map.panTo(middleEastPos);
                map.setZoom(5);
            }else{
                map.setZoom(2);
                setTimeout(()=>{
                    map.panTo(middleEastPos);
                    map.setZoom(5);
                },400);
            }
        });
        let asiaButton = document.getElementById("asia");
        let asiaPos = new google.maps.LatLng(29.103, 96.184);
        asiaButton.addEventListener('click',()=>{
            if(map.getCenter().equals(worldPos)||map.getCenter().equals(asiaPos)){
                map.panTo(asiaPos);
                map.setZoom(4);
            }else{
                map.setZoom(2);
                setTimeout(()=>{
                    map.panTo(asiaPos);
                    map.setZoom(4);
                },400);
            }
        });
        let indiaButton = document.getElementById("india");
        let indiaPos = new google.maps.LatLng(21.115, 78.826);
        indiaButton.addEventListener('click',()=>{
            if(map.getCenter().equals(worldPos)||map.getCenter().equals(indiaPos)){
                map.panTo(indiaPos);
                map.setZoom(6);
            }else{
                map.setZoom(2);
                setTimeout(()=>{
                    map.panTo(indiaPos);
                    map.setZoom(6);
                },400);
            }
        });
        let cinaButton = document.getElementById("cina");
        let cinaPos = new google.maps.LatLng(34.739, 100.183);
        cinaButton.addEventListener('click',()=>{
            if(map.getCenter().equals(worldPos)||map.getCenter().equals(cinaPos)){
                map.panTo(cinaPos);
                map.setZoom(5);
            }else{
                map.setZoom(2);
                setTimeout(()=>{
                    map.panTo(cinaPos);
                    map.setZoom(5);
                },400);
            }
        });
        let australiaButton = document.getElementById("australia");
        let australiaPos = new google.maps.LatLng(-25.549, 132.947);
        australiaButton.addEventListener('click',()=>{
            if(map.getCenter().equals(worldPos)||map.getCenter().equals(australiaPos)){
                map.panTo(australiaPos);
                map.setZoom(4);
            }else{
                map.setZoom(2);
                setTimeout(()=>{
                    map.panTo(australiaPos);
                    map.setZoom(4);
                },400);
            }
        });

            //TODO Continua con le altre zone della mappa

    }
    initMap();
}




window.addEventListener('DOMContentLoaded',initialize);


/*TODO Fai la cosa con tutte le parti del mondo sopra la mappa che quando ci clicchi ti sposta la mappa su quella parte del mondo. Sarebbe una cosa utile alla finalità Responsiva utilizzare la nav bar del Portfolio che a una certa dimensione diventa un menù a tendina. Però leggi la documentazione che mi pare non funzionasse un cazzo*/