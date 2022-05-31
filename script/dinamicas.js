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

export const crearCard = (data)=>{
    const divCard = document.createElement('table');
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
    divCard.appendChild(thead);
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
    divCard.appendChild(tbody);
    return divCard;
}