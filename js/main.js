// El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");



//Agregar producto
btnAgregar.addEventListener("click", function(event) {
    event.preventDefault(); 
    txtNombre.value = txtNombre.value.trim();
    alertValidacionesTexto.innerHTML = "";
    let lista = "Los siguientes campos deben ser llenados correctamente: <ul>";

    if(txtNombre.value.length == 0){ //verifica extension txtNombre
        txtNombre.style.border = "solid thin red";
        lista += "<li> Se debe escribir un nombre valido</li>";
        alertValidaciones.style.display = "block";

    }
    else {
        txtNombre.style.border = "";
        alertValidaciones.style.display = "none";
    }

    if(txtNumber.value.length == 0){ 
        txtNumber.style.border = "solid thin red";
        lista += "<li> Se debe escribir una cantidad valida</li>";
        alertValidaciones.style.display = "block";

    }
    else {
        txtNumber.style.border = "";
        alertValidaciones.style.display = "none";
    }
    
    lista +="<ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);


});

//Limpiar Datos
btnClear.addEventListener("click", function(event) {
    event.preventDefault();

    txtNombre.value = "";
    txtNumber.value = "";
});

//blur txtNumber (blur = pierde la atención.)
txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    txt.txtNombre.value = txtNombre.value.trim();

});

