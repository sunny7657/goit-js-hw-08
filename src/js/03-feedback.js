import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const userEmail = document.querySelector('input[name="email"]');
const userMessage = document.querySelector('textarea[name="message"]');
const button = document.querySelector('button');

form.addEventListener('input', throttle(handlerGetData, 500));
form.addEventListener('submit', handlerSubmit);

const userData = {
  email: '',
  message: '',
};

function handlerGetData() {
  userData.email = userEmail.value;
  userData.message = userMessage.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

const currentValue = localStorage.getItem('feedback-form-state');
const parsedValue = JSON.parse(currentValue);

if (parsedValue) {
  userEmail.value = parsedValue.email;
  userMessage.value = parsedValue.message;
}

function handlerSubmit(evt) {
  evt.preventDefault();

  const formDataObj = {};
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  console.log(formDataObj);
  form.reset();
  localStorage.removeItem('feedback-form-state');
}
