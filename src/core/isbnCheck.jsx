/**
 * Checks if the given isbn10 fulfills requirements for length and pattern
 * @param {*} isbn10 the isbn10 string that should be tested
 * @returns true, if the string is a valid isbn10
 */
const hasValidISBN10Format = (isbn10) => {
    const isbn10Pattern = /^\d{1,5}-\d{2,7}-\d{2,7}-(\d|X)$/;
    const isbn10Length = 10;

    const isValidISBN10Length = isbn10.replaceAll('-', '').length === isbn10Length;
    const isValidPattern = isbn10Pattern.test(isbn10);
    return isValidISBN10Length && isValidPattern;
}

/**
 * Checks if the given isbn10 has a avlid checksum as the last character
 * @param {*} isbn10 the isbn10 string that should be tested
 * @returns true, if the checksum is valid
 */
const hasValidISBN10CheckSum = (isbn10) => {
    const lastChar = isbn10.slice(-1);
    const isbnWithoutChecksum = isbn10.substring(0, isbn10.length).replaceAll('-', '');
    
    let checkSumChar;
    let isbnSum = 0;
    for(let i = 0; i < isbnWithoutChecksum.length-1; i++) {
        isbnSum += (i+1)* isbnWithoutChecksum.charAt(i);
    }

    let result = isbnSum % 11;

    if(result == 10) {
        checkSumChar = 'X'
    } else {
        checkSumChar = result;
    }

    return checkSumChar == lastChar;

}

/**
 * Checks if structure and checksum of the given isbn10 are valid
 * @param {*} isbn10 the isbn10 string that should be tested
 * @returns true, if the given isbn10 is valid
 */
const isValidISBN10 = (isbn10) => {
    return hasValidISBN10Format(isbn10) && hasValidISBN10CheckSum(isbn10);
}

/**
 * Checks if the given isbn13 fulfills requirements for length and pattern
 * @param {*} isbn13 the isbn13 string that should be tested
 * @returns true, if the string is a valid isbn13
 */
const hasValidISBN13Format = (isbn13) => {
    const isbn13Pattern = /^978-\d{1,5}-\d{2,7}-\d{2,7}-\d$/;
    const isbn13Length = 13;

    const isValidISBN13Length = isbn13.replaceAll('-', '').length === isbn13Length;
    const isValidPattern = isbn13Pattern.test(isbn13);

    return isValidISBN13Length && isValidPattern;
}

/**
 * Checks if the given isbn13 has a valid checksum as the last character
 * @param {*} isbn13 the isbn13 string that should be tested
 * @returns true, if the checksum is valid
 */
const hasValidISBN13CheckSum = (isbn13) => {
    const lastChar = isbn13.slice(-1);
    const isbnWithoutChecksum = isbn13.substring(0, isbn13.length-1).replaceAll('-', '');
    console.log(isbnWithoutChecksum.length);
    
    let checkSumChar;
    let isbnSum = 0;
    for(let i = 0; i < isbnWithoutChecksum.length; i++) {
        let currentValue = isbnWithoutChecksum.charAt(i);
        console.log(i + ' ' + currentValue);
        isbnSum += ((i+1) % 2 === 0) ? 3 * parseInt(currentValue) : parseInt(currentValue);
    }

    let result = 10 - isbnSum % 10;

    if(result == 10) {
        checkSumChar = '0'
    } else {
        checkSumChar = result;
    }

    return checkSumChar == lastChar;
}

/**
 * Checks if the given isbn13 has valid pattern and logical structure
 * @param {*} isbn13    the isbn13 string that should be tested 
 * @returns    true, if the isbn13 is valid
 */
const isValidISBN13 = (isbn13) => {
    return hasValidISBN13Format(isbn13) && hasValidISBN13CheckSum(isbn13);
}

const isbnCheck = {
    isValidISBN10,
    isValidISBN13
};
  
export default isbnCheck;