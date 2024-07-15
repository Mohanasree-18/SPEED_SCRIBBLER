document.addEventListener("DOMContentLoaded", () => {
  //!select the elements based on ids
  const textToTypeElement = document.getElementById("text-to-type");
  const typingInputElement = document.getElementById("typing-input");
  const speedElement = document.getElementById("speed");
  const accuracyElement = document.getElementById("accuracy");
  console.log({
    textToTypeElement,
    typingInputElement,
    speedElement,
    accuracyElement,
  });

  //!Text to display
  const sampleTexts = [
    "DNA stores genetic code",
    "Light travels super fast",
    "Gravity pulls all objects",
    "Sun hottest star",
  ];
  //initail values
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;

  //!Function to initialise or restart the game
  function initializeGame() {
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textToTypeElement.textContent = text;
    typingInputElement.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    //update function
    updateFeedback();
  }

  //!Function to update the speed and the accuracy feedback
  function updateFeedback() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000;
    if (elapsedTime <= 0) {
      speedElement.textContent = 0;
    } else {
      const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
      const speed = Math.round(wordsTyped / elapsedTime);
      speedElement.textContent = speed;
    }
    //cal accurracy
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    accuracyElement.textContent = accuracy;
  }

  //!Function to check typed character
  function checkCharacter(inputChar, targetChar) {
    if (inputChar !== targetChar) {
      errors++;
      //play error sound
      new Audio("/erro.mp3").play();
      return false;
    } else {
      return true;
    }
  }

  //!Function to display messages to the user
  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;
    //clear the message after 3s
    setInterval(() => {
      messageArea.textContent = "";
    }, 3000);
  }

  //!Event listener for typing input
  //?as user click on starttyping button some events should be triggered on
  //?for those we use these event handler
  typingInputElement.addEventListener("input", (e) => {
    const typedText = typingInputElement.value;
    const targetText = textToTypeElement.textContent;
    if (currentIndex < targetText.length) {
      const isCorrect = checkCharacter(
        typedText[currentIndex],
        targetText[currentIndex]
      );
      //using css to display green if entered text is corr or else red dynamically
      textToTypeElement.innerHTML =
        targetText.substring(0, currentIndex) +
        `<span class='${isCorrect ? "correct" : "incorrect"}'>${
          targetText[currentIndex]
        }</span>` +
        targetText.substring(currentIndex + 1);
      currentIndex++;
      if (currentIndex === targetText.length) {
        displayMessage("Test completed starting a new one.");
        initializeGame();
      }
    }
    //update the feedback
    updateFeedback();
  });

  //!START THE GAME
  initializeGame();
});
