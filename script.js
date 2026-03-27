function main() {
    // array com as imagens
    const listImages = [
        'apollo.png',
        'avocado.png',
        'cookies.jpg',
        'dog.png',
        'eagle.jpg',
        'house.jpg',
        'juman.jpg',
        'man.png',
        'parrots.jpg',
        'senac.png'
    ]

    // função para embaralhar o array
    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [array[i], array[j]] = [array[j], array[i]]; // Destructuring (trocando elementos de lugar)
        }

        return array;
    }

    // duplicando as imagens para criar os pares
    const paresImagens = [...listImages, ...listImages];

    // embaralhando as imagens
    const imagensProntas = embaralharArray(paresImagens);

    // selecinando a div pai que receberá as cartas
    const tabuleiro = document.getElementById('tabuleiro');

    // Renderização dinâmica das cartas 
    imagensProntas.forEach((nomeImagem, index) => {
        const cardHTML = `
        <div class="card-container" onclick="revelar(this)">
            <img src="assets/interrog.png" alt="interrogation" id="btn-interrog" class="img-game btn-interrog">
            <img src="assets/${nomeImagem}" alt="${nomeImagem}" id="${nomeImagem}" class="img-game target hidden">
        </div>
        `;

        tabuleiro.innerHTML += cardHTML
    })

}

// função para revelar a imagem
let cardSave = ''; // Guarda o ID para comparação
let primeiraCarta = null; // Guarda a referência da primeira carta clicada
let trancaMaisCarta = false; // Impede que o usuário clique em mais de duas cartas
let contagem = 0;

function revelar(container) {
    // Trava de segurança: Se o usuário clicar na carta que tá aberta ou mais de uma vez, ignore.
    if (container === primeiraCarta || trancaMaisCarta) {
        return;
    }

    const interrog = container.querySelector("#btn-interrog");
    const target = container.querySelector(".target");

    if (cardSave === '') {
        cardSave = target.id;
        primeiraCarta = container;

        interrog.classList.add("hidden");
        target.classList.remove("hidden");

    } else {
        // ACERTOU
        if (cardSave === target.id) {
            interrog.classList.add("hidden");
            target.classList.remove("hidden");

            cardSave = '';
            primeiraCarta = null;

        } else {
            // ERROU
            interrog.classList.add("hidden");
            target.classList.remove("hidden");
            trancaMaisCarta = true;


            setTimeout(() => {
                const interrogAll = document.querySelectorAll(".btn-interrog");
                const targetAll = document.querySelectorAll(".target");

                targetAll.forEach(target => {
                    target.classList.add("hidden");
                });

                interrogAll.forEach(interrog => {
                    interrog.classList.remove("hidden");
                });

                cardSave = '';
                primeiraCarta = null;
                trancaMaisCarta = false;

            }, 1200)
        }
    }
}

main();

