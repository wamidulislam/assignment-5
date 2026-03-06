// get element
const signInBtn = document.getElementById("signBtn") 
signInBtn.addEventListener("click", function(){
    // get username and password
    const username = document.getElementById("username")
    const userValue = username.value;
    const password = document.getElementById("password")
    const passValue = password.value;
    if(userValue === "admin" && passValue === "admin123"){
        alert("login successful")
        window.location.assign("./home.html")
    }
    else{
        alert("Invalid username or password")
    }
})  