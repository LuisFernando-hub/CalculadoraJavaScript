'use strict';

//Display
const display = document.getElementById('display');

//Pegando todos os numeros
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;


//Função Calcular
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(','),'.');
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        //Podemos fazer com If ou somento com o eval e pedir para exibir o resultado no display
        // if (operador = '+'){
        //     atualizarDisplay(numeroAnterior + numeroAtual);
        // }else if (operador = '-'){
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // }else if (operador = '*'){
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // }else if (operador = '/') {
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }
    }
}

//Atualizar o display a cada numero que ser inserido
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

//Atualizar o display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numeros => numeros.addEventListener('click', inserirNumero));


//Função para verificar se existi um novo Numero 
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

//Adicionando o operador a um event de click e mandando para funçãoo SelecionarOperador
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));


//Função igual para terminar o calculo '=' 
const ativarIgual = () => {
    calcular();
    operador = undefined;
}

//Pegando o Id igual e fazendo um event click para funcao ativarIgual
document.getElementById('igual').addEventListener('click', ativarIgual);


//Pegando o Id do display e chamando para a função limpar
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

// Função para limpar totalmente o calculo
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
//Pegando o Id para limpar o calculo
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//Apagando da direita para esquerda
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//Função para inverter o sinal
const inverterSinal = () =>{
    novoNumero = true;
    atualizarDisplay (display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click',inverterSinal);

//Insirindo a virgula
const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }
        else {
        atualizarDisplay('0,');
    }
    }
}
document.getElementById('decimal').addEventListener('click',inserirDecimal);

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '+' : 'operadorAdicionar',
    '-' : 'operadorSubtrair',
    '*' : 'operadorMultiplicar',
    '/' : 'operadorDividir',
    'Escape': 'limparCalculo',
    'c' : 'limparDisplay',
    'Enter' : 'igual',
    ',' : 'decimal',
    'Backspace' : 'backspace',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if (teclaPermitida())
    document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);
