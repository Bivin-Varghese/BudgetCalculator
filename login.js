




//register

register = () => {

    userName = uName.value;
    userPass = pass.value;
    userEmail = mail.value;

    let details = {
        userName,
        userPass,
        userEmail
    }


    if (userName in localStorage) {
        alert('User name already exists')
    }
    else if (userName == '' || userPass == '') {
        alert('Enter the details')
    }
    else {
        localStorage.setItem(userName, JSON.stringify(details))
        alert('Account added successfully')
        window.location = 'login.html'
    }
}

// login 

login = () => {
    userName = uName.value;
    userPass = uPass.value;

    if (userName in localStorage) {
        accDetails = JSON.parse(localStorage.getItem(userName))
        if (userPass == accDetails.userPass) {
            alert('Login successfull')
            window.location = 'index.html'
        }
        else {
            alert('Incorrect password')
        }
    }
    else {
        alert('Invalid user name')
    }
}
