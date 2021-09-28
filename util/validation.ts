import { PHONE_REGEX, EMAIL_REGEX } from "./const";

/**
 * Function check validate for date
 * 
 * @param inp 
 * @returns boolean
 */
const validateDate = (inp:String) => {
    let arrDateInfo = inp.split('-');
    let nYear = arrDateInfo[2];
    let nMonth = arrDateInfo[1];
    let nDay = arrDateInfo[0];

    if (nYear.length !== 4) {
        return false;
    }

    if (nMonth.length !== 2) {
        return false;
    }

    if (Number(nMonth) < 1 || Number(nMonth) > 12) {
        return false;
    }

    if (Number(nDay) < 1 || Number(nDay) > 31) {
        return false;
    }

    if (Number(nMonth) === 2 && Number(nDay) >= 30) {
        return false;
    }

    if (Number(nMonth) === 2 && Number(nYear) % 4 === 0 && Number(nDay) >= 29) {
        return false;
    }
    
    return true;
}

/**
 * Function check validate for account status
 * 
 * @param inp 
 * @returns boolean
 */
const validateAccountStatus = (inp: String | Number) => {
    inp = Number(inp);

    if (inp !== 1 && inp !== 2) {
        return false;
    } else {
        return true;
    }
}

/**
 * function check validate phone
 * 
 * @param inp
 * @returns boolean
 */
const validatePhone = (inp: String) => {
    if (inp.match(PHONE_REGEX)) {
        return true;
    } 
    return false;
}

const validateEmail = (inp: String) => {
    if (inp.match(EMAIL_REGEX)) {
        return true;
    } 
    return false;
}

export {validateDate, validateAccountStatus, validatePhone};