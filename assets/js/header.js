const burgerBtn = document.querySelector('.burgerBtn');

burgerBtn.addEventListener('click', (e) => {
  const previous = e.target.previousElementSibling;
  if (previous.classList.contains('scale-y-100')) {
    previous.classList.remove('scale-y-100');
    previous.classList.remove('opacity-100');
  } else {
    previous.classList.add('scale-y-100');
    previous.classList.add('opacity-100');
  }
})