exports.validateCpf = function(cpf) {
    if (validateCpfInputFormat(cpf)) {
        return false;
    }
    const cpfStripped = removeNonDigitsAllowedChars(cpf);
    if(validateCpfDigits(cpfStripped)) {
        return false;
    }
    const cpfWithoutVerificationDigits = cpfStripped.substring(0, cpfStripped.length - 2);
    const expectedVerificationDigitOne = calculateVerificationDigitOne(cpfWithoutVerificationDigits);  
    const expectedVerificationDigitTwo = calculateVerificationDigitTwo(cpfWithoutVerificationDigits, expectedVerificationDigitOne);
    const verificationDigitOne = parseInt(cpfStripped[cpfStripped.length-2]);
    const verificationDigitTwo = parseInt(cpfStripped[cpfStripped.length-1]);
    return verificationDigitOne === expectedVerificationDigitOne && verificationDigitTwo === expectedVerificationDigitTwo;
}

function validateCpfInputFormat(cpf) {
    return isNullOrUndefined(cpf) || doesNotHaveCpfLength(cpf);
}

function validateCpfDigits(cpfStripped) {
    return isStrWithSameDigits(cpfStripped) || !isOnlyDigitsString(cpfStripped);
}

function removeNonDigitsAllowedChars(cpf) {
    return cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
}

function calculateVerificationDigitOne(cpfWithoutVerificationDigits) {
    const calc = Array.from(cpfWithoutVerificationDigits).map(char => parseInt(char)).reduce((acc, digit, i) => acc + (10 - i) * digit, 0);
    const remainder = (calc % 11);
    return (remainder < 2) ? 0 : 11 - remainder;
}

function calculateVerificationDigitTwo(cpfWithoutVerificationDigits, verificationDigitOne) {
    const calc = Array.from(cpfWithoutVerificationDigits).map(char => parseInt(char)).concat(verificationDigitOne).reduce((acc, digit, i) => acc + (11 - i) * digit, 0);
    const remainder = (calc % 11);
    return (remainder < 2) ? 0 : 11 - remainder;
}

function isOnlyDigitsString(cpfStripped) {
    return Array.from(cpfStripped).every(c => !isNaN(parseInt(c)));
}

function isStrWithSameDigits(cpf) {
    return cpf.split("").every(c => c === cpf[0]);
}

function doesNotHaveCpfLength(cpf) {
    return cpf.length != 11 && cpf.length != 14;
}

function isNullOrUndefined(cpf) {
    return cpf == null || cpf == undefined;
}