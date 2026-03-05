
const attemptsIndicator = document.getElementById("attempts");
const keys = document.querySelectorAll(".key");
const newGameBtn = document.getElementById("newgame");
const wordlist = document.getElementById("wordlist");
const editBtn = document.getElementById("edit-btn");
const modal = document.getElementById("edit-modal");
const inputForm = document.getElementById("edit-input");
const editForm = document.getElementById("edit-form");
const closeModalBtn = document.getElementById("close-modal");

editBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());
modal.close();

const state = {
    word: [],
    revealed: [],
    attempts:  6
}

const getRandomWord = () => {
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

state.word = getRandomWord();

const makeRevealedWord = () => {
    const arr = [];
    for (let i = 0; i < state.word.length; i++) {
        if (state.word[i] == " ") arr.push("-");
        else arr.push("_");
    }
    return arr;
}

state.revealed = makeRevealedWord()

const updateAttempts = (value) => {
    state.attempts = value;
    attemptsIndicator.textContent = state.attempts;
}

const newGame = (word) => {
    updateAttempts(6);
    keys.forEach((k) => k.classList.remove("used"));
    wordlist.innerHTML = "";
    state.revealed = makeRevealedWord();
    createWordList(state.revealed);
}

newGameBtn.addEventListener("click", () => {
    state.word = getRandomWord();
    newGame();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputForm.value.trim() == "") return;


    let parsed = parseWord(inputForm.value);
    console.log(parsed);

    state.word = parsed.toLowerCase().split("");

    newGame();

    inputForm.value = "";
    modal.close();
})

const createWordList = (word) => {
    const len = word.length;

    for (let i = 0; i < len; i++) {
        const e = document.createElement("p");
        wordlist.appendChild(e);
        e.classList.add("letter");
        e.textContent=word[i];
    }
}

createWordList(state.revealed);

const setWordList = (newWord) => {
    const len = newWord.length;

    const children = wordlist.children;
    for (let i = 0; i < len; i++) {
        children[i].textContent=newWord[i]
    }
}

const revealLetter = (letter) => {
    // do all of this in one loop
    for (let i = 0; i < state.word.length; i++) {
        if (state.word[i] != " ") {
            if (state.word[i] == letter) {
                state.revealed[i] = letter;
            }
        }
    }

    if (!state.word.includes(letter) && state.attempts > 0) {
        updateAttempts(state.attempts-1);
    }

    if (state.attempts == 0) {
        setWordList(state.word);
    }
}

const parseWord = (word) => {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
        let char = word[i];

        switch (word[i]) {
            case "á":
            case "à":
            case "ã":
            case "â":
                char = "a";
                break;

            case "ó":
            case "õ":
            case "ô":
                char = "o";
                break;

            case "é":
            case "ê":
                char = "e";
                break;

            case "í":
            case "î":
                char = "i";
                break;

            case "ú":
            case "û":
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

keys.forEach((k) => { 
    k.addEventListener("click", () => {
        revealLetter(k.textContent);
        if (state.attempts == 0) return;

        if (k.classList.contains("used")) return;
        k.classList.add("used");

        setWordList(state.revealed);
    })
})

document.addEventListener("keydown", (e) => {
    if (modal.open) return;
    const key = e.key.toLowerCase();
 
    keys.forEach((k) => {
        if (key == k.textContent) k.click();
    })
})
