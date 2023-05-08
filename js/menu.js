//MENÚ RESPONSIVE

const menuBtn = document.querySelector('.btn-menu');
const menu = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('is-active');
  console.log(menu);
});