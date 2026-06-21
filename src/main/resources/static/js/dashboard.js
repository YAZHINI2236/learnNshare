const email =
    sessionStorage.getItem("userEmail");

if(email){

    const userName =
        email.split("@")[0].toUpperCase();

    document.getElementById("welcomeText")
        .innerText =
        "Welcome back, " + userName;
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

        window.location.href =
            "/pages/login.html";
    }
}