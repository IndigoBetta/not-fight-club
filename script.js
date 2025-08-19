function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  const screenToShow = document.getElementById(screenId);
  if (screenToShow) {
    screenToShow.classList.add('active');
  }
}

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

function initFightButton() {
  const fightBtn = document.getElementById('fight-btn');
  if (fightBtn) {
    fightBtn.addEventListener('click', function () {
      showScreen('screen-fight');
    });
  }
}

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


document.addEventListener('DOMContentLoaded', function () {
  function updateNavVisibility() {
    const navPanel = document.querySelector('.navigation-panel');
    const screenSettings = document.getElementById('screen-settings');
    if (navPanel && screenSettings && screenSettings.classList.contains('active')) {
      navPanel.style.display = 'none';
    } else if (navPanel) {
      navPanel.style.display = '';
    }
  }

  const originalShowScreen = showScreen;
  showScreen = function(screenId) {
    originalShowScreen(screenId);
    updateNavVisibility();
  };


  if (localStorage.getItem('playerName')) {
    showScreen('screen-fight-start');
  } else {
    showScreen('screen-settings');
  }

  initNavigation();
  initFightButton();
  initRegistrationForm();

  updateNavVisibility();
});


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


