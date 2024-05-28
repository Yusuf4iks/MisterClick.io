let coins = 0;
let incomePerSecond = 0;
const coinElement = document.getElementById('coins');
const incomeElement = document.getElementById('income');
const clickArea = document.getElementById('click-area');
const plusOneElement = document.getElementById('plus-one');

clickArea.addEventListener('click', (event) => {
    coins++;
    coinElement.textContent = coins;

    // Показать анимацию "+1"
    plusOneElement.style.left = `${event.clientX - clickArea.getBoundingClientRect().left}px`;
    plusOneElement.style.top = `${event.clientY - clickArea.getBoundingClientRect().top}px`;
    plusOneElement.classList.remove('animate');
    void plusOneElement.offsetWidth; // Перезапуск анимации
    plusOneElement.classList.add('animate');

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
});

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
}, 1000); // 1000 мс = 1 секунда
