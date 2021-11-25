let parametersBox = document.querySelector("#parametersBox");
let requestJsonBox = document.querySelector('#requestJsonBox')
let jsonRadio = document.querySelector("#jsonRadio")
let responseText = document.querySelector("#responseText")
let paramsRadio = document.querySelector("#paramsRadio")
let addParams = document.querySelector("#btn-addParams")
let newParams = document.querySelector("#newParams")
let submit = document.querySelector("#btn-submit")

// Initialize no. of Parameter
let addedParamsCount = 1;


// Hide Params Box Initially
parametersBox.style.display = 'none';

// If user click on params , hide JSON box
paramsRadio.addEventListener('click',() =>{
    requestJsonBox.style.display = 'none'
    parametersBox.style.display = 'block';
})

// If user click on JSON box , hide params
jsonRadio.addEventListener('click',() =>{
    requestJsonBox.style.display = 'block'
    parametersBox.style.display = 'none';
})

// If the user clicks on + button, add more params
addParams.addEventListener('click',() =>{
    addedParamsCount++
    let string = `        
    <div class="row">
        <label for="exampleInputPassword1" class="form-label">Parameter ${addedParamsCount}</label>
        <div class="col-md-4 my-2">
            <input type="text" class="form-control"
            id='parameterKey${addedParamsCount}' placeholder='Enter parameter ${addedParamsCount} Key' 
            >
        </div>
        <div class="col-md-4 my-2">
            <input type="text" class="form-control"
            id='parameterValue${addedParamsCount}' placeholder="Enter parameter ${addedParamsCount} value">
        </div>
        <button class="btn btn-primary my-2 mx-3 btn-deleteParams" style="width: 2.3rem;">-</button>
    </div>`;
    newParams.appendChild(getElementFromString(string))
    // Add Event Listener to remove Params on clicking -
    let deleteParam = document.querySelectorAll(".btn-deleteParams")
    for (item of deleteParam){
        item.addEventListener('click',(e) => {
            e.target.parentElement.remove();
        })
    }
})

const getElementFromString = (string) => {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// Submit Button
submit.addEventListener("click",() => {
    //Show please wait in the response box to request patience
    responseText.value = "Please Wait... Fetching Response";
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;
    let URL = document.querySelector("#UrlBox").value;

    //if user used params instead of JSON, get params in an object and then stringify it
    if(contentType === 'params'){
        data = {};
        for(let i=0;i<addedParamsCount;i++){
            if(document.querySelector(`#parameterKey${i+1}`) != undefined){
                let key = document.querySelector(`#parameterKey${i+1}`).value;
                let value = document.querySelector(`#parameterValue${i+1}`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.querySelector("#requestJsonText").value;
        // data = JSON.stringify(data);
    }
    // // Log all the values user have entered
    console.log(URL);
    console.log(requestType);
    console.log(contentType);
    console.log(data);
    // If request Type is GET invoke Fetch API to create a post request
     if(requestType == "GET"){
        fetch(URL,{
            method: 'GET',
        })
        .then((response) => {
            // u have to return a response
            return response.text();
        })
        .then((text) => {
            responseText.value = text
        })
        .catch((err) => console.log(err))
    }
    // If request Type is POST invoke Fetch API to create a post request
    else {
        // url  = https://jsonplaceholder.typicode.com/posts
        fetch(URL,{
            method: 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then((response) => {
            // u have to return a response
            return response.text();
        })
        .then((text) => {
            responseText.value = text
        })
        .catch((err) => console.log(err))
    }

})
