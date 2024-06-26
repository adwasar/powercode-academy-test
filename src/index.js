import './scss/main.scss'

const from = document.querySelector('.form-block__form')

from.addEventListener('submit', (event) => {
  event.preventDefault()

  let isValid = true

  const nameInput = document.querySelector('.form-block__name')
  const phoneInput = document.querySelector('.form-block__phone')
  const emailInput = document.querySelector('.form-block__email')

  const nameError = document.getElementById('name-error')
  const phoneError = document.getElementById('phone-error')
  const emailError = document.getElementById('email-error')

  const phoneRegex = /^\+\d{12}$/
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!nameInput.value.trim()) {
    nameError.style.display = 'block'
    nameError.innerText = 'Поле не заполнено'
    isValid = false
  } else {
    nameError.style.display = 'none'
  }

  if (!phoneInput.value.trim()) {
    phoneError.style.display = 'block'
    phoneError.innerText = 'Поле не заполнено'
    isValid = false
  } else if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneError.style.display = 'block'
    phoneError.innerText = 'Поле должно быть заполнено в международном формате'
    isValid = false
  } else {
    phoneError.style.display = 'none'
  }

  if (!emailInput.value.trim()) {
    emailError.style.display = 'block'
    emailError.innerText = 'Поле не заполнено'
    isValid = false
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.style.display = 'block'
    emailError.innerText = 'Email введен не корректно'
    isValid = false
  } else {
    emailError.style.display = 'none'
  }

  if (isValid) {
    console.log(true)
  } else {
    console.log(false)
  }
})
