function somar(a, b){
    return a + b;
}

function subtrair(a, b){
    return a - b;
}

function dividir(a, b){
    if(b !== 0){
        return a / b;
    }else{
        throw new Error("Não é possível dividir por zero.");
    }
    
}

function multiplicar(a, b){
    return a * b;
}

module.exports = somar;
module.exports = subtrair;
module.exports = dividir;
module.exports = multiplicar;