const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.nextBtn');
const prevButton = document.querySelector('.prevBtn');

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`
});

let counter = 0;

nextButton.addEventListener('click', () => {
  counter++;
  carousel();
});

prevButton.addEventListener('click', () => {
  counter--;
  carousel();
});

function carousel() {
  // if (counter === slides.length)
  //   counter = 0;
  // if (counter < 0)
  //   counter = slides.length - 1;
  if(counter < slides.length - 1) {
    nextButton.style.display = 'block';
  } else {
    nextButton.style.display = 'none';
  }

  if(counter > 0) {
    prevButton.style.display = 'block';
  } else {
    prevButton.style.display = 'none';
  }
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`
  })
}

prevButton.style.display = 'none';