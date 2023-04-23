
// Objects with information about every planet
mercury = {
    "name" : "Mercury",
    "description" : "Mercury — the smallest planet in our solar system and closest to the Sun — is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

venus = {
    "name" : "Venus",
    "description" : "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

earth = {
    "name" : "Earth",
    "description" : "Earth — our home planet — is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

mars = {
    "name" : "Mars",
    "description" : "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was – billions of years ago – wetter and warmer, with a thicker atmosphere.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

jupiter = {
    "name" : "Jupiter",
    "description" : "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

saturn = {
    "name" : "Saturn",
    "description" : "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

uranus = {
    "name" : "Uranus",
    "description" : "Uranus — seventh planet from the Sun — rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

neptune = {
    "name" : "Neptune",
    "description" : "Neptune — the eighth and most distant major planet orbiting our Sun — is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations. ",
    "image" : function () {
      return `../img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}


// Functions to create the html section for each planet and for the navigation items
function createSection (planet) {
  return `<section id="${planet.name.charAt(0).toLowerCase() + planet.name.slice(1)}">
      <div class="planet_container">
        <h2 style="background: url(${planet.image()}) no-repeat right;">${planet.name}</h2>
        <p class="description">${planet.description}</p>
      </div>
    </section>`
}

function createMenuItem (planet) {
  return `<li class="nav_item"><a href="#${planet.name.charAt(0).toLowerCase() + planet.name.slice(1)}">${planet.name}</a></li>`
}

// Store the planet objects in an array
const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

// Create all planet sections
const main = document.querySelector("main");

const nav = document.querySelector("ul");

for (let planet of planets) {
  main.innerHTML += createSection(planet);
  nav.innerHTML += createMenuItem(planet);
}

// Select all sections and add an event listener to the document that triggers a function
// that loops trough every section and identifies the distance from the top of the view port
// If the distance corresponds to the viewport it activates the apropriated class

const planetSections = main.querySelectorAll("section");

document.addEventListener("scroll", () => {
  for (let i = 0; i < planetSections.length; i++) {
      const planetDistance = planetSections[i].getBoundingClientRect().y;
      if ( planetDistance > -10 && planetDistance < 420) {
        planetSections[i].classList.add("active_section");
      } else {
        planetSections[i].classList.remove("active_section");
      }
    }

    const mars = planetSections[3].getBoundingClientRect().y;
    const page = document.body.getBoundingClientRect().y;

    console.log(mars, page);
});

// Scroll the page
const navItems = document.querySelectorAll('.navbar ul li');
console.log(navItems);

for (let item of navItems) {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    const clickedPlanet = item.querySelector("a").getAttribute("href");
    const clickedPlanetSection = document.querySelector(clickedPlanet);
    const pagePosition = document.body.getBoundingClientRect().y;
    const pos = clickedPlanetSection.getBoundingClientRect().y;
    const distanceToScroll = pagePosition - pos;
    console.log(pos, pagePosition, distanceToScroll);
    window.scroll({
      top: pagePosition - pos,
      behavior: "smooth",
    });
  });
}