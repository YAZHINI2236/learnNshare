const userName =
    sessionStorage.getItem("userName");
	if(userName){

	    document.getElementById("welcomeText")
	        .innerText =
	        "Welcome back, " + userName + "!";

	}

const userRole =
    sessionStorage.getItem("userRole");
	sessionStorage.setItem("userRole", data.role);

const role =
	    sessionStorage.getItem("userRole");

	if(role !== "ADMIN"){

	    document.getElementById("adminLink")
	        .style.display = "none";
	}


if(userRole){

    document.getElementById("roleText")
        .innerText =
        "Role : " + userRole;
}

function goToUpload(){

    window.location.href =
        "/pages/upload.html";
}

function goToResources(){

    window.location.href =
        "/pages/resources.html";
}

function logout(){

    if(confirm("Are you sure you want to logout?")){

        sessionStorage.clear();
        localStorage.removeItem("token");

        window.location.href =
            "/pages/login.html";
    }
}