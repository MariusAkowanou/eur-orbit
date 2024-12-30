// js/main.js

const cities = [
    { latitude: 52.367, longitude: 4.904, city: "Amsterdam", country: "Netherlands" },
    { latitude: 39.933, longitude: 32.859, city: "Ankara", country: "Turkey" },
    { latitude: 56.134, longitude: 12.945, city: "Åstorp", country: "Sweden" },
    { latitude: 37.983, longitude: 23.727, city: "Athens", country: "Greece" },
    { latitude: 54.597, longitude: -5.930, city: "Belfast", country: "Northern Ireland" },
    { latitude: 41.387, longitude: 2.168, city: "Barcelona", country: "Spain" },
    { latitude: 52.520, longitude: 13.405, city: "Berlin", country: "Germany" },
    { latitude: 46.948, longitude: 7.447, city: "Bern", country: "Switzerland" },
    { latitude: 43.263, longitude: -2.935, city: "Bilbao", country: "Spain" },
    { latitude: 50.847, longitude: 4.357, city: "Brussels", country: "Belgium" },
    { latitude: 47.497, longitude: 19.040, city: "Bucharest", country: "Romania" },
    { latitude: 59.329, longitude: 18.068, city: "Budapest", country: "Hungary" },
    { latitude: 51.483, longitude: -3.168, city: "Cardiff", country: "Wales" },
    { latitude: 50.937, longitude: 6.96, city: "Cologne", country: "Germany" },
    { latitude: 55.676, longitude: 12.568, city: "Copenhagen", country: "Denmark" },
    { latitude: 51.898, longitude: -8.475, city: "Cork", country: "Ireland" },
    { latitude: 53.349, longitude: -6.260, city: "Dublin", country: "Ireland" },
    { latitude: 55.953, longitude: -3.188, city: "Edinburgh", country: "Scotland" },
    { latitude: 43.7696, longitude: 11.255, city: "Florence", country: "Italy" },
    { latitude: 50.110, longitude: 8.682, city: "Frankfurt", country: "Germany" },
    { latitude: 43.254, longitude: 6.637, city: "French Riviera", country: "France" },
    { latitude: 32.650, longitude: -16.908, city: "Funchal", country: "Portugal" },
    { latitude: 36.140, longitude: -5.353, city: "Gibraltar", country: "Gibraltar" },
    { latitude: 57.708, longitude: 11.974, city: "Gothenburg", country: "Sweden" },
    { latitude: 53.548, longitude: 9.987, city: "Hamburg", country: "Germany" },
    { latitude: 60.169, longitude: 24.938, city: "Helsinki", country: "Finland" },
    { latitude: 39.020, longitude: 1.482, city: "Ibiza", country: "Spain" },
    { latitude: 50.450, longitude: 30.523, city: "Kyiv", country: "Ukraine" },
    { latitude: 61.115, longitude: 10.466, city: "Lillehammer", country: "Norway" },
    { latitude: 38.722, longitude: -9.139, city: "Lisbon", country: "Portugal" },
    { latitude: 51.507, longitude: -0.127, city: "London", country: "England" },
    { latitude: 40.416, longitude: -3.703, city: "Madrid", country: "Spain" },
    { latitude: 39.695, longitude: 3.017, city: "Mallorca", country: "Spain" },
    { latitude: 53.480, longitude: -2.242, city: "Manchester", country: "England" },
    { latitude: 43.296, longitude: 5.369, city: "Marseille", country: "France" },
    { latitude: 27.760, longitude: -15.586, city: "Maspalomas", country: "Spain" },
    { latitude: 45.464, longitude: 9.190, city: "Milan", country: "Italy" },
    { latitude: 48.135, longitude: 11.582, city: "Munich", country: "Germany" },
    { latitude: 40.851, longitude: 14.268, city: "Naples", country: "Italy" },
    { latitude: 43.034, longitude: -2.417, city: "Oñati", country: "Spain" },
    { latitude: 59.913, longitude: 10.752, city: "Oslo", country: "Norway" },
    { latitude: 48.856, longitude: 2.352, city: "Paris", country: "France" },
    { latitude: 50.075, longitude: 14.437, city: "Prague", country: "Czech Republic" },
    { latitude: 64.146, longitude: -21.942, city: "Reykjavík", country: "Iceland" },
    { latitude: 56.879, longitude: 24.603, city: "Riga", country: "Latvia" },
    { latitude: 41.902, longitude: 12.496, city: "Rome", country: "Italy" },
    { latitude: 39.453, longitude: -31.127, city: "Santa Cruz das Flores", country: "Portugal" },
    { latitude: 28.463, longitude: -16.251, city: "Santa Cruz de Tenerife", country: "Spain" },
    { latitude: 57.273, longitude: -6.215, city: "Skye", country: "Scotland" },
    { latitude: 42.697, longitude: 23.321, city: "Sofia", country: "Bulgaria" },
    { latitude: 59.329, longitude: 18.068, city: "Stockholm", country: "Sweden" },
    { latitude: 59.437, longitude: 24.753, city: "Tallinn", country: "Estonia" },
    { latitude: 18.208, longitude: 16.373, city: "Vienna", country: "Austria" },
    { latitude: 52.229, longitude: 21.012, city: "Warsaw", country: "Poland" },
    { latitude: 53.961, longitude: -1.07, city: "York", country: "England" },
    { latitude: 47.376, longitude: 8.541, city: "Zurich", country: "Switzerland" }
];

