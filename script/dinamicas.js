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

export const crearCard=(titulo,descripcion,precio,puertas,potencia,kms,valores)=>{
    const card = document.createElement("article");
    card.classList.add("card");
    card.style.backgroundColor="cyan";
    card.style.width="50%";
    card.style.textAlign="center";
    card.style.margin="0 auto";
    const header = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.textContent = "Título: "+titulo;

    const divDescripcion = document.createElement("div");
    divDescripcion.textContent = "Descripcion: " + descripcion ; 
    divDescripcion.appendChild(document.createElement("br"));

    const divPrecio = document.createElement("div");
    divPrecio.textContent = "Precio: $" + precio.toString();
    divPrecio.appendChild(document.createElement("br"));

    const divPuertas = document.createElement("div");
    divPuertas.textContent = "Puertas: "+puertas.toString();
    divPuertas.appendChild(document.createElement("br"));

    const divKms = document.createElement("div");
    divKms.textContent = "Kms : "+kms.toString();
    divKms.appendChild(document.createElement("br"));
    
    const divPotencia = document.createElement("div");
    divPotencia.textContent = "Potencia: " +potencia.toString();
    divPotencia.appendChild(document.createElement("br"));

    const divValores = document.createElement("div");
    divPotencia.textContent = "Características adicionales: " + valores.toString();
    divPotencia.appendChild(document.createElement("br"));

    const buttonVer = document.createElement('button');
    buttonVer.textContent="Ver Vehículo";
    buttonVer.style.width="70%";
        
    header.appendChild(h1);
    card.appendChild(header);
    card.appendChild(divDescripcion);
    card.appendChild(divPrecio);
    card.appendChild(divPuertas);
    card.appendChild(divPotencia);
    card.appendChild(divValores);
    card.appendChild(divKms);
    card.appendChild(buttonVer);
    return card;
}