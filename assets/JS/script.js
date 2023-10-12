// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 
const apiKey = "60ce18ac19a309b82e89a10944600b2b"; // CLE VISIBLE PCQ CLE PUBLIC GRATUITE
const unsplashKey ="UBEtEoEZcXtAUV6H8tfuo8uXZwrm1ZtDTZpdyXpkSjM";


document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const cityName = document.getElementById('cityName');   //input
    let mypic = "";

    searchButton.addEventListener('click', () => {

        fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${cityName.value}&client_id=${unsplashKey}`) // Remplacez 'your-json-file.json' par le 'chemin de votre fichier JSON' ou API
            .then(response => response.json()) //les réponses sont traitées comme un doc Json
            .then(data => {  // les reponses constituent une serie de données
                console.log(data.total);
                if (data.total > 0) {
                    mypic = data.results[0].urls.regular;
                }
                console.log(mypic);
        });

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric&lang=fr`) // Remplacez 'your-json-file.json' par le 'chemin de votre fichier JSON' ou API
            .then(response => response.json()) //les réponses sont traitées comme un doc Json
            .then(data => {  // les reponses constituent une serie de données
                console.log(data);  //afficher les données dans la console
                let infoMeteo = document.getElementById("infoMeteo");  // variable = crée une div    //
                infoMeteo.innerHTML=''
                let temperature = parseInt(data.main['temp']); //parseInt = convertir en nombre entier
                let minTemp = parseInt(data.main['temp_min']);
                let maxTemp = parseInt(data.main['temp_max']);
                let ville = data.name;
                let country = data.sys['country'];
                let description = data.weather[0].description;
                let iconDesc = data.weather[0].icon;
                
                infoMeteo.innerHTML=`
                    <div class="totalInfo">
                        <p class="temperature">${temperature}°</p>
                        <p class="ville">${ville}</p>
                        <p class="country">${country}</p>
                        <p class="minTemp"><img src="assets/Img/down.png"> ${minTemp}°</p>
                        <p class="maxTemp"><img src="assets/Img/up.png"> ${maxTemp}°</p>    
                    </div>
                    <div class="description">
                        <img src="https://openweathermap.org/img/w/${iconDesc}.png">
                        <p>${description}</p>
                    </div>
                    `
                if (mypic != "") {
                    let photo = document.createElement("div");
                    photo.setAttribute("class", "photo");
                    photo.style.backgroundImage=`url(${mypic})`
                    infoMeteo.appendChild(photo);
                }
            });
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&appid=${apiKey}&units=metric&lang=fr`) // Remplacez 'your-json-file.json' par le 'chemin de votre fichier JSON' ou API
            .then(response => response.json()) //les réponses sont traitées comme un doc Json
            .then(data => {  // les reponses constituent une serie de données
                console.log(data);  //afficher les données dans la console
                let infoMeteo5jours = document.getElementById("infoMeteo5jours");  // variable = se réfère à div id= infoMeteo5jours //
                infoMeteo5jours.innerHTML='';
                for (let i=7; i<=39; i+=8) {
                    let datePrevision = data.list[i].dt_txt;
                    let options={weekday:"long"};
                    let dayWeek=new Intl.DateTimeFormat("fr-FR",options).format(new Date(datePrevision));

                    let temperatureMin = parseInt(data.list[i].main.temp_min);
                    let temperatureMax = parseInt(data.list[i].main.temp_max);
                    let description = data.list[i].weather[0].description;
                    let iconImg = data.list[i].weather[0].icon;

                    let meteo = document.createElement ("div");
                    meteo.innerHTML=`
                    <p class="datePrevision"> ${dayWeek}</p>
                    <p class="temperatureMin"><img src="assets/Img/down.png"> ${temperatureMin}°</p>
                    <p class="temperatureMax"><img src="assets/Img/up.png"> ${temperatureMax}°</p>
                    <div class="description"> 
                        <img src="https://openweathermap.org/img/w/${iconImg}.png"> 
                        ${description}
                    </div>
                    `
                    infoMeteo5jours.appendChild(meteo);
                }
            });
    })
});
