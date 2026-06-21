async function uploadFile() {

    const formData = new FormData();

    formData.append(
        "title",
        document.getElementById("title").value
    );

    formData.append(
        "subject",
        document.getElementById("subject").value
    );

    formData.append(
        "semester",
        document.getElementById("semester").value
    );

    formData.append(
        "resourceType",
        document.getElementById("resourceType").value
    );

    formData.append(
        "uploadedBy",
        1
    );

    formData.append(
        "file",
        document.getElementById("file").files[0]
    );

    const response =
        await fetch(
            "http://localhost:8080/api/resources/upload",
            {
                method:"POST",
                body:formData
            }
        );

    const result =
        await response.text();

    alert(result);
}