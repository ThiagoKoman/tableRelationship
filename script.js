let globalData = [];

function convertToJSON() {
    const fileInput = document.getElementById('file-input');
    // const jsonOutput = document.getElementById('json-output');

    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = e.target.result;

        const workbook = XLSX.read(data, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        globalData = jsonData;

        pass2();

        document.querySelector('#pass_1').insertAdjacentHTML( 'beforeend','<p>Importação concluída com sucesso</p>');

        // jsonOutput.textContent = JSON.stringify(jsonData, null, 2);
      };

      reader.readAsBinaryString(file);
    }
}

function pass2(){
    let options = Object.keys(globalData[0]);

    let passView = document.getElementById('pass_2');
    let select1 = document.getElementById('select_1');
    let select2 = document.getElementById('select_2');

    options.forEach((opt)=>{
        let optionElement1 = document.createElement('option');
        optionElement1.innerHTML = opt;
        optionElement1.value = opt;

        let optionElement2 = document.createElement('option');
        optionElement2.innerHTML = opt;
        optionElement2.value = opt;


        select1.append(optionElement1);
        select2.append(optionElement2);
    })

    passView.style.display = 'block';
}

function generateArchives(){
    let passView = document.getElementById('pass_3');

    let select1 = document.getElementById('select_1');
    let select2 = document.getElementById('select_2');

    if(select1.value == select2.value){
        alert('As colunas devem ser diferentes!');
        return;
    }

    // Button 1
    let values1 = genericFilter(globalData, select1.value);
    let values2 = genericFilter(globalData, select2.value);

    let labelsResult = createLabelsAndIds(values1, values2); 
    let labels = labelsResult[0];

    createDownloadButton(labels, 'Labels');
    // let a_1 = createDownloadButton(labels, 'Labels');
    // a_1.innerText = 'Download labels';
    // a_1.classList.add('btn');
    
    // buttons.append(a_1);

    // Button 2
    let rels = createRelationship(globalData, labelsResult[1], labelsResult[2], select1.value, select2.value)
    createDownloadButton(rels, 'Relationship');
    // let a_2 = createDownloadButton(rels, 'Relationship');
    // a_2.innerText = 'Download relationship';
    // a_2.classList.add('btn');
    // buttons.append(a_2);

    passView.style.display = 'block';
}


function createDownloadButton(jsonData, fileName){
    // Cria uma nova planilha
    const ws = XLSX.utils.json_to_sheet(jsonData);

    // Cria um novo livro de trabalho e adiciona a planilha a ele
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Converte o livro de trabalho para um blob
    XLSX.writeFile(wb, fileName, { bookType: 'xlsx', type: 'blob' });

    // Cria um link de download e simula um clique para iniciar o download
    //  const link = document.createElement('a');
    //  link.href = URL.createObjectURL(blob);
    //  link.download = fileName+'.xlsx';
    //  document.body.appendChild(link);
    //  link.click();
    //  document.body.removeChild(link);
}