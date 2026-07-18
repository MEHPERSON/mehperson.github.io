import {
    db,
    doc,
    setDoc,
    getDoc
} from "./firebase.js";


const createAccountBtn = document.getElementById("createAccountBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");


const authCard = document.getElementById("authCard");
const userCard = document.getElementById("userCard");


const welcomeText = document.getElementById("welcomeText");
const userCodeText = document.getElementById("userCodeText");
const userRoleText = document.getElementById("userRoleText");




// Generate recovery code

function generateCode() {

    const number = Math.floor(
        100000 + Math.random() * 900000
    );

    return "MEH-" + number;

}





// Show logged in user

function showUser() {


    const code = localStorage.getItem("userCode");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    const isAdmin = localStorage.getItem("isAdmin");


    if (code && name && role) {


        authCard.style.display = "none";

        userCard.style.display = "block";


        welcomeText.textContent =
            "Welcome back, " + name;


        userCodeText.textContent = code;

        userRoleText.textContent =
            role +
            (isAdmin === "true" ? " (Admin)" : "");


    }

}






// Create Account

createAccountBtn.onclick = async () => {


    const name = prompt("Enter your name");


    if (!name) return;



    const code = generateCode();



    await setDoc(
        doc(db, "users", code),
        {

            joined: new Date().toISOString(),

            name: name,

            role: "member",

            isAdmin: false

        }
    );



    alert(
        "Account created!\n\nYour code:\n" +
        code
    );


};







// Login

loginBtn.onclick = async () => {


    const code = prompt(
        "Enter your recovery code"
    );


    if (!code) return;




    const userSnap = await getDoc(
        doc(db, "users", code)
    );




    if (userSnap.exists()) {


        const data = userSnap.data();



        localStorage.setItem(
            "userCode",
            code
        );


        localStorage.setItem(
            "userName",
            data.name
        );


        localStorage.setItem(
            "role",
            data.role
        );


        localStorage.setItem(
            "isAdmin",
            data.isAdmin || false
        );



        showUser();



    } else {


        alert("Invalid recovery code");


    }


};







// Logout

logoutBtn.onclick = () => {


    localStorage.clear();


    userCard.style.display = "none";

    authCard.style.display = "block";


};







// Check saved login

showUser();
