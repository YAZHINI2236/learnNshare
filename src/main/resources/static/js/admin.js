const role =
    sessionStorage.getItem("userRole");

if(role !== "ADMIN"){

    document.getElementById("adminContent")
        .style.display = "none";

    document.getElementById("accessDenied")
        .style.display = "block";

}else{

    loadUsers();
}

async function loadUsers() {

    const response =
        await fetch(
            "/api/users/all",
            {
                headers:{
                    "Authorization":
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }
        );

    const users =
        await response.json();

    const table =
        document.getElementById("userTable");

    users.forEach(user => {

        table.innerHTML += `

        <tr>

            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>

        </tr>

        `;
    });
}