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
let cardSave = '';

function revelar(container) {

    const interrog = container.querySelector("#btn-interrog");
    const target = container.querySelector(".target");

    if (interrog && target && cardSave === '') {
        interrog.classList.add("hidden");
        target.classList.remove("hidden");

        cardSave = target.id;
    } else if (cardSave !== '') {
        if (cardSave === target.id) {
            interrog.classList.add("hidden");
            target.classList.remove("hidden");
            setTimeout(() => {
                alert("Parabéns, você acertou!");

                const interrogAll = document.querySelectorAll(".btn-interrog");
                const targetAll = document.querySelectorAll(".target");

                cardSave = '';

                targetAll.forEach(target => {
                    target.classList.add("hidden");
                });

                interrogAll.forEach(interrog => {
                    interrog.classList.remove("hidden");
                });

            }, 2000);
            
            cardSave = '';
        } else {
            interrog.classList.add("hidden");
            target.classList.remove("hidden");

            setTimeout(() => {
                const interrogAll = document.querySelectorAll(".btn-interrog");
                const targetAll = document.querySelectorAll(".target");

                cardSave = '';

                targetAll.forEach(target => {
                    target.classList.add("hidden");
                });

                interrogAll.forEach(interrog => {
                    interrog.classList.remove("hidden");
                });

            }, 1200);
        }
    }


}

main();

