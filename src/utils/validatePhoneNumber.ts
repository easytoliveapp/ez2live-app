export function validatePhoneNumber(phoneNumber: string): boolean {
  // Remove all non-numeric characters
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the number of digits is correct
  if (!(phoneNumber.length >= 10 && phoneNumber.length <= 11)) return false;

  // If there are 11 characters, check if it starts with 9 (cell phone)
  if (phoneNumber.length === 11 && parseInt(phoneNumber.substring(2, 3)) !== 9)
    return false;

  // Check if it is not any intentionally repeated number
  for (let n = 0; n < 10; n++) {
    // A loop from 0 to 9.
    // Using the Array(q+1).join(n) method where "q" is the quantity and n is the
    // character to be repeated
    if (
      phoneNumber === new Array(11).join(n.toString()) ||
      phoneNumber === new Array(12).join(n.toString())
    )
      return false;
  }

  // Valid area codes (DDDs)
  const validAreaCodes: number[] = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];

  // Check if the area code (DDD) is valid
  if (validAreaCodes.indexOf(parseInt(phoneNumber.substring(0, 2))) === -1)
    return false;

  // And finally, check if the number is truly valid. Until 2016, a cell phone can
  // have 8 digits, after that only landline numbers and radios (e.g., Nextel)
  // can have 8 digits (excluding the area code). So, this function will be inactive
  // until the end of 2016, and if ANATEL really fulfills the agreement, the numbers will
  // be correctly validated after that period.
  // I DID NOT ADD THE VALIDATION OF WHICH STATES HAVE NINTH DIGIT, BECAUSE AFTER 2016 THIS WILL NOT MAKE A DIFFERENCE
  // Don't worry, the code will enable and disable this option automatically.
  // If you want, in 2017, just remove the if statement.
  if (new Date().getFullYear() < 2017) return true;
  if (
    phoneNumber.length === 10 &&
    [2, 3, 4, 5, 7].indexOf(parseInt(phoneNumber.substring(2, 3))) === -1
  )
    return false;

  // If it passes all the above validations, then everything is fine
  return true;
}
