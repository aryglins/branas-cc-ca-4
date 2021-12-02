export const validateCpf = function(cpf?: string | null) {
    if (validateCpfInputFormat(cpf)) {
        return false;
    }
    const cpfStripped = removeNonDigitsAllowedChars(cpf!);
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

function validateCpfInputFormat(cpf?: string | null) {
    return isNullOrUndefined(cpf) || doesNotHaveCpfLength(cpf!);
}

function validateCpfDigits(cpfStripped: string) {
    return isStrWithSameDigits(cpfStripped) || !isOnlyDigitsString(cpfStripped);
}

function removeNonDigitsAllowedChars(cpf: string) {
    return cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
}

function calculateVerificationDigitOne(cpfWithoutVerificationDigits: string) {
    const calc = Array.from(cpfWithoutVerificationDigits).map(char => parseInt(char)).reduce((acc, digit, i) => acc + (10 - i) * digit, 0);
    const remainder = (calc % 11);
    return (remainder < 2) ? 0 : 11 - remainder;
}

function calculateVerificationDigitTwo(cpfWithoutVerificationDigits: string, verificationDigitOne: number) {
    const calc = Array.from(cpfWithoutVerificationDigits).map(char => parseInt(char)).concat(verificationDigitOne).reduce((acc, digit, i) => acc + (11 - i) * digit, 0);
    const remainder = (calc % 11);
    return (remainder < 2) ? 0 : 11 - remainder;
}

function isOnlyDigitsString(cpfStripped: string) {
    return Array.from(cpfStripped).every(c => !isNaN(parseInt(c)));
}

function isStrWithSameDigits(cpf: string) {
    return cpf.split("").every(c => c === cpf[0]);
}

function doesNotHaveCpfLength(cpf: string) {
    return cpf.length != 11 && cpf.length != 14;
}

function isNullOrUndefined(cpf?: string | null) {
    return cpf == null || cpf == undefined;
}