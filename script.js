const STORAGE_KEY = '__bool-gift-list__'

const totalSlot = document.querySelector('.total-slot')
const giftslistElement = document.querySelector('.gifts-lists')
const form = document.querySelector('#gift-form');
const nameField = document.querySelector('#name-field')
const priceField = document.querySelector('#price-field')
const descriptionField = document.querySelector('#description-field')

// Preparazione lista
let gifts =[]

// ! controllo se c'erano elementi salvati nello storage
const prevList = localStorage.getItem(STORAGE_KEY)

if(prevList){
    gifts = JSON.parse(prevList)
    // Ricalcolare il totale e rirenderizzare la lista
    calculateTotal()
    renderList()
}
// Eventi Dinamici

form.addEventListener('submit', function(event){
    event.preventDefault()
    // 2 Raccogliere i dati dei campi.
    const name = nameField.value.trim()
    const price = priceField.value.trim()
    const description = descriptionField.value.trim()
    //3 Aggiungere un regalo alla lista
    addGift(name, price, description)
    // 4 Ripuliamo il form 
    form.reset()
    // 5 Riportiamo il focus sul primo campo
    nameField.focus()
})

//funzione per aggiungere un regalo alla lista

function addGift(name, price, description){
    // 1 creare un nuovo oggetto che rappresenta il regalo
    const newGift = {
        name: name,
        price: Number(price),
        description: description
    };
    // 2 Aggiungiamo l'oggetto alla lista 
    gifts.push(newGift)
    console.log(gifts)

    // Aggiornare il localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts))
    // 3 Calcoliamo il totale 
    calculateTotal()
    // 4 Renderizziamo la lista dei regali
    renderList()
    // 5 Rendo cliccabili i bottoni
    setDeleteButtons()
}

// Funzione per calcolare il totale

function calculateTotal(){
    let total = 0 
    for(let i = 0 ; i < gifts.length; i++){
        total = total + gifts[i].price;
    }
    totalSlot.innerText = formatAmount(total)
}

// Funzione per formattare una cifra 
function formatAmount(amount){
    return amount.toFixed(2) + '€'
}

// FUnzione per renderizzare la lista dei regali

function renderList(){
    // svuotiamo il contenuto prima di procedere
    giftslistElement.innerHTML = ''
    for(let i = 0 ; i < gifts.length; i++){
        let giftElement = createListElement(i)
        giftslistElement.innerHTML += giftElement
    }
    setDeleteButtons()
}


function createListElement(i){
    const gift = gifts[i];

    return ` <li class="gift" >
    <div class="gift-info">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
    </div>
    <div class="gift-price">${formatAmount(gift.price)}</div>
    <button class="gift-button" data-index="${i}" >❌</button>
</li>`
}

//funzione per attivare i bottoni cancella

function setDeleteButtons(){
    const deleteButtons = document.querySelectorAll('.gift-button')
    for(let i = 0; i < deleteButtons.length; i++){
        const button = deleteButtons[i]
        button.addEventListener('click', function(){
            const index = button.dataset.index
            removeGift(index)
        })
    }
}
// Funzione per rimuovere un regalo dalla lista
function removeGift(index) {
    // 1. Rimuovo il regalo dalla lista
    gifts.splice(index, 1);
    console.log(gifts);
  
    // ! Aggiornare il localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
  
    // 2. Ricalcoliamo il totale
    calculateTotal();
  
    // 3. Rirenderizzare la lista
    renderList();
  }