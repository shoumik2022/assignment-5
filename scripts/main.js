const username = document.getElementById("username");
const password = document.getElementById("password");
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const cartContainer = document.getElementById("cartContainer");
const totalCount = document.getElementById("totalCount");
const loaderSpinner = document.getElementById("loaderSpinner");
const myModal = document.getElementById("my_modal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("author");
const modalTime = document.getElementById("time");
const modalDes = document.getElementById("modal-des");
const modalAssignee = document.getElementById("assignee");
const modalPriority = document.getElementById("priority");
let allCart = [];
let openCart = [];
let closedCard = [];
let stat = "all";
function showLoader() {
    loaderSpinner.classList.remove("hidden");
}
function hideLoader() {
    loaderSpinner.classList.add("hidden");
}
function openModal(item) {
    myModal.showModal();
    modalTitle.textContent = item.title;
    modalAuthor.textContent = item.author;
    modalTime.textContent = item.updatedAt;
    modalDes.textContent = item.description;
    modalAssignee.textContent = item.assignee;
    modalPriority.textContent = item.priority;
}
//toggle btn
function toggleButton(id) {
    showLoader();
    stat = id;
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");

    document.getElementById(id).classList.add("btn-primary");

    loadAllIssue();
}
const loadAllIssue = async () => {
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );
    const data = await res.json();
    hideLoader();
    displayAllIssue(data.data);
};
loadAllIssue();
const displayAllIssue = (issues) => {
    let count = 0;
    cartContainer.innerHTML = "";

    issues.forEach((item) => {
        if (stat === "all" || item.status === stat) {
            count++;

            const cart = document.createElement("div");

            // Top border color using Tailwind classes
            const topBorderColor = item.status === "open"
                ? "border-t-4 border-green-500"
                : "border-t-4 border-purple-500";

            const prioryClass =
                item.priority === "high"
                    ? "text-[#EF4444] bg-[#FEECEC]"
                    : item.priority === "medium"
                        ? "text-[#F59E0B] bg-[#FFF6D1]"
                        : "text-[#9CA3AF] bg-[#EEEFF2]";

            const statusIcon =
                item.status === "closed"
                    ? '<img class="w-8 h-8" src="assets/Closed- Status.png" alt="Closed" />'
                    : '<img class="w-8 h-8" src="assets/Open-Status.png" alt="Open" />';
            cart.className = `bg-white shadow-xl rounded-xl px-5 py-3 space-y-3 cursor-pointer ${topBorderColor}`;

            cart.innerHTML = `
        <div class="flex justify-between items-center">
          ${statusIcon}
          <p class="${prioryClass} px-5 py-2 rounded-b-2xl rounded-t-2xl">
            ${item.priority.toUpperCase()}
          </p>
        </div>
        <div>
          <h2 class="text-[17px] font-semibold">${item.title}</h2>
        </div>
        <div>
          <p class="text-[12px] text-[#64748B] line-clamp-2">${item.description}</p>
        </div>
        <div class="flex justify-start items-center gap-2">
          <p class="text-[#EF4444] bg-[#FEECEC] text-[12px] px-2 py-1 rounded-b-2xl rounded-t-2xl">
            <i class="fa-solid fa-bug"></i> BUG
          </p>
          <p class="text-[#F59E0B] bg-[#FFF6D1] text-[12px] px-2 py-1 rounded-b-2xl rounded-t-2xl">
            <i class="fa-solid fa-life-ring"></i> HELP WANTED
          </p>
        </div>
        <div class="divider -mx-5"></div>
        <div>
          <p class="text-[13px] text-[#64748B]">#1 by ${item.author}</p>
          <p class="text-[13px] text-[#64748B] p-2">${item.createdAt}</p>
        </div>
      `;
            cart.addEventListener("click", () => openModal(item));
            cartContainer.appendChild(cart);
        }
    });
    totalCount.textContent = count;
};