export const crearTabla = (data)=>{
    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    const cabecera = document.createElement('tr');
    cabecera.style.backgroundColor = "coral";
    //Para recorrer las keys de un array y sus objetos
    
    /******************************************THEAD*******************************************************/
    for (const key in data[0]) {
        if(key!=='id'){
            const th = document.createElement('th');
            const contenido = document.createTextNode(key);
            th.appendChild(contenido);
            cabecera.appendChild(th);
        }
    }
    thead.appendChild(cabecera);
    tabla.appendChild(thead);
    /******************************************THEAD*******************************************************/
    data.forEach((element,index)=>{
        const tr = document.createElement('tr');
        for (const key in element) {
            if(key==='id'){
                tr.setAttribute('data-id',element[key]);
            }else{
                const td = document.createElement('td');
                td.textContent = element[key];
                tr.appendChild(td);

            }
        }
        tbody.appendChild(tr);
        if(index%2){
            tr.setAttribute('style','background-color:#ccc')
        }
    });
    tabla.appendChild(tbody);
    return tabla;
}

export const armarAnuncios=(titulo,descripcion,precio,puertas,potencia,kms)=>{
    const card = document.createElement("article");
    card.classList.add("card");
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card--header");
    const h1 = document.createElement("h2");
    h1.classList.add("card--text");
    h1.textContent = titulo;

    const divDescripcion = document.createElement("card--descripcion");
    divDescripcion.classList.add("card--text");
    divDescripcion.textContent = descripcion ; 
    divDescripcion.appendChild(document.createElement("br"));

    const divPrecio = document.createElement("card--precio");
    divPrecio.classList.add("card--text");
    divPrecio.textContent = "Precio: $" + precio.toString();
    divPrecio.appendChild(document.createElement("br"));

    const divPuertas = document.createElement("card--puertas");
    divPuertas.classList.add("card--text");
    divPuertas.textContent = "Puertas: "+puertas.toString();
    divPuertas.appendChild(document.createElement("br"));

    const divPotencia = document.createElement("card--potencia");
    divPotencia.classList.add("card--text");
    divPotencia.textContent = "Potencia: " +potencia.toString();
    divPotencia.appendChild(document.createElement("br"));

    const divKms = document.createElement("card--kms");
    divKms.classList.add("card--text");
    divKms.textContent = "Kms : "+kms.toString();
    divKms.appendChild(document.createElement("br"));
    

    cardHeader.appendChild(h1);
    card.appendChild(cardHeader);
    card.appendChild(divDescripcion);
    card.appendChild(divPrecio);
    card.appendChild(divPuertas);
    card.appendChild(divPotencia);
    card.appendChild(divKms);
    return card;
}