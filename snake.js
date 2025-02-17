const fild = document.querySelector('.game');
const color = ['red', 'blue', 'green', 'orange'];
let result = Array.from(document.querySelectorAll('.result'));
result[1].innerText = window.localStorage.getItem('value');
// window.localStorage.clear()

//переменная для изменения сетки игрового поля. Если сразу установить число, тогда срабатывает сразу без перезагрузки
let num = window.sessionStorage.getItem('num') == null ? 10 : window.sessionStorage.getItem('num');
console.log(num);
setKubeNavigation()

//ф-ция выбора сетки 
function setKubeNavigation() {
    const input = Array.from(document.getElementsByClassName('inputKube'));
    if (num == 10) {
        input[0].setAttribute('checked', 'checked')
        input[0].checked = true; 
    } else if (num == 20) {
        input[1].setAttribute('checked', 'checked')
        input[1].checked = true; 
    }
    
    input.forEach(value => {
        value.addEventListener('click', function(event) {
            if (value.checked) {
                input.forEach((index) => {
                    index.removeAttribute('checked');
                    index.checked = false;
                })
            } 
            
            value.setAttribute('checked', 'checked')
                value.checked = true;
            if (input[0].hasAttribute('checked')) {
                num = 10;
                console.log('num', num);
                window.sessionStorage.setItem('num', 10);
                input[0].click()  
                // event.preventDefault()
            } else if (input[1].hasAttribute('checked')) {
                num = 20;
                console.log('num', num);
                window.sessionStorage.setItem('num', 20);
                input[1].click()
                // event.preventDefault()
            }    
            
        })
    })
}

// создаём кубы игравого поля через класс
class Filds {
    constructor(coordinatesX, coordinatesY) {
        this.coordinatesX = coordinatesX;
        this.coordinatesY = coordinatesY
    }

    fildSize() {
        let size = this.coordinatesX * this.coordinatesY;
        for (let i = 1; i <= size; i++) {
            const createFildCube = document.createElement('div');
            fild.appendChild(createFildCube);
            if (num == 10) {
                createFildCube.classList.add('kube');
            } else if (num == 20) {
                createFildCube.classList.add('kubeMax');
            }          
        }
    }
}



const gameFilds = new Filds(num, num);
gameFilds.fildSize()


// присваиваем кубу атрибуты с координатами
function setPosition() {  

    let x = 1, y = num;
    let newNum = num * num;
    for (let i = 0; i < newNum; i++) {
        if (x > num) {
            x = 1;
            y--;
        }
        if (num == 10) {
            const kube = document.querySelectorAll('.kube');
            kube[i].setAttribute('data-X', x);
            kube[i].setAttribute('data-Y', y);
            x++;  
        } else {
            const kubeMax = document.querySelectorAll('.kubeMax');
            kubeMax[i].setAttribute('data-X', x);
            kubeMax[i].setAttribute('data-Y', y);
            x++; 
        }
           
    }
}
setPosition() 

const Random = (max, min) => Math.floor(Math.random() * (max - min) + min);

const min = 1, max = num;
//выводим рандомно змею
function showRandomSnake() {
let randomPositionX = Random(max, min);
let randomPositionY = Random(max, 2);
return [randomPositionX, randomPositionY]
}
//console.log('showRandomSnake(): ', showRandomSnake());

class Coordinate {
    constructor(coordinates, className) { // в параметры добавляем координаты и название добавляемого класса //
        this.coordinates = coordinates;
        this.className = className;
    }
    showRadomSnake() {
        let randomeKube = [document.querySelector(`[data-X = "${this.coordinates[0]}"][data-Y = "${this.coordinates[1]}"]`), document.querySelector(`[data-X = "${this.coordinates[0]}"][data-Y = "${this.coordinates[1] - 1}"]`)];
        //console.log('randomeKube: ', randomeKube);
        for (let i = 0; i < randomeKube.length; i++){
            randomeKube[i].classList.add(this.className);
        }
        randomeKube[0].classList.add('snakeHead');
    }
    // showRadomFood() {
    //     randomeKube = [document.querySelector(`[data-X = "${this.coordinates[0]}"][data-Y = "${this.coordinates[1]}"]`)];
    //     //console.log('randomeKube: ', randomeKube);
    //     // for (let i = 0; i < randomeKube.length; i++){
    //     //     randomeKube[i].classList.add(this.className);
    //     // }
    //     // randomeKube[0].classList.add('snakeHead');
    // }
}

const showSnake = new Coordinate(showRandomSnake(), 'snakeBody'); 
showSnake.showRadomSnake()   //выводим на экран змею

