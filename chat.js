import {
    db,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "./firebase.js";


const createAccountBtn = document.getElementById("createAccountBtn");
const loginBtn = document.getElementById("loginBtn");


// Generate MEH-XXXXXX code
function generateCode() {

    const number = Math.floor(100000 + Math.random() * 900000);

    return "MEH-" + number;

}



// Create Account

createAccountBtn.onclick = async () => {

    const name = prompt("Enter your name:");

    if (!name) {
        alert("Name required");
        return;
    }


    const userCode = generateCode();


    try {

        await setDoc(doc(db, "users", userCode), {

            joined: new Date().toISOString(),

            name: name,

            role: "member"

        });


        alert(
            "Account created!\n\n" +
            "Your recovery code:\n" +
            userCode +
            "\n\nSave this code."
        );


    } catch (error) {

        console.error(error);

        alert("Error creating account");

    }

};




// Sign In

loginBtn.onclick = async () => {


    const code = prompt("Enter your recovery code:");

    if (!code) {
        return;
    }



    try {


        const userRef = doc(db, "users", code);

        const userSnap = await getDoc(userRef);



        if (userSnap.exists()) {


            const userData = userSnap.data();



            localStorage.setItem(
                "userCode",
                code
            );


            localStorage.setItem(
                "userName",
                userData.name
            );


            localStorage.setItem(
                "role",
                userData.role
            );



            alert(
                "Welcome " +
                userData.name +
                "\nRole: " +
                userData.role
            );



        } else {


            alert("Invalid recovery code");


        }



    } catch (error) {


        console.error(error);

        alert("Login error");


    }


};
