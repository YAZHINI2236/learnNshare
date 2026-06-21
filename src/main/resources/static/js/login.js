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

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }
    );

    const result = await response.text();

	const message =
	    document.getElementById("registerMessage");

	message.innerText = result;

	if(result === "User Registered Successfully"){
	    message.style.color = "green";
	}else{
	    message.style.color = "red";
	}

    if(result === "User Registered Successfully") {

        document.getElementById("registerName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";

        container.classList.remove("right-panel-active");
    }
}


// LOGIN USER

async function loginUser() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(
        "http://localhost:8080/api/users/login",
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

    const result = await response.text();

	const message =
	    document.getElementById("loginMessage");

	message.innerText = result;

	if(result === "Login Successful"){
	    message.style.color = "green";
	}else{
	    message.style.color = "red";
	}

    if(result === "Login Successful") {

        sessionStorage.setItem("userEmail", email);

		setTimeout(() => {

		    window.location.href =
		        "/pages/dashboard.html";

		}, 1500);
    }
}