let snakeBody = Array.from(document.querySelectorAll('.snakeBody'));
let snakeHead = document.querySelector('.snakeHead'); 
// let food = document.querySelector('.food');
let interval;

function assClass() {
    snakeBody[0].classList.add('snakeHead');
    for (let i = 0; i < snakeBody.length - 1; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
}

//выводим на экран еду
let food;
function getRandomFood() {
    let randomPositionFood = showRandomSnake();
    food = document.querySelector(`[data-X = "${randomPositionFood[0]}"][data-Y = "${randomPositionFood[1]}"]`);
    
    //сравниваваем координаты классов еды и змеи, если координаты совпадают, еще раз перезапускаем еду
    if (food.classList.contains('snakeBody')) {
        let randomPositionFood = showRandomSnake();
        food = document.querySelector(`[data-X = "${randomPositionFood[0]}"][data-Y = "${randomPositionFood[1]}"]`);
    }
    food.classList.add('food')
}
    
getRandomFood()

let direction = "ArrowUp"; // если эту переменную создаем в функции события, тогда она при каждом нажатии перезаписывается заново
    
// управление на стрелках    

  let stop = false;  

// console.log(snakeBody);

function move() {    
    const coordinatesSnake = [snakeBody[0].getAttribute('data-X'), snakeBody[0].getAttribute('data-Y')];   
    
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');  
    snakeBody.pop();
                        
    if (direction == 'ArrowUp') {
        
        if (coordinatesSnake[1] < num) {
            snakeBody.unshift(document.querySelector('[data-X = "' + coordinatesSnake[0] + '"][data-Y = "' + (+coordinatesSnake[1] + 1) + '"]'));
            // console.log('snakeBody2: ', snakeBody);  
        } else {
            snakeBody.unshift(document.querySelector('[data-X = "' + coordinatesSnake[0] + '"][data-Y = "1"]'));
        }   
        
    } 
    if (direction == 'ArrowDown') {
        
        if (coordinatesSnake[1] > 1) {
            snakeBody.unshift(document.querySelector('[data-X = "' + coordinatesSnake[0] + '"][data-Y = "' + (+coordinatesSnake[1] - 1) + '"]'));
            // console.log('snakeBody2: ', snakeBody);  
        } else {
            snakeBody.unshift(document.querySelector('[data-X = "' + coordinatesSnake[0] + '"][data-Y = "' + num + '"]'));
        }
            
    }
    if (direction == 'ArrowLeft') {
        
        if (coordinatesSnake[0] > 1) {
            snakeBody.unshift(document.querySelector('[data-X = "' + (+coordinatesSnake[0] - 1) + '"][data-Y = "' + coordinatesSnake[1] + '"]'));
            // console.log('snakeBody2: ', snakeBody);  
        } else {
            snakeBody.unshift(document.querySelector('[data-X = "'+ num +'"][data-Y = "' + coordinatesSnake[1] + '"]'));
        } 
       
    } 
    if (direction == 'ArrowRight') {
        
        if (coordinatesSnake[0] < num) {
            snakeBody.unshift(document.querySelector('[data-X = "' + (+coordinatesSnake[0] + 1) + '"][data-Y = "' + coordinatesSnake[1] + '"]'));
            // console.log('snakeBody2: ', snakeBody);  
        } else {
            snakeBody.unshift(document.querySelector('[data-X = "1"][data-Y = "' + coordinatesSnake[1] + '"]'));
        } 
    }

    //устанавливаем, что должно произойти если змея коснется саму себя
    if (snakeBody[0].classList.contains('snakeBody')) {
        gameOver()
    }
    
    snakeBody[0].classList.add('snakeHead');
    for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
    }
    addinfBodeSnake() //функция, срабатывает когда змея съела и прибавляет ддлину
    ateFood() //сработает, для того что бы заново появилась еда
    stop = true; // нужно, что бы кнопки направления сразу не сработали 
}


const buttonStart = document.querySelector('.buttonStart');
const restart = document.querySelector('.buttonRestart');
const getDifficultyLevel = document.querySelector('.difficultyLevel'); // поиск блока выбора сложности
// кнопка play
buttonStart.addEventListener('click', function() {
    interval = setInterval(move, complexity);
    buttonStart.classList.remove('active');
    restart.classList.add('active');
    getDifficultyLevel.setAttribute('hidden', 'hidden'); // добавляем атрибут, для того что бы панель выбора сложности выкл
});



