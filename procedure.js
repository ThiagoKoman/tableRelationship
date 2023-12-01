// const json = require('./data.json'); 

// Parte 1 - Separar gêreneros e bandas e vinculá-los à um id
function genericFilter(data, col){
    let filteredItems = []; 
    data.forEach((item)=>{
        if(item[col]){
            let temp = item[col].split('; ');
            
            temp.forEach((value)=>{
                if(!filteredItems.includes(value)){
                    filteredItems.push(value);
                }
            })

        }
    })
    return filteredItems;
}

// let genres = genericFilter(json, 'GÊNERO');
// let bands = genericFilter(json, 'GRUPO MUSICAL');

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
        let bandName = band[col_1];
        let bandId = searchByLabel(labels1, bandName).id;
        if(band[col_2]){
            let infos = band[col_2].split('; ');
            if(infos && infos.length){
                infos.forEach((item)=>{
                    let infoId = searchByLabel(labels2, item).id;
                    rel.push({
                        origem: bandId,
                        destino: infoId
                    })
                })
            }
        }
    })
    return rel;
}

// let relationship = createRelationship(json, labels_1, labels_2, 'GRUPO MUSICAL', 'GÊNERO');

