import { Anuncio_Auto } from "../data/anuncio_auto.js";
import { crearTabla } from "./dinamicas.js";
const $divTabla = document.getElementById("divTabla");
const $h2Alta = document.getElementById("alta-anuncio");
const $btnAgregarEditar = document.getElementById("btnAgregarEditar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");
const $mensajeAccion = document.getElementById("mensajeAccion");
const $cbGas = document.getElementById("cbGas");
const $cbAutomatica = document.getElementById("cbAutomatica");
//const anunciosJSON = JSON.parse(localStorage.getItem('anuncios'))||[];

const actualizarTabla = () => {
  while ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.firstElementChild);
  }
  const data = JSON.parse(localStorage.getItem("anuncios"));
  if (data) {
    $divTabla.appendChild(crearTabla(data));
  }
};

function spinner() {
  const divSpinner = document.getElementById("divSpinner");
  divSpinner.style.display="flex";
  divSpinner.style.backgroundImage = "url('../assets/Steerwheel.gif')";
  setTimeout(() => {
    divSpinner.style.display = "none";
    $mensajeAccion.textContent = "";
  }, 3000);
}

const actualizarStorage = (data) => {
  localStorage.setItem("anuncios", JSON.stringify(data));
  actualizarTabla();
};
const anunciosJSON = JSON.parse(localStorage.getItem("anuncios")) || [];

actualizarStorage(anunciosJSON);

window.addEventListener("click", (e) => {
  let id = e.target.parentElement.dataset.id;
  if (e.target.matches("tr,td")) {
    cargarFormulario(anunciosJSON.find((anuncio) => anuncio.id == id));
    $h2Alta.textContent = "Llena el formulario de modificación";
    $btnAgregarEditar.value = "Editar";
    $btnEliminar.style.display = "block";
  } else if (e.target.matches("#btnEliminar")) {
    handlerDelete(parseInt($formulario.txtId.value));
    resetearFormulario();
  }
});

//Referencia al formulario creado en el html.
const $formulario = document.forms[0];

function cargarFormulario(anuncio) {

  $cbGas.checked=false;
  $cbAutomatica.checked=false;

  if(anuncio.valores != null){
    
    if(anuncio.valores.includes("gas")){
      $cbGas.checked = true;
    }
    if(anuncio.valores.includes("caja")){
      $cbAutomatica.checked = true;
    }
  }

  const {
    txtId,
    txtTitulo,
    rdoTransaccion,
    txtDescripcion,
    txtPrecio,
    txtPuertas,
    txtKilometros,
    txtPotencia,
    txtCaracteristicas
  } = $formulario;
  txtId.value = anuncio.id;
  txtTitulo.value = anuncio.titulo;
  txtPrecio.value = anuncio.precio;
  txtDescripcion.value = anuncio.descripcion;
  txtPuertas.value = anuncio.puertas;
  txtKilometros.value = anuncio.kms;
  txtPotencia.value = anuncio.potencia;
  rdoTransaccion.value = anuncio.transaccion;
  txtCaracteristicas.value = $cbAutomatica.checked;
}

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valores = [];
  if($cbAutomatica.checked){
    valores.push('Caja automática');
  }
  if($cbGas.checked){
    valores.push('Gas');
  }
  const {
    txtId,
    txtTitulo,
    txtPrecio,
    txtDescripcion,
    txtPuertas,
    txtKilometros,
    txtPotencia,
    rdoTransaccion,
  } = $formulario;
  const formAnuncio = new Anuncio_Auto(
    txtId.value,
    txtTitulo.value,
    rdoTransaccion.value,
    txtDescripcion.value,
    txtPrecio.value,
    parseInt(txtPuertas.value),
    parseInt(txtKilometros.value),
    parseInt(txtPotencia.value),
    valores

  );
  if (formAnuncio.id === "") {
    //Alta
    formAnuncio.id = Date.now();
    handlerCreate(formAnuncio);
  } else {
    //Update
    handlerUpdate(formAnuncio);
  }

  resetearFormulario();
});
$btnCancelar.addEventListener("click", () => {
  resetearFormulario();
});

const resetearFormulario = () => {
  $formulario.reset();
  $h2Alta.textContent = "Llena el formulario de alta";
  $btnAgregarEditar.value = "Agregar";
  $btnEliminar.style.display = "none";
};

const handlerCreate = (nuevoAnuncio) => {
  spinner();
  $mensajeAccion.textContent = "Creando un anuncio";
  $mensajeAccion.style.color = "darkgreen";
  $mensajeAccion.style.backgroundColor = "white";
  anunciosJSON.push(nuevoAnuncio);
  actualizarStorage(anunciosJSON);
  actualizarTabla();
};

const handlerUpdate = (anuncioAEditar) => {
  spinner();
  $mensajeAccion.textContent = "Modificando un anuncio";
  $mensajeAccion.style.color = "orange";
  $mensajeAccion.style.backgroundColor = "white";
  let indice = anunciosJSON.findIndex((anuncio) => {
    return anuncio.id == anuncioAEditar.id;
  });
  anunciosJSON.splice(indice, 1);
  anunciosJSON.push(anuncioAEditar);
  actualizarStorage(anunciosJSON);
  actualizarTabla();
};

const handlerDelete = (idAnuncio) => {
  spinner();
  $mensajeAccion.textContent = "Eliminando un anuncio";
  $mensajeAccion.style.color = "red";
  let indice = anunciosJSON.findIndex((anuncio) => {
    return anuncio.id == idAnuncio;
  });
  anunciosJSON.splice(indice, 1);
  actualizarStorage(anunciosJSON);
  actualizarTabla();
};

//Antes se usaba people pero como ahora los datos están guardados en el localStorage, se puede sacar de ahí directamente la ref
//actualizarTabla(people);
actualizarTabla();
