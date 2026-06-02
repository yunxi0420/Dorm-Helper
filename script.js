function showSection(id){

document
.querySelectorAll(".page")
.forEach(page=>{
page.classList.remove("active");
});

document
.getElementById(id)
.classList.add("active");

}

const themeSelector =
document.getElementById("themeSelector");

themeSelector.addEventListener("change",()=>{

document.body.classList.remove(
"pink",
"blue",
"white"
);

document.body.classList.add(
themeSelector.value
);

});

function generateDescription(){

const desc =
document.getElementById("itemDesc");

desc.value =
"This item is in good condition and suitable for student dormitory use.";

}

function addItem(){

const name =
document.getElementById("itemName").value;

const price =
document.getElementById("itemPrice").value;

if(!name) return;

const items =
JSON.parse(localStorage.getItem("items"))
|| [];

items.push({
name,
price
});

localStorage.setItem(
"items",
JSON.stringify(items)
);

loadItems();

}

function loadItems(){

const list =
document.getElementById("itemList");

list.innerHTML = "";

const items =
JSON.parse(localStorage.getItem("items"))
|| [];

items.forEach(item=>{

const li =
document.createElement("li");

li.textContent =
`${item.name} - RM ${item.price}`;

list.appendChild(li);

});

}

function addLaundry(){

const machine =
document.getElementById("machineNumber").value;

const time =
document.getElementById("laundryTime").value;

const reminders =
JSON.parse(localStorage.getItem("laundry"))
|| [];

reminders.push({
machine,
time
});

localStorage.setItem(
"laundry",
JSON.stringify(reminders)
);

loadLaundry();

}

function loadLaundry(){

const list =
document.getElementById("laundryList");

list.innerHTML = "";

const reminders =
JSON.parse(localStorage.getItem("laundry"))
|| [];

reminders.forEach(r=>{

const li =
document.createElement("li");

li.textContent =
`Machine ${r.machine} - ${r.time}`;

list.appendChild(li);

});

}

function addLostItem(){

const item =
document.getElementById("lostItem").value;

const location =
document.getElementById("lostLocation").value;

const lost =
JSON.parse(localStorage.getItem("lost"))
|| [];

lost.push({
item,
location
});

localStorage.setItem(
"lost",
JSON.stringify(lost)
);

loadLost();

}

function loadLost(){

const list =
document.getElementById("lostList");

list.innerHTML = "";

const lost =
JSON.parse(localStorage.getItem("lost"))
|| [];

lost.forEach(i=>{

const li =
document.createElement("li");

li.textContent =
`${i.item} found at ${i.location}`;

list.appendChild(li);

});

}

loadItems();
loadLaundry();
loadLost();