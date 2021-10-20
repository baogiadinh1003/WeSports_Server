import { PHONE_REGEX, EMAIL_REGEX } from "./const";

/**
 * Function check validate for date
 *
 * @param inp
 * @returns boolean
 */
const validateDate = (inp: String) => {
  if (isEmpty(inp)) {
    return false;
  }
  let arrDateInfo = inp.split("-");
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
};

/**
 * Function check validate for account status
 *
 * @param inp
 * @returns boolean
 */
const validateAccountStatus = (inp: String | Number) => {
  if (isEmpty(inp)) {
    return false;
  }
  inp = Number(inp);

  if (inp !== 1 && inp !== 2) {
    return false;
  } else {
    return true;
  }
};

/**
 * Function check validate for pitch status
 *
 * @param inp
 * @returns boolean
 */
const validatePitchStatus = (inp: String | Number) => {
  if (isEmpty(inp)) {
    return false;
  }
  inp = Number(inp);

  if (inp !== 1 && inp !== 2 && inp !== 3) {
    return false;
  } else {
    return true;
  }
};

/**
 * function check validate phone
 *
 * @param inp
 * @returns boolean
 */
const validatePhone = (inp: String) => {
  if (isEmpty(inp)) {
    return false;
  }
  if (inp.match(PHONE_REGEX)) {
    return true;
  }
  return false;
};

/**
 * function check validate email
 *
 * @param inp
 * @returns
 */
const validateEmail = (inp: String) => {
  if (isEmpty(inp)) {
    return false;
  }

  if (inp.match(EMAIL_REGEX)) {
    return true;
  }
  return false;
};

/**
 * Check empty item
 *
 * @param inp
 * @returns
 */
const isEmpty = (inp: any) => {
  if (inp === null || inp === undefined) {
    return true;
  }
  return false;
};
export {
  validateDate,
  validateAccountStatus,
  validatePitchStatus,
  validatePhone,
  validateEmail,
};
