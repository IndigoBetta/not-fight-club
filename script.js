const allAvatars = [
  {src: "img/enot3.jpg", alt: "Аватар 1"},
  {src: "img/prostokw2.JPG", alt: "Аватар 2"},
  {src: "img/Buratino.jpg", alt: "Аватар 3"},
  {src: "img/Leopold.jpg", alt: "Аватар 4"}
];

const allEnemyAvatars = [
  {src: "img/Karlson.jpg", name: "Карлсон"},
  {src: "img/Milicioner.jpg", name: "Милиционер"},
  {src: "img/nutcracker.jpg", name: "Щелкунчик"},
  {src: "img/prostokw3.JPG", name: "Печкин"}
];

// Функция случайного выбора врага и обновления экрана боя
function showRandomEnemy() {
  const randomIndex = Math.floor(Math.random() * allEnemyAvatars.length);
  const enemy = allEnemyAvatars[randomIndex];
  const fightEnemyNameElem = document.querySelector('.fight-enemy-name');
  const fightEnemyImgElem = document.querySelector('.enemy-img-fight');
  if (fightEnemyNameElem) {
    fightEnemyNameElem.textContent = enemy.name;
  }
  if (fightEnemyImgElem) {
    fightEnemyImgElem.setAttribute('src', enemy.src);
    fightEnemyImgElem.setAttribute('alt', enemy.name);
  }
}

// Управление видимостью экранов
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  const screenToShow = document.getElementById(screenId);
  if (screenToShow) screenToShow.classList.add('active');

  if (screenId === 'screen-character') {
    let playerAvatar = localStorage.getItem('playerAvatar');
    let playerAvatarAlt = localStorage.getItem('playerAvatarAlt');
    if (!playerAvatar) {
      playerAvatar = allAvatars[0].src;
      playerAvatarAlt = allAvatars.alt;
      localStorage.setItem('playerAvatar', playerAvatar);
      localStorage.setItem('playerAvatarAlt', playerAvatarAlt);
    }
    const playerName = localStorage.getItem('playerName') || '';
    const nameElem = document.querySelector('.character-name');
    if (nameElem) nameElem.textContent = playerName;

    updateMainCharacterImg();
    updateAvatarList();
  }

  if (screenId === 'screen-fight') {
    updateFightScreenImgAndName();
    showRandomEnemy();
  }

  updateNavVisibility();
}

// Видимость панели навигации
function updateNavVisibility() {
  const navPanel = document.querySelector('.navigation-panel');
  const screenSettings = document.getElementById('screen-settings');
  if (navPanel && screenSettings && screenSettings.classList.contains('active')) {
    navPanel.style.display = 'none';
  } else if (navPanel) {
    navPanel.style.display = '';
  }
}

// Инициализация навигационной панели
function initNavigation() {
  const navPanel = document.querySelector('.navigation-panel');
  if (!navPanel) return;
  navPanel.addEventListener('click', function (e) {
    const link = e.target.closest('a[data-screen]');
    if (link) {
      e.preventDefault();
      const screenId = link.getAttribute('data-screen');
      showScreen(screenId);
    }
  });
}

// Инициализация выбора аватара
function initAvatarChoice() {
  const avatarList = document.querySelector('.avatar-list');
  if (!avatarList) return;

  avatarList.addEventListener('click', function(e) {
    const label = e.target.closest('.avatar-option');
    if (!label) return;
    const input = label.querySelector('input[type="radio"]');
    const img = label.querySelector('img');
    if (!input || !img) return;

    const chosenSrc = img.getAttribute('src');
    const chosenAlt = img.getAttribute('alt');

    localStorage.setItem('playerAvatar', chosenSrc);
    localStorage.setItem('playerAvatarAlt', chosenAlt);

    updateMainCharacterImg();
    updateAvatarList();

    avatarList.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
    label.classList.add('selected');
    input.checked = true;
  });
}

// Обновление главного аватара на странице персонажа
function updateMainCharacterImg() {
  const mainImg = document.querySelector('.main-character-img');
  if (!mainImg) return;
  const playerAvatar = localStorage.getItem('playerAvatar');
  const playerAvatarAlt = localStorage.getItem('playerAvatarAlt') || "Главный персонаж";
  if (playerAvatar) {
    mainImg.setAttribute('src', playerAvatar);
    mainImg.setAttribute('alt', playerAvatarAlt);
  }
}

// Обновление списка аватаров для выбора
function updateAvatarList() {
  const avatarList = document.querySelector('.avatar-list');
  if (!avatarList) return;
  const chosenSrc = localStorage.getItem('playerAvatar');

  avatarList.innerHTML = '';
  allAvatars.forEach(avatar => {
    if (avatar.src === chosenSrc) return;
    const label = document.createElement('label');
    label.className = 'avatar-option';
    label.innerHTML = `
      <input type="radio" name="avatar" value="${avatar.src}" hidden>
      <img src="${avatar.src}" alt="${avatar.alt}">
    `;
    avatarList.appendChild(label);
  });
}

// Обновление аватара и имени на экране боя
function updateFightScreenImgAndName() {
  const fightNameElem = document.querySelector('.fight-character-name');
  const playerName = localStorage.getItem('playerName') || '';
  if (fightNameElem) fightNameElem.textContent = playerName;

  const fightImg = document.querySelector('.hero-img-fight');
  const playerAvatar = localStorage.getItem('playerAvatar');
  const playerAvatarAlt = localStorage.getItem('playerAvatarAlt') || "Герой";
  if (fightImg && playerAvatar) {
    fightImg.setAttribute('src', playerAvatar);
    fightImg.setAttribute('alt', playerAvatarAlt);
  }
}


// Инициализация кнопки "В бой!"
function initFightButton() {
  const fightBtn = document.getElementById('fight-btn');
  if (fightBtn) {
    fightBtn.addEventListener('click', function () {
      showScreen('screen-fight');
    });
  }
}

// Инициализация формы регистрации
function initRegistrationForm() {
  const form = document.querySelector('.registration-form form');
  const nameInput = document.getElementById('name');
  if (!form || !nameInput) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const playerName = nameInput.value.trim();
    if (playerName.length > 0) {
      localStorage.setItem('playerName', playerName);
      showScreen('screen-fight-start');
    }
  });
}

// Инициализация чекбоксов левой группы
function initLeftCheckboxes() {
  const leftBoxes = document.querySelectorAll('.left-group');
  leftBoxes.forEach(box => {
    box.addEventListener('change', () => {
      if (box.checked) {
        leftBoxes.forEach(other => {
          if (other !== box) other.checked = false;
        });
      }
    });
  });
}

// Инициализация чекбоксов правой группы
function initRightCheckboxes() {
  const rightBoxes = document.querySelectorAll('.right-group');
  rightBoxes.forEach(box => {
    box.addEventListener('change', () => {
      const checked = Array.from(rightBoxes).filter(c => c.checked);
      if (checked.length >= 2) {
        rightBoxes.forEach(other => {
          if (!other.checked) other.disabled = true;
        });
      } else {
        rightBoxes.forEach(other => other.disabled = false);
      }
    });
  });
}

// Запуск инициализаций после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('playerName')) {
    showScreen('screen-fight-start');
  } else {
    showScreen('screen-settings');
  }

  initNavigation();
  initFightButton();
  initRegistrationForm();
  initAvatarChoice();
  initLeftCheckboxes();
  initRightCheckboxes();
});



