## ![Dig-It logo](client/src/assets/logo/dig-it-logo-full.svg)

Dig-It is a single-page web application that takes out all of the guess-work out of home gardening. By using the climate in the user's location, the type of plant, the plant's age, as well as many other factors, Dig-It gives the user custom reminders for when their plants should be watered, planted, repotted and more. 

Dig-It's extensive crowdsourced database allows visitors and registered users to view the details of any plant in the world as well as optimal growing conditions in their area.

## Author

**Robert Helmick**

## Built With

- Angular 5
- SASS
- Node.JS
- MongoDB
- [Tom Clothier](https://tomclothier.hort.net/) - Plant Database
- [WikiMedia](https://www.mediawiki.org/) - Image lookup
- [FrostLine by Waldo Jaquith](https://github.com/waldoj/frostline) - Calculate user's USDA Plant Hardiness Zone
- [FarmSense](http://www.farmsense.net/api/frost-date-api/) - Calculate frost dates in user's location

## Public API:

**Base URL:** ````http://dig-it.rh-codes.com/api```` 

**Endpoints:**

GET all plants: 

````/search````

## License

This project is licensed under the MIT License

## Versioning:

**v2.2.1 *Current*:**

- Google Analytics
- Edit GardenPlant
- Bugfix: Display reminders on initial login

**v2.2:**

- Bugfix: Refresh Reminders on add/remove GardenPlant
- Bugfix: Search grid alignment on mobile

**v2.1:**

- Add custom Plant to Garden without adding to database
- Bugfix: Search algorithm
- Bugfix: Image uploader

**v2.0:**

- UI refactor to minimalist theme
- Image Uploader component
- Performance enhancements

**v1.1:**

- Site responsiveness
- Bugfix: Search grid item UI

**v1.0:**

- Dig-It MVP
- UI layout v1

## Upcoming Features:
- Google & iCloud Calendar integration
- Unit Testing
- Administrator approval of new plants
- Accessibility improvements