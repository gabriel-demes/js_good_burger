  //Implement Your Code Here
const url = `http://localhost:3000/burgers`
const menu = document.querySelector('div.menu')
console.log(menu)
const order = document.querySelector('div.order')
const custom = document.querySelector(`div.custom`)

const loadPage = () =>{
  renderMenu()
}

const renderMenu = () => {

  fetch(url)
    .then(resp => resp.json())
    .then(burgers => {
      burgers.forEach(burger => createBurger(burger))
    })
}

const createBurger = burger => {
  const burgerDiv =document.createElement('div')
  burgerDiv.dataset.id = burger.id
  burgerDiv.classList = "burger"
  burgerDiv.innerHTML = `<h3 class="burger_title">${burger.name}</h3>
  <img src=${burger.image}>
  <p class="burger_description">
    ${burger.description}
  </p>
  <button class="button">Add to Order</button>`
  menu.append(burgerDiv)
}

menu.addEventListener(`click`, function(event){
  if (event.target.className === "button"){
    addOrder(event.target.parentElement.dataset.id)
  }
})

const addOrder = num =>{
  const div = document.querySelector(`div[data-id="${num}"]`)
  const name = div.querySelector('h3').textContent
  const list = order.querySelector('ul')
  const item = document.createElement('li')
  item.textContent = name
  list.append(item)
}

custom.addEventListener('submit', function(event){
  event.preventDefault()
  const name = event.target[0].value
  const description = event.target[1].value
  const image = event.target[2].value
  const burger = {name, description, image}

  newBurger(burger)
})

const newBurger = burger => {

  fetch(url, {
    method: "POST",
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json' },
    body: JSON.stringify(burger)
  })
    .then(resp => resp.json())
    .then(newBurger => { 
      createBurger(newBurger)
      addOrder(newBurger.id)})
}

loadPage()