const _$ = (x) => document.querySelector(x),
  $$ = (x) => document.querySelectorAll(x);

const game = () => {
  let pScore = 0,
    cScore = 0,
    hScore = 0;

  //Start the Game
  const startGame = () => {
    const playBtn = _$(".intro button");
    const introScreen = _$(".intro");
    const match = _$(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = $$(".options button");
    const playerHand = _$(".player-hand");
    const computerHand = _$(".computer-hand");
    const hands = $$(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = _$(".player-score p");
    const highScore = _$(".high-score p");
    const computerScore = _$(".computer-score p");
    playerScore.textContent = pScore;
    highScore.textContent = hScore;
    computerScore.textContent = cScore;
    updateHighScore();
    // loadHighScore();
  };

  function updateHighScore() {
    if (pScore > hScore) {
      hScore = pScore;
      localStorage.setItem("highScore", hScore);
    }
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      hScore = parseInt(storedHighScore);
    }
  }

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = _$(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        // updateHighScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        // updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        // updateHighScore();
        return;
      }
    }
  };

  //It call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