document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    const weatherCardsContainer = document.getElementById('weather-cards');
    const loader = document.getElementById('loader'); // Sélectionner le loader

    // Remplir le <select> avec les villes
    cities.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index; // Utiliser l'index pour référencer la ville
        option.textContent = `${city.city}, ${city.country}`;
        citySelect.appendChild(option);
    });

    // Ajouter un écouteur d'événement pour la sélection de la ville
    citySelect.addEventListener('change', async (event) => {
        const selectedIndex = event.target.value;
        const selectedCity = cities[selectedIndex];
        if (selectedCity) {
            const { latitude, longitude } = selectedCity;
            await fetchWeatherData(latitude, longitude);
        }
    });

    // Fonction pour récupérer les données météorologiques
    async function fetchWeatherData(lat, lon) {
        // Afficher le loader
        loader.hidden = false;

        // Effacer les anciennes cartes
        weatherCardsContainer.innerHTML = '';

        // URL de l'API 7timer
        const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données météorologiques.');
            }

            const data = await response.json();
            // console.log(data); // Pour déboguer

            // Extraire les prévisions des 7 prochains jours
            const forecasts = data.dataseries.slice(0, 7); // Les données commencent à aujourd'hui

            forecasts.forEach((forecast) => {
                const formattedDate = formatDate(forecast.date);

                const weatherCard = document.createElement('div');
                weatherCard.classList.add('weather-card');
                weatherCard.setAttribute('role', 'region');
                weatherCard.setAttribute('aria-label', `Prévisions météo pour ${formattedDate}`);

                const dayTitle = document.createElement('h3');
                dayTitle.textContent = formattedDate;

                const weatherIcon = document.createElement('img');
                weatherIcon.classList.add('weather-icon');
                weatherIcon.src = getWeatherIcon(forecast.weather);
                weatherIcon.alt = forecast.weather;

                const temp = document.createElement('p');
                temp.textContent = `Temp: ${forecast.temp2m.max}°C / ${forecast.temp2m.min}°C`;

                const weatherDesc = document.createElement('p');
                weatherDesc.textContent = `Condition: ${translateWeatherCondition(forecast.weather)}`;

                weatherCard.appendChild(dayTitle);
                weatherCard.appendChild(weatherIcon);
                weatherCard.appendChild(temp);
                weatherCard.appendChild(weatherDesc);

                weatherCardsContainer.appendChild(weatherCard);
            });

        } catch (error) {
            console.error(error);
            weatherCardsContainer.innerHTML = `<p>Impossible de récupérer les données météorologiques. Veuillez réessayer plus tard.</p>`;
        } finally {
            // Masquer le loader
            loader.hidden = true;
        }
    }

    // Fonction pour parser et formater la date
    function formatDate(dateInt) {
        const dateStr = dateInt.toString();
        if (dateStr.length !== 8) {
            console.warn(`Format de date inattendu: ${dateStr}`);
            return dateStr; // Retourne la date brute si le format est incorrect
        }

        const year = parseInt(dateStr.slice(0, 4));
        const month = parseInt(dateStr.slice(4, 6)) - 1; // Les mois commencent à 0 
        const day = parseInt(dateStr.slice(6, 8));

        const date = new Date(year, month, day);

        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('fr-FR', options); // Exemple: "lun. 30 déc."
    }

    // Fonction pour traduire les conditions météorologiques en français
    function translateWeatherCondition(condition) {
        const translations = {
            'clear': 'Clair',
            'cloudy': 'Nuageux',
            'pcloudy': 'Très Nuageux',
            'fog': 'Brouillard',
            'heavyrain': 'Pluie Forte',
            'lightrain': 'Pluie Légère',
            'lightsnow': 'Neige Légère',
            'rain': 'Pluie',
            'sleet': 'Pluie Verglaçante',
            'snow': 'Neige',
            'thunder': 'Orage'
        };

        return translations[condition] || condition;
    }

    function getWeatherIcon(weatherCode) {
        
        const weatherIcons = {
            'clear': 'images/clear.png',
            'cloudy': 'images/cloudy.png',
            'fog': 'images/fog.png',
            'heavyrain': 'images/heavyrain.png',
            'lightrain': 'images/lightrain.png',
            'lightsnow': 'images/lightsnow.png',
            'rain': 'images/rain.png',
            'sleet': 'images/sleet.png',
            'snow': 'images/snow.png',
            'thunder': 'images/thunder.png',
            'pcloudy': 'images/pcloudy.png'
        };
    
        return weatherIcons[weatherCode] || 'images/windy.png';
    }
});

    
    
