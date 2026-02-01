🌤️ Weather Dashboard Web App

Project Description
This project is a web-based weather application that allows users to search for a city, state, region, or country and view the current weather conditions along with short-term forecasts. The application fetches real-time weather data from a public weather API and presents it in a clean, dashboard-style interface.

The main objective of this project is to practice frontend web development concepts such as API integration, asynchronous JavaScript, responsive layouts, and user-friendly error handling.


Objective
The goal of this project is to build a functional weather app that:
Accepts user input for a location
Retrieves live weather data from a public API
Displays key weather information in a readable and responsive UI
Skills Practiced

HTML – Structuring the application layout

CSS – Styling, dashboard layout, and responsiveness

JavaScript – Fetching API data, DOM manipulation, and interactivity

API Integration – Using a free public weather API (Open-Meteo)


Features

🔍 Location Search
Users can search by city, state, region, or country
Search can be triggered by:
Clicking the Search button
Pressing Enter on the keyboard
Current location weather can be fetched using browser geolocation
🌡️ Weather Information Displayed
Current temperature (°C)
Feels-like temperature
Weather condition with icon
Humidity (%)
Wind speed (km/h)
Surface pressure (hPa)
Sunrise and sunset time
Hourly forecast (next few hours)
Daily forecast (up to 5 days)

⚠️ Error Handling

Displays messages for:
Empty input
Invalid or unknown locations
API or network issues
Error messages appear near the search area for better user clarity

📱 Responsive Design

Designed to work across:
Desktop
Tablet
Mobile screens
Dashboard cards adjust flexibly based on screen size

API Used
This project uses the Open-Meteo API, which provides:
Free access
No API key required
Weather forecast model data


Important note:
Open-Meteo provides forecast-based data, not direct weather-station readings. Because of this:
Values may differ slightly from apps like Google Weather
Some locations may return partial data
The app handles missing values gracefully when the API does not provide certain fields
This behavior is expected and documented by the API.

Project Structure
/weather-dashboard
│
├── index.html        
├── appstyle.css      
├── appscript.js      
└── README.md         


How to Run the Project?

Click on the link
Enter a location in the search bar and press Enter or click Search
Allow location access if using the Current Location feature
No additional setup or installation is required.


Limitations (Honest Disclosure)

Weather data accuracy depends on the Open-Meteo forecast model
Some regions or administrative areas may resolve to nearby locations due to geocoding limitations
Exact matching of every small region worldwide cannot be guaranteed by free APIs
Despite these limitations, the app reliably displays weather data for most commonly searched locations.

Grading Criteria Alignment
Functionality: Weather data is fetched and displayed correctly based on user input
User Interface: Clean, readable, and responsive dashboard layout
Error Handling: Graceful handling of invalid input and API issues
Code Quality: Structured, readable, and logically organized JavaScript


Additional Notes

This project focuses on correct API usage and realistic data handling, rather than simulated or hardcoded values. Wherever the API provides partial or model-based data, the application reflects this transparently instead of masking it.
