const form = document.querySelector('.getWeatherForm');
const search = document.querySelector('.form-input input');
const heading = document.querySelector('.heading2');
const result = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (result.contains(document.querySelector('.resultCard'))) {
        result.removeChild(document.querySelector('.resultCard'));
    }

    const location = search.value;

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                heading.textContent = data.error;
            } else {
                heading.textContent = '1 Result Found';

                // result card
                const resultCard = document.createElement('div');
                resultCard.classList.add('resultCard');

                // result card header
                const resultCardHeader = document.createElement('div');
                resultCardHeader.classList.add('resultCardHeader');
                const header3 = document.createElement('h3');
                header3.textContent = data.weather.currently.temperature + ' °C';
                resultCardHeader.appendChild(header3);
                const headerData = document.createElement('p');
                headerData.textContent = data.location;
                resultCardHeader.appendChild(headerData);

                resultCard.appendChild(resultCardHeader);

                // result card body
                const resultCardBody = document.createElement('div');
                resultCardBody.classList.add('resultCardBody');

                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                const p3 = document.createElement('p');
                const p4 = document.createElement('p');
                const p5 = document.createElement('p');

                p1.textContent = 'Humidity: ' + data.weather.currently.humidity + ' %';
                p2.textContent = 'Feels Like: ' + data.weather.currently.apparentTemperature + ' °C';
                p3.textContent = 'Wind Speed: ' + data.weather.currently.windSpeed + ' km/h';
                p4.textContent = 'Wind Gust: ' + data.weather.currently.windGust + ' km/h';
                p5.textContent = `${data.weather.currently.summary}. ${data.weather.daily.summary}`;

                resultCardBody.appendChild(p1);
                resultCardBody.appendChild(p2);
                resultCardBody.appendChild(p3);
                resultCardBody.appendChild(p4);
                resultCardBody.appendChild(p5);

                resultCard.appendChild(resultCardBody);

                result.appendChild(resultCard);
            }
        })
    })
})