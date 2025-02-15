import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, getFirestore, setDoc, doc, getDoc } from "../firebase.js"

//intro animation


setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    let main = document.getElementById("main-content")
    main.style.opacity = "1";
    main.style.display = "block";
    main.style.display = "flex";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";


}, 2000);






//signin signup navigation
let hero = document.getElementById("hero-nav")
let signinform = document.getElementById("signinform")
let signupform = document.getElementById("signupform")


function navigatetosignup() {
    signinform.style.display = "none";
    hero.style.display = "none";
    signupform.style.display = "block";
}

function navigatetosignin() {
    hero.style.display = "none";
    signupform.style.display = "none";
    signinform.style.display = "block";
}

function guestmode(page) {
    localStorage.setItem("username", "Guest"); 
    window.location.href = page;
}

//back to home
function backtohome() {
    let main = document.getElementById("main-content");
    if (main) {
        main.style.display = "block";
        main.style.display = "flex";
        main.style.justifyContent = "center";
        main.style.alignItems = "center";
        setTimeout(() => {
            main.style.opacity = "1";
        }, 1000);
    }

    if (hero) {
        hero.style.display = "flex";
        hero.style.rowGap = "15px";
        signinform.style.display = "none";
    }

}

document.getElementById("signinbtn").addEventListener("click", navigatetosignin);
document.getElementById("signupbtn").addEventListener("click", navigatetosignup);
document.getElementById("guest").addEventListener("click", () => guestmode('home.html'));
document.getElementById("backtohome").addEventListener("click", backtohome);
document.getElementById("dontHaveAcc").addEventListener("click",navigatetosignup)
document.getElementById("alreadyAcc").addEventListener("click",navigatetosignin)

// Sign-In Form Validation

let signinForm = document.getElementById("signin-form");

signinForm.addEventListener("submit", async (e)=> {
    e.preventDefault()
    let email = e.target[0].value.trim();
    let password = e.target[1].value.trim();

    // Validation check
    if (!email.includes("@") || password.length < 8) {
        alert("Invalid email or password too short!");
        return;
    }

    // Firebase Sign-In
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            //Store user ID in localStorage
            localStorage.setItem("userUID", user.uid);

            return getDoc(doc(db, "users", user.uid)).then((userDoc) => {
                if (userDoc.exists()) {
                    let username = userDoc.data().name; // Get name from Firestore
                    localStorage.setItem("username", username);
                    alert(`Welcome back, ${username}!`); 
                } else {
                    alert("Welcome back! (No username found in Firestore)");
                }

                // Redirect to home page
                window.location.href = "home.html";

            });
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert(error.message);
        });
});


// Sign-Up Form Validation
let signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    let name = e.target[0].value
    let email = e.target[1].value;
    let password = e.target[2].value;

    if (name === "" || !email.includes("@") || password.length < 8) {
        alert("Please enter valid details!");
        return;
    }

    // Create user with Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Store user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

            alert(`Signup successful! Welcome, ${name}`);
            console.log("User created & data stored in Firestore:", user);
        
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert(error.message);
        });

});



