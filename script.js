const wordIndicator = document.getElementById("word");
const attemptsIndicator = document.getElementById("attempts-indicator");
const keys = document.getElementsByClassName("key");
const newGameBtn = document.getElementById("newgame");

const wordList = [
    "maca","banana","laranja","uva","melancia","melao","pessego","pera","ameixa","cereja",
    "manga","limao","lima","abacaxi","coco","kiwi","morango","framboesa","amora","mirtilo",
    "carro","caminhao","bicicleta","moto","aviao","trem","navio","barco","onibus","metro", "marimbondo",
    "rua","estrada","ponte","tunel","cidade","vila","bairro","pais","capital","estado", "molibdenio", "olheiro",
    "casa","apartamento","predio","escritorio","escola","universidade","biblioteca","museu","hospital","mercado",
    "computador","teclado","mouse","tela","celular","tablet","camera","alto-falante","microfone","impressora",
    "livro","papel","caneta","lapis","caderno","pasta","documento","carta","mensagem","email", "jaguara",
    "sol","lua","estrela","ceu","mar","rio","montanha","floresta","chuva","vento", "guri", "gaucho"
]

function randomWord() {
    const random = wordList[Math.floor(Math.random() * wordList.length)];
    return random;
}

let attempts = 6;
let letters = randomWord().split("");
let hiddenWord = new Array(letters.length).fill("_");
wordIndicator.textContent = hiddenWord.join("");

newGameBtn.addEventListener("click", () => {
    attempts = 6;
    attemptsIndicator.textContent = attempts;
    letters = randomWord().split("");
    hiddenWord = new Array(letters.length).fill("_");
    wordIndicator.textContent = hiddenWord.join("");

    for (const key of keys) {
        key.classList.remove("used");
    }
})

function showLetter(attempt) {
    const indexes = letters.map((v, i) => v == attempt ? i : -1).filter(i => i != -1);
    
    for (const idx of indexes) {
        hiddenWord[idx] = attempt;
    }

    wordIndicator.textContent = hiddenWord.join("");
}

function showWord() {
    wordIndicator.textContent = letters.join("");
}

for (const key of keys) {
    key.addEventListener("click", () => {

        if (key.classList.contains("used")) return;
        const attempt = key.textContent;
        
        key.classList.add("used");

        if (letters.includes(attempt)) {
            showLetter(attempt);
        }
        else {
            attempts--;
        }

        if (attempts <= 0) {
            showWord();
        }

        attemptsIndicator.textContent = attempts;
    })

}
