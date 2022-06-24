let cuentas = [
{ nombre: "Jenni", saldo: 200, password: "helloWorld"},
{ nombre: "Miguel", saldo: 290, password: "goodMorning" },
{ nombre: "Angeli", saldo: 67, password: "saludosTodos"}
];

const buttons = document.querySelectorAll('button');
const $result = document.getElementById('saldo_ingresado');
const $result2 = document.getElementById('saldo_retirado');

// Eventos para los botones

function addEvents(){
    buttons.forEach(button => {
        button.addEventListener('click',getElementClick);
    });
}

function getElementClick(){
    const value = event.srcElement.innerText;
    verifyValue(value);
}


    function verifyValue(value){
        if(!isNaN(value)){
            //para cualquiera de los inputs(saldo_retirado y saldo_ingresado)
            $result.value += value;
            $result2.value += value;
        }
    }


    

function Login(){
    let username = document.getElementById('nombre').value;
    let password = document.getElementById('password').value;
    let login=0; //para usar un indicador de si es el usuario correcto

    cuentas.forEach((cuenta) => { //hacemos un for en cada elemento de nuestro array
       
    if(cuenta.nombre === username &&  cuenta.password===password){ //comparamos cada elemento de nuestro array, si coincide, login cambia el valor de cero a uno
        localStorage.setItem("user", cuenta.nombre);
        localStorage.setItem("saldo", cuenta.saldo);
        login=1;
    }
      });

         
    if(login==1){ //si login es igual a uno, redirigimos al cajero
        alert('Login successful');
        location.href='cajero.html';
     }else{
         alert('Login fail'); //si login es igual a cero, se manda un alert y refrescamos
         location.reload();
     }
}


function consultaSaldo(){
    document.getElementById("saldo_total").innerHTML=localStorage.saldo;
   
}

function ingresarMonto(){
    
    $result.value='';
    $result2.value='';
    document.getElementById('ingresa').style.display = 'block';
    document.getElementById('retira').style.display = 'none';
    addEvents();
    document.getElementById("enter").onclick = function() {define('btn1')};
}

function aceptoMontoIngresado(){ 
    let nuevo_saldo = 0;
    let saldo_ingresado=document.getElementById('saldo_ingresado').value;

    if(saldo_ingresado>0){ //si el saldo es mayor a cero 
    nuevo_saldo=parseFloat(localStorage.saldo)+parseFloat(saldo_ingresado);
    if(nuevo_saldo>990){
        alert('El saldo no debe ser mayor a $990');
    }else{
        localStorage.setItem("saldo", nuevo_saldo);
        document.getElementById("saldo_total").innerHTML="";
        document.getElementById("saldo_total").innerHTML=localStorage.saldo;
        document.getElementById('ingresa').style.display = 'none';
    }
    
    }else{ //de lo contrario, no permitimos ingresar
     alert('Ingresa un monto mayor a cero');
    }
    $result.value='';
    $result2.value='';
}


function retiroMonto(){
    $result.value=''; //limpiamos nuestros dos inputs
    $result2.value='';
    document.getElementById('retira').style.display = 'block'; //mostrar u ocultar elemento de acuardo con la operación seleccionada
    document.getElementById('ingresa').style.display = 'none';
    addEvents(); //llamamos a nuestro evento de los botones
    document.getElementById("enter").onclick = function() {define('btn2')}; //llamamos a la funcion define para hacer click en el boton de la operacion seleccionada
}

function aceptoMontoRetirado(){
    let nuevo_saldo = 0; //inicializamos la variable saldo
    let saldo_retirado=document.getElementById('saldo_retirado').value; 

    if(parseFloat(saldo_retirado) < parseFloat(localStorage.saldo)){ //validamos la cantidad que vamos a retirar vs el saldo disponible, si es menor que el saldo disponible, entonces nos
                                                                     //permitirá retirar el monto
    nuevo_saldo=parseFloat(localStorage.saldo)-parseFloat(saldo_retirado); //convertimos a float y restamos de la cantidad que está alamcenada en nuestro localstorage
    //validamos si el nuevo saldo no será menor a $10
    if(nuevo_saldo<10){
     alert('Su saldo no puede ser menor a $10');
     document.getElementById('saldo_retirado').value='';
    }else{
       localStorage.setItem("saldo", nuevo_saldo); //guardamos en nuestro localstorage la nueva cantidad
       document.getElementById("saldo_total").innerHTML=""; //limipiamos el span
       document.getElementById("saldo_total").innerHTML=localStorage.saldo;
       document.getElementById('retira').style.display = 'none';//ocultamos el input
    }
    }else{ //de lo contrario, no permitimos retirar
     alert('Saldo insuficiente, retira una cantidad menor');
    }
    $result.value='';
    $result2.value='';
}



function define(element) {
  document.getElementById(element).click();
}

function cancelar(){ //funcion para refrescar, en caso de querer cancelar cualquier operación
    location.reload();
}

function resetOne(){ //funcion para eliminar el ultimo caracter de alguno de los inputs (saldo_retirado y saldo_ingresado)
    $result.value= $result.value.substring(0,$result.value.length-1);
    $result2.value= $result2.value.substring(0,$result2.value.length-1);
    return;
}

function cerrarSesion(){ //funcion para remover los elementos de nuestra sesión en localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("saldo");
    location.href='index.html'; //redirigimos a index.html

}

function validaUser(){
    if(localStorage.saldo===undefined || localStorage.user=== undefined){
        location.href='index.html';
    }
}

