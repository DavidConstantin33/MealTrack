const acc1 = {
    name: 'Constantin David',
    username: '1',
    password: '11',
};

const acc2 = {
    name: 'Pana Cristina',
    username: 'CrissT',
    password: 'motonel123',
};

const accs = { acc1, acc2 };

//////////////Circle
let kcal = 0;
let circumference;
const circle = document.querySelector('.progress-circle');

if (circle) {
    const radius = circle.getAttribute('r');

    if (radius) {
        circumference = 2 * Math.PI * parseFloat(radius);
        const maintainValue = (kcal / 2000) * 100;
        const dasharrayValue = `${circumference} ${circumference}`;
        const dashoffsetValue = circumference - (maintainValue / 100) * circumference;

        circle.setAttribute('stroke-dasharray', dasharrayValue);
        circle.setAttribute('stroke-dashoffset', dashoffsetValue);
    } else {
        console.log('SVG circle element does not have a valid radius.');
    }
} else {
    console.log('SVG element with class .progress-circle not found.');
}

///////////////Variables
const app = document.querySelector('.app');
const modal = document.querySelector('.modal');
const loginWindow = document.querySelector('.login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const welcomeBack = document.getElementById('welcome');
const displayTotalKcal = document.getElementById('kcalTotal');
const displayKcalLeft = document.getElementById('kcalLeft');
const addMealBtn = document.getElementById('addMeal');
const mealName = document.getElementById('mealName');
const mealKcal = document.getElementById('mealKcal');
const mealsContainer = document.getElementById('meals');
const loseBtn = document.getElementById('burnBtn');
const maintainBtn = document.getElementById('maintainBtn');
const bulkBtn = document.getElementById('bulkBtn');
resetBtn = document.getElementById('reset');
let ateKcal = 0;
let currentKcal = 0;
let totalKcal = 0;
const result = document.getElementById('total');
////////////////////////////////////////////////
////////////////////////////////////////////////

///Functions

const resetMeals = function () {
    while (mealsContainer.firstChild) {
        mealsContainer.removeChild(mealsContainer.firstChild);
    }
    kcal = 0;
    ateKcal = 0;
    totalKcal = 0;
    displayTotalKcal.textContent = `Total Calories: ${totalKcal} kcal`;
    displayKcalLeft.textContent = `You ate ${totalKcal} kcal`;
};
const diff = function (ateKcal, totalKcal) {
    return totalKcal - ateKcal;
}

const login = function () {
    loginWindow.classList.add('hide');
    app.classList.remove('hide');
}

const updateCircle = function () {
    const percent = (ateKcal / totalKcal) * 100;
    const dashoffsetValue = circumference - (percent / 100) * circumference;
    circle.setAttribute('stroke-dashoffset', dashoffsetValue);
};

const updateCalorieDisplay = function (currentKcal) {
    ateKcal += currentKcal;
    updateCircle();
    displayTotalKcal.textContent = `Total Calories: ${totalKcal} kcal`;
    displayKcalLeft.textContent = `You ate ${ateKcal} kcal`;
}

const openModal = function () {
    app.classList.add('hide');
    modal.classList.remove('hide');
}

const reset = function() {
    modal.classList.add('hide');
    app.classList.remove('hide');
    resetMeals();
}

const finish = function () {
    if (ateKcal >= totalKcal) {
        displayTotalKcal.textContent = `Total Calories: ${totalKcal} kcal`;
        displayKcalLeft.textContent = `You ate ${totalKcal} kcal`;
        openModal();
        let difference = diff(ateKcal, totalKcal);
        result.textContent = `You ate ${Math.abs(difference)} calories ${difference >= 0 ? 'above' : 'above'} your plan (${totalKcal})`;
    }
}

function addMeal() {
    const mealNameValue = mealName.value.trim();
    const currentKcal = parseInt(mealKcal.value);

    console.log("mealNameValue:", mealNameValue);
    console.log("mealKcalValue:", currentKcal);

    if (mealNameValue !== '' && !isNaN(currentKcal)) {
        const newMealSection = document.createElement('div');
        newMealSection.classList.add('meals');

        const mealContent = document.createElement('p');
        mealContent.textContent = `${mealNameValue} - ${currentKcal} kcal`;

        newMealSection.appendChild(mealContent);
        mealsContainer.appendChild(newMealSection);


        updateCalorieDisplay(currentKcal);
        finish();
        mealName.value = '';
        mealKcal.value = '';

    } else {
        console.log("Meal input is not valid. Check values:", mealNameValue, currentKcal);
    }
}

// Event listeners
loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    for (const acc of Object.values(accs)) {
        if (acc.username === usernameInput.value && acc.password === passwordInput.value) {
            ///Login
            login();
            ///Compute User
            const firstName = acc.name.trim().split(' ')[1];
            welcomeBack.textContent = `Welcome back, ${firstName}`;
        }
    }
})

addMealBtn.addEventListener('click', addMeal);

loseBtn.addEventListener('click', function () {
    totalKcal = 1800;
    displayTotalKcal.textContent = `${totalKcal} kcal`;
    updateCalorieDisplay(currentKcal);
});

maintainBtn.addEventListener('click', function () {
    totalKcal = 2000; // Adjust this value as needed
    displayTotalKcal.textContent = `${totalKcal} kcal`;
    updateCalorieDisplay(currentKcal);

});

bulkBtn.addEventListener('click', function () {

    totalKcal = 2500; // Adjust this value as needed
    displayTotalKcal.textContent = `${totalKcal} kcal`;
    updateCalorieDisplay(currentKcal);
});

resetBtn.addEventListener('click', reset);