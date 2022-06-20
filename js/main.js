const letters = Array.from("abcdefghijklmnopqrstuvwxyz");
const lettersContainer = document.querySelector(".letters");
const wordCategory = document.querySelector(".word-category span");
const guesses = document.querySelector(".guesses");
let rightAnswer = document.getElementById("right");
let wrongAnswer = document.getElementById("wrong");
const resultWindow = document.querySelector(".result-window");
const playAgain = document.querySelector(".result-window button");
const victorySound = document.getElementById("win");
const loseSound = document.getElementById("lose");
// rightAnswer.play();
// loading data
function loadData() {
  let jsonObject = `{
    "0": {
          "name": "food",
          "values": [
                "Milk",
                "Bread",
                "Butter",
                "Cheese",
                "Yogurt",
                "Sandwich",
                "Pancake",
                "Pie",
                "Honey",
                "Waffle",
                "Donuts",
                "Salad",
                "Meatball",
                "Grilled chicken",
                "Burger",
                "Tuna",
                "Noodles",
                "Egg",
                "Bacon",
                "Pizza"
          ]
    },
    "1": {
          "name": "celebrities",
          "values": [
                "Dwayne Johnson",
                "Joe Biden",
                "Elon Musk",
                "Jeff Bezos",
                "LeBron James",
                "Kylie Jenner",
                "Robert Downey Jr.",
                "Cristiano Ronaldo",
                "Will Smith",
                "Justin Beiber",
                "Taylor Swift",
                "Oprah Winfrey",
                "Lionel Messi",
                "Tiger Woods",
                "Selena Gomez",
                "Jennifer Lopez",
                "Rihanna",
                "Kim Kardashian",
                "Ariana Grande",
                "Mark Zuckerberg"
          ]
    },
    "2": {
          "name": "countries",
          "values": [
                "Portugal",
                "New Zealand",
                "Japan",
                "Morocco",
                "Sri Lanka",
                "Italy",
                "Iceland",
                "Greece",
                "Croatia",
                "Turkey",
                "Norway",
                "Maldives",
                "Kenya",
                "Ireland",
                "Israel",
                "Australia",
                "Switzerland",
                "Indonesia",
                "Botswana",
                "Philippines"
          ]
    },
    "3": {
          "name": "animals",
          "values": [
                "Bison",
                "Dolphin",
                "Eagle",
                "Pony",
                "Ape",
                "Lobster",
                "Monkey",
                "Cow",
                "Deer",
                "Duck",
                "Rabbit",
                "Spider",
                "Gray Wolf",
                "Turkey",
                "Lion",
                "Pig",
                "Snake",
                "Shark",
                "Bird",
                "Bear"
          ]
    }
}`;
  return JSON.parse(jsonObject);
}
data = loadData();

letters.forEach((letter) => {
  let span = document.createElement("span");
  span.classList.add("box");
  span.textContent = letter;
  lettersContainer.appendChild(span);
});

lettersContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] == "box") {
    e.target.classList.add("disabled");
    let clickedLetter = e.target.textContent;
    if (word.includes(clickedLetter)) {
      rightAnswer.play();
      word.forEach((letter, i) => {
        if (clickedLetter === letter) {
          wordLength--;
          document.querySelector(
            `.guesses .letter:nth-child(${i + 1})`
          ).textContent = clickedLetter;
        }
      });
      if (wordLength == 0) {
        victorySound.play();
        resultWindow.classList.add("show-window");
        document.querySelector(".result-window p").textContent = word.join("");
        resultWindow.firstElementChild.textContent = "You Won";
      }
    } else {
      wrongAnswer.play();
      clicksNumber++;

      let part = document.querySelector(`.man .n${clicksNumber}`);

      part.style.visibility = "visible";

      if (clicksNumber == 8) {
        loseSound.play();
        resultWindow.classList.add("show-window");
        resultWindow.firstElementChild.textContent = "You Lost";
        document.querySelector(".result-window p").textContent = word.join("");
        lettersContainer.style.cssText = `pointer-events: none;`;
      }
    }
  }
});
playAgain.addEventListener("click", (e) => {
  document.location.reload();
});

// choosing random word
function randomWord() {
  let categoryNumber = Math.floor(Math.random() * 4);
  let wordNumber = Math.floor(Math.random() * 20);
  let category = data[categoryNumber]["name"];
  let word = data[categoryNumber]["values"][wordNumber];
  word = word.toLowerCase();
  word = Array.from(word);
  word.forEach((e) => {
    if (e == " ") {
      let inputField = document.createElement("span");
      inputField.classList.add("space");
      guesses.appendChild(inputField);
    } else {
      let inputField = document.createElement("span");
      inputField.classList.add("letter");
      guesses.appendChild(inputField);
    }
  });
  wordCategory.textContent = category;
  return word;
}
let clicksNumber = 0;
const word = randomWord();
let wordLength = word.length;
