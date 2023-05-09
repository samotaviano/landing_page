
// Objects with information about every planet
mercury = {
    "name" : "Mercury",
    "description" : "Mercury — the smallest planet in our solar system and closest to the Sun — is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

venus = {
    "name" : "Venus",
    "description" : "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

earth = {
    "name" : "Earth",
    "description" : "Earth — our home planet — is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

mars = {
    "name" : "Mars",
    "description" : "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was – billions of years ago – wetter and warmer, with a thicker atmosphere.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

jupiter = {
    "name" : "Jupiter",
    "description" : "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

saturn = {
    "name" : "Saturn",
    "description" : "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

uranus = {
    "name" : "Uranus",
    "description" : "Uranus — seventh planet from the Sun — rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}

neptune = {
    "name" : "Neptune",
    "description" : "Neptune — the eighth and most distant major planet orbiting our Sun — is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations. ",
    "image" : function () {
      return `./img/${this.name.charAt(0).toLowerCase() + this.name.slice(1)}.png`;
    }
}


// Functions to create the html section for each planet and the navigation items
function createSection (planet) {
  return `<section id="${planet.name.charAt(0).toLowerCase() + planet.name.slice(1)}">
      <div class="planet_container">
        <h2 style="background: url(${planet.image()}) no-repeat right;">${planet.name}</h2>
        <p class="description">${planet.description}</p>
      </div>
    </section>`
}

function createMenuItem (planet) {
  const planetData = planet.name.charAt(0).toLowerCase() + planet.name.slice(1);
  return `<li class="nav_item" data-planet="${planetData}"><a href="#${planetData}">${planet.name}</a></li>`
}

// Store the planet objects in an array
const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

// Include planet sections and navigation items in the page
const main = document.querySelector("main");

const nav = document.querySelector("ul");

for (let planet of planets) {
  main.innerHTML += createSection(planet);
  nav.innerHTML += createMenuItem(planet);
}

// creates and add scroll top button and adds the click event
const scrollTopButton = document.createElement("span");

scrollTopButton.classList.add("scroll_top_btn");

document.body.appendChild(scrollTopButton);

scrollTopButton.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
})

// Select all sections and add an event listener to the document that triggers a function
// to loop trough every section and identifies the distance from the top of the view port
// If the distance corresponds to the viewport it activates the apropriated class

const planetSections = main.querySelectorAll("section");

// Detect visible area of the planet sections percentage
function visibleAreaPerc (sectionTop, sectionBottom, sectionHeight, viewHeight, viewDistance) {
  if ( sectionBottom - viewDistance >= sectionHeight || sectionBottom < 0 ) {
    return 0;

  } else if (sectionBottom < sectionHeight) {
    return sectionBottom / sectionHeight;

  } else if (sectionBottom > viewHeight) {
    return (viewHeight - sectionTop) / sectionHeight;
    
  } else {
    return 1;
  }
}

// Calculete section distance
function getSectionDist (sectY, bodyY) {
  if ( sectY < 0 ) {
    return Math.abs(sectY);
  } else {
    return Math.abs(sectY) + Math.abs(bodyY);
  }
}

document.addEventListener("scroll", () => {
  for (let i = 0; i < planetSections.length; i++) {
      // Variables to store the Y position and bottom position of each section
      // and than calculate its height addded of half of its margin bottom.
      
      // The body Y position and viewport height
      // This data is used to calculate how percentage of the box is visible
      // If more than 70% of the section is visible it applies the actice class
      const section = planetSections[i];
      const planet = section.getAttribute("id");
      const sectionTop = section.getBoundingClientRect().top;
      const sectionExtraMargin = window.getComputedStyle(section).marginBottom.slice(0,-2) / 2;
      const sectionBottom = section.getBoundingClientRect().bottom + sectionExtraMargin;
      const sectionHeight = sectionBottom - sectionTop;


      const viewHeight = window.innerHeight;
      const bodyTop = document.body.getBoundingClientRect().top;
      const viewDistance = viewHeight + Math.abs(bodyTop);

      const sectionDistance = getSectionDist(sectionTop, bodyTop);

      // const visibleArea = (planetBPos + planetExtraMargin) / viewPortHeigh;
      const visibleArea = visibleAreaPerc(sectionTop, sectionBottom, sectionHeight, viewHeight, viewDistance);
      
      // Sets the menu item link related to each section
      const menuItem = document.querySelector(`[data-planet="${planet}"]`).querySelector("a");

      if ( visibleArea > 0.85 ) {
        planetSections[i].classList.add("active_section");
        menuItem.classList.add("active_nav_item");
      } else {
        planetSections[i].classList.remove("active_section");
        menuItem.classList.remove("active_nav_item");
      }
    }

  if (document.body.getBoundingClientRect().y < -320 ) {
    scrollTopButton.style.setProperty("display", "flex");
  } else {
    scrollTopButton.style.setProperty("display", "none");
  }
});

// Scroll the page when any menu item is clicked
const navItems = document.querySelectorAll('.navbar ul li');

for (let item of navItems) {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    const clickedPlanet = item.querySelector("a").getAttribute("href");
    const clickedPlanetSection = document.querySelector(clickedPlanet);
    const Planetpos = clickedPlanetSection.getBoundingClientRect().y;
    const pagePosition = document.body.getBoundingClientRect().y;
    const distanceToScroll = pagePosition - Planetpos;

    window.scroll({
      top: Math.abs(distanceToScroll) - 124,
      behavior: "smooth",
    });
  });
}

// Slider menu
// Variables to store the header (container) and the arrows
const arrowsContainer = document.querySelector("header");
const leftArrow = document.querySelector(".nav-arrow:first-child");
const rightArrow = document.querySelector(".nav-arrow:last-child");


// The ul that contains the menu items is called menuContainer
const menuContainer = document.querySelector("ul");
let menuContainerWidth = window.getComputedStyle(menuContainer).width.slice(0,-2);

// Measurements to control the menu functionality

// Header left padding (the left limit for the menu)
const arrowsContainerPadding = window.getComputedStyle(arrowsContainer).paddingLeft.slice(0,-2);

// Total width of menu items (all the li)
const singleMenuItem = menuContainer.querySelector("li");
const menuItemWidth = window.getComputedStyle(singleMenuItem).width.slice(0,-2);
let menuItemsTotalWidth = menuContainer.querySelectorAll("li").length * menuItemWidth;

// The first and the last menu items
const firstMenuItem = menuContainer.querySelector("li:first-child");
let firstMenuItemXPos = firstMenuItem.getBoundingClientRect().left;

const lastMenuItem = menuContainer.querySelector("li:last-child");
let lastMenuItemXPos = lastMenuItem.getBoundingClientRect().left;

function checkSizesPos() {
  menuContainerWidth = window.getComputedStyle(menuContainer).width.slice(0,-2);
  firstMenuItemXPos = firstMenuItem.getBoundingClientRect().left;
  lastMenuItemXPos = lastMenuItem.getBoundingClientRect().left;
  setArrows();
}


// Variabes to trigger or to stop the menu functionality
// Create variables to detect if the button is pressed,
// the distance to move horizontally
// and the direction to move
let onPress = false;
let distance = 0;
const step = 10;
let direction;
let timer;

function logFollowUp () {
  console.log(`
  ##################################
  Largura ul [menuContainerWidth]: ${menuContainerWidth}
  Largura de cada item de menu [menuItemWidth]: ${menuItemWidth}
  Largura total de todos os items de menu [menuItemsTotalWidth]: ${menuItemsTotalWidth}
  1º item de menu posição X (left) [firstMenuItemXPos]: ${firstMenuItemXPos}
  Último item de menu posição X (left) [lastMenuItemXPos]: ${lastMenuItemXPos}
  Padding do Header [arrowsContainerPadding]: ${arrowsContainerPadding}
  ${arrowsContainerPadding}
  ##################################
  `);
}


// Function to display or hidde the arros
// According to certain conditions
setArrows();

function setArrows () {
  // navWidth = window.getComputedStyle(nav).width.slice(0,-2);
  menuContainerWidth = window.getComputedStyle(menuContainer).width.slice(0,-2);
  if (menuContainerWidth > 1100) {
    rightArrow.style.display = "none";
    leftArrow.style.display = "none";
  } else {
    rightArrow.style.display = "block";
    leftArrow.style.display = "block";
  }
  // menuItemsxPos = menuItems.getBoundingClientRect().left;
  // rigthLimit = calcRigthLimit(menuItemsxPos, navWidth, arrowsContainerPadding);
  // console.log(rigthLimit);
  // if (rigthLimit >= 1190) {
  //   rightArrow.style.display = "none";
  //   leftArrow.style.display = "block";
  // } else if (menuItemsxPos === 40 && menuItemsTotalWidth > navWidth) {
  //   rightArrow.style.display = "block";
  //   leftArrow.style.display = "none";
  // } else if (menuItemsxPos < 40 && menuItemsTotalWidth > navWidth) {
  //   rightArrow.style.display = "block";
  //   leftArrow.style.display = "block";
  // }
}

// Calculate the rigth limit: sum of menu left, nav width and header padding
// 
function calcRigthLimit (menuLeft, liGroupWidth, headerPadding) {
  return Math.abs(menuLeft) + Number(liGroupWidth) + Number(headerPadding);
}


// Get the x position of the menu (the ul element)
let liGroupRight = window.getComputedStyle(menuContainer).right.slice(0,-2);
logFollowUp();

// If the window is resized gets the width of the nav element
// which is the menu container
window.addEventListener('resize', function(event) {
  setArrows();
  logFollowUp();
}, true);


// Add mousedown event
arrowsContainer.addEventListener("mousedown",(evt) => {
  onPress = true;
  direction = evt.target.getAttribute("data-dir");
  
  if (!timer) {
    timer = setInterval(function() {
      moveDirection(direction);
      checkSizesPos()
      setArrows();
    }, 1);
  }

});

// Add mouseup event
arrowsContainer.addEventListener("mouseup", () => {
  onPress = false;
  clearInterval(timer);
  // Sets back the timer variable to null
  timer = null;
});

// Function detect moving direction and activate the movement
function moveDirection (arrowDir) {
    
  if (onPress === true) {
    // Condition:  && menuItemsxPos <= 30  
    if (arrowDir === "left" && firstMenuItemXPos < 40) {
        
        let dir = distance = distance - step;
        move (dir);
        checkSizesPos()

      // Condition:   && calcRigthLimit(liGroupxPos, navWidth, arrowsContainerPadding) < 1200  
    } else if (arrowDir === "right" && lastMenuItemXPos > menuContainerWidth - 110) {
        
        let dir = distance = distance + step;
        move (dir);
        checkSizesPos()

    }   

  }
}

function move (direction) {
  menuContainer.style.right = direction + "px";
  // liGroupRight = window.getComputedStyle(menuContainer).right.slice(0,-2);
  // liGroupxPos = menuContainer.getBoundingClientRect().left;
  logFollowUp();
}2253 