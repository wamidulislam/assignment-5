// card counting dynamically
const card = document.getElementById("cardCount");
const spinner  = document.getElementById("loadingSpin")


// get element modal
const modal = document.getElementById("card_details")
const modalTitle = document.getElementById("cardTitle")
const cardStatus = document.getElementById("cardStatus")
const cardOpener = document.getElementById("cardOpener")
const openDate = document.getElementById("openDate")
const cardBug = document.getElementById("cardBug")
const cardHelp = document.getElementById("cardHelp")
const description = document.getElementById("description")
const person = document.getElementById("person")
const cardPriority = document.getElementById("cardPriority")




// get the element
const cardContainer = document.getElementById("cards")

// Loading spinner
async function showSpinner() {
    spinner.classList.remove("hidden");
    spinner.classList.add("flex")
}

async function hideSpinner() {
    spinner.classList.add("hidden");
}


let allCards = [];
async function loadCards() {
  showSpinner()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    allCards = (data.data);
    displayCards(allCards)
    hideSpinner()
}

function displayCards(cards){
    cardContainer.innerHTML = "";
    // card count
    card.innerText = cards.length
    // loop
    cards.forEach((card)=>{
      // change border color
      let border = '';
      if(card.status === "open"){
        border = 'border-t-3 border-t-green-500'}
        else{
          border = 'border-t-3 border-t-purple-500'
        }
        // change icon img
        let icon = '';
        if(card.status === "open"){
        icon = '<img src="./assets/Open-Status.png" alt="" />'}
        else{
          icon = '<img src="./assets/Closed- Status .png" alt="">'
        }

        // change status color
        let priority = '';
        if(card.priority === "high"){
          priority = 'bg-[#FEECEC] text-[#EF4444] text-center rounded-full'}
        else if (card.priority === "medium") {
          priority = 'bg-[#FFF6D1] text-[#F59E0B] text-center rounded-full'   
        } 
        else {
          priority = 'bg-[#EEEFF2] text-[#9CA3AF] text-center rounded-full'
        }
       
     
     const createCard = document.createElement("div")
     createCard.innerHTML = `
        <div onclick="openModal(${card.id})" class="card w-[310px] h-[400px] bg-base-100 shadow-xl 
        ${border} 
        ">
          <div class="card-body">
            <div class="card nav grid grid-cols-2">
              <div>
                ${icon}
              </div>
              <div class = "${priority}">
                <p>${card.priority}</p>
              </div>
            </div>
            <h2 class="card-title">${card.title}</h2>
            <p class="text-[#64748B]">
              ${card.description}
            </p>
            <div class="flex gap-2">
              <p
                class="bg-[#FEECEC] border border-[#FECACA] text-[#EF4444] text-center rounded-full"
              >
                <i class="fa-solid fa-bug" style="color: rgb(239, 68, 68)"></i
                // >
                ${card.labels[0]}
              </p>
              <p
                class="bg-[#FFF8DB] border border-[#FDE68A] text-[#D97706] text-center rounded-full"
              >
                <i
                  class="fa-solid fa-life-ring"
                  style="color: rgb(217, 119, 6)"
                ></i
                >
                ${card.labels[1]}
              </p>
            </div>
            <hr class="border-t-2 border-gray-200 my-2" />
            <div class = "flex justify-between items-center gap-10">
                <p class="text-[#64748B]">${card.author}</p>
                <p class="text-[#64748B]">${card.createdAt}</p>
            </div>
            <div class = "flex justify-between items-center gap-10">
                <p class="text-[#64748B]">${card.assignee || "Not Found"}</p>
                <p class="text-[#64748B]">${card.updatedAt}</p>
            </div>
            
          </div>
        </div>
     `
     cardContainer.appendChild(createCard)
    })
}
// Button events
 async function buttonClick(){
  document.getElementById("allBtn").addEventListener("click", function(){
  showSpinner();
  displayCards(allCards)
  hideSpinner();
})
document.getElementById("openBtn").addEventListener("click", () => {
    showSpinner();
        const openCards = allCards.filter(card => card.status === "open");
        displayCards(openCards);
        hideSpinner();
    })
document.getElementById("closeBtn").addEventListener("click",function (){
  showSpinner();
  const closeCards = allCards.filter(card => card.status === "closed");
   displayCards(closeCards)
   hideSpinner();
})
 }
  // modal function
 async function openModal(cardId){
  // Fetch single card data from API using the id
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
  const data = await res.json();
  const issue = data.data;

  // change inner text
  modalTitle.innerText = issue.title;
  cardStatus.innerText = issue.status;
  cardOpener.innerText = "Opened by " + issue.assignee;
  openDate.innerText = issue.createdAt;
  description.innerText = issue.description;
  person.innerText = issue.assignee || "No information";
  cardPriority.innerText = issue.priority;
  cardBug.innerText = issue.labels[0];
  cardHelp.innerText = issue.labels[1];

  modal.showModal();
}

 loadCards();
  buttonClick();


// button color
const colorBtn = (status) => {
  const allBtn = document.getElementById("allBtn")
  const openBtn = document.getElementById("openBtn")
  const closeBtn = document.getElementById("closeBtn")
  if(status === "all"){
    allBtn.classList.add("btn-primary")
    openBtn.classList.remove("btn-primary")
    closeBtn.classList.remove("btn-primary")
  }
  else if(status === "open"){
    allBtn.classList.remove("btn-primary")
    openBtn.classList.add("btn-primary")
    closeBtn.classList.remove("btn-primary")
  }
  else{
    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    closeBtn.classList.add("btn-primary")
  }

}



// search implement based on title
document.getElementById("btn-search").addEventListener('click', ()=> {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue)
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
  .then((res) => res.json())
  .then((data) => {
    const allSearch = data.data;
    const filterSearch = allSearch.filter(search => search.title.toLowerCase().
    includes(searchValue));
    console.log(filterSearch);
    displayCards(filterSearch)
  });


})