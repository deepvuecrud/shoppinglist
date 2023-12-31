//Initializing Dexie

const db = new Dexie('ShoppingApp');
db.version(1).stores({ items: '++id, name, price, isPurchased' });

//Accessing the DOM
const itemForm = document.querySelector("#itemForm");
const itemsDiv = document.querySelector("#itemsDiv");
const totalPriceDiv = document.querySelector("#totalPriceDiv");

//Generate and Populate items
const populateItemsDiv = async () => {
    const allItems = await db.items.reverse().toArray();

    itemsDiv.innerHTML = allItems.map(item => `
    <div class="item ${item.isPurchased && 'purchased'}">
        <label>
            <input 
                type="checkbox" 
                class="checkbox"
                onchange="toggleItemStatus(event, ${item.id})"
                ${item.isPurchased && 'checked'}
            >
        </label>
        <div class="itemInfo">
            <p>${item.name}</p>
            <p>$${item.price} X ${item.quantity}</p>
        </div>
        <button class="deleteButton" onclick="removeItem(${item.id})">X</button>
    </div>
    `).join("");

    const arrayOfPrices = allItems.map(item => item.price * item.quantity);
    const totalPrice = arrayOfPrices.reduce((a, b) => a + b, 0);

    totalPriceDiv.innerText = `Total Price: $${totalPrice}`;
}

window.onload = populateItemsDiv();

itemForm.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#nameInput").value;
    const quantity = document.querySelector("#quantityInput").value;
    const price = document.querySelector("#priceInput").value;

    await db.items.add({
        name,
        quantity,
        price
    })
    await populateItemsDiv();
    itemForm.reset();
}

const toggleItemStatus = async (event, id) => {
    await db.items.update(id, {isPurchased: !! event.target.checked });
    await populateItemsDiv();
}

const removeItem = async (id) => {
    await db.items.delete(id);
    await populateItemsDiv();
}