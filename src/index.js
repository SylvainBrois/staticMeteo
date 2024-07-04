document.addEventListener("DOMContentLoaded", () => {
    let data;
    let submitBtnCity = document.getElementById('submitBtnCity');
    let submitBtnCoord= document.getElementById('submitBtnCoord');
    const apiKey = '18a60266f1c11f783cbdca59ebf0e67d';

    submitBtnCity.addEventListener('click',async (e) => {
        const city = document.getElementById("Ville").value;

        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(r => {
                data = r;
                console.log("data dans le fetch ", data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        loadInfos(data)
    });

    submitBtnCoord.addEventListener('click',async (e) => {

        const longitude = document.getElementById("lon").value;
        const latitude = document.getElementById("lat").value;

        await fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(r => {
                data = r;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        loadInfos(data)
    });


    function loadInfos(data){
        document.getElementById("nomVille").textContent = data.name;
        document.getElementById("latitude").textContent = "Latitude : " + data.coord.lat;
        document.getElementById("longitude").textContent = "Longitude : " + data.coord.lon;
        document.getElementById("coordH").style.display = "block";
        document.getElementById("metriques").style.display = "block";
        document.getElementById("meteo").textContent = "Météo actuelle : "+data.weather[0].description;
        document.getElementById("courante").textContent = "Température actuelle : " + data.main.temp.toFixed(1) +"°c";
        document.getElementById("ressentie").textContent = "Température ressentie : " + data.main.feels_like.toFixed(1)+"°c";
        document.getElementById("minimale").textContent = "Température minimale : " + data.main.temp_min.toFixed(1) +"°c";
        document.getElementById("maximale").textContent = "Température maximale : " + data.main.temp_max.toFixed(1) +"°c";
        document.getElementById("humidite").textContent = "Humidité : " + data.main.humidity+"%";

    }


});