const form = document.querySelector('#item-form');
const itemInput = document.querySelector('#list');
const filter = document.querySelector('#filter');
const itemList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-list-item');

// event listeners //
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getItemList);

    form.addEventListener('submit', addItem);

    filter.addEventListener('keyup', filterList);

    itemList.addEventListener('click', removeItem);

    clearButton.addEventListener('click', clearList);
}




//Get items from Local storage
function getItemList() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(item) {

    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(item));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    itemList.appendChild(li);

    })
}



// add item list //
function addItem(e) {
    if(itemInput.value === ""){
       alert('Add an item');
    }

    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(itemInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    itemList.appendChild(li);

    //Store Items in Local Storage

    storeItems(itemInput.value);

     //Clear Input
    itemInput.value = '';

    e.preventDefault();
}


//Store Items
function storeItems(item) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}




// filter list items //
function filterList(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(list) {
        const item = list.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }
    });
}


//remove list item //
function removeItem(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        removeItemFromLocalStorage( e.target.parentElement.parentElement) 
    }
}

//remove from local storage//
function removeItemFromLocalStorage(itemTask) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.forEach(function(item, index) {
       if (itemTask.textContent === item) {
           items.splice(index, 1);
       }
       localStorage.setItem('items', JSON.stringify(items))
    });
}



 //clear list completely//
function clearList() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear Local storage//
    clearItemFromLocalStorage();
}

function clearItemFromLocalStorage() {
    localStorage.clear();
}