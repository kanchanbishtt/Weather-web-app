🌦️ Weather Dashboard Web Application
Project Overview

This project is a web-based weather application developed using HTML, CSS, and JavaScript.
The main goal of the project is to allow users to search for a location and view current weather information along with short-term forecasts.

The application was built as part of a learning project to practice frontend development concepts and working with a public weather API.

Objective

Allow users to enter a city, state, or region name

Fetch real-time weather data using a public weather API

Display essential weather details in a clean and user-friendly interface

Handle invalid inputs and API-related issues gracefully

Features

Search by Location

Users can search using a city, state, or region name.

Example: Delhi, Gujarat, Uttarakhand, London, etc.

Current Location Weather

Users can fetch weather data using their device’s geolocation.

Current Weather Details

Temperature (°C)

Feels-like temperature

Weather condition description

Sunrise and sunset time

Humidity

Wind speed

Atmospheric pressure

Forecasts

Hourly forecast (short-term)

5-day daily forecast (max temperature)

Live Date & Time

Displays current local time and date for the searched location.

Error Handling

Handles empty searches

Displays helpful messages when a location is not found

Handles API or network errors gracefully

Technologies Used

HTML – Page structure and layout

CSS – Styling, responsiveness, and dashboard layout

JavaScript – Application logic, API calls, and DOM manipulation

Open-Meteo API

Used for geocoding (location search)

Used for weather and forecast data

API Information

This project uses the Open-Meteo API, which provides free and reliable weather data without requiring an API key.

Geocoding API: Converts location names into latitude and longitude

Forecast API: Retrieves current weather, hourly, and daily forecast data

Important Note on Weather Data Accuracy

Weather data is based on geographic coordinates and may represent averaged conditions for regions or states rather than exact city-level readings.

This means:

Searching for states or regions may return weather for the geographic center of that area.

Weather values may differ slightly from other services due to different weather models and update intervals.

Project Structure
├── index.html
├── appstyle.css
├── appscript.js
└── README.md

How to Run the Project

Download or clone the repository

Open index.html in any modern web browser

Enter a city, state, or region name in the search bar

Click Search or press Enter

View the weather information on the dashboard

No additional setup or API keys are required.

Learning Outcomes

This project helped in practicing:

DOM manipulation using JavaScript

Working with asynchronous API calls (async/await)

Handling user input and validation

Managing API errors and edge cases

Creating a responsive and structured UI

Understanding limitations of free public APIs

Possible Improvements

Add unit conversion (°C / °F)

Improve weather condition descriptions

Add location suggestions or dropdown results

Cache recent searches

Improve UI responsiveness for smaller screens

Conclusion

This weather dashboard serves as a functional learning project demonstrating the integration of frontend technologies with a public weather API. While it may not provide hyper-local precision for all locations, it successfully meets the core project requirements and provides a solid foundation for further improvements.
