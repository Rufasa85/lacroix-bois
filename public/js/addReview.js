document.querySelector("#add-review").addEventListener("submit",evt=>{
    evt.preventDefault();
    const fetchObj = {
        LaCroixId:document.querySelector("#flavor-id").value,
        score:document.querySelector("#score").value,
        review:document.querySelector("#review").value,
    }
    console.log(fetchObj);
    fetch("/api/reviews",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})