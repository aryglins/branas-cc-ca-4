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
        let     dg2;  
        let     nDigResult;  
        dg2 = 0;  
        let d1 = 0;  
        let d2 = 0;
        for (let nCount = 1; nCount < str.length -1; nCount++) {  
            const digito = parseInt(str.substring(nCount -1, nCount));  							
            d1 = d1 + ( 11 - nCount ) * digito;  
            d2 = d2 + ( 12 - nCount ) * digito;  
        };  
        const resto1 = (d1 % 11);  
        const dg1 = (resto1 < 2) ? 0 : 11 - resto1;  
        d2 += 2 * dg1;  
        const resto2 = (d2 % 11);  
        if (resto2 < 2)  
            dg2 = 0;  
        else  
            dg2 = 11 - resto2;  
            let nDigVerific = str.substring(str.length-2, str.length);  
        nDigResult = "" + dg1 + "" + dg2;  
        return nDigVerific == nDigResult;
    }catch (e){  
        console.error("Erro !"+e);  

        return false;  
    }  
}