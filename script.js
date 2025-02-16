const playingField = document.querySelector('.playingField');
const menuResult = document.querySelector('.menuResult');
const btnStart = document.querySelector('.buttonStart');
const btnRestart = document.querySelector('.buttonRestart.buttonStart');
const gameFild = document.querySelector('.game')

btnStart.addEventListener('click', () => {
    btnStart.classList.remove('active');
    btnRestart.classList.add('active');
})

// создаём квадраты в зоне игры квадраты по 30px 400шт
const getPlayningFild = (() => {
    for (let i = 1; i <= 400; i++) {
        let excel = document.createElement('div');
        gameFild.appendChild(excel);
        excel.classList.add('excel');
        excel.dataset.name = `${i}`;
    }
})()

//присваивам квадратам позицию
function getPosition() {
    let x = 1, y = 20;
    const positions = document.querySelectorAll('.excel');

    Array.from(positions)
    .forEach((item, index) => {
        if (x > 20) {
                x = 1;
                y--;
            }
            positions[index].setAttribute('posX', x);
            positions[index].setAttribute('posY', y);
            x++; 
    })
    // Тоже самое только через for!!!
    // for (let i = 0; i < 400; i++) {
    //     if (x > 20) {
    //         x = 1;
    //         y--;
    //     }
    //     positions[i].setAttribute('posX', x);
    //     positions[i].setAttribute('posY', y);
    //     x++; 
    // }
}

getPosition();

const random = (max, min) => Math.floor(Math.random() * (max - min) + min); 

// рандомные координаты для появления
function showRandomSnake() {
    let posX = random(20, 1);
    let posY = random(20, 1);
    return [posX, posY];
}

// ищем наш квадра с рандомными координатаами по атрибутам и добавляем класс

class Coord {
    constructor() {

    }

}


function coordinate() {
    let coordinatesSnake = showRandomSnake();
    let snake = [document.querySelector(`[posx = "${coordinatesSnake[0]}"][posy = "${coordinatesSnake[1]}"]`)];
    for (let i = 0; i < snake.length; i++){
        snake[i].classList.add('snakeBody');
    }
    snake[0].classList.add('snakeHead');
    console.log(snake);  
    //рандомно располагаем пищу
    food();
    function food() {
        let coordinatesFood = showRandomSnake();
        let foods = [document.querySelector(`[posx = "${coordinatesFood[0]}"][posy = "${coordinatesFood[1]}"]`)];
        foods[0].classList.add('food');

        for (let i = 0; i < snake.length; i++) {
            if (foods == this.snake || foods[0] == snake[i]) food();
        }    
    }
    
}

coordinate();




// пришлось создаввать функцию навигации, потому что массив с каждым нажатием клавиши перезаписывался
function navigation() {
    
    let direction = [ ];
    document.addEventListener('keydown', function(event) {
    const snakeBody = Array.from(document.querySelectorAll('.snakeBody'));
  
    
    console.log('snakeBody: ', snakeBody);
    
    let snakeCoordinatesBody =  [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    console.log('snakeCoordinatesBody : ', snakeCoordinatesBody );
    snakeBody[0].classList.remove('snakeBody');
    snakeBody[snakeBody.length - 1].remove('snakeBody');
    snakeBody.pop();

    const key = event.key;   
    
    if ('ArrowLeft' === key && (direction[0] != "right")) {
        direction.unshift('left');
        console.log('влево');
        console.log(direction);
        direction.splice(1, 3);  // удаляем элементы из массива, что бы он не заполнялся

        if (snakeCoordinatesBody[0] > 1) {
            snakeBody.unshift(document.querySelector('[posx = "' + (snakeCoordinatesBody[0] - 1) + '"][posy = "' + (snakeCoordinatesBody[1]) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posx = "20"][posy = "' + (snakeCoordinatesBody[1]) + '"]'));
        }
        
        console.log(snakeBody);
        snakeBody[0].classList.add('snakeBody');
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }

        
    } else if ('ArrowRight' === key && (direction[0] != "left")) {
        direction.unshift('right');
        console.log('вправо');
        console.log(direction);
        direction.splice(1, 3);
        if (snakeCoordinatesBody[0] < 20) {
            snakeBody.unshift(document.querySelector('[posx = "' + (snakeCoordinatesBody[0] + 1) + '"][posy = "' + (snakeCoordinatesBody[1]) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posx = "1"][posy = "' + (snakeCoordinatesBody[1]) + '"]'));
        }
        console.log(snakeBody);
        snakeBody[0].classList.add('snakeBody');
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }

    } else if ('ArrowUp' === key && (direction[0] != "down")) {
        direction.unshift('up');
        console.log('вверх');
        console.log(direction);
        direction.splice(1, 3);
    } else if ('ArrowDown' === key && (direction[0] != "up")) {
        direction.unshift('down');
        console.log('вниз');
        console.log(direction);
        direction.splice(1, 3);
    }
    
    })
}
navigation()





