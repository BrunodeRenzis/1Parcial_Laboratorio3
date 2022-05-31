import { Anuncio_Auto } from "../data/anuncio_auto.js";
import { crearTabla } from "./dinamicas.js";
import { cargarSpinner } from "./spinner.js";
const $divTabla = document.getElementById('divTabla');
const $h2Alta = document.getElementById('alta-anuncio');
const $btnAgregarEditar = document.getElementById('btnAgregarEditar');
const $btnEliminar = document.getElementById('btnEliminar');
const $btnCancelar = document.getElementById('btnCancelar');
const $divAnuncios = document.getElementById('divAnuncios');
//const anunciosJSON = JSON.parse(localStorage.getItem('anuncios'))||[];
cargarSpinner();
const actualizarTabla = ()=>{
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }
    const data = JSON.parse(localStorage.getItem('anuncios'));
    if(data){
        $divTabla.appendChild(crearTabla(data)); 
    }
}
//Lo utilizo la primera vez para inicializar 
const actualizarStorage = (data)=>{
    localStorage.setItem('anuncios',JSON.stringify(data));
    //Esto rompe
    //anunciosJSON = data;
    actualizarTabla();
}
const anunciosJSON = JSON.parse(localStorage.getItem('anuncios'))||[];

actualizarStorage(anunciosJSON);


console.log(anunciosJSON);
window.addEventListener("click",(e)=>{
    let id = e.target.parentElement.dataset.id;
    if(e.target.matches("tr,td")){
        console.log(e.target.textContent);
        console.log(id);
        cargarFormulario(anunciosJSON.find((anuncio)=>anuncio.id==id));
        $h2Alta.textContent = "Llena el formulario de modificación";
        $btnAgregarEditar.value = "Editar";
        $btnEliminar.style.display= "block";
    } else if(e.target.matches('#btnEliminar')){
        handlerDelete(parseInt($formulario.txtId.value));
        resetearFormulario();

    }
})

//Referencia al formulario creado en el html.
const $formulario = document.forms[0];

function cargarFormulario(anuncio){
    const {txtId,txtTitulo,rdoTransaccion,txtDescripcion,txtPrecio,txtPuertas,txtKilometros,txtPotencia} = $formulario;
    txtId.value=anuncio.id;
    txtTitulo.value=anuncio.titulo;
    txtPrecio.value=anuncio.precio;
    txtDescripcion.value=anuncio.descripcion;
    txtPuertas.value=anuncio.puertas;
    txtKilometros.value=anuncio.kms;
    txtPotencia.value=anuncio.potencia;
    rdoTransaccion.value=anuncio.transaccion;
}

$formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('Enviando...');
    const {txtId,txtTitulo,txtPrecio,txtDescripcion,txtPuertas,txtKilometros,txtPotencia,rdoTransaccion} = $formulario;
    const formAnuncio = new Anuncio_Auto(txtId.value,txtTitulo.value,rdoTransaccion.value,txtDescripcion.value,txtPrecio.value,parseInt(txtPuertas.value),parseInt(txtKilometros.value),parseInt(txtPotencia.value));
    if(formAnuncio.id===''){
        //Alta
        formAnuncio.id = Date.now();
        handlerCreate(formAnuncio);

    } else{
        //Update
        handlerUpdate(formAnuncio);
    }

    resetearFormulario();

});
$btnCancelar.addEventListener("click",()=>{
    resetearFormulario();
});

const resetearFormulario = ()=>{
    $formulario.reset();
    $h2Alta.textContent = "Llena el formulario de alta";
    $btnAgregarEditar.value = "Agregar";
    $btnEliminar.style.display= "none";
}

const handlerCreate = (nuevoAnuncio)=>{
    anunciosJSON.push(nuevoAnuncio);
    actualizarStorage(anunciosJSON);
    actualizarTabla();
}

const handlerUpdate = (anuncioAEditar)=>{
    let indice = anunciosJSON.findIndex((anuncio)=>{
        return anuncio.id == anuncioAEditar.id;
    })
    anunciosJSON.splice(indice,1);
    anunciosJSON.push(anuncioAEditar);
    actualizarStorage(anunciosJSON);
    actualizarTabla();
}

const handlerDelete = (idAnuncio)=>{
    let indice = anunciosJSON.findIndex((anuncio)=>{
        return anuncio.id == idAnuncio;
    })
    anunciosJSON.splice(indice,1);
    actualizarStorage(anunciosJSON);
    actualizarTabla();
}





//Antes se usaba people pero como ahora los datos están guardados en el localStorage, se puede sacar de ahí directamente la ref
//actualizarTabla(people);
actualizarTabla();