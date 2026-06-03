let slideIndex = 0;

function showSlide() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

function changeSlide(n) {
  slideIndex += n;
  showSlide();
}

function currentSlide(n) {
  slideIndex = n;
  showSlide();
}

// Auto-rotate slides every 5 seconds
setInterval(() => {
  slideIndex++;
  showSlide();
}, 5000);

function showSection(id){
  document.querySelectorAll(".page").forEach(page=>{
    page.classList.remove("active");
  });
  
  document.getElementById(id).classList.add("active");
  
  // Reset slider when home page is shown
  if(id === 'home') {
    slideIndex = 0;
    showSlide();
  }
}

const themeSelector = document.getElementById("themeSelector");

themeSelector.addEventListener("change",()=>{
  document.body.classList.remove("pink","blue","white","purple");
  document.body.classList.add(themeSelector.value);
});

// Image upload preview for Marketplace
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

// Image upload preview for Laundry
const laundryImageInput = document.getElementById("laundryImage");
const laundryImagePreview = document.getElementById("laundryImagePreview");

laundryImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      laundryImagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
      laundryImagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Image upload preview for Lost & Found
const lostImageInput = document.getElementById("lostImage");
const lostImagePreview = document.getElementById("lostImagePreview");

lostImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      lostImagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
      lostImagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

function generateDescription(){
  const desc = document.getElementById("itemDesc");
  desc.value = "This item is in good condition and suitable for student dormitory use.";
}

function addItem(){
  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;
  const condition = document.getElementById("itemCondition").value;
  const description = document.getElementById("itemDesc").value;
  const imageData = imagePreview.querySelector("img") ? 
                     imagePreview.querySelector("img").src : null;

  if(!name || !price) {
    alert("Please fill in item name and price");
    return;
  }

  const items = JSON.parse(localStorage.getItem("items")) || [];

  items.push({
    name,
    price,
    condition,
    description,
    image: imageData,
    dateAdded: new Date().toLocaleDateString()
  });

  localStorage.setItem("items", JSON.stringify(items));

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
  const list = document.getElementById("itemList");
  list.innerHTML = "";

  const items = JSON.parse(localStorage.getItem("items")) || [];

  if(items.length === 0) {
    list.innerHTML = "<div style='grid-column: 1/-1; text-align: center; padding: 40px; color: #999;'><p>No items listed yet. Be the first to add! 🚀</p></div>";
    return;
  }

  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "marketplace-item";

    const conditionBadge = `<span class="condition-badge ${item.condition}">${item.condition.toUpperCase()}</span>`;
    const imageHtml = item.image ? 
                      `<img src="${item.image}" alt="${item.name}" class="item-image">` : 
                      "<div class='no-image'>📸 No Image</div>";

    itemDiv.innerHTML = `
      <div class="item-content">
        ${imageHtml}
        <div class="item-details">
          <h3>${item.name}</h3>
          ${conditionBadge}
          <p class="price">RM ${item.price}</p>
          <p class="description">${item.description || "No description"}</p>
          <p class="date-added">📅 Added: ${item.dateAdded}</p>
          <button onclick="deleteItem(${index})" class="delete-btn">🗑️ Delete</button>
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
  const machine = document.getElementById("machineNumber").value;
  const time = document.getElementById("laundryTime").value;
  const imageData = laundryImagePreview.querySelector("img") ? 
                     laundryImagePreview.querySelector("img").src : null;

  if(!machine || !time) {
    alert("Please fill in machine number and time");
    return;
  }

  const reminders = JSON.parse(localStorage.getItem("laundry")) || [];

  reminders.push({
    machine,
    time,
    image: imageData,
    dateAdded: new Date().toLocaleDateString()
  });

  localStorage.setItem("laundry", JSON.stringify(reminders));

  // Clear form
  document.getElementById("machineNumber").value = "";
  document.getElementById("laundryTime").value = "";
  document.getElementById("laundryImage").value = "";
  laundryImagePreview.innerHTML = "";
  laundryImagePreview.style.display = "none";

  loadLaundry();
}

function loadLaundry(){
  const list = document.getElementById("laundryList");
  list.innerHTML = "";

  const reminders = JSON.parse(localStorage.getItem("laundry")) || [];

  if(reminders.length === 0) {
    list.innerHTML = "<li style='text-align: center; padding: 40px; color: #999;'><p>No laundry reminders yet. ✨</p></li>";
    return;
  }

  reminders.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "laundry-item";

    const imageHtml = r.image ? 
                      `<img src="${r.image}" alt="Laundry" class="laundry-image">` : 
                      "<div class='no-image' style='width: 120px; height: 120px; border-radius: 10px;'>📸</div>";

    li.innerHTML = `
      <div class="laundry-image-container">
        ${imageHtml}
      </div>
      <div class="laundry-details">
        <p><strong>🧺 Machine ${r.machine}</strong> • ⏱️ ${r.time}</p>
        <p style="font-size: 12px;">📅 Added: ${r.dateAdded}</p>
        <button onclick="deleteLaundry(${index})" class="delete-btn">🗑️ Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function deleteLaundry(index) {
  const reminders = JSON.parse(localStorage.getItem("laundry")) || [];
  reminders.splice(index, 1);
  localStorage.setItem("laundry", JSON.stringify(reminders));
  loadLaundry();
}

function addLostItem(){
  const item = document.getElementById("lostItem").value;
  const location = document.getElementById("lostLocation").value;
  const imageData = lostImagePreview.querySelector("img") ? 
                     lostImagePreview.querySelector("img").src : null;

  if(!item || !location) {
    alert("Please fill in item name and location");
    return;
  }

  const lost = JSON.parse(localStorage.getItem("lost")) || [];

  lost.push({
    item,
    location,
    image: imageData,
    dateAdded: new Date().toLocaleDateString()
  });

  localStorage.setItem("lost", JSON.stringify(lost));

  // Clear form
  document.getElementById("lostItem").value = "";
  document.getElementById("lostLocation").value = "";
  document.getElementById("lostImage").value = "";
  lostImagePreview.innerHTML = "";
  lostImagePreview.style.display = "none";

  loadLost();
}

function loadLost(){
  const list = document.getElementById("lostList");
  list.innerHTML = "";

  const lost = JSON.parse(localStorage.getItem("lost")) || [];

  if(lost.length === 0) {
    list.innerHTML = "<li style='text-align: center; padding: 40px; color: #999;'><p>No lost items reported yet. 🔍</p></li>";
    return;
  }

  lost.forEach((i, index) => {
    const li = document.createElement("li");
    li.className = "lost-item";

    const imageHtml = i.image ? 
                      `<img src="${i.image}" alt="Lost item" class="lost-image">` : 
                      "<div class='no-image' style='width: 120px; height: 120px; border-radius: 10px;'>📸</div>";

    li.innerHTML = `
      <div class="lost-image-container">
        ${imageHtml}
      </div>
      <div class="lost-details">
        <p><strong>🔍 ${i.item}</strong> • 📍 ${i.location}</p>
        <p style="font-size: 12px;">📅 Added: ${i.dateAdded}</p>
        <button onclick="deleteLostItem(${index})" class="delete-btn">🗑️ Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function deleteLostItem(index) {
  const lost = JSON.parse(localStorage.getItem("lost")) || [];
  lost.splice(index, 1);
  localStorage.setItem("lost", JSON.stringify(lost));
  loadLost();
}

// Initialize
loadItems();
loadLaundry();
loadLost();
showSlide();
