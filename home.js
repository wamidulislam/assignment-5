// card counting dynamically
const card = document.getElementById("cardCount");
const spinner  = document.getElementById("loadingSpin")


// modal
// {
// "status": "success",
// "message": "Issue fetched successfully",
// "data": {
// "id": 8,
// "title": "Database migration fails on production",
// "description": "The latest migration script fails when running on production database. Works fine locally.",
// "status": "open",
// "labels": [
// "bug"
// ],
// "priority": "high",
// "author": "db_admin",
// "assignee": "alex_perf",
// "createdAt": "2024-01-21T08:45:00Z",
// "updatedAt": "2024-01-21T08:45:00Z"
// }
// }

// get element modal
const modal = document.getElementById("card_details")








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
        <div onclick = "openModal()" class="card w-[310px] h-[400px] bg-base-100 shadow-xl ${border} 
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
 async function openModal(card){
  const res =await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/${card.data.id}")
  const data =await res.json();
  console.log(data)
  card_details.showModal()
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