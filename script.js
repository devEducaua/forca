const wordIndicator = document.getElementById("word");
const attemptsIndicator = document.getElementById("attempts-indicator");
const keys = document.getElementsByClassName("key");
const newGameBtn = document.getElementById("newgame");

// const wordList = [
//     "maca","banana","laranja","uva","melancia","melao","pessego","pera","ameixa","cereja",
//     "manga","limao","lima","abacaxi","coco","kiwi","morango","framboesa","amora","mirtilo",
//     "carro","caminhao","bicicleta","moto","aviao","trem","navio","barco","onibus","metro", "marimbondo",
//     "rua","estrada","ponte","tunel","cidade","vila","bairro","pais","capital","estado", "molibdenio", "olheiro",
//     "casa","apartamento","predio","escritorio","escola","universidade","biblioteca","museu","hospital","mercado",
//     "computador","teclado","mouse","tela","celular","tablet","camera","altofalante","microfone","impressora",
//     "livro","papel","caneta","lapis","caderno","pasta","documento","carta","mensagem","email", "jaguara",
//     "sol","lua","estrela","ceu","mar","rio","montanha","floresta","chuva","vento", "guri", "gaucho"
// ]

async function getRandomWord() {
    const url = "https://api.dicionario-aberto.net/random";
    const resp = await fetch(url);
    const result = await resp.json();
    return parseWord(result.word);
}

function parseWord(word) {
    let parsedWord = "";
    const blockedLetters = new Map([
        ["á", "a"], ["é", "e"], ["í", "i"], ["ó", "o"], ["ú", "u"], ["ç", "c"]
    ]);

    for (let i = 0; i < word.length; i++) {
        let l = word[i];
        if (blockedLetters.get(word[i]) != undefined) {
            l = blockedLetters.get(word[i]);
        }

        parsedWord += l;
    }

    return parsedWord;
}

let attempts = 6;
let word = await getRandomWord();
let letters = word.split("");
// let letters = await (getRandomWord().split(""));
let hiddenWord = new Array(letters.length).fill("_");
wordIndicator.textContent = hiddenWord.join("");

newGameBtn.addEventListener("click", async () => {
    attempts = 6;
    attemptsIndicator.textContent = attempts;
    let word = await getRandomWord();
    letters = word.split("");
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
