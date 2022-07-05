var db_tutoriais = {
    "data": [
        {
            "id": 1,
            "titulo": "Canal no YouTube do Seu Neto",
            "dispositivo": "Computador",
            "categoria": "Interativo",
            "descricao": "O Canal do Seu Neto traz traz dicas e tutoriais sobre internet e tecnologia para a terceira idade, ou “melhor idade”, como prefere chamar",
            "tutorial": "O Canal do Seu Neto traz traz dicas e tutoriais sobre internet e tecnologia para a terceira idade, ou “melhor idade”, como prefere chamar o Renie Gomes, criador dessa utilidade pública! segue o link: https://www.youtube.com/channel/UClbaHigQSbVAGPXAO5jvSOA?app=desktop",
        },
        {
            "id": 2,
            "titulo": "Dificuldades em ler pelo celular?",
            "dispositivo": "Celular",
            "categoria": "Passo-a-Passo",
            "descricao": "Nesse tutorial você aprende passo a passo a aumentar a fonte do seu telefone!",
            "tutorial": "Abra às Configurações do celular -> vá até a opção de Tela -> Procure por Tamanho do texto ou Fontes (pode variar de acordo com a marca e modelo do aparelho) -> Aumente para o máximo -> aplique a alteração.",
        },
        {
            "id": 3,
            "titulo": "Tela do Celular muito bagunçada?",
            "dispositivo": "Celular",
            "categoria": "Passo-a-Passo",
            "descricao": "Nesse tutorial você tera acesso ao passo a passo de como limpar a tela inicial do seu telefone",
            "tutorial": "Na tela inicial faça o movimento de pinça -> toque sobre a opção Widgets -> Acessando essa área habilite a opção Bloquear layout da Tela inicial-> Toque sobre Concluído.",
        },
        {
            "id": 4,
            "titulo": "Procurando por facilidades?",
            "dispositivo": "Celular",
            "categoria": "Novidades",
            "descricao": "Nesse tutorial iremos mostrar a seleção de 9 aplicativos imperdíveis para idosos",
            "tutorial": "Uma seleção dos 9 aplicativos mais bacanas para idosos, segue o link: https://guiaderodas.com/os-9-aplicativos-para-todo-idoso-ter-no-smartphone/",
        },
    ]
}

var db = JSON.parse(localStorage.getItem('db_tutoriais'));
if (!db) {
    db = db_tutoriais
    localStorage.setItem('db_tutoriais', JSON.stringify(db));
};


function insertTutoriais(tutorial) {
    let novoId = 1;
    if (db.data.length != 0)
        novoId = db.data[db.data.length - 1].id + 1;
    let novoTutorial = {
        "id": novoId,
        "titulo": tutorial.titulo,
        "dispositivo": tutorial.dispositivo,
        "categoria": tutorial.categoria,
        "descricao": tutorial.descricao,
        "tutorial": tutorial.tutorial
    };

    db.data.push(novoTutorial);
    alert(`Tutorial ${tutorial.titulo} adicionado`)
    localStorage.setItem('db_tutoriais', JSON.stringify(db));
}

function updateTutorial(id, tutorial) {
    let index = db.data.map(obj => obj.id).indexOf(id);
    db.data[index].titulo = tutorial.titulo;
    db.data[index].dispositivo = tutorial.dispositivo;
    db.data[index].categoria = tutorial.categoria;
    db.data[index].tutorial = tutorial.tutorial;
    db.data[index].descricao = tutorial.descricao;

        localStorage.setItem('db_tutoriais', JSON.stringify(db));
        alert(`Tutorial ${tutorial.titulo} atualizado`)

        
}

function deleteTutorial(id) {
    db.data = db.data.filter(function (element) { return element.id != id });
    alert(`Tutorial de id:${id} deletado`)
    localStorage.setItem('db_tutoriais', JSON.stringify(db));
}

function listTutoriais() {
    console.log('alterei filtro');
    let dadosHTML = '';
    let filtroDispositvo = document.getElementById('filtro_dispositivo').value;
    let filtroCategoria = document.getElementById('filtro_categoria').value;
    console.log(filtroDispositvo, filtroCategoria);
    if (filtroDispositvo || filtroCategoria) {
        console.log('entrou no filtro ele não é nulo');
        for (let i = 0; i < db.data.length; i++) {
            if (((db.data[i].dispositivo == filtroDispositvo) || (filtroDispositvo == '')) &&
                ((db.data[i].categoria == filtroCategoria) || (filtroCategoria == ''))) {
                dadosHTML += `<div class="card w-200 tutorialCard">
                    <div class="card-body">
                        <h5 class="card-title">${db.data[i].titulo}</h5>
                        <p class="card-text">${db.data[i].descricao}</p>
                        <a href="detalhes_tutorial.html?id=${db.data[i].id}" class="btn btn-primary">Acessar tutorial</a>
                    </div>
                </div>`
            }
        }
        console.log('resultado Final' + dadosHTML);
        document.getElementById('divListaTutoriais').innerHTML = dadosHTML;
    } else {
        for (let i = 0; i < db.data.length; i++) {
            dadosHTML += `<div class="card w-200 tutorialCard">
            <div class="card-body">
                <h5 class="card-title">${db.data[i].titulo}</h5>
                <p class="card-text">${db.data[i].descricao}</p>
                <a href="detalhes_tutorial.html?id=${db.data[i].id}" class="btn btn-primary">Acessar tutorial</a>
            </div>
        </div>`
        }
        document.getElementById('divListaTutoriais').innerHTML = dadosHTML;
    }
}

function detalheTutorialEspecifico(id) {
    console.log('entrou');
    let idxTutorial = db.data.findIndex((elem) => elem.id === id);
    if (idxTutorial > -1) {
        let tutorial = db.data[idxTutorial];
        document.getElementById('tutorialDetalhes').innerHTML = `
        <h1 class="display-4">${tutorial.titulo}</h1>
        <p><strong>Dispositivo:</strong> ${tutorial.dispositivo}</p>
        <p><strong>Categoria:</strong> ${tutorial.categoria}</p>

        <p class="lead">${tutorial.descricao} </p>

        <hr class="my-4">
        <h3>Tutorial:</h3>
        <p>${tutorial.tutorial}</p>
        `
    } else {
        alert("Tutorial não encontrado")
    }
}


function init() {
    listTutoriais();
}