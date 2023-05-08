function validateEmail(){
    debugger;
	// var de referencia
	let nombreContacto = document.getElementById('nombre').value;
	let emailContacto = document.getElementById('email').value;
    let telefonoContacto = document.getElementById('telefono').value;
    let mensajeContacto = document.getElementById('mensaje').value;

    // Valido que nombre exista
    if(nombreContacto === "") 
	{
       alert('No has ingresado un nombre, por favor ingresa nuevamente');
    }

	//Validamos que marque si es empresa o persona con selectIndex
	let tipoContacto = document.getElementById('tipo').selectedIndex;
	if( tipoContacto == null || tipoContacto == 0 ) 
	{
	    alert("Debe seleccionar una opción en el campo 'Tipo de Contacto'");
		return false;					
	}
		
    //Validamos con expresión regular y con test verificamos si coincide el patrón
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailContacto))
	{
        //coincide 
	}
	else
	{
		alert("La dirección de email es incorrecta! Por favor intente nuevamente");
	}

	// Valido si teléfono existe
    if(telefonoContacto == null || telefonoContacto === "") 
	{
		alert('No has ingresado un teléfono, Por favor ingrese nuevamente');
	}

	// Valido  si se ingreso un mensaje
    if(mensajeContacto == null || mensajeContacto === "") 
	{
		alert('No has ingresado un mensaje, por favor ingrese su consulta. Gracias!');
	}

}