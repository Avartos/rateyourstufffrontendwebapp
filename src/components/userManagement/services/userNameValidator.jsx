export function userNameValidator(setValidUserStatus, userName) {
    fetch(`http://localhost:5000/user/check/is=${userName}`, {
        method: 'GET'
    }).then((response) => {
        setValidUserStatus(response.status === 418)
    }).catch(error => {
    })
}