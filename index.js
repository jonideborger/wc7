"use strict";

//Utils functions
function mergeLocationsToCountries(locations) {
  const countries = locations.reduce((acc, location) => {
    const found = acc.find(a => a.country_code === location.country_code);

    if(!found) {
      acc.push({
        country: location.country,
        country_code: location.country_code,
        confirmed: location.latest.confirmed,
        deaths: location.latest.deaths
      });
    } else {
      found.confirmed += location.latest.confirmed;
      found.deaths += location.latest.deaths;
    }

    return acc;
  }, []);

  return countries
}

function sortCountriesBy(param) {
  return function(a, b) {
    return b[param] - a[param];
  }
}

//Init functie, deze wordt uitgevoerd wanneer de pagina wordt geladen
async function init() {
  const countryList = new CountryList();
  await countryList.fetch();
  countryList.filter();
  countryList.render();

  const chart = new CustomChart('chart-confirmed');
}

class CountryList {
  constructor() {
    this.htmlElement = document.getElementById('countries');
    this.countries = [];
  }
  addEventListeners() {
    //Voeg voor elke 'checkbox'-input een evenlistener toe.
    //Op basis van de value van de checkbox ga je een functie uitvoeren op de instantie 'chart' van de klasse CustomChart
    //Deze heeft 2 functies 'addData' en 'removeData'
    let inputs = this.htmlElement.getElementsByTagName('input');
    inputs.forEach(input => {
      input.addEventListeners('change', function(e) {
        console.log(e.target.checked);
      })
    })
  }
  async fetch() {
    //Haal de data op via: https://coronavirus-tracker-api.herokuapp.com/v2/locations
    //Gebruik de async await syntax om de data met 'fetch' op te halen via de URL en om de JSON data hier uit te halen
    //Gebruik de try catch syntax om eventuele errors af te handelen

    //Maak gebruik van de Utils functie om de data zo te organiseren dat er 1 object per land is
    //const countries = mergeLocationsToCountries(json.locations);
    
    //Maak nu voor elk object in 'countries' een instantie van de klasse 'Country' aan.
    //Bewaar deze instanties in de array 'this.countries'
    //
  }
  filter() {
    //Maak gebruik van de sortCountriesBy(param) functie om de countries te sorteren.
    //this.countries.sort(sortCountriesBy('confirmed'));

    //Zorg er nu voor dat enkel de 20 landen met de meeste besmettingen worden getoond.
  }
  render() {
    //Haal de htmlStrings op voor alle Country's in this.countries

    //Injecteer deze in de html door gebruik te maken van this.htmlElement 
    //https://www.w3schools.com/jsref/prop_html_innerhtml.asp
  }
}

class Country {
  constructor(country) {
    this.name = country.country;
    this.country_code = country.country_code;
    this.confirmed = country.confirmed;
    this.deaths = country.deaths;
    this.active = false;
  }
  get htmlString() {
    return `
    <li><span>${this.country_code}</span><span class="span-country">${this.name}</span><span>${this.confirmed}</span><span>${this.deaths}</span><span><input type="checkbox" value="${this.country_code}"></span>
    `
  }
}

class CustomChart {
  constructor(elementId) {
    this.canvas = document.getElementById(elementId);
    this.context = this.canvas.getContext('2d');
    this.createChart();
  }
  createChart() {
    this.chart = new Chart(this.context, {
      type: 'line',
      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45]
          }]
      },

      // Configuration options go here
      options: {}
      });
  }
  addData(d) {
    console.log('Added data', d)
  }
  removeData(d) {
    console.log('Removed data', d)
  }
}

init();


//Make list with sort (top & search)

//Create graph object

//On click get data & add data