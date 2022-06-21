import { crearCard } from "./dinamicas.js";
const anuncios = localStorage.getItem("anuncios")?JSON.parse(localStorage.getItem("anuncios")):[];

anuncios.forEach(anuncio => {
    document.getElementById("sectionArticulos").appendChild(crearCard(anuncio.titulo,anuncio.descripcion,anuncio.precio,anuncio.puertas,anuncio.potencia,anuncio.kms,anuncio.valores));
});