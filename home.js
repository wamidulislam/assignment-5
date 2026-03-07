// card counting dynamically
const card = document.getElementById("cardCount");


// get the element
const cardContainer = document.getElementById("cards")

async function loadCards() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json();
    displayCards(data.data);
    
}

function displayCards(cards){
    // card count
    card.innerText = cards.length
    // loop
    cards.forEach((card)=>{
     const createCard = document.createElement("div")
     createCard.innerHTML = `
        <div class="card w-[310px] h-[400px] bg-base-100 shadow-xl border-t-3 border-t-[#00A96E] ">
          <div class="card-body">
            <div class="card nav grid grid-cols-2">
              <div>
                <img src="./assets/Open-Status.png" alt="" />
              </div>
              <div class="bg-[#FEECEC] text-center rounded-full">
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