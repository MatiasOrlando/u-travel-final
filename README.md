# U-TRAVEL :airplane:

ES:

Aplicación centrada en viajes diseñada para crear el itinerario perfecto basado en los filtros seleccionados por el usuario. Los usuarios pueden crear una cuenta, elegir de un catálogo seleccionado de países y seleccionar la ciudad que desean visitar.

Mediante criterios de filtro como presupuesto, fechas de viaje, compañeros de viaje (solo, pareja, familia, amigos), rango de edad de los viajeros e intereses (arte, aventura, gastronomía, cultura, naturaleza, etc.), la aplicación recomienda actividades y experiencias que mejor se adapten a las preferencias del usuario, las cuales eventualmente pueden reservar.

EN:

Travel-centered app designed to create the perfect itinerary based on user-selected filters. Users can create an account, choose from a curated catalog of countries and select the city they wish to visit.

By means of filters criteria such as budget, travel dates, travel companions (solo, couple, family, friends), age range of travelers, and interests (art, adventure, gastronomy, culture, nature, etc), the app recommends activities and experiences that best match the user's preferences which the user can eventually book.

<br>

## Features

ES:

Registro y Inicio de Sesión de Usuario: Los usuarios pueden crear una cuenta, registrarse e iniciar sesión a través de Firebase para una autenticación segura y una experiencia personalizada. La persistencia de datos se maneja con SQLite para garantizar que la información del usuario se guarde y se recupere de manera eficiente.

Gestión del Perfil: Dentro de la aplicación, los usuarios tienen acceso a una sección de perfil donde pueden establecer su dirección utilizando Expo Location y agregar o editar su foto de perfil mediante Expo Image Picker.

Selección de Destino: Los usuarios pueden explorar un catálogo limitado de países y seleccionar el que desean visitar. Dentro de cada país, pueden elegir entre las ciudades disponibles para afinar aún más sus preferencias de destino.

Filtrado de Actividades: Después de seleccionar una ciudad, los usuarios pueden aplicar varios criterios de filtro como presupuesto, fechas de viaje, compañeros de viaje (solo, pareja, familia, amigos), rango de edad de los viajeros e intereses (arte, aventura, gastronomía, cultura, naturaleza, deportes, relajación, etc.). Esto ayuda a adaptar las actividades y experiencias que mejor se ajusten a sus preferencias.

Itinerario Personalizado y Propuestas de Actividades: Basado en los filtros seleccionados, la aplicación genera un itinerario propuesto con actividades que se alinean con los intereses del usuario. Los usuarios pueden revisar estas sugerencias y proceder a confirmar sus reservas.

Confirmación de Reserva y Cuenta Regresiva: Una vez confirmada una reserva, la aplicación crea un temporizador de cuenta regresiva que muestra los meses y días restantes hasta la actividad. Esta reserva se añade a la lista de reservas del usuario.

Gestión de Reservas: Las reservas confirmadas del usuario se mantienen dentro de su cuenta utilizando Async Storage, asegurando que toda la información se conserve entre sesiones y esté disponible para su revisión en cualquier momento.

EN:

User Registration and Login: Users can create an account, register, and log in through Firebase for secure authentication and personalized experience. Data persistence is managed with SQLite to ensure user information is saved and retrieved efficiently.

Profile Management: Within the app, users have access to a profile section where they can set their address using Expo Location and add or edit their profile picture using Expo Image Picker.

Destination Selection: Users can browse a limited catalog of countries and select the one they would like to visit. Within each country, they can choose from available cities to further narrow down their destination preferences.

Activity Filtering: After selecting a city, users can apply various filter criteria such as budget, travel dates, travel companions (solo, couple, family, friends), age range of travelers, and interests (art, adventure, gastronomy, culture, nature, sports, relaxation, etc). This helps in tailoring the activities and experiences that best match their preferences.

Personalized Itinerary and Activity Proposals: Based on the selected filters, the app generates a proposed itinerary with activities that align with the user's interests. Users can review these suggestions and proceed to confirm their bookings.

Booking Confirmation and Countdown: Once a booking is confirmed, the app creates a countdown timer displaying the remaining months and days until the activity. This booking is then added to the user's list of bookings.

Bookings Management: The user's confirmed bookings are persisted within their account using Async Storage, ensuring that all information is retained across sessions and available for review at any time.

<br>

## Coming Soon

ES:

### Mayor Variedad de Actividades:

Para ofrecer a los usuarios una gama más amplia de opciones, se esta trabajando en aumentar la variedad de actividades disponibles en cada ciudad. Actualmente, la cantidad limitada de actividades por ciudad puede afectar la diversidad de opciones ofrecidas. Mantente atento a las actualizaciones mientras ampliamos nuestro catálogo de actividades para incluir experiencias más diversas y ajustadas a tus preferencias.

### Resumen de Experiencias por Países:

Explora Actividades de Turismo, Aire Libre, Aventura, Comida, Naturaleza y Ciudad según la selección de países: Una vez que se selecciona un país, los usuarios pronto podrán desplazarse a través de una variedad de tarjetas que ofrecen actividades en categorías como turismo, aire libre, aventura, comida, naturaleza y experiencias urbanas. Esta función está actualmente en construcción y estará disponible en una actualización futura.

### Filtrado por Precio:

Actualmente, el filtro de precio está limitado a filtrar por rangos de precio específicos. Esto significa que si un usuario ajusta el filtro al rango más alto, solo se mostrarán las actividades de alto precio. De manera similar, ajustar el filtro al rango medio solo mostrará actividades dentro de ese rango de precio, sin incluir opciones de precios más bajos. Próximamente se implementará una mejora para ofrecer un sistema de filtrado más completo, que permita mostrar una gama más amplia de actividades basadas en los criterios de precio seleccionados.

EN:

### Enhanced Variety of Activities:

To provide users with a wider range of options, we are working on increasing the variety of activities available in each city. Currently, the limited number of activities per city may affect the diversity of options offered. Stay tuned for updates as we expand our activity catalog to include more diverse experiences and better match your preferences.

### Countries experiences summary:

Explore Sightseeing, Outdoor, Adventure, Food, Nature, and City Activities based on countries selection: Once a country is selected, users will soon be able to scroll through a variety of cards offering activities in categories such as sightseeing, outdoor, adventure, food, nature, and city experiences. This feature is currently under construction and will be available in a future update.

### Price Filtering:

Currently, the price filter is limited to filtering by specific price ranges. This means that if a user sets the filter to the highest range, only high-priced activities are displayed. Similarly, setting the filter to the middle range will only show activities within that price range, without including also lower priced options. An enhancement to offer a more comprehensive filtering system, displaying a broader range of activities based on selected price criteria, is coming soon.

<br>

## Libraries

<ul>
<li>React-native-paper-dates: Date picker library used to select dates of arrival and departure.</li>
<li>React-native-snap-carousel: Carousel library to display different cities based on country selection.</li>
<li>Formik & Yup: Libraries used for Forms validations.</li>
<li>Redux Toolkit: Manage & control Store state's flow.</li>
<li>React-native-keyboard-aware-scroll-view: Library used to control the visibility of the content when keyboard is open.</li>
<li>Expo Image Picker: Library used to allow the add or edit of user's profile picture.</li>
<li>Expo Location: Library used to allow the user to set it's location address.</li>
<li>Expo SQlite: Library used to handle user's data persistance across the app.</li>
<li>Expo Router: Library used to handle navigation across the app.</li>
<li>Patch package: Library used to create a patch for the snap carousel's node_modules files (Proptype errors).</li>
<li>Async storage: Library used to persist User's bookings on the device.</li>
</ul>

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
