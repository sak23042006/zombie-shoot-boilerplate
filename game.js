// Iteration 1: Declare variables required for this game
const docBody = document.getElementById("game-body");
const $lives = document.getElementById("lives");
var sec = document.getElementById("timer").textContent;
var zombieId = 0;
const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
// Iteration 1.2: Add shotgun sound
const shootAudio = new Audio("./assets/shotgun.wav");
shootAudio.volume = 0.2;
docBody.onclick = () => {
  shootAudio.pause();
  shootAudio.currentTime = 0;
  shootAudio.play();
};
// Iteration 1.3: Add background sound
const bgSound = new Audio("./assets/bgm.mp3");
bgSound.play();
bgSound.loop = true;

// Iteration 1.4: Add lives
const maxlives = 4;
var lives = 4;

// Iteration 2: Write a function to make a zombie

function createZombie() {
  randomZombieImage = img[randomInt(0, img.length)];
  docBody.innerHTML += `<img src="./assets/${randomZombieImage}" class="zombie-image" id="zombie${zombieId}">`;
  let zombie = document.getElementById("zombie" + zombieId);
  zombie.style.transform = `translateX(${randomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${randomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieShoot(zombie);
  };
}

// Iteration 3: Write a function to check if the player missed a zombie

function checkHit(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieShoot(zombie) {
  zombie.style.display = "none";
  zombieId++;
  createZombie();
}

// Iteration 5: Creating timer

var timer = setInterval(function () {
  sec--;
  document.getElementById("timer").textContent = sec;
  let zombie = document.getElementById("zombie" + zombieId);
  if (checkHit(zombie) == true) {
    zombieShoot(zombie);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (sec == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie

createZombie(zombieId);

// Iteration 7: Write the helper function to get random integer

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
