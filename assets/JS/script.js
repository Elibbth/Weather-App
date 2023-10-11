// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 
const apiKey = "60ce18ac19a309b82e89a10944600b2b"; // CLE VISIBLE PCQ CLE PUBLIC GRATUITE


document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const cityName = document.getElementById('cityName');

    searchButton.addEventListener('click', () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric&lang=fr`) // Remplacez 'your-json-file.json' par le 'chemin de votre fichier JSON' ou API
            .then(response => response.json()) //les réponses sont traitées comme un doc Json
            .then(data => {  // les reponses constituent une serie de données
                console.log(data);  //afficher les données dans la console
                let infoMeteo = document.getElementById("infoMeteo");  // variable = crée une div    //
                infoMeteo.innerHTML=''
                let temperature = data.main['temp'];
                let minTemp = data.main['temp_min'];
                let maxTemp = data.main['temp_max'];
                let ville = data.name;
                let country = data.sys['country'];
                let description = data.weather[0].description;
                let iconDesc = data.weather[0].icon;

                infoMeteo.innerHTML=`

                    Température: ${temperature}
                    Ville: ${ville}
                    Pays: ${country}
                    Min.: ${minTemp}
                    Max.: ${maxTemp}
                    <img src="https://openweathermap.org/img/w/${iconDesc}.png">
                    Description: ${description}
                    `
            });
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&appid=${apiKey}&units=metric&lang=fr`) // Remplacez 'your-json-file.json' par le 'chemin de votre fichier JSON' ou API
            .then(response => response.json()) //les réponses sont traitées comme un doc Json
            .then(data => {  // les reponses constituent une serie de données
                console.log(data);  //afficher les données dans la console
                let infoMeteo5jours = document.getElementById("infoMeteo5jours");  // variable = se réfère à div id= infoMeteo5jours //
                infoMeteo5jours.innerHTML='';
                for (let i=7; i<=39; i+=8) {
                    let dateprevision = data.list[i].dt_txt;
                    let temperatureMin = data.list[i].main.temp_min;
                    let temperatureMax = data.list[i].main.temp_max;
                    let description = data.list[i].weather[0].description;
                    let iconImg = data.list[i].weather[0].icon;

                    let meteo = document.createElement ("div");
                    meteo.innerHTML=`
                    Date: ${dateprevision}
                    Min: ${temperatureMin}
                    Max: ${temperatureMax}
                    Description: ${description}
                    <img src="https://openweathermap.org/img/w/${iconImg}.png"> 
                    `
                    infoMeteo5jours.appendChild(meteo);
                }
            });
    })
});
