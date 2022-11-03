import { 
    mascotaInput, 
    propietarioInput, 
    fechaInput, 
    horaInput, 
    formulario, 
    sintomasInput, 
    telefonoInput 
} from '../selectores.js';
import {datosCita, validarFormulario} from '../funciones.js';

class App {
    constructor() {
        this.initApp();
    }
    initApp(){
        mascotaInput.addEventListener('blur', datosCita);
        propietarioInput.addEventListener('blur', datosCita);
        telefonoInput.addEventListener('blur', datosCita);
        fechaInput.addEventListener('blur', datosCita);
        horaInput.addEventListener('blur', datosCita);
        sintomasInput.addEventListener('blur', datosCita);

        formulario.addEventListener('submit', validarFormulario);
    }
}


export default App;