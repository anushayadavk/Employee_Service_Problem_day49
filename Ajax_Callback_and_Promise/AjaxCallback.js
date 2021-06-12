let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/*
function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" +date.getSeconds() + "Sec:";
}
*/
function makeAJAXCall(methodType, url, callback, async = true, data=null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log("State changed called. Ready state:"+xhr.readyState+"Status:"+xhr.status);
        if (xhr.readyState === 4) {
            // Matching all 200 series responses
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText) ;
            }else if(xhr.status >= 400) {
                    console.log("handle 400 client error or 500 server error");
                }
            
        }
    }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+"request sent to the server");
    
}

const getURL = "http://localhost:3000/employees/1";
function getUserDetails(data) {
    console.log("Get User Data:"+data);
}
makeAJAXCall("GET", getURL, getUserDetails);

const deleteURL = "http://localhost:3000/employees/3"
function userDeleted(data) {
    console.log("User Deleted:"+data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees"
const emplData = {"name": "Harry","salary": "5000"};
function userAdded(data) {
    console.log("User Added:"+data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);