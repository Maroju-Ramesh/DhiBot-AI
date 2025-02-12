
//intro animation
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        let main=document.getElementById("main-content")
        main.style.opacity = "1"; 
        main.style.display = "block";
        main.style.display="flex";
        main.style.justifyContent="center";
        main.style.alignItems="center";
        
        
    }, 2000); 
});

//Dark Mode Switch
let promptbtn = document.getElementsByClassName("promptbtn")
var icon = document.getElementById("moon");
icon.onclick=function(){
    document.body.classList.toggle("light-theme");
    if(document.body.classList.contains("light-theme")){
        icon.src="./assets/moon.svg";
        for (let i = 0; i < promptbtn.length; i++) {
            promptbtn[i].style.filter = "none";
        }
        
    }
    else{
        icon.src = "./assets/sun.svg";
        for (let i = 0; i < promptbtn.length; i++) {
            promptbtn[i].style.filter = "invert(1)";
        }
    }
}



//signin signup navigation
let signinbtn = document.getElementById("signinbtn")
let signupbtn = document.getElementById("signupbtn")
let hero=document.getElementById("hero-nav")
let signinform =document.getElementById("signinform")
let signupform = document.getElementById("signupform")


function navigatetosignup(){
    signinform.style.display="none";
    hero.style.display="none";
    signupform.style.display="block";
}

function navigatetosignin(){
    hero.style.display="none";
    signupform.style.display="none";
    signinform.style.display="block";
}

function guestmode(page){
window.location.href=page;
}

// Sign-In Form Validation
document.addEventListener("DOMContentLoaded", function () {
    let signinForm = document.getElementById("signin-form");
    

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
    let html = ` <img id="user-image" src="./assets/userpic.png" alt="" />
        <div class="user-chat-area">
         ${user.data}
        </div>`
    prompt.value = ""
    let userChatBox = createChatBox(html, "user-chat-box")
    chatContainer.appendChild(userChatBox)

chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})


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


prompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handchatResponse(prompt.value)
    }

});
let btn = document.getElementById("enter")
btn.addEventListener("click",(e)=>{
    handchatResponse(prompt.value)
})