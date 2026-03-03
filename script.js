const attemptsIndicator = document.getElementById("attempts");
const keys = document.querySelectorAll(".key");

const sleep = (ms) => new Promise(r => setTimeout(r, ms)); 

const getWord = (method) => {
    // TODO: not implemented
    method;
    const word = "abobora";
    return word.split("");
} 

const WORD = getWord();
const REVELEADWORD = Array.from({ length: WORD.length }).fill("_");
let attempts = 6;

const putWord = (word) => {
    const len = word.length;
    const wordlist = document.getElementById("wordlist");

    for (let i = 0; i < len; i++) {
        const e = document.createElement("p");
        wordlist.appendChild(e);
        e.classList.add("letter");
        e.textContent="_";
    }
}

const updateWord = (newWord) => {
    const len = newWord.length;
    const wordlist = document.getElementById("wordlist");

    const children = wordlist.children;
    for (let i = 0; i < len; i++) {
        children[i].textContent=newWord[i]
    }
}

const revealLetter = (letter) => {
    for (let i = 0; i < WORD.length; i++) {
        if (WORD[i] == letter) {
            REVELEADWORD[i] = letter;
        }
    }

    if (!WORD.includes(letter)) {
        if (attempts > 0)
            attempts--;
            attemptsIndicator.textContent = attempts;
    }
}

putWord(WORD);

const handleClick = (e) => { 
    const k = e.target;

    if (k.classList.contains("used")) return;
    k.classList.add("used");

    revealLetter(k.textContent);
    updateWord(REVELEADWORD);
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

