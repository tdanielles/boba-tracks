const makeBbtBtn = document.getElementById('makeBbtBtn');

const formContainer = document.getElementById('formContainer');
const submitBtn = document.getElementById('submitBtn');

const exceededBox = document.getElementById('limitExceeded');
const exceededText = document.getElementById('number');
const continueBtn = document.getElementById('continueBtn');
const backBtn = document.getElementById('backBtn');
const enjoy = document.getElementById('enjoy');

const overlay = document.getElementById('overlay');
const makeBbtForm = document.getElementById('makeBbtForm');

const totalCaloriesText = document.getElementById('totalCalories');
const averageCalories = document.getElementById('averageCalories');
const explanation = document.getElementById('explanation');

function openFormContainer() {
  closeExceededWarning();
  makeBbtForm.reset();
  formContainer.classList.add('active');
  overlay.classList.add('active');
}

function closeFormContainer() {
  formContainer.classList.remove('active');
  overlay.classList.remove('active');
}

function showExceededWarning(totalCalories) {
  exceededBox.classList.add('active');
  exceededText.textContent = `${totalCalories}`;
  continueBtn.addEventListener('click', showEnjoyBbt);
  backBtn.addEventListener('click', openFormContainer);
}

function closeExceededWarning() {
  exceededBox.classList.remove('active');
}

function showEnjoyBbt() {
  exceededBox.classList.remove('active');
  enjoy.classList.add('active');
  setTimeout(() => {
    enjoy.classList.remove('active');
  }, 1000);
}

// THE MATH
function getFlavourChoiceFromInput() {
  const flavourChoice = document.querySelector('input[name="flavourOptions"]:checked').value;
  return flavourChoice;
}

function getToppingChoiceFromInput() {
  const toppingChoice = document.querySelector('input[name="toppingOptions"]:checked').value;
  return toppingChoice;
}

function getSugarLevelsFromInput() {
  const sugarLevels = document.querySelector('input[name="sugarLevels"]:checked').value;
  return sugarLevels;
}

function getTotalCalories(e) {
  e.preventDefault();
  const flavourChoice = document.querySelector('input[name="flavourOptions"]:checked').value;
  const toppingChoice = document.querySelector('input[name="toppingOptions"]:checked').value;
  const sugarLevels = document.querySelector('input[name="sugarLevels"]:checked').value;

  var caloriesOne;
  if(flavourChoice=="pearl") {
    caloriesOne = 200;
  } else if(flavourChoice=="regular"){
    caloriesOne = 180;
  } else if(flavourChoice=="brownsugar") {
    caloriesOne = 290;
  } else if(flavourChoice=="mango") {
    caloriesOne = 110;
  } else if(flavourChoice=="oreo") {
    caloriesOne = 210;
  } else {
    caloriesOne = 85;
  }

  var caloriesTwo;
  if(toppingChoice=="pearls") {
    caloriesTwo = 272;
  } else if(toppingChoice=="glassjelly") {
    caloriesTwo = 75;
  } else if(toppingChoice=="strawberrypopping") {
    caloriesTwo = 85;
  } else {
    caloriesTwo = 212;
  }

  var caloriesThree;
  if(sugarLevels=="full") {
    caloriesThree = 135;
  } else if(sugarLevels=="seventy") {
    caloriesThree = 94.5;
  } else if(sugarLevels=="fifty") {
    caloriesThree = 67.5;
  } else {
    caloriesThree = 40.5;
  }

  totalCalories = caloriesOne + caloriesTwo + caloriesThree;
  totalCaloriesText.textContent = `Total Calories: ${totalCalories} cal.`;
  averageCalories.textContent = "Average Calories: 610 cal."


  if(totalCalories > 610) {
    showExceededWarning(totalCalories);
    explanation.textContent = "Your bubble tea calorie count is more than the average!";
  } else {
    explanation.textContent = "Your bubble tea calorie count is lower than the average!";
    showEnjoyBbt();
  }

  closeFormContainer();
  
}

makeBbtBtn.addEventListener('click', openFormContainer);
overlay.addEventListener('click', closeFormContainer);
makeBbtForm.addEventListener('submit', getTotalCalories);