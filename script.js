




//register

register = () => {

    userName = uName.value;
    userPass = pass.value;
    userEmail = mail.value;

    let details = {
        userName,
        userPass,
        userEmail
    }


    if (userName in localStorage) {
        alert('User name already exists')
    }
    else if (userName == '' || userPass == '') {
        alert('Enter the details')
    }
    else {
        localStorage.setItem(userName, JSON.stringify(details))
        alert('Account added successfully')
        window.location = 'login.html'
    }
}

// login 

login = () => {
    userName = uName.value;
    userPass = uPass.value;

    if (userName in localStorage) {
        accDetails = JSON.parse(localStorage.getItem(userName))
        if (userPass == accDetails.userPass) {
            alert('Login successfull')
            window.location = 'index.html'
        }
        else {
            alert('Incorrect password')
        }
    }
    else {
        alert('Invalid user name')
    }
}





const balance = document.getElementById('balance');

const moneyPlus = document.getElementById('m-plus')
const moneyMinus = document.getElementById('m-minus')

const addBtn = document.getElementById('add-btn')

const list = document.getElementById('list')

const addItem = document.getElementById('add-item')
const addAmount = document.getElementById('add-amount')




const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



// add transactions 
function addTrans() {

    if (addItem.value === '' || addAmount.value === '') {
        alert('please enter the details')
    }
    else {
        const transaction = {
            id: generateId(),
            text: addItem.value,
            amount: parseInt(addAmount.value)
        }
        transactions.push(transaction);
        addTransaction(transaction);
        updateValues();
        updateLocalStorage();
        addItem.value = ''
        addAmount.value = ''
    }
}

//generate random id
//1
function generateId() {
    return Math.floor(Math.random() * 100)
}


//2
function addTransaction(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');


    item.classList.add(
        transaction.amount < 0 ? 'minus' : 'plus'
    );

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class = 'delete-btn' onclick = 'removeTransaction(${transaction.id})'>
    <i class="fa-solid fa-trash" style="color: #050505;"></i>
    
    </button>
    `;
    //   console.log(sign);
    //   console.log(item);
    list.appendChild(item)
}

// updateValues 
//3
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0)
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc -= item), 0)

    balance.innerText = `${total}Rs`
    moneyPlus.innerText = `+${income}Rs`
    moneyMinus.innerText = `-${expense}Rs`
}

//update localstorage
//4
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}



// remove transaction 

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}



//init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransaction);
    updateValues()
}


init();

addBtn.addEventListener('click', addTrans)



