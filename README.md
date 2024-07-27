# U-TRAVEL :airplane:

ES:

Aplicación centrada en viajes diseñada para crear el itinerario perfecto basado en los filtros seleccionados por el usuario. Los usuarios pueden crear una cuenta, elegir de un catálogo seleccionado de países y seleccionar la ciudad que desean visitar.

Mediante criterios de filtro como presupuesto, fechas de viaje, compañeros de viaje (solo, pareja, familia, amigos), rango de edad de los viajeros e intereses (arte, aventura, gastronomía, cultura, naturaleza, etc.), la aplicación recomienda actividades y experiencias que mejor se adapten a las preferencias del usuario, las cuales eventualmente pueden reservar.

EN:

Travel-centered app designed to create the perfect itinerary based on user-selected filters. Users can create an account, choose from a curated catalog of countries and select the city they wish to visit.

By means of filters criteria such as budget, travel dates, travel companions (solo, couple, family, friends), age range of travelers, and interests (art, adventure, gastronomy, culture, nature, etc), the app recommends activities and experiences that best match the user's preferences which the user can eventually book.

<br>

## Features:

User Registration and Login: Users can create an account, register, and log in through Firebase for secure authentication and personalized experience. Data persistence is managed with SQLite to ensure user information is saved and retrieved efficiently.

Profile Management: Within the app, users have access to a profile section where they can set their address using Expo Location and add or edit their profile picture using Expo Image Picker. 

Destination Selection: Users can browse a limited catalog of countries and select the one they would like to visit. Within each country, they can choose from available cities to further narrow down their destination preferences.

Activity Filtering: After selecting a city, users can apply various filter criteria such as budget, travel dates, travel companions (solo, couple, family, friends), age range of travelers, and interests (art, adventure, gastronomy, culture, nature, sports, relaxation, etc). This helps in tailoring the activities and experiences that best match their preferences.

Personalized Itinerary and Activity Proposals: Based on the selected filters, the app generates a proposed itinerary with activities that align with the user's interests. Users can review these suggestions and proceed to confirm their bookings.

Booking Confirmation and Countdown: Once a booking is confirmed, the app creates a countdown timer displaying the remaining months and days until the activity. This booking is then added to the user's list of bookings.

Bookings Management: The user's confirmed bookings are persisted within their account using Async Storage, ensuring that all information is retained across sessions and available for review at any time.

<br>

## Coming Soon

### Countries experiences summary:

Explore Sightseeing, Outdoor, Adventure, Food, Nature, and City Activities based on countries selection: Once a country is selected, users will soon be able to scroll through a variety of cards offering activities in categories such as sightseeing, outdoor, adventure, food, nature, and city experiences. This feature is currently under construction and will be available in a future update.

### Price Filtering: 

Currently, the price filter is limited to filtering by specific price ranges. This means that if a user sets the filter to the highest range, only high-priced activities are displayed. Similarly, setting the filter to the middle range will only show activities within that price range, without including also lower priced options. An enhancement to offer a more comprehensive filtering system, displaying a broader range of activities based on selected price criteria, is coming soon.

<br>

## Installation :hammer:

Clone this repository and run on the root of the project:

| Root
|---------
| npm install
| npm start

<br>

## Technologies 🛠️

This project was developed using the following technologies and frameworks:

<ul>
<li>Expo</li>
<li>React Native</li>
<li>Firebase</li>
<li>SQLite</li>
</ul>

<br>

## Version :pencil:

### v1.0.0 - July 27, 2024

- Initial version

<br>

## Author :rocket:

- Matias Orlando
