import { armarAnuncios } from "./dinamicas.js";
const anuncios = document.getElementsById('sectionArticulos')
anuncios.forEach(element => {
    document.getElementById("Container").appendChild(armarAnuncios(element.titulo,element.descripcion,element.precio,element.puertas,element.potencia,element.kms));
});