const Logout = () => {
    return(
        <div className="loggedOut">
            {sessionStorage.clear()}
            <h2>Danke für deinen Besuch!</h2>
            Du wirst in wenigen sekunden weiter geleitet!
        </div>
    )
}
export default Logout;