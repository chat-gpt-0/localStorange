let nomeLista = document.querySelector('#nome');
let sobreNome = document.querySelector('#sobrenome');
let cpf = document.querySelector('#cpf');
let email = document.querySelector('#email');
let telefone = document.querySelector('#telefone');
let senha = document.querySelector('#senha');
let btnCadastrar = document.querySelector('#cadastrar');
let lista = document.querySelector('#lista');
let janelaEdicao = document.querySelector("#janelaEdicao");
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoFechar  = document.querySelector('#janelaEdicaoFechar');
//let novaLista = document.querySelector(".novaLista");
let btnAtualizarTarefa = document.querySelector("#btnAtualizarTarefa");
let idListaEdicao = document.querySelector('#idListaEdicao');
let nomeEdicao = document.querySelector('#inputNomeEdicao');
let sobreNomeEdicao = document.querySelector('#inputSobreNomeEdicao');
let cpfEdicao = document.querySelector('#inputCpfEdicao');
let emailEdicao = document.querySelector('#inputEmailEdicao');
let telefoneEdicao = document.querySelector('#inputTelefoneEdicao');
let senhaEdicao = document.querySelector('#inputSenhaEdicao');

const KEY_LOCAL_STORAGE = 'listaDeTarefas';
let dbLista = [];

obterListaLocalStorange();
renderizarListaTarefaHtml();

alternarJanelaEdicao();

nomeLista.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        let tarefa = {
           // id: cpf.value,
            id: gerarId(),
            nome: nomeLista.value,
            sobrenome: sobreNome.value,
            cpf: cpf.value,
            email: email.value,
            telefone: telefone.value,
            senha: senha.value,
        }
        adicionarLista(tarefa);

    }
});

janelaEdicaoFechar.addEventListener('click', (e) =>{
    alternarJanelaEdicao();
});

btnCadastrar.addEventListener('click', (e) =>{
    let tarefa = {
        //id: cpf.value,
         id: gerarId(),
         nome: nomeLista.value,
         sobrenome: sobreNome.value,
         cpf: cpf.value,
         email: email.value,
         telefone: telefone.value,
         senha: senha.value,
    }
    adicionarLista(tarefa);
});

btnAtualizarTarefa.addEventListener ('click', (e) =>{
    e.preventDefault();

    let idLista = idListaEdicao.innerHTML.replace('#', '')

    let lista2 = {
        nome: nomeEdicao.value,
        sobrenome: sobreNomeEdicao.value,
        cpf: cpfEdicao.value,
        email: emailEdicao.value,
        telefone: telefoneEdicao.value,
        senha: senhaEdicao.value,
        id: idLista
    }

    let listaAtual = document.getElementById(''+idLista+'');
    if(listaAtual){
        const indiceTarefa = obterListaPorId(idLista);
        dbLista = dbLista[indiceTarefa] = lista2;
        salvarListaLocalStorange();
        let li = criarTagLI(lista2);
        lista.replaceChild(li, listaAtual);
        alternarJanelaEdicao();
    }
   else {
        alert('Elemento HTML não encontrado!');
    } 

});

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function adicionarLista(tarefa){
    dbLista.push(tarefa);
    salvarListaLocalStorange(dbLista);
    renderizarListaTarefaHtml();
   
}

function criarTagLI(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoLista');
    span.innerHTML = 'nome: ' + tarefa.nome +
    ' sobrenome: ' + tarefa.sobrenome + '<br>' + '<br>' +
    'cpf: ' + tarefa.cpf + '<br>' + '<br>' + 
    'email: ' + tarefa.email + '<br>' + '<br>' +
     'telefone: ' + tarefa.telefone
      + '<br>'+ '<br>'  +
     'senha: ' + tarefa.senha;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-acao');
    btnEditar.innerHTML = '  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/ </svg>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-acao');
    btnExcluir.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/> </svg>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    let btnEnviar = document.createElement('button');
    btnEnviar.classList.add('btn-acao-enviar');
    btnEnviar.innerHTML = 'Enviar Para Email';

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);
    div.appendChild(btnEnviar);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}   

function editar(idLista){
    let li = document.getElementById(''+idLista+'');
        if(li){

           

            idListaEdicao.innerHTML = '#' + idLista;
            nomeEdicao.value = li.innerText;
            sobreNomeEdicao.value = li.innerText;
            cpfEdicao.value = li.innerText;
            emailEdicao.value = li.innerText;
            telefoneEdicao.value = li.innerText;
            senhaEdicao.value = li.innerText;
          

           alternarJanelaEdicao();
        }
        else{
            alert('Elemento html não encontrado');
        }
}

function excluir(idLista){
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao){

        const indiceTarefa = obterListaPorId(idLista);
        dbLista.splice(indiceTarefa, 1);
       salvarListaLocalStorange();
       
        let li = document.getElementById(''+idLista+'');
        if(li){
            lista.removeChild(li);
        }
        else{
            alert('Elemento html não encontrado');
        }
    }
}


function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}


function obterListaPorId(idLista){
    const indiceTarefa = dbLista.findIndex(t => t.id == idLista);
       if(indiceTarefa < 0){
        throw new Error ('Id da tarefa não encontrado: ', idLista)
       }
       return indiceTarefa;
}

function renderizarListaTarefaHtml(){
    lista.innerText = '';

    for(let i=0; i < dbLista.length; i++){
    let li = criarTagLI(dbLista[i]);
    lista.appendChild(li);
    }

    nomeLista.value = '';
    sobreNome.value = '';
    cpf.value = '';
    email.value = '';
    telefone.value = '';
    senha.value = '';
}

function salvarListaLocalStorange(){
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbLista));
}

function obterListaLocalStorange(){
    if(localStorage.getItem(KEY_LOCAL_STORAGE)){
        dbLista = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }
}


