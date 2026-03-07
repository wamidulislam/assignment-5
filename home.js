// card counting dynamically
const card = document.getElementById("cardCount");



// get the element
const cardContainer = document.getElementById("cards")

let allCards = [];
async function loadCards() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    allCards = (data.data);
    displayCards(allCards)
    
}

// load single issues
async function loadIssue() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}")
  const data = await res.json();
  
}
loadIssue()

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
        <div class="card w-[310px] h-[400px] bg-base-100 shadow-xl ${border} 
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
loadCards();
// Button events
document.getElementById("allBtn").addEventListener("click", function(){
  displayCards(allCards)
})
document.getElementById("openBtn").addEventListener("click", function(){
  const openCards = allCards.filter(card => card.status === "open");
  displayCards(openCards)
})
document.getElementById("closeBtn").addEventListener("click",function (){
  const closeCards = allCards.filter(card => card.status === "closed");
  displayCards(closeCards)
})
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