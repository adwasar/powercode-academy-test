// import intlTelInput from 'intl-tel-input'
import intlTelInput from "intl-tel-input/intlTelInputWithUtils"

import 'intl-tel-input/build/css/intlTelInput.css'
import './scss/main.scss'

const from = document.querySelector('.form-block__form')

const nameInput = document.querySelector('.form-block__name')
const phoneInput = document.querySelector('.form-block__phone')
const emailInput = document.querySelector('.form-block__email')

const nameError = document.getElementById('name-error')
const phoneError = document.getElementById('phone-error')
const emailError = document.getElementById('email-error')

const iti = intlTelInput(phoneInput, {
  initialCountry: 'ua',
  strictMode: true
})

from.addEventListener('submit', (event) => {
  event.preventDefault()

  let isValid = true

  const phoneRegex = /\d{7,14}$/
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!nameInput.value.trim()) {
    nameError.style.display = 'block'
    nameError.innerText = 'Поле не заполнено'
  } else {
    nameError.style.display = 'none'
  }

  if (!phoneInput.value.trim()) {
    phoneError.style.display = 'block'
    phoneError.innerText = 'Поле не заполнено'
  } else if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneError.style.display = 'block'
    phoneError.innerText = 'Поле должно быть заполнено в международном формате'
  } else {
    phoneError.style.display = 'none'
  }

  if (!emailInput.value.trim()) {
    emailError.style.display = 'block'
    emailError.innerText = 'Поле не заполнено'
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.style.display = 'block'
    emailError.innerText = 'Email введен не корректно'
  } else {
    emailError.style.display = 'none'
  }

  console.log(iti.getNumber())
  
  if (isValid) {
    const token = '7053559021:AAG8U1_4HcctmRlgvqulcArv0SZq01oqo3c'
    const chatId = '6163382681'
    const message = `Name: ${nameInput.value}\nPhone: ${iti.getNumber()}\nEmail: ${emailInput.value}`

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        console.log('Message sent successfully')
      } else {
        console.error('Error sending message:', data)
      }
    })
    .catch(error => console.error('Error:', error))
  } else {
    console.log('Form validation failed')
  }
})
