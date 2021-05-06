const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitButton = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearButton = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = '';

form.addEventListener('submit', addItem);

clearButton.addEventListener('click', clearItems);

window.addEventListener('DOMContentLoaded', setupItems);

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem (id, value);
    displayAlert('item added to the list', 'success');
    container.classList.add('show-container');
    addToLocalStorage(id, value);
    setBackToDefault();
  }
  else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('Value changed', 'success');
    editLocalStorage(editId, value);
    setBackToDefault();
  }
  else {
    displayAlert('please enter value', 'danger');
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);

  if(list.children.length === 0) 
    container.classList.remove('show-container');
  displayAlert('item removed', 'danger');
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;

  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitButton.textContent = 'edit';
}

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editId = '';
  submitButton.textContent = 'submit';
}

function addToLocalStorage(id, value) {
  const groceryItem = {id, value};
  let items = getLocalStorage();
  items.push(groceryItem);
  localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if(item.id !== id) 
      return item; 
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id)
      item.value = value;
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')): [] ;
}

function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
}

function createListItem (id, value) {
  const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attribute = document.createAttribute('data-id');
    attribute.value = id;
    element.setAttributeNode(attribute);
    element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <button class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>`;
    
    const deleteButton = element.querySelector('.delete-btn');
    const editButton = element.querySelector('.edit-btn');

    deleteButton.addEventListener('click', deleteItem);
    editButton.addEventListener('click', editItem);

    list.appendChild(element);
}