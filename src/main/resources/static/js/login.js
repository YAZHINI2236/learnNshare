const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// REGISTER USER

async function registerUser() {

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;
		
		const role =
		    document.getElementById("registerRole").value;

		console.log("ROLE SELECTED =", role);
		
    

    const response = await fetch(
        "/api/users/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role
            })
        }
    );

    const result = await response.text();

    const message =
        document.getElementById("registerMessage");

    message.innerText = result;

    if(result === "User Registered Successfully") {

        message.style.color = "green";

        document.getElementById("registerName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";

        container.classList.remove("right-panel-active");

    } else {

        message.style.color = "red";
    }
}


// LOGIN USER
async function loginUser() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(
        "/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    if (!response.ok) {

        document.getElementById("loginMessage").innerText =
            "Invalid Email or Password";

        return;
    }

    const data = await response.json();

	sessionStorage.setItem("userEmail", email);

	localStorage.setItem("token", data.token);

	sessionStorage.setItem("userName", data.name);

	sessionStorage.setItem("userRole", data.role);

    document.getElementById("loginMessage").innerText =
        "Login Successful";

    setTimeout(() => {

        window.location.href =
            "/pages/dashboard.html";

    }, 1000);
}