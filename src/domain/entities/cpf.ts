export class CPF {
    private cpf: string;

    constructor(cpf: string) {
        if(!this.validateCpf(cpf)) {
            throw new Error('Invalid CPF');
        }
        this.cpf = cpf;
    }

    private validateCpf (cpf: string) {
        if (this.validateCpfInputFormat(cpf)) {
            return false;
        }
        const cpfStripped = this.removeNonDigitsAllowedChars(cpf!);
        if(this.validateCpfDigits(cpfStripped)) {
            return false;
        }
        const cpfWithoutVerificationDigits = cpfStripped.substring(0, cpfStripped.length - 2);
        const expectedVerificationDigitOne = this.calculateVerificationDigitOne(cpfWithoutVerificationDigits);  
        const expectedVerificationDigitTwo = this.calculateVerificationDigitTwo(cpfWithoutVerificationDigits, expectedVerificationDigitOne);
        const verificationDigitOne = parseInt(cpfStripped[cpfStripped.length-2]);
        const verificationDigitTwo = parseInt(cpfStripped[cpfStripped.length-1]);
        return verificationDigitOne === expectedVerificationDigitOne && verificationDigitTwo === expectedVerificationDigitTwo;
    }
    
    private validateCpfInputFormat(cpf: string) {
        return this.doesNotHaveCpfLength(cpf!);
    }
    
    private validateCpfDigits(cpfStripped: string) {
        return this.isStrWithSameDigits(cpfStripped) || !this.isOnlyDigitsString(cpfStripped);
    }
    
    private removeNonDigitsAllowedChars(cpf: string) {
        return cpf
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
    }
    
    private calculateVerificationDigitOne(cpfWithoutVerificationDigits: string) {
        const calc = Array.from(cpfWithoutVerificationDigits).map(char => parseInt(char)).reduce((acc, digit, i) => acc + (10 - i) * digit, 0);
        const remainder = (calc % 11);
        return (remainder < 2) ? 0 : 11 - remainder;
    }
    
    private calculateVerificationDigitTwo(cpfWithoutVerificationDigits: string, verificationDigitOne: number) {
        const calc = Array.from(cpfWithoutVerificationDigits).map(char => parseInt(char)).concat(verificationDigitOne).reduce((acc, digit, i) => acc + (11 - i) * digit, 0);
        const remainder = (calc % 11);
        return (remainder < 2) ? 0 : 11 - remainder;
    }
    
    private isOnlyDigitsString(cpfStripped: string) {
        return Array.from(cpfStripped).every(c => !isNaN(parseInt(c)));
    }
    
    private isStrWithSameDigits(cpf: string) {
        return cpf.split("").every(c => c === cpf[0]);
    }
    
    private doesNotHaveCpfLength(cpf: string) {
        return cpf.length != 11 && cpf.length != 14;
    }
}
