'use strict';

console.log('Welcome to the BusMall');

// GLOBAL VARIABLES

let voteCount = 25;
let allProducts = [];

// DOM REFERENCES

let imgCatalog = document.getElementById('img-catalog');
let itemOne = document.getElementById('item-1');
let itemTwo = document.getElementById('item-2');
let itemThree = document.getElementById('item-3');

let resultsBtn = document.getElementById('results-btn');

// CANVAS REFERENCE

let ctx = document.getElementById('my-chart').getContext('2d');

// CONSTRUCTOR

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allProducts.push(this);

}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


console.log(allProducts);

// HELPER FUNCTIONS/EXECUTABLE CODE

function randomProdIndex() {
  return Math.floor(Math.random() * allProducts.length);
}
let indexArray = [];
function renderPhotos() {
  while (indexArray.length < 6) {
    let randomNumber = randomProdIndex();
    while (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  console.log(indexArray);
  let prodOneIndex = indexArray.shift();
  let prodTwoIndex = indexArray.shift();
  let prodThreeIndex = indexArray.shift();


  itemOne.src = allProducts[prodOneIndex].photo;
  itemOne.alt = allProducts[prodOneIndex].name;
  allProducts[prodOneIndex].views++;

  itemTwo.src = allProducts[prodTwoIndex].photo;
  itemTwo.alt = allProducts[prodTwoIndex].name;
  allProducts[prodTwoIndex].views++;

  itemThree.src = allProducts[prodThreeIndex].photo;
  itemThree.alt = allProducts[prodThreeIndex].name;
  allProducts[prodThreeIndex].views++;

}
renderPhotos();

// FUNCTION TO RENDER CHART

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }


  let ChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(10, 188, 208, 0.5)',
          'rgba(10, 188, 208, 0.5)',
          'rgba(10, 188, 208, 0.5)',
          'rgba(10, 188, 208, 0.5)',
          'rgba(10, 188, 208, 0.5)',
          'rgba(10, 188, 208, 0.5)'
        ],
        borderColor: [
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: [
          'rgba(42, 238, 140, 0.5)',
          'rgba(42, 238, 140, 0.5)',
          'rgba(42, 238, 140, 0.5)',
          'rgba(42, 238, 140, 0.5)',
          'rgba(42, 238, 140, 0.5)',
          'rgba(42, 238, 140, 0.5)'
        ],
        borderColor: [
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)',
          'rgba(19, 25, 25, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, ChartObj);

}

// EVENT HANDLERS

function handleClick(event) {
  voteCount--;

  let itemClicked = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (itemClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderPhotos();

  if (voteCount === 0) {
    imgCatalog.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {
  if (voteCount === 0) {
    renderChart();
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// EVENT LISTENERS

imgCatalog.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);