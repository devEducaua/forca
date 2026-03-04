
const attemptsIndicator = document.getElementById("attempts");
const keys = document.querySelectorAll(".key");
const newGame = document.getElementById("newgame");
const wordlist = document.getElementById("wordlist");
const editBtn = document.getElementById("edit-btn");
const modal = document.getElementById("edit-modal");
const inputForm = document.getElementById("edit-input");
const editForm = document.getElementById("edit-form");
const closeModalBtn = document.getElementById("close-modal");

editBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());
modal.close();

const getWord = () => {
    let word = "";

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

    return word.split("");
} 

let WORD = [];
let REVEALEDWORD = [];
let attempts = 6;

const parseWord = (word) => {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
        let char = word[i];

        switch (word[i]) {
            case "á":
            case "à":
            case "ã":
                char = "a";
                break;

            case "ó":
            case "õ":
                char = "o";
                break;

            case "é":
                char = "e";
                break;
            case "í":
                char = "i";
                break;
            case "ú":
                char = "u";
                break;
            case "ç":
                char = "c";
                break;
        }
        newWord += char;
    }
    return newWord;
}

WORD = getWord();

const makeRevealedWord = () => {
    const arr = [];
    for (let i = 0; i < WORD.length; i++) {
        if (WORD[i] == " ") arr.push("-");
        else arr.push("_");
    }
    return arr;
}

REVEALEDWORD = makeRevealedWord()

const resetGame = () => {
    attempts = 6;
    attemptsIndicator.textContent = attempts;
    keys.forEach((k) => k.classList.remove("used"));
    wordlist.innerHTML = "";
    WORD = getWord();
    REVEALEDWORD = makeRevealedWord();
    putWord(REVEALEDWORD);
}
newGame.addEventListener("click", resetGame);

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputForm.value.trim() == "") return;

    attempts = 6;
    attemptsIndicator.textContent = attempts;
    keys.forEach((k) => k.classList.remove("used"));
    wordlist.innerHTML = "";

    let parsed = parseWord(inputForm.value);
    console.log(parsed);

    WORD = parsed.toLowerCase().split("");
    REVEALEDWORD = makeRevealedWord()
    putWord(REVEALEDWORD);

    inputForm.value = "";
    modal.close();
})

const putWord = (word) => {
    const len = word.length;

    for (let i = 0; i < len; i++) {
        const e = document.createElement("p");
        wordlist.appendChild(e);

        e.classList.add("letter");

        e.textContent=word[i];
    }
}

putWord(REVEALEDWORD);

const updateWord = (newWord) => {
    const len = newWord.length;

    const children = wordlist.children;
    for (let i = 0; i < len; i++) {
        children[i].textContent=newWord[i]
    }
}

const revealLetter = (letter) => {
    for (let i = 0; i < WORD.length; i++) {
        if (WORD[i] != " ") {
            if (WORD[i] == letter) {
                REVEALEDWORD[i] = letter;
            }
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
    if (attempts == 0) return;
    updateWord(REVEALEDWORD);
}

keys.forEach((k) => {
    k.addEventListener("click", handleClick);
})

document.addEventListener("keydown", (e) => {
    if (modal.open) return;
    const key = e.key.toLowerCase();
 
    keys.forEach((k) => {
        if (key == k.textContent) k.click();
    })
})
