function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}

// logic of copy and paste button
function copyText(txt) {
    // here we are copy txt to the system clipboard. by navigating it.
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 3000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
    );
}

// logic to delete data in table
const deletepassword=(website)=>{
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrupdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrupdated))
    alert(`${website}'s Password deleted successfully!`);
    showpassword();
}
 
// logic to fill the table
const showpassword = ()=>{
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if(data == null || JSON.parse(data).length == 0){
        tb.innerHTML = "NO DATA FOUND & STORE"
    }
    else{
        tb.innerHTML = `<tr>
                <th>wedsite</th>
                <th>username</th>
                <th>password</th>
                <th>delete</th>
            </tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            
            str += `<tr>
            <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy Button" width="10" width="10" height="10">
            </td>
            <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Button" width="10" width="10" height="10">
            </td>
            <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Button" width="10" width="10" height="10">
            </td>
            <td><button class=btnsm onclick="deletepassword('${element.website}')">Delete</button></td>
            </tr>`
            
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}
    

console.log("working...");
showpassword();
document.querySelector('.btn').addEventListener("click", (k) => {
    k.preventDefault() // preventdefault se hamra form submit nhi hoga!!
    console.log("clicked")
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords)
    if (passwords == null) {
        let store = []
        store.push({website: website.value, username: username.value, password: password.value })
        alert("password saved")
        localStorage.setItem("passwords", JSON.stringify(store))
    }
    else {
        let store = JSON.parse(localStorage.getItem("passwords"))
        // upcoming line of code means to update the password
        store.push({website: website.value, username: username.value, password: password.value })
        alert("password saved")
        localStorage.setItem("passwords", JSON.stringify(store))
    }
    showpassword();
}) 