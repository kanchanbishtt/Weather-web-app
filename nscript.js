// ================== DOM ELEMENTS ==================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const messageEl = document.getElementById('message');

const cityNameEl = document.getElementById('cityName');
const temperatureEl = document.getElementById('temperature');
const feelsLikeEl = document.getElementById('feelsLike');
const weatherDescEl = document.getElementById('weatherDesc');
const weatherIconEl = document.getElementById('weatherIcon');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const pressureEl = document.getElementById('pressure');
const dailyForecastEl = document.getElementById('dailyForecast');
const hourlyForecastEl = document.getElementById('hourlyForecast');

// ================== EVENTS ==================
searchBtn.addEventListener('click', () => loadByCity(cityInput.value.trim()));

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    loadByCity(cityInput.value.trim());
  }
});

locationBtn.addEventListener('click', loadByLocation);

// ================== CLOCK ==================
function updateClock() {
  const now = new Date();
  document.getElementById('currentTime').textContent = now.toLocaleTimeString();
  document.getElementById('currentDate').textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

// ================== GEO SEARCH ==================
async function loadByCity(query) {
  if (!query) {
    showError('Please enter a city, state, or region');
    return;
  }

  messageEl.textContent = '';

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5&language=en&format=json`;

    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      showError('Location not found (data provided in part by API)');
      return;
    }

    // Prefer most relevant result
    const loc = geoData.results[0];

    loadWeather(
      loc.latitude,
      loc.longitude,
      `${loc.name}${loc.admin1 ? ', ' + loc.admin1 : ''}`,
      loc.country
    );
  } catch {
    showError('Unable to fetch location data');
  }
}

// ================== LOCATION ==================
function loadByLocation() {
  if (!navigator.geolocation) {
    showError('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      loadWeather(
        pos.coords.latitude,
        pos.coords.longitude,
        'Your Location',
        ''
      );
    },
    () => showError('Location permission denied')
  );
}

// ================== WEATHER ==================
async function loadWeather(lat, lon, city, country) {
  messageEl.textContent = '';

  try {
    const weatherURL = `
https://api.open-meteo.com/v1/forecast
?latitude=${lat}
&longitude=${lon}
&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m
&hourly=relativehumidity_2m,surface_pressure,temperature_2m,weathercode
&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset
&timezone=auto
`.replace(/\s+/g, '');

    const res = await fetch(weatherURL);
    const data = await res.json();

    const current = data.current;

    // Find closest hourly index (critical fix)
    const nowIndex = findClosestHourlyIndex(
      data.hourly.time,
      current.time
    );

    // ================== UI UPDATE ==================
    cityNameEl.textContent = `${city}${country ? ', ' + country : ''}`;

    temperatureEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    feelsLikeEl.textContent = `Feels like ${Math.round(
      current.apparent_temperature
    )}°C`;

    weatherDescEl.textContent = getWeatherText(current.weathercode);
    weatherIconEl.src = getIcon(current.weathercode);

    sunriseEl.textContent = new Date(
      data.daily.sunrise[0]
    ).toLocaleTimeString();

    sunsetEl.textContent = new Date(
      data.daily.sunset[0]
    ).toLocaleTimeString();

    humidityEl.textContent =
      data.hourly.relativehumidity_2m?.[nowIndex] !== undefined
        ? `${data.hourly.relativehumidity_2m[nowIndex]}%`
        : 'N/A';

    windEl.textContent = `${current.windspeed_10m} km/h`;

    pressureEl.textContent =
      data.hourly.surface_pressure?.[nowIndex] !== undefined
        ? `${data.hourly.surface_pressure[nowIndex]} hPa`
        : 'N/A';

    renderDaily(data.daily);
    renderHourly(data.hourly);
  } catch {
    showError('Unable to fetch weather data');
  }
}

// ================== HELPERS ==================
function findClosestHourlyIndex(times, targetTime) {
  const target = new Date(targetTime).getTime();
  let closestIndex = 0;
  let minDiff = Infinity;

  times.forEach((time, i) => {
    const diff = Math.abs(new Date(time).getTime() - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  });

  return closestIndex;
}

function renderDaily(daily) {
  dailyForecastEl.innerHTML = '';

  daily.temperature_2m_max.forEach((max, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <span>${new Date(daily.sunrise[i]).toDateString()}</span>
      <span>${Math.round(max)}° / ${Math.round(
      daily.temperature_2m_min[i]
    )}°</span>
    `;
    dailyForecastEl.appendChild(div);
  });
}

function renderHourly(hourly) {
  hourlyForecastEl.innerHTML = '';

  for (let i = 0; i < 12; i++) {
    const div = document.createElement('div');
    div.className = 'hour-card';
    div.innerHTML = `
      <div>${new Date(hourly.time[i]).getHours()}:00</div>
      <div>${Math.round(hourly.temperature_2m[i])}°C</div>
    `;
    hourlyForecastEl.appendChild(div);
  }
}

// ================== WEATHER ICONS ==================
function getIcon(code) {
  if (code === 0) return 'https://openweathermap.org/img/wn/01d@2x.png';
  if (code <= 2) return 'https://openweathermap.org/img/wn/02d@2x.png';
  if (code <= 48) return 'https://openweathermap.org/img/wn/04d@2x.png';
  if (code <= 67) return 'https://openweathermap.org/img/wn/09d@2x.png';
  return 'https://openweathermap.org/img/wn/11d@2x.png';
}

function getWeatherText(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code <= 48) return 'Cloudy';
  if (code <= 67) return 'Rain';
  return 'Thunderstorm';
}

function showError(msg) {
  messageEl.textContent = msg;
}


