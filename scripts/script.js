var dino = $('.dino') //Selecionar o elemento que contém a classe dino, isso é equivalente ao document.querySelector('')
    // var dino = document.querySelector('.dino');
const background = document.querySelector('.background');
$(document).keyup((e) => movimentacao(e.which)); // Esse evento escuta quais teclas foram pressionadas e soltadas no DOM, isso é equivalente ao document.addEventListener('keyup', function(param) {})
let isJumping = false;
let posicao = 0
createCactus()

function movimentacao(tecla) {
    if (tecla === 32) {
        if (!isJumping) {
            saltar();
        }

    }
}

function saltar() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (posicao >= 150) {
            clearInterval(upInterval); // Lipando o interval
            let downInterval = setInterval(() => {
                if (posicao <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    posicao -= 20
                    $('.dino').css("bottom", posicao + 'px')
                        // dino.style.bottoom = posicao + '%' -> Usando document.querySelector
                }

            }, 20)

        } else {
            posicao += 20;
            $('.dino').css("bottom", posicao + 'px')
                // dino.style.bottoom = posicao + '%'
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div')
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval)
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && posicao < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over"> Fim de jogo</h1>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20);
    setTimeout(createCactus, randomTime);
}