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

// Завантаження шрифта
document.fonts.load('32px "Jersey 15"').then(() => {
  updateCoinText();
});

// Малюємо текст монет
function updateCoinText() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx1.font = '32px "Jersey 15"';
  ctx1.fillStyle = "black";
  ctx1.fillText("Coins: " + count_coin, 20, 40);
}

// Генеруємо об'єкти з випадковими координатами
function spawnObjects(count) {
  objects = []; // Очищаємо старі об'єкти
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * (canvas.width - object_size));
    let y = Math.floor(Math.random() * (canvas.height - object_size));
    objects.push({ x, y });
  }
}

// Малюємо всі об'єкти
function drawObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let obj of objects) {
    ctx.drawImage(img, obj.x, obj.y, object_size, object_size);
  }
}

// Коли зображення смітника завантажене — запускаємо гру
img.onload = function () {
  spawnObjects(10);
  drawObjects();
  updateCoinText();
};

// Обробка кліку по canvas
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
      objects.splice(i, 1); // Видаляємо об'єкт
      drawObjects(); // Перемальовуємо об'єкти

      // Якщо знищено всі об'єкти — даємо монети
      if (objects.length === 0) {
        count_coin += 10;
        spawnObjects(10); // Генеруємо нові об'єкти
        drawObjects();
      }
      updateCoinText(); // Оновлюємо кількість монет
      break;
    }
  }
});
