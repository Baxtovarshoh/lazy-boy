const arr = [
  { 1: "r3", 2: "loundre" },
  { 1: "w2", 2: "DISHES" },
  { 1: "x4", 2: "groceries" },
  { 1: "d3", 2: "lawn mowing" },
  { 1: "t4", 2: "sweeping" },
];
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const platform = document.querySelector(".platform");
const timeEle = document.querySelector(".timer");
const scoreEle = document.querySelectorAll(".score");
const heartEle = document.querySelectorAll(".im");
const videos = document.querySelector("#video");
const volUper = document.querySelector(".vol");

let parentVideo = videos.parentElement;
let timer = 20;
let timeINterval;
let bubbleInterval;
let heart = 3;
let hi = 100;
let score = 0;
let vol = false;
let height = window.innerHeight >= 400;

const fotoEle = [
  "1_11zon",
  "6",
  "8_11zon",
  "114612",
  "bubble copy 2",
  "chier",
  "d3",
  "h5r",
  "h333",
  "hori",
  "logo",
  "lopnut",
  "logo2",
  "r3",
  "t4",
  "w2",
  "x4",
];
fotoEle.forEach((el) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = `assets/${el}.png`;
  link.type = `image/png`;
  link.as = `image`;
  document.head.appendChild(link);
});

videos.addEventListener("ended", () => {
  parentVideo.classList.add("hidden");
  first.classList.remove("hidden");
});
function volUp() {
  if (vol) {
    volUper.innerHTML = `<i class="bi bi-volume-mute-fill"></i>`;
    vol = false;
    videos.muted = true;
  } else {
    volUper.innerHTML = `<i class="bi bi-volume-up-fill"></i>`;
    vol = true;
    videos.muted = false;
  }
}
function resi() {
  if (window.innerHeight >= 400) {
    videos.src = `assets/ver.mp4`;
    console.log("ver");
  } else if (window.innerHeight <= 400) {
    console.log("horu");
    videos.src = `assets/hori.mp4`;
  }
}
window.addEventListener("resize", resi);
timeEle.textContent = timer;
function startGame() {
  first.classList.add("hidden");
  second.classList.remove("hidden");
  bubbleInterval = setInterval(spawnPup, 1000);
  timeINterval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(timeINterval);
      clearInterval(bubbleInterval);
      endCard();
      return;
    }
    timer--;
    timeEle.textContent = timer;
  }, 1000);
  spawnPup();
}
function scoreChange(w) {
  scoreEle.forEach((e) => (e.textContent = w));
}

function spawnPup() {
  const el = arr[Math.floor(Math.random() * arr.length)];
  const warik = document.createElement("div");
  warik.classList.add("warik", "filter");
  warik.innerHTML = `<img class="posi" src="assets/bubble copy 2.png" alt="" />
              <div class="iner">
                <img src="assets/${el[1]}.png" alt="" />
                <p>${el[2]}</p>
              </div>`;

  const bubbleSize = 160;
  const platformRect = platform.getBoundingClientRect();
  const bottomLimit = platformRect.height - bubbleSize;
  const platformWidth = platformRect.width;

  const randomX = Math.random() * (platformWidth - bubbleSize);
  warik.style.left = `${randomX}px`;
  warik.style.top = `-100px`;

  let speed = 4; // меняй как хочешь, хоть 50
  let clicked = false;

  function fall() {
    let top = parseFloat(warik.style.top);

    // Двигаем вниз, но не даём перепрыгнуть границу
    top = Math.min(top + speed, bottomLimit);
    warik.style.top = `${top}px`;

    // Достигли низа
    if (top === bottomLimit) {
      if (!clicked) {
        heart--;
        missedBubble(heart, warik);
      }
      warik.remove();
      return;
    }

    requestAnimationFrame(fall);
  }

  warik.addEventListener("click", () => {
    if (clicked) return;
    clicked = true;

    warik.style.top = `${Math.max(parseFloat(warik.style.top) - 80, 0)}px`;

    warik.classList.remove("filter");
    warik.innerHTML = `<img class="posi" src="assets/lopnut.png" alt="" />
              <div class="iner">
                <img src="assets/${el[1]}.png" alt="" />
                <p>${el[2]}</p>
              </div>`;
    score++;
    setTimeout(() => {
      warik.querySelector(".posi").classList.add("hidden");
    }, 300);
    scoreChange(score);
  });

  platform.appendChild(warik);
  requestAnimationFrame(fall);
}

function missedBubble(hearts, warik) {
  if (hearts < 0) return;
  if (heartEle[hearts]) {
    heartEle[hearts].classList.add("colored-border");
    warik.classList.remove("catch");
  }
  if (heart <= 0) {
    clearInterval(bubbleInterval);
    clearInterval(timeINterval);
    endCard(); // завершение игры
  }
}

function endCard() {
  second.classList.add("hidden");
  third.classList.remove("hidden");
}
function replay() {
  third.classList.add("hidden");
  timer = 20;
  score = 0;
  heart = 3;
  scoreChange(score);

  [...heartEle].forEach((e) => e.classList.remove("colored-border"));
  startGame();
}
