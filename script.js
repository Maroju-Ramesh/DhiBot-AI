function navigate(page) {
    window.location.href = page;
}

// Sign-In Form Validation
document.addEventListener("DOMContentLoaded", function () {
    let signinForm = document.getElementById("signin-form");
    let btn = document.getElementById("signinbtn");

    // btn.addEventListener("click",()=>)
    if (signinForm) {
        signinForm.addEventListener("submit", function (event) {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (!email.includes("@") || password.length < 8) {
                alert("Invalid email or password too short!");
                event.preventDefault(); // Stop form submission
            }
        });
    }

    // Sign-Up Form Validation
    let signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            let name = document.getElementById("name").value;
            let email = document.getElementById("signup-email").value;
            let password = document.getElementById("signup-password").value;

            if (name.trim() === "" || !email.includes("@") || password.length < 8) {
                alert("Please enter valid details!");
                event.preventDefault();
            }
            
        });
    }
});



// ------------------home---------------------

let prompt = document.querySelector("#prompt")
let chatContainer = document.querySelector(".hero-container")

const Api_Url = "https://dhibot-ai.onrender.com/api/gemini";
let user = {
    data: null,
}

async function generateResponse(aiChatBox) {

    let text=aiChatBox.querySelector(".ai-chat-area")
    let RequestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: user.data }) 
    };
    try{
        let response = await fetch(Api_Url, RequestOption)
        let data=await response.json()

        // console.log("API Response:", data);


        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
       if(apiResponse.includes("large language model"))
        {
            apiResponse = apiResponse.replace(/large language model/gi, "DhiBot AI");
       } 
    //    if(apiResponse.includes("trained by google")){
    //     apiResponse = apiResponse.replace(/trained by google/gi, "M.Ramesh");
    //    }
       text.innerHTML=apiResponse;
    }
   catch(error){
    console.log(error);
    text.innerHTML = "Sorry, I encountered an issue. Please try again later.";
   }

   finally{
    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
   }
}

function createChatBox(html, classes) {
    let div = document.createElement("div")
    div.innerHTML = html;
    div.classList.add(classes)
    return div
}

function handchatResponse(message) {
    user.data=message
    let html = ` <img id="user-image" src="./assets/sample.jpg" alt="" width="50"/>
        <div class="user-chat-area">
         ${user.data}
        </div>`
    prompt.value = ""
    let userChatBox = createChatBox(html, "user-chat-box")
    chatContainer.appendChild(userChatBox)

chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})


    setTimeout(() => {
        let html = `<img id="ai-image"  src="./assets/Ai.webp" width="50" alt="" />
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


prompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handchatResponse(prompt.value)
    }

});
let btn = document.getElementById("enter")
btn.addEventListener("click",(e)=>{
    handchatResponse(prompt.value)
})