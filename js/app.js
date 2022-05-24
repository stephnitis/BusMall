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
let dataList = document.getElementById('data-list');

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
  while (indexArray.length < 3) {
    let randomNumber = randomProdIndex();
    while (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  console.log(indexArray);
  let prodOneIndex = indexArray.pop();
  let prodTwoIndex = indexArray.pop();
  let prodThreeIndex = indexArray.pop();


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

function handleShowResults(){
  if(voteCount ===0){
    for (let i =0; i < allProducts.length; i++){
      let liEl = document.createElement('li');
      liEl.textContent = `${allProducts[i].name} was selected ${allProducts[i].clicks} out of the ${allProducts[i].views} times it was displayed.`;
      dataList.appendChild(liEl);
    }
  }
}

// EVENT LISTENERS

imgCatalog.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

