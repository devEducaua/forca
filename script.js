const attemptsIndicator = document.getElementById("attempts");
const keys = document.querySelectorAll(".key");
const newGame = document.getElementById("newgame");
const wordlist = document.getElementById("wordlist");

const sleep = (ms) => new Promise(r => setTimeout(r, ms)); 

const getWord = async (method) => {
    let word = "";

    if (method == "dict") {
        const url = "https://api.dicionario-aberto.net/random";
        const resp = await fetch(url);
        const result = await resp.json();
        word = result.word;
    }

    else if (method == "arr") {
        const words = [
            "maca","banana","laranja","uva","melancia","melao","pessego","pera","ameixa","cereja",
            "manga","limao","lima","abacaxi","coco","kiwi","morango","framboesa","amora","mirtilo",
            "carro","caminhao","bicicleta","moto","aviao","trem","navio","barco","onibus","metro", "marimbondo",
            "rua","estrada","ponte","tunel","cidade","vila","bairro","pais","capital","estado", "molibdenio", "olheiro",
            "casa","apartamento","predio","escritorio","escola","universidade","biblioteca","museu","hospital","mercado",
            "computador","teclado","mouse","tela","celular","tablet","camera","altofalante","microfone","impressora",
            "livro","papel","caneta","lapis","caderno","pasta","documento","carta","mensagem","email", "jaguara",
            "sol","lua","estrela","ceu","mar","rio","montanha","floresta","chuva","vento", "guri", "gaucho"
        ];

        word = words[Math.floor(Math.random() * words.length)];

    }
    return word.split("");
} 

const METHOD = "arr";
let WORD = [];
let REVEALEDWORD = [];
let attempts = 6;

WORD = await getWord(METHOD);
REVEALEDWORD = Array.from({ length: WORD.length }).fill("_");

const resetGame = async () => {
    attempts = 6;
    attemptsIndicator.textContent = attempts;
    keys.forEach((k) => k.classList.remove("used"));
    wordlist.innerHTML = "";
    WORD = await getWord(METHOD);
    REVEALEDWORD = Array.from({ length: WORD.length }).fill("_");
    putWord(WORD);
}
newGame.addEventListener("click", resetGame);

const putWord = (word) => {
    const len = word.length;

    for (let i = 0; i < len; i++) {
        const e = document.createElement("p");
        wordlist.appendChild(e);
        e.classList.add("letter");
        e.textContent="_";
    }
}

putWord(WORD);

const updateWord = (newWord) => {
    const len = newWord.length;

    const children = wordlist.children;
    for (let i = 0; i < len; i++) {
        children[i].textContent=newWord[i]
    }
}

const revealLetter = (letter) => {
    for (let i = 0; i < WORD.length; i++) {
        if (WORD[i] == letter) {
            REVEALEDWORD[i] = letter;
        }
    }

    if (!WORD.includes(letter) && attempts > 0) {
        attempts--;
        attemptsIndicator.textContent = attempts;
    }

    if (attempts == 0) {
        revealWord();
    }
}

const revealWord = () => {
    updateWord(WORD);
}

const handleClick = (e) => { 
    if (attempts == 0) return;
    const k = e.target;

    if (k.classList.contains("used")) return;
    k.classList.add("used");

    revealLetter(k.textContent);
    updateWord(REVEALEDWORD);
}

keys.forEach((k) => {
    k.addEventListener("click", handleClick);
})

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
 
    keys.forEach((k) => {
        if (key == k.textContent) k.click();
    })
})
