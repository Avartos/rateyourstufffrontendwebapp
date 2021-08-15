/**
 * Used to shorten strings to prevent titles to be too long for a single line or a preview
 * Strings will be shortened, if they are larger than the maximum length
 * @param {*} targetString      The string that should be shortened
 * @param {*} maxLength         The maximum length of the string
 * @param {*} moreTextSymbol    The symbol that should be appended at the end of the shortened string (e.g. '...')
 * @returns
 */
 const shortenString = (targetString, maxLength, moreTextSymbol) => {
    let shortenedString = targetString;
    if (targetString != null && targetString.length > maxLength) {
      shortenedString = targetString.substr(0, maxLength) + moreTextSymbol;
    }
    return shortenedString;
  };
  
  const isLoggedIn = () => {
    return sessionStorage.getItem("Bearer ") !== null;
  };
  
  const getUserId = () => {
      return sessionStorage.getItem('id');
  }

  const isAdmin = () => {
    return (
      true
    );
  };
  
  const helper = {
    shortenString,
    isLoggedIn,
    isAdmin,
    getUserId
  };
  
  export default helper;
  