loadResources();

async function loadResources() {

    const response =
	await fetch(
	    "/api/resources",
	    {
	        headers:{
	            "Authorization":
	                "Bearer " +
	                localStorage.getItem("token")
	        }
	    }
	);

    const data =
        await response.json();

    displayResources(data);
}

function displayResources(data) {

    const table =
        document.getElementById("resourceTable");

    table.innerHTML = "";

    data.forEach(resource => {

        table.innerHTML += `

            <tr>

                <td>${resource.id}</td>

                <td>${resource.title}</td>

                <td>${resource.subject}</td>

                <td>${resource.semester}</td>

                <td>${resource.resourceType}</td>

				<td>
				    <button onclick="downloadFile(${resource.id})">
				        Download
				    </button>
				</td>

				<td>
				    <button onclick="deleteResource(${resource.id})">
				        Delete
				    </button>
				</td>

            </tr>

        `;
    });
}

function downloadFile(id){

    window.open(
        "/api/resources/download/" + id
    );
}

async function searchSubject() {

    const subject =
        document.getElementById("subject").value;

    const response =
	await fetch(
	    "/api/resources/subject/" + subject,
	    {
	        headers:{
	            "Authorization":
	                "Bearer " +
	                localStorage.getItem("token")
	        }
	    }
	);

    const data =
        await response.json();

    displayResources(data);
}
async function deleteResource(id){

    if(!confirm("Delete this resource?")){
        return;
    }

	const response = await fetch(
	    "/api/resources/" + id,
	    {
	        method:"DELETE",
	        headers:{
	            "Authorization":
	                "Bearer " +
	                localStorage.getItem("token")
	        }
	    }
	);

	if(response.ok){
	    alert("Deleted Successfully");
	    loadResources();
	}else{
	    alert(response.status + " Delete Failed! only admin can delete resources");
	}


    loadResources();
}