function validateEmail(){

	// var de referencia
	let nombreContacto = document.getElementById('nombre').value;
	let emailContacto = document.getElementById('email').value;
    let telefonoContacto = document.getElementById('telefono').value;
    let mensajeContacto = document.getElementById('mensaje').value;
    let tipoSeleccionado = document.getElementById('tipo').value;

	debugger;

    // Valido que nombre exista
    if(nombreContacto === "") 
	{
		showMessage('No has ingresado un nombre, por favor ingresa nuevamente');
		return false;
    }

	//Validamos que marque si es empresa o persona con selectIndex
	let tipoContacto = document.getElementById('tipo').selectedIndex;
	if( tipoContacto == null || tipoContacto == 0 ) 
	{
		showMessage("Debe seleccionar una opción en el campo 'Tipo de Contacto'");
		return false;					
	}

	// Valido si teléfono existe
	if(telefonoContacto == null || telefonoContacto === "")
	{
		showMessage('No has ingresado un teléfono, Por favor ingrese nuevamente');
		return false;
	}

	if(emailContacto === null || emailContacto === "") {
		showMessage('No has ingresado un email, Por favor ingresalo');
		return false;
	}

    //Validamos con expresión regular y con test verificamos si coincide el patrón
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailContacto))
	{
        //coincide 
	}
	else
	{
		showMessage("La dirección de email es incorrecta! Por favor intente nuevamente");
		return false;
	}

	// Valido  si se ingreso un mensaje
    if(mensajeContacto == null || mensajeContacto === "") 
	{
		showMessage('No has ingresado un mensaje, por favor ingrese su consulta. Gracias!');
		return false;
	}



	var formData = new FormData();
	formData.append('tipo', tipoSeleccionado);
	formData.append('nombre', nombreContacto);
	formData.append('email', emailContacto);
	formData.append('telefono', telefonoContacto);
	formData.append('mensaje', mensajeContacto);

	postData("sendEmail.php",
		formData
	).then((data) => {
		console.log(data); // JSON data parsed by `data.json()` call
		const popup = showMessage(data.message);

		popup.then((result) => {
			if (result.isConfirmed) {
				location.reload();
			}
		});
	});

}

async function postData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			//"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: data, // body data type must match "Content-Type" header
	});

	if(!response.ok)
		response.json().then(data => {
			showMessage(data.error);
			return data;
		});

	return response.json(); // parses JSON response into native JavaScript objects
}

function showMessage(message) {
	return new Swal("", message,
		undefined, "", "warning", undefined, undefined,
		undefined, undefined, "Footer", true, true /*toast*/, "body", undefined,
		undefined/*ancho*/, undefined, undefined, undefined, 'center', false, undefined,
		undefined, false, true, false, true, true, true, false, true /*confirm BTN*/,
		false /* cancel BTN*/, 'Aceptar', 'Cancelar', '#fb781a', undefined, undefined,
		'','','',true,false,true,true,false,false,false,'','','',false,false,true,
		undefined,
		undefined,false);
}
