exports.validate = function(str) {
    if (str == null || str == undefined) {
        return false;
    }
    if(str.length < 11 || str.length > 14) {
        return false;
    }
    str=str
        .replace('.','')
        .replace('.','')
        .replace('-','')
        .replace(" ","");  
    if (str.split("").every(c => c === str[0])) {
        return false;
    }
    try{  
        let d1 = 0;  
        let d2 = 0;
        for (let nCount = 1; nCount < str.length -1; nCount++) {  
            const digito = parseInt(str.substring(nCount -1, nCount));  							
            d1 = d1 + ( 11 - nCount ) * digito;  
            d2 = d2 + ( 12 - nCount ) * digito;  
        };  
        const dg1 = calculateVerificationDigit(d1);  
        d2 += 2 * dg1;
        const dg2 = calculateVerificationDigit(d2);
        let nDigVerific = str.substring(str.length-2, str.length);  
        const nDigResult = "" + dg1 + "" + dg2;  
        return nDigVerific == nDigResult;
    }catch (e){  
        console.error("Erro !"+e);  

        return false;  
    }  
}

function calculateVerificationDigit(d) {
    const resto = (d % 11);
    return (resto < 2) ? 0 : 11 - resto;
}