//запуск по кнопки enter
window.addEventListener('keydown', function (e) {
    let key = e.key;
    // console.log('key', key);
    if (key === 'Enter') { // код клавиши Enter
      buttonStart.click();
    }
  });

restart.addEventListener('click', function() {
    location.reload()
    num = window.sessionStorage.getItem('num')
});


// записывает нажатия кнопки направления в переменную, для того что бы нельзя было резко поменять направление на противоположное
window.addEventListener('keydown', function(e) {
    if (stop == true) {
        if (e.key == "ArrowUp" && (direction != 'ArrowDown')) {
            // console.log('e.key : ', e.key );
            direction = 'ArrowUp';
            stop = false;
            // console.log('true: ', true);
        } else if (e.key == "ArrowDown" && (direction != 'ArrowUp')) {
            // console.log('e.key: ', e.key);
            // console.log('true: ', true);
            direction = 'ArrowDown';
            stop = false;
        } else if (e.key == "ArrowLeft" && direction != ('ArrowRight')) {
            // console.log('e.key: ', e.key);
            // console.log('true: ', true);
            direction = 'ArrowLeft';
            stop = false;
        } else if (e.key == "ArrowRight"  && direction != ('ArrowLeft')) {
            // console.log('e.key: ', e.key);
            // console.log('true: ', true);
            direction = 'ArrowRight';
            stop = false;
        }
    }    
})

// после того как съела еду. Еда должна появиться заново

function ateFood() {
    const food = document.querySelector('.food');
    const snakeHead = document.querySelectorAll('.snakeHead');
    
    if ((snakeHead[0].getAttribute('data-X') == food.getAttribute('data-X')) && (snakeHead[0].getAttribute('data-Y') == food.getAttribute('data-Y'))) {
        // console.log('ЗАШЁЛ');
        food.classList.remove('food');
        getRandomFood()
        addinfBodeSnake()
        showResult()
    }
}

// ф-ция сработает, когда змея съест еду
function addinfBodeSnake() {
    const food = document.querySelector('.food');
    if ((snakeBody[0].getAttribute('data-X') == food.getAttribute('data-X')) && (snakeBody[0].getAttribute('data-Y') == food.getAttribute('data-Y'))) {
        let a = snakeBody[snakeBody.length - 1].getAttribute('data-X');
        let b = snakeBody[snakeBody.length - 1].getAttribute('data-Y');
        snakeBody.push(document.querySelector('[data-X = "' + a + '"][data-Y = "' + b + '"]'));
        // console.log('ПРОВЕРЬ!!!!!!!!: ', snakeBody);   
    }
}

// конец игре
function gameOver() {
    clearInterval(interval);
    snakeBody[0].classList.add('gameOver');
    setTimeout(() => {
    fild.innerHTML = `<p class="gameOverText">Игра ОКОНЧЕНА!!!</p>`;    
    }, 3000);
    setInterval(() => {
        const Text = document.querySelector('.gameOverText');
        let i = 0;
        Text.style.color = color[i == color.length-1 ? 0 : i++];
    }, 300);
    getDifficultyLevel.removeAttribute('hidden'); // удаляем атрибут, для того что бы панель выбора сложности вкл
}

// показываем счёт
function showResult() {
    let i;
    for (i = 1; i < snakeBody.length - 1; i++) {
        result[0].innerText = +i;
        if (+result[1].innerText < +result[0].innerText) {
            window.localStorage.setItem('value', `${+result[0].innerText}`);
            // console.log('Вход');
            result[1].innerText = window.localStorage.getItem('value');
        }
    }
}

// ф-ция выбора сложности
function difficultyLevel() {
    const input = Array.from(document.getElementsByClassName('input'));
    input.forEach((value) => {
        
        value.addEventListener('click', function() {
            console.log(value.checked);
            if (value.checked) {
                input.forEach((index) => {
                    index.removeAttribute('checked');
                    index.checked = false;
                })
            } 
            value.setAttribute('checked', 'checked')
            value.checked = true;
            if (input[0].hasAttribute('checked')) {
                complexity = 500;
            } else if (input[1].hasAttribute('checked')) {
                // console.log('22222');
                complexity = 120;
            } else if (input[2].hasAttribute('checked')) {
                complexity = 80;
            }
        })
    })
}

difficultyLevel()

var complexity = 200; // сложность по умолчанию

const formBtn = document.querySelector('.form__btn');

formBtn.addEventListener('click', function() {
    getDifficultyLevel.setAttribute('hidden', 'hidden'); // добавляем атрибут, для того что бы панель выбора сложности выкл при нажатии на кнопку
})



