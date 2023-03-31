// El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let idTimeOut; // Variable para setTimeout()

let precio = 0;
let contador = 0;
let productos = 0;
let total = 0;
let isValid;

datos = [];



function getPrecio() { // Asigna precio aleatorio
    return Math.floor(Math.random() * 5000) / 100;
}


btnAgregar.addEventListener("click", function (event) {                              //Agregar producto
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeOut); // Cancela el temporizador cuando se inicia varias veces. 


    txtNombre.value = txtNombre.value.trim(); // trim() -> quita espacios repetidos. 

    alertValidacionesTexto.innerHTML = ""; // Inicia texto del aviso de errores en ""

    let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";

    if (txtNombre.value.length == 0) { //verifica extension txtNombre
        txtNombre.style.border = "solid thin red"; //Borde de recuadro en rojo
        lista += "<li> Se debe escribir un nombre valido</li>"; //Se suma texto al aviso de errores
        alertValidaciones.style.display = "block"; // Muestra recuadro alert
        isValid = false;

    }
    else {
        txtNombre.style.border = ""; // Limpia borde txtNombre
        alertValidaciones.style.display = "none"; // Oculta recuadro alert
    }

    if (!validarCantidad()) {  //verifica  txtNumber
        txtNumber.style.border = "solid thin red"; //Borde de recuadro en rojo
        lista += "<li> Se debe escribir una cantidad valida</li>"; //Se suma texto al aviso de errores
        alertValidaciones.style.display = "block"; // Muestra recuadro alert
        isValid = false;

    }
    else {
        txtNumber.style.border = ""; // Limpia borde txtNumber
        alertValidaciones.style.display = "none"; // Oculta recuadro alert
    }

    lista += "<ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista); // Envía texto al alert en html

    idTimeOut = setTimeout(function () { //Función que quita el recuadro alert después de 5seg
        alertValidaciones.style.display = "none"; // Oculta recuadro alert
    }, 5000);// 5 seg después

    if (isValid) {// verifica que los campos están escritos correctamente. 
        precio = getPrecio();
        contador++;
        productos += parseFloat(txtNumber.value);
        total += parseFloat(txtNumber.value) * precio;

        let row = `<tr>
                    <th> ${contador} </th>
                    <td> ${txtNombre.value} </td>
                    <td> ${txtNumber.value} </td>
                    <td> ${precio} </td>
               </tr>`;

        let elemento = `{
                     "id" :  ${contador},
                     "nombre" : "${txtNombre.value}",
                     "cantidad" : "${txtNumber.value}",
                     "precio" : "${precio}"
                        }`; 

        datos.push(JSON.parse(elemento));

        localStorage.setItem("datos", JSON.stringify(datos) );


        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        productosTotal.innerText = productos;
        precioTotal.innerText = `$ ${total.toFixed(2)}`;

        let resumen = `{"contadorProductos" : ${contador},
                        "productosTotal" : ${productos},
                        "precioTotal" : ${total.toFixed(2)} }`;

        localStorage.setItem("resumen", resumen);


        /*         localStorage.setItem("contadorProductos", contador);
                localStorage.setItem("productosTotal", productos);
                localStorage.setItem("precioTotal", total); */


        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }

});

//Limpiar Datos
btnClear.addEventListener("click", function (event) {
    event.preventDefault();

    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML = "";

    contador = 0;
    productos = 0;
    total = 0;

    contadorProductos.innerHTML = "0";
    productosTotal.innerHTML = "0";
    precioTotal.innerHTML = "0";

});

//blur txtNumber (blur = pierde la atención.)
txtNombre.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();

});

function validarCantidad() //Validar que txtNumber sea numero. 
{
    if (txtNumber.value.length == 0) {  //verifica extension txtNumber
        return false;
    }
    if (parseFloat(txtNumber.value) <= 0) { // Verifica si es mayor o igual a 0
        return false;
    }
    if (isNaN(txtNumber.value)) { //
        return false;
    }

    return true;
}

window.addEventListener("load", function (event) {

    if (this.localStorage.getItem("resumen") == null) {

        let resumen = `{"contadorProductos" : ${contador},
                        "productosTotal" : ${productos},
                        "precioTotal" : ${total.toFixed(2)} }`;


        this.localStorage.setItem("resumen", resumen);

    }

    let res= JSON.parse(localStorage.getItem("resumen"));

    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos"));

        datos.forEach(element => {

            let row = `<tr>
            <th> ${element.id} </th>
            <td> ${element.nombre} </td>
            <td> ${element.cantidad} </td>
            <td> ${element.precio} </td>
            </tr>`;

            cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
            
        });



    }
    /*     if(localStorage.getItem("contadorProductos") == null){
            this.localStorage.setItem("contadorProductos", "0");
        }
        if(localStorage.getItem("productosTotal") == null){
            this.localStorage.setItem("productosTotal", "0");
        }
        if(localStorage.getItem("precioTotal") == null){
            this.localStorage.setItem("precioTotal", "0.0");
        } */
    contador = res.contadorProductos;
    productos = res.productosTotal;
    total = res.precioTotal;

    contadorProductos.innerText = res.contadorProductos;
    productosTotal.innerText = res.productosTotal;
    precioTotal.innerText = `$ ${res.precioTotal}`;
});






