function genericFilter(data, col){
    let filteredItems = []; 
    data.forEach((item)=>{
        if(item[col]){
            let value = item[col];
            if(!filteredItems.includes(value.toUpperCase())){
                filteredItems.push(value.toUpperCase());
            }
        }
    })
    return filteredItems;
}

function createLabelsAndIds(list_1, list_2){
    let count = 1;
    let labels = [];
    let labels_1 = [];
    let labels_2 = [];

    list_1.forEach((item)=>{
        const obj = {
            label: item,
            id: count
        }
        labels.push(obj);
        labels_1.push(obj);
        count++;
    })

    list_2.forEach((item)=>{
        const obj = {
            label: item,
            id: count
        }
        labels.push(obj);
        labels_2.push(obj);
        count++;
    })
    
    return [labels, labels_1, labels_2];
}

// let labelsResult = createLabelsAndIds(bands, genres); 
// let labels = labelsResult[0];
// let labels_1 = labelsResult[1];
// let labels_2 = labelsResult[2];

// Parte 2 - Criar o relacionamento dos dados
function searchByLabel(list, label){
    for(let i = 0 ; i<list.length ; i++){
        const item = list[i];
        if(item.label == label){
            return item;
        }
    }
    return null;
}

function createRelationship(data, labels1, labels2, col_1, col_2){
    let rel = [];
    data.forEach((band)=>{
        if(band[col_1]){
            var bandName = band[col_1].toUpperCase();
            var bandId = searchByLabel(labels1, bandName).id;
        }
        if(band[col_2]){
            let infos = band[col_2].toUpperCase();
            if(infos && infos.length){
                let infoId = searchByLabel(labels2, infos).id;
                rel.push({
                    origem: bandId,
                    destino: infoId
                })
            }
        }
    })
    return rel;
}

