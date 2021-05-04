const modalButton = document.querySelector('.modal-btn');
const closeButton = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');

modalButton.addEventListener('click', () => {
  modalOverlay.classList.add('open-modal');
});

closeButton.addEventListener('click', () => {
  modalOverlay.classList.remove('open-modal');
});