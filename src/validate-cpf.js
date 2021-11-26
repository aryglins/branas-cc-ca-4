exports.validate = function(cpf) {
    const cpfStripped = removeNonDigitsAllowedChars(cpf);  
    if (validateInputCpfFormat(cpfStripped)) {
        return false;
    }
    const expectedVerificationDigitOne = calculateVerificationDigitOne(cpfStripped);  
    const expectedVerificationDigitTwo = calculateVerificationDigitTwo(cpfStripped, expectedVerificationDigitOne);
    const verificationDigitOne = parseInt(cpfStripped[cpfStripped.length-2]);
    const verificationDigitTwo = parseInt(cpfStripped[cpfStripped.length-1]);
    return verificationDigitOne == expectedVerificationDigitOne && verificationDigitTwo == expectedVerificationDigitTwo;
}

function validateInputCpfFormat(cpfStripped) {
    return isNullOrUndefined(cpfStripped) || doesNotHaveCpfLength(cpfStripped) || isStrWithSameDigits(cpfStripped || !isOnlyDigitsString(cpfStripped));
}

function calculateVerificationDigitOne(cpf) {
    const calc = Array.from(cpf).map(char => parseInt(char)).reduce((acc, digit, i, cpf) => {
        if(i < cpf.length - 2) {
            return acc + (11 - (i + 1)) * digit;
        }
        return acc;
    }, 0);
    const remainder = (calc % 11);
    return (remainder < 2) ? 0 : 11 - remainder;
}

function calculateVerificationDigitTwo(cpf, verificationDigitOne) {
    const firstCalc = Array.from(cpf).map(char => parseInt(char)).reduce((acc, digit, i, cpf) => {
        if(i < cpf.length - 2) {
            return acc + (12 - (i + 1)) * digit;
        }
        return acc;
    }, 0);
    const secondCalc = firstCalc + 2 * verificationDigitOne;
    const remainder = (secondCalc % 11);
    return (remainder < 2) ? 0 : 11 - remainder;
}

function isOnlyDigitsString(cpfStripped) {
    return cpfStripped.split("").every(c => parseInt(c) !== NaN);
}

function isStrWithSameDigits(cpf) {
    return cpf.split("").every(c => c === cpf[0]);
}

function removeNonDigitsAllowedChars(cpf) {
    cpf = cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
        .replace(" ", "");
    return cpf;
}

function doesNotHaveCpfLength(cpf) {
    return cpf.length != 11;
}

function isNullOrUndefined(cpf) {
    return cpf == null || cpf == undefined;
}