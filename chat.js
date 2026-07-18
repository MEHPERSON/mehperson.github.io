import {
    db,
    doc,
    setDoc,
    getDoc
} from "./firebase.js";

// Buttons
const createBtn = document.getElementById("createAccountBtn");
const loginBtn = document.getElementById("loginBtn");

// Generate recovery code
function generateCode() {
    return "MEH-" + Math.floor(100000 + Math.random() * 900000);
}

// Create account
createBtn.onclick = async () => {

    let name = prompt("Enter your display name:");

    if (!name) return;

    let code = generateCode();

    // Make sure the code is unique
    while ((await getDoc(doc(db, "users", code))).exists()) {
        code = generateCode();
    }

    await setDoc(doc(db, "users", code), {
        name: name,
        role: "member",
        joined: new Date().toISOString()
    });

    localStorage.setItem("mehUser", code);

    alert(
`Account created!

Your recovery code:

${code}

SAVE THIS CODE!
You will need it to log in on another device.`
    );

    location.reload();
};

//
