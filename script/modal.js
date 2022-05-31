let modal_appeal = document.querySelector('.modal-appeal');
let blackBackground = document.querySelector('.background-modal');

let modalAppealOpen = document.querySelector('.footer-contacts-button');
let modalAppealClose = modal_appeal.querySelector('.modal-appeal .close');

let form = modal_appeal.querySelector('.appeal-form');
let fullname = modal_appeal.querySelector("[name=fullname]");
let email = modal_appeal.querySelector("[name=email]");
let text = modal_appeal.querySelector("[name=text]");
let inputFields = [fullname, email, text];

let isStorageSupport = true;
let storageFullName = '';
let storageEmail = '';

try {
  storageFullName = localStorage.getItem('fullName');
  storageEmail = localStorage.getItem('email');
} catch (e) {
  isStorageSupprot = false;
}

// Отключает кнопку сабмита, если поля не заполнены
// Если с полями все в порядке, запоминает fullName
form.addEventListener('submit', function(evt) {
  if(!fullname.value || !email.value || !text.value) {
    evt.preventDefault();
    modal_appeal.classList.remove('modal-error');
    modal_appeal.offsetWidth = modal_appeal.offsetWidth;
    modal_appeal.classList.add('modal-error');
    for(let i=0;i<inputFields.length;i++) {
      if(!inputFields[i].value){
        inputFields[i].classList.add('error');
      }
    }
    // Событие удаления рамки ошибки при фокусе
    for(let i=0;i<inputFields.length;i++){
      inputFields[i].addEventListener('focus', function() {
        inputFields[i].classList.remove('error');
      });
    }
  } else {
    if(isStorageSupport){
      localStorage.setItem("fullName", fullname.value);
      localStorage.setItem("email", email.value);
    }
  }
});

// Включает модальное окно, а так же прозрачный фон, который блокирует доступ к элементам под ним.
// Ставит фокус на fullName, подгружает из хранилища данные если они есть.
if(modalAppealOpen){
  modalAppealOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal_appeal.classList.add('modal-show');
    blackBackground.classList.add('background-modal-show');

    if(isStorageSupport) {
      fullname.value = storageFullName;
      email.value = storageEmail;
      text.focus();
    } else {
      fullname.focus();
    }
  });
}

const modalClose = function() {
  modal_appeal.classList.add('modal-close-animation');
  setTimeout(modalDisplayNone, 600);
}

const modalDisplayNone = function() {
  blackBackground.classList.remove('background-modal-show');
  modal_appeal.classList.remove('modal-show');
  modal_appeal.classList.remove('modal-error');
  modal_appeal.classList.remove('modal-close-animation');
}

// Выключение модального окна и фона.
if(modalAppealClose){
  modalAppealClose.addEventListener('click', function () {
    modalClose();
  });
}

blackBackground.addEventListener('click', function () {
  modalClose();
})

window.addEventListener('keydown', function (evt) {
  if(evt.key === "Escape"){
    if(modal_appeal.classList.contains('modal-show')){
      evt.preventDefault();
      modalClose();
    }
  }
})
