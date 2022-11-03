import Citas from './classes/Citas.js';
import UI from './classes/ui.js';

import { 
    mascotaInput, 
    propietarioInput, 
    fechaInput, 
    horaInput, 
    formulario, 
    sintomasInput, 
    telefonoInput 
} from './selectores.js';

let editando;
const ui = new UI();
const administradorCitas = new Citas();

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

export function datosCita(e) {
    const { name, value } = e.target;
    citaObj[name] = value;
}

export function validarFormulario(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (!mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    if (editando) {
        ui.imprimirAlerta('Se edito correctamente');
        administradorCitas.editarCita({...citaObj});
        editando = false;
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
    } else {
        citaObj.id = Date.now();
        administradorCitas.agregarCita({ ...citaObj });
        ui.imprimirAlerta('Se agrego correctamente');
    }

    reiniciarObjetoCita();
    formulario.reset();
    ui.imprimirCitas(administradorCitas);
}

export function reiniciarObjetoCita() {
    for (let prop in citaObj) {
        citaObj[prop] = '';
    }
}

export function eliminarCita(id) {
    administradorCitas.eliminarCita(id);
    ui.imprimirAlerta('La cita se elimino correctamente');
    ui.imprimirCitas(administradorCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenando los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id

    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;
}