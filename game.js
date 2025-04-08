const canvas = document.getElementById("Game");
const ctx = canvas.getContext("2d");

const canvas1 = document.getElementById("Menu");
const ctx1 = canvas1.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let object_size = 64;
let objects = [];
let count_coin = 0;

let coin = new Image();
coin.src = "images/Coin.png";

let img = new Image();
img.src = "images/bin.png";

let map = new Image();
map.src = "images/Map.jpg";

let words = [
  "На річці Омелянівка побудовано 6 ставків",
  "Жидувка використовується як технічна річка",
  "Річка Глушець ще реально існує",
  "Річка Глушець була закопана в 1934 році",
  "Колись по Стирові ходили баржі",
  "На Сапалаївці та Омелянівці робили ставки",
];


// Функція для малювання тексту (монети + випадкове повідомлення)
function updateCoinText() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx1.font = '24px Arial'; // Або '24px "Jersey 15"' якщо шрифт завантажено
  ctx1.fillStyle = "black";
  ctx1.drawImage(coin, 20, 0, object_size, object_size);
  ctx1.fillText("Coins: " + count_coin, 80, 40);

  draw_text();
}

// Малюємо випадковий текст
function draw_text() {
  let random = words[Math.floor(Math.random() * words.length)];
  ctx1.font = '20px Arial';
  ctx1.fillStyle = "black";
  ctx1.fillText("Text: " + random, 80, 80);
}

// Генеруємо об'єкти у випадкових місцях
function spawnObjects(count) {
  objects = [];
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * (canvas.width - object_size));
    let y = Math.floor(Math.random() * (canvas.height - object_size));
    objects.push({ x, y });
  }
}

// Малюємо об'єкти
function drawObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let obj of objects) {
    ctx.drawImage(img, obj.x, obj.y, object_size, object_size);
  }
}

// Коли зображення смітника завантажиться — старт
img.onload = function () {
  spawnObjects(10);
  drawObjects();
  updateCoinText();
};

// Обробка кліку по об'єктах
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    if (
      clickX >= obj.x &&
      clickX <= obj.x + object_size &&
      clickY >= obj.y &&
      clickY <= obj.y + object_size
    ) {
      objects.splice(i, 1); // Видаляємо
      drawObjects();

      if (objects.length === 0) {
        count_coin += 10;
        spawnObjects(10);
        drawObjects();
      }

      updateCoinText();
      break;
    }
  }
});
