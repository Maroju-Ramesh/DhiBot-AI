//changing the username on navbar
    let navbarUsername = document.getElementById("nav-username");

    // Retrieve username from localStorage
    let username = localStorage.getItem("username");

    if (!username || username === "Guest") {
        navbarUsername.innerText = "Guest";
    } else {
        navbarUsername.innerText = username;
    }

//logout from home

function logout(){
    window.location.href="index.html";
}
document.getElementById("logout").addEventListener("click",logout);
document.getElementById("logout-mini").addEventListener("click",logout);

//Dark Mode Switch
function darkMode(){
    let promptbtn = document.getElementsByClassName("promptbtn")
    var icon = document.getElementById("sun");
    
        document.body.classList.toggle("light-theme");
        if (document.body.classList.contains("light-theme")) {
            icon.src = "./assets/moon.svg";
            for (let i = 0; i < promptbtn.length; i++) {
                promptbtn[i].style.filter = "none";
            }
    
        }
        else {
            icon.src = "./assets/sun.svg";
            for (let i = 0; i < promptbtn.length; i++) {
                promptbtn[i].style.filter = "invert(1)";
            }
        
    }
    
}




//mobile mode menu list

document.getElementById("menu-list").addEventListener("click", function () {
    let menu = document.getElementById("nav-menu");
    
   
    menu.classList.toggle("show");
});




// ------------------home---------------------

let prompt = document.querySelector("#prompt")
let chatContainer = document.querySelector(".hero-container")

const Api_Url = "https://dhibot-ai.onrender.com/api/gemini";
let user = {
    data: null,
}

async function generateResponse(aiChatBox) {

    let text = aiChatBox.querySelector(".ai-chat-area")
    let RequestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: user.data })
    };
    try {
        let response = await fetch(Api_Url, RequestOption)
        let data = await response.json()

        // console.log("API Response:", data);


        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()
        if (apiResponse.includes("large language model")) {
            apiResponse = apiResponse.replace(/large language model/gi, "DhiBot AI");
        }
        
        text.innerHTML = apiResponse;
    }
    catch (error) {
        console.log(error);
        text.innerHTML = "Sorry, I encountered an issue. Please try again later.";
    }

    finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" })
    }
}

function createChatBox(html, classes) {
    let div = document.createElement("div")
    div.innerHTML = html;
    div.classList.add(classes)
    return div
}

function handchatResponse(message) {
    user.data = message
    if (message.length != 0) {
        let html = ` <img id="user-image" src="./assets/userpic.png" alt="" />
        <div class="user-chat-area">
         ${user.data}
        </div>`
        prompt.value = ""
        let userChatBox = createChatBox(html, "user-chat-box")
        chatContainer.appendChild(userChatBox)

        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" })


        setTimeout(() => {
            let html = `<img id="ai-image"  src="./assets/Ai-img.jpg" alt="" />
        <div class="ai-chat-area">
          <div class="typing-indicator">
  <span></span>
  <span></span>
  <span></span>
</div>
  </div>`
            let aiChatBox = createChatBox(html, "ai-chat-box")
            chatContainer.appendChild(aiChatBox)
            generateResponse(aiChatBox)
        }, 600)
    }
}


prompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handchatResponse(prompt.value)
    }

});
let btn = document.getElementById("enter")
btn.addEventListener("click", (e) => {
    handchatResponse(prompt.value)
})