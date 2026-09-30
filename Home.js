let username = document.getElementById("Username")
let login = document.getElementById("Login")
let password = document.getElementById("Passwordbox")

console.warn("Teachers just so you know everything runs on the severside of the database meaning you cant change anything. but nice try !")

login.onclick = function() {
    event.preventDefault();
    if (username.value === "") {
   alert("Error: Please enter your Username")}
   if (password.value == ""){
    alert("Error: Please enter your password")
   }
   console.log("Username:",username.value, "Password:",password.value)
}

