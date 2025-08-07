const arr = [
  { 1: "r3", 2: "loundre" },
  { 1: "w2", 2: "DISHES" },
  { 1: "x4", 2: "groceries" },
  { 1: "d3", 2: "lawn mowing" },
  { 1: "t4", 2: "sweeping" },
];
const video = document.querySelector(".video");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const platform = document.querySelector(".platform");
const timeEle = document.querySelector(".timer");
const scoreEle = document.querySelectorAll(".score");
const heartEle = document.querySelectorAll(".im");
let timer = 20;
let timeINterval;
let bubbleInterval;
let heart = 3;
let score = 0;
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
  const p2 = document.createElement("p");
  p2.classList.add("reds");
  warik.classList.add("warik");
  warik.innerHTML = `<img src="assets/${el[1]}.png" alt=""/>
  <p class="">${el[2]}</p>`;
  const platformWidth = platform.offsetWidth;
  const platformHeight = platform.offsetHeight;
  const bubbleSize = 100;
  const randomX = Math.random() * (platformWidth - bubbleSize - 50);
  warik.style.left = `${randomX}px`;
  warik.style.top = `0px`;
  let speed = 5;
  let falling = true;
  function fall() {
    if (!falling) return;
    const top = parseFloat(warik.style.top);
    const nextTop = top + speed;
    if (nextTop + bubbleSize >= platformHeight) {
      falling = false;

      if (!warik.classList.contains("catch")) {
        heart--;
        missedBubble(heart, warik); // уменьшаем здоровье только если не был пойман
      }

      warik.remove(); // удаляем в любом случае
      return;
    }
    warik.style.top = `${nextTop}px`;
    requestAnimationFrame(fall);
  }
  scoreChange(score);
 warik.addEventListener("click", () => {
    if (warik.classList.contains("catch")) return;

    warik.classList.add("catch");
    speed = 10;
    score++;
    scoreChange(score);

    warik.style.backgroundImage = "none";
    warik.classList.add("lopnut");

    setTimeout(() => {
      warik.classList.remove("lopnut");
    }, 200);
  });
  platform.appendChild(warik);
  fall();
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
  heart = 3
  scoreChange(score);
  heartEle.forEach((e) => e.classList.remove("colored-border"));

  startGame();
}
