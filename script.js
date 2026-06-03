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

// Image upload preview
const itemImageInput = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");

itemImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
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

const condition =
document.getElementById("itemCondition").value;

const description =
document.getElementById("itemDesc").value;

const imageData =
imagePreview.querySelector("img") ? 
imagePreview.querySelector("img").src : null;

if(!name || !price) {
  alert("Please fill in item name and price");
  return;
}

const items =
JSON.parse(localStorage.getItem("items"))
|| [];

items.push({
  name,
  price,
  condition,
  description,
  image: imageData,
  dateAdded: new Date().toLocaleDateString()
});

localStorage.setItem(
"items",
JSON.stringify(items)
);

// Clear form
document.getElementById("itemName").value = "";
document.getElementById("itemPrice").value = "";
document.getElementById("itemCondition").value = "new";
document.getElementById("itemDesc").value = "";
document.getElementById("itemImage").value = "";
imagePreview.innerHTML = "";
imagePreview.style.display = "none";

loadItems();

}

function loadItems(){

const list =
document.getElementById("itemList");

list.innerHTML = "";

const items =
JSON.parse(localStorage.getItem("items"))
|| [];

if(items.length === 0) {
  list.innerHTML = "<p>No items listed yet. Be the first to add!</p>";
  return;
}

items.forEach((item, index) => {

const itemDiv =
document.createElement("div");

itemDiv.className = "marketplace-item";

const conditionBadge = `<span class="condition-badge ${item.condition}">${item.condition.toUpperCase()}</span>`;

const imageHtml = item.image ? 
`<img src="${item.image}" alt="${item.name}" class="item-image">` : 
"<div class='no-image'>No Image</div>";

itemDiv.innerHTML = `
  <div class="item-content">
    ${imageHtml}
    <div class="item-details">
      <h3>${item.name}</h3>
      ${conditionBadge}
      <p class="price">RM ${item.price}</p>
      <p class="description">${item.description || "No description"}</p>
      <p class="date-added">Added: ${item.dateAdded}</p>
      <button onclick="deleteItem(${index})" class="delete-btn">Delete</button>
    </div>
  </div>
`;

list.appendChild(itemDiv);

});

}

function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
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
