// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 
const apiKey = "60ce18ac19a309b82e89a10944600b2b"; // CLE VISIBLE PCQ CLE PUBLIC GRATUITE
const unsplashKey ="UBEtEoEZcXtAUV6H8tfuo8uXZwrm1ZtDTZpdyXpkSjM";


document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const cityName = document.getElementById('cityName');   //input
    let mypic = "";


    function loading() { //Cela déclare une fonction appelée "loading". Cette fonction sera exécutée ultérieurement lorsque l'événement "load" de la fenêtre (page web) se produira.
        window.addEventListener("load", () => { // nous ajoutons un écouteur d'événements à l'objet "window" (la fenêtre du navigateur). L'événement que nous écoutons est "load", qui se produit lorsque la page web est entièrement chargée. Lorsque cet événement se déclenche, la fonction fléchée (lambda) suivante est exécutée.
            let recupInput = cityName.value; //Cette ligne déclare une variable "recupInput" et y stocke la valeur de la variable "cityName". Il est important de noter que "cityName" n'est pas défini dans cette fonction, ce qui signifie qu'il doit être défini ailleurs dans le code. Cela suppose que "cityName" est un élément de formulaire (comme un champ de saisie de texte) et que cette ligne récupère sa valeur.
            const cityInput = localStorage.getItem("city"); // Ici, nous déclarons une variable constante "cityInput" et y stockons la valeur associée à la clé "city" dans le stockage local du navigateur. Le stockage local est une fonctionnalité du navigateur qui permet de stocker des données côté client de manière persistante.
            if (recupInput) { //Cette ligne commence une structure de contrôle conditionnelle (un "if") qui vérifie si la variable "recupInput" a une valeur. Si "recupInput" est évaluée comme vraie (c'est-à-dire si elle n'est pas nulle, indéfinie, vide, ou évaluée à "false"), alors le code à l'intérieur de cette condition sera exécuté.
                card(cityInput); //Si la condition précédente est vraie, cette ligne appelle une fonction "card" avec "cityInput" en tant qu'argument. Cela suppose qu'il existe une fonction "card" ailleurs dans le code qui prend un argument (peut-être pour afficher des informations liées à la ville).
            }
        })
    }
    loading(); // Enfin, cette ligne appelle la fonction "loading" immédiatement après sa définition. Cela déclenche le processus d'ajout de l'écouteur d'événements pour l'événement "load" de la fenêtre, ce qui entraînera l'exécution du code à l'intérieur de la fonction "loading" lorsque la page est complètement chargée.

    searchButton.addEventListener('click', () => {
        let recupInput = cityName.value;
        localStorage.setItem("city", recupInput);
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
    // cityName.addEventListener("keyup", (e) => {
    //     if (e.key==="enter") {
    //         e.preventDefault();

        
    
});
