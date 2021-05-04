// const buttons = document.querySelectorAll('.question-btn');

// buttons.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     });
// });

const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  const btn = question.querySelector('.question-btn');
  btn.addEventListener('click', () => {
    questions.forEach((otherQuestion) => {
      if (otherQuestion !== question) {
        otherQuestion.classList.remove('show-text');
      }
    });
    question.classList.toggle('show-text');
  });
});