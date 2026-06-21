loadResources();

async function loadResources() {

    const response =
        await fetch(
            "http://localhost:8080/api/resources"
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
        "http://localhost:8080/api/resources/download/" + id
    );
}

async function searchSubject() {

    const subject =
        document.getElementById("subject").value;

    const response =
        await fetch(
        "http://localhost:8080/api/resources/subject/"
        + subject
        );

    const data =
        await response.json();

    displayResources(data);
}
async function deleteResource(id){

    if(!confirm("Delete this resource?")){
        return;
    }

    await fetch(
        "http://localhost:8080/api/resources/" + id,
        {
            method:"DELETE"
        }
    );

    alert("Deleted Successfully");

    loadResources();
}