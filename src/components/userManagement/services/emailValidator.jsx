export function emailValidator(setValidEmailStatus, email) {
    fetch(`http://localhost:5000/login/check/is=${email}`, {
        method: 'GET', mode: 'no-cors'
    }).then((response) => {
        setValidEmailStatus(response.status === 418)
    }).catch(error => {
    })
}