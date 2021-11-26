exports.validate = function(cpf) {
    const cpfStripped = removeNonDigitsAllowedChars(cpf);  
    if (isNullOrUndefined(cpfStripped) || doesNotHaveCpfLength(cpfStripped)) {
        return false;
    }
    if (isStrWithSameDigits(cpfStripped)) {
        return false;
    }
    if (!isOnlyDigitsString(cpfStripped)) {
        return false;
    }
    let d1 = 0;  
    let d2 = 0;
    for (let nCount = 1; nCount < cpfStripped.length -1; nCount++) {  
        const digito = parseInt(cpfStripped.substring(nCount -1, nCount));  							
        d1 = d1 + ( 11 - nCount ) * digito;  
        d2 = d2 + ( 12 - nCount ) * digito;
    };  
    const dg1 = calculateVerificationDigit(d1);  
    d2 += 2 * dg1;
    const dg2 = calculateVerificationDigit(d2);
    let nDigVerific = cpfStripped.substring(cpfStripped.length-2, cpfStripped.length);  
    const nDigResult = "" + dg1 + "" + dg2;  
    return nDigVerific == nDigResult;
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

function calculateVerificationDigit(d) {
    const resto = (d % 11);
    return (resto < 2) ? 0 : 11 - resto;
}
