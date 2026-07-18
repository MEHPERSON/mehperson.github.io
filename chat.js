import {
    db,
    doc,
    setDoc,
    getDoc
} from "./firebase.js";


const createAccountBtn =
    document.getElementById("createAccountBtn");

const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


const createGroupBtn =
    document.getElementById("createGroupBtn");


const authCard =
    document.getElementById("authCard");

const userCard =
    document.getElementById("userCard");


const groupsCard =
    document.getElementById("groupsCard");


const welcomeText =
    document.getElementById("welcomeText");

const userCodeText =
    document.getElementById("userCodeText");

const userRoleText =
    document.getElementById("userRoleText");





function generateCode() {

    const number =
        Math.floor(100000 + Math.random() * 900000);

    return "MEH-" + number;

}





function showUser() {


    const code =
        localStorage.getItem("userCode");

    const name =
        localStorage.getItem("userName");

    const role =
        localStorage.getItem("role");

    const isAdmin =
        localStorage.getItem("isAdmin");



    console.log("Saved login:");
    console.log("Code:", code);
    console.log("Name:", name);
    console.log("Role:", role);
    console.log("isAdmin:", isAdmin);



    if (code && name && role) {


        authCard.style.display = "none";

        userCard.style.display = "block";

        groupsCard.style.display = "block";


        welcomeText.textContent =
            "Welcome back, " + name;


        userCodeText.textContent =
            code;


        userRoleText.textContent =
            role +
            (isAdmin === "true" ? " (Admin)" : "");



        if (isAdmin === "true") {

            createGroupBtn.style.display =
                "block";

        }


    }

}









// Create Account

createAccountBtn.onclick = async () => {


    const name =
        prompt("Enter your name");


    if (!name) return;



    const code =
        generateCode();



    await setDoc(
        doc(db, "users", code),
        {

            joined:
                new Date().toISOString(),

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


    const code =
        prompt("Enter your recovery code");


    if (!code) return;




    const userSnap =
        await getDoc(
            doc(db, "users", code)
        );



    if (userSnap.exists()) {


        const data =
            userSnap.data();



        console.log(
            "USER DATA FROM FIRESTORE:",
            data
        );


        console.log(
            "ADMIN VALUE:",
            data.isAdmin
        );




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
            data.isAdmin
        );



        showUser();



    } else {


        alert("Invalid code");


    }


};









// Create Group placeholder

if (createGroupBtn) {

    createGroupBtn.onclick = () => {

        alert("Create group system coming next");

    };

}









// Logout

logoutBtn.onclick = () => {


    localStorage.clear();


    location.reload();


};









showUser();
