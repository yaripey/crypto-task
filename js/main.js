function setCookie(name, value, days) {
  let expires = "";
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
  const nameEquals = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEquals) == 0) return c.substring(nameEquals.length, c.length);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody')

  fetch('https://api.coincap.io/v2/assets/?limit=10')
    .then(response => response.json())
    .then(responseObject => {
      responseObject.data.forEach(element => {
        const newRow = document.createElement('tr')
        newRow.innerHTML = `
          <td class="id-cell">${element.id}</td>
          <td class="name-cell">${element.name}</td>
          <td class="symbol-cell">${element.symbol}</td>
          <td class="price-cell">$${Math.round((parseFloat(element.priceUsd) + Number.EPSILON) * 100) / 100}</td>
        `
        tableBody.appendChild(newRow)
      })
    })

  const form = document.querySelector('#email-form')
  form.addEventListener('submit', () => {
    setCookie('sub_email', form.emailInput.value, 30)
  })
  console.log(getCookie('sub_email'))

  const backToTop = document.querySelector('#backToTop')
  backToTop.addEventListener('click', (e) => {
    e.preventDefault()
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  })

  const button = document.querySelector('.mobile-menu-button')
  const mobileMenu = document.querySelector('.mobile-menu')
  button.addEventListener('click', () => {
    mobileMenu.classList.add('opened')
  })

  mobileMenu.addEventListener('click', ({ target }) => {
    mobileMenu.classList.remove('opened')
  })

  const bigBackToTop = document.querySelector('.back-to-top-button')
  bigBackToTop.addEventListener('click', () => {
    window.scroll(0, 0);
  })

  document.addEventListener('scroll', () => {
    if (window.scrollY > 1200) {
      bigBackToTop.classList.remove('hidden')
    } else {
      bigBackToTop.classList.add('hidden')
    }
  })
})

