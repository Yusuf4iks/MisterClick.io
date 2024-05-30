let coins = 0;
let incomePerSecond = 0;
let PerClick = 1;
let currentLevel = 1;
let PlusOne = 1;
const maxLevels = 9;
const levelThresholds = [0, 1000, 5000, 50000, 100000, 1000000, 25000000, 100000000, 1000000000];
const ranks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Epic', 'Legendary', 'Master', 'Grandmaster'];

const coinElement = document.getElementById('coins');
const incomeElement = document.getElementById('income');
const clickArea = document.getElementById('click-area');
const procenttElement = document.querySelector('.procentt');
const rankElement = document.querySelector('h3.class');
const levelElement = document.querySelector('p.classLvl span');

// Функция для загрузки сохраненных значений или установки начальных значений
function loadGameState() {
    coins = parseInt(localStorage.getItem('coins')) || 0;
    PerClick = parseInt(localStorage.getItem('PerClick')) || 1;
    PlusOne = parseInt(localStorage.getItem('PlusOne')) || 1;

    updateLevelAndRank();  // Обновить уровень и ранг на основе загруженных данных
    coinElement.textContent = coins;
    updateProgressBar();
}

// Функция для сохранения текущего состояния игры в localStorage
function saveGameState() {
    localStorage.setItem('coins', coins.toString());
    localStorage.setItem('PerClick', PerClick.toString());
    localStorage.setItem('PlusOne', PlusOne.toString());
}

function clearGameState() {
    localStorage.removeItem('coins');
    localStorage.removeItem('PerClick');
    localStorage.removeItem('PlusOne');
}

// Добавить вызов функции загрузки состояния при загрузке страницы
document.addEventListener('DOMContentLoaded', loadGameState);

setInterval(saveGameState, 10000);

clickArea.addEventListener('click', (event) => {
    coins+=PerClick;
    coinElement.textContent = coins;

    if(PlusOne == 1){
        // Создать элемент h2 с текстом +1
        const plusOneH2 = document.createElement('h2');
        plusOneH2.textContent = '+'+PerClick;
        plusOneH2.classList.add('plus-one');
        document.body.appendChild(plusOneH2);

        // Установить положение элемента h2
        plusOneH2.style.left = `${event.clientX}px`;
        plusOneH2.style.top = `${event.clientY}px`;

        // Анимация движения вверх и исчезновения
        setTimeout(() => {
            plusOneH2.style.opacity = '0';
        plusOneH2.style.color = 'white';
            plusOneH2.style.transform = 'translateY(-100px)';
        }, 10);

        // Удалить элемент h2 после завершения анимации
        setTimeout(() => {
            plusOneH2.remove();
        }, 650);
    
        // Получить размеры и положение области клика
        const rect = clickArea.getBoundingClientRect();
        const x = event.clientX - rect.left; // Координата X внутри области клика
        const y = event.clientY - rect.top;  // Координата Y внутри области клика

        // Определить угол наклона
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -30; // Наклон в сторону клика по оси X
        const rotateY = ((x - centerX) / centerX) * 30;  // Наклон в сторону клика по оси Y

        clickArea.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Вернуть кружок в исходное положение
        setTimeout(() => {
            clickArea.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }, 100);

        // Обновить ширину псевдоэлемента ::after
        saveGameState();
        updateProgressBar();
    }
});

function updateProgressBar() {
    const maxClicks = levelThresholds[currentLevel];
    const percentage = (coins / maxClicks)*100;
    procenttElement.style.setProperty('--progress-width', `${percentage}%`);
    procenttElement.style.transition = 'none';
    

    if (coins >= maxClicks) {
        if (currentLevel < maxLevels) {
            currentLevel++;
        }
        PerClick = 0;
        PlusOne = 0;
        setTimeout(() => {
            PerClick = 1;
            PlusOne = 1;
        }, 1000);
        updateLevelAndRank();
    }
}

function updateLevelAndRank() {
    rankElement.textContent = `${ranks[currentLevel - 1]} >`;
    levelElement.textContent = `${currentLevel}/9`;
    procenttElement.style.transition = 'width 0.3s';
    procenttElement.style.setProperty('--progress-width', `0%`);
    coinElement.textContent = coins;
    if(currentLevel==2){
        const circleImage = document.querySelector('.circle-image');
        circleImage.src = 'https://i.postimg.cc/qvHrsnzG/1-removebg-preview.png';
    }
}

function buyItem(item) {
    if (item === 'crypto' && coins >= 100) {
        coins -= 100;
        incomePerSecond += 1;
    } else if (item === 'exchange' && coins >= 500) {
        coins -= 500;
        incomePerSecond += 5;
    }
    coinElement.textContent = coins;
    incomeElement.textContent = incomePerSecond;
}

// Функция для накопления дохода каждую секунду
setInterval(() => {
    coins += incomePerSecond;
    coinElement.textContent = coins;
    updateProgressBar();
}, 1000); // 1000 мс = 1 секунда
