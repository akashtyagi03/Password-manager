function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
    );
}

// logic to delete password
const deletepassword = () => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrupdate = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrupdate))
    alert(`successfully deleted ${website}'s password`)
    showPassword()
}

// logic to fill the table
const showPassword = () => {

    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null) {
        tb.innerHTML = "NO data to show"
    }
    else {
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

            str +=  `<tr>
            <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy Button" width="10" width="10" height="10">
            </td>
            <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Button" width="10" width="10" height="10">
            </td>
            <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Button" width="10" width="10" height="10">
            </td>
            <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str 
    }
    website.value = ""
    username.value = ""
    password.value = ""
}

// logic to click on button and store data in local storage!
console.log("working");
showPassword()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault() // preventdefault se hamra form submit nhi hoga!!
    console.log("click")
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("password saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("password saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPassword();
})