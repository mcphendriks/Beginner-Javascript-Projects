const answerElement = document.getElementById("answer");
const questionButton = document.getElementById("questionButton");
const ballImage = document.getElementById("8ball");

document.addEventListener(), function () {
  const magic8Ball = {};
  magic8Ball.listOfAnswers = [
    "No",
    "Yes",
    "I don't think so...",
    "Of course!",
    "Indubitably",
    "In your dreams.",
  ];

  answerElement.style.display = "none";

  magic8Ball.askQuestion = function (question) {
    ballImage.classList.add("shake");
    ballImage.src =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/magic8ballAnswer.png";
    answerElement.style.display = "block";

    const randomNumber = Math.random();
    const randomNumberForListOfAnswers =
      randomNumber * this.listOfAnswers.length;
    const randomIndex = Math.floor(randomNumberForListOfAnswers);
    const answer = this.listOfAnswers[randomIndex];

    answerElement.textContent = answer;

  };

  const onClick = function () {
    // Disable the button to prevent multiple prompts
    questionButton.disabled = true;

    answerElement.style.display = "none";
    ballImage.src =
      "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/magic8ballQuestion.png";

    setTimeout(function () {
      const question = prompt("ASK A YES/NO QUESTION!");
      magic8Ball.askQuestion(question);

      // Re-enable the button after answering the question
      questionButton.disabled = false;
    }, 500);
  };

  questionButton.addEventListener("click", onClick);
});
