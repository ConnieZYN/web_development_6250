"use strict";
(function () {

  const inventories = [
    {
      text: 'bottle water',
      count: 3,
    },
    {
      text: 'snack',
      count: 1,
    },
    {
      text: 'coke',
      count: 2,
    },
  ];

  const listEl = document.querySelector('#store-inventory-app .inventories');
  const inputEl = document.querySelector('#store-inventory-app input');
  const buttonEl = document.querySelector('#store-inventory-app button');

  disableButtonIfNoInput();
  addAbilityToChangeCountOfInventories();
  addAbilityToAddItems();
  addAbilityToDeleteItems();

  render(inventories);

  function render( inventories ) {
    const html = inventories.map( (inventory, index) => {
      const canDrecrese = inventory.count > 0;
      const decrementButtonClass = canDrecrese ? "inventory-button enabled" : "inventory-button disabled";
      const disabled = canDrecrese ? "" : "disabled";
      return `
        <li class="inventory-row">
          <span class="inventory-text" data-index="${index}">${inventory.text}</span>
          <button id="increment-${index}" class="inventory-button enabled" data-index="${index}" type="button">+</button>
          <span class="inventory-count" data-index="${index}">${inventory.count}</span>
          <button id="decrement-${index}" class="${decrementButtonClass}" data-index="${index}" type="button" ${disabled}>-</button>
          <span class="delete" data-index="${index}">X</span>
        </li>
      `;

    }).join('');

    listEl.innerHTML = html;
    buttonEl.disabled = !inputEl.value;
  };

  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', () => {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addAbilityToChangeCountOfInventories() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('inventory-button')) {
        return;
      }

      const index = e.target.dataset.index;
      if (e.target.id == 'increment-' + index) {
        inventories[index].count += 1;
      } else if (e.target.id == 'decrement-' + index) {
        inventories[index].count -= 1;
      }

      render(inventories);
    });
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      const newItem = {
        text: inputEl.value,
        count: 0,
      };
      inventories.push(newItem);
      inputEl.value = '';
      render(inventories);
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index;
      inventories.splice(index, 1);
      render(inventories);
    });
  }

})();
