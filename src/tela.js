const util = Util

const ID_CONTEUDO ="conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM ="mensagem"
const CLASSE_INVISIVEL ="invisible"
const ID_CARREGANDO = "carregando"
const CONTADOR ="contador"
const ID_MOSTRAR = "mostrarTudo"

const MENSAGENS = {
    sucesso:{
        texto: 'Combinação Correta',
        classe: 'alert-success'
    },
    erro:{
        texto: 'Combinação InCorreta',
        classe: 'alert-danger'
    }
}

class Tela {
    
    static obterCodigoHtml (item) {
        return ` 
        <div class="col-md-3">
        <div class="card" style="width: "18rem;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
            <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
          </div>
          <br/>
    </div>`
    }

   //  pegou elemento pelo id  e jogu no conteudo
    static alterarConteudoHTML (codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static configurarBotãoVerificarSelecao (funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick
    }
    
    static gerarStringHtmlPelaImagem(data) {
        //para cada item vai executar o codigo html e juntar todos em uma string
        return data.map(Tela.obterCodigoHtml).join('')
    }
    
    static atualizarImagens (itens) {
        const codigoHtml = Tela.gerarStringHtmlPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static configurarBotãoJogar(funcaoOnClick) {

        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick

    }
    static exibirHerois(nomedoHeroi, img) {

        const elementosHtml = document.getElementsByName(nomedoHeroi)
        // para cada elemento encontrardo, vamos alterar a imagem
        // para a imagem inicia dele
        //forEach, para cada item, dentro dos () setamos o valor de imagem
        elementosHtml.forEach(item=> (item.src = img ))
    }
    static  async exibirMensagem(sucesso = true ){
        const elemento = document.getElementById(ID_MENSAGEM)
        if (sucesso){
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto

        }
        else{
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText= MENSAGENS.erro.texto

        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)

    }

    static exibirCarregando(mostrar=true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }

     static iniciarContador(){
         let contAte = 3
         const elementoContador = document.getElementById(CONTADOR)

        const indentificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${indentificadorNoTexto} segundos...`
        const atualizarTexto = () => ( 
            (elementoContador.innerHTML = textoPadrao.replace(indentificadorNoTexto, contAte--))
         )
         atualizarTexto()
         const idDoIntervalo = setInterval(atualizarTexto,1000)
         return idDoIntervalo
     }

     static limparContador (idDoIntervalo) {
         clearInterval (idDoIntervalo)
         document.getElementById(CONTADOR).innerHTML = ""
     }

     static configurarBotãoMostraTudo(funcaoOnClick){
         const btnMostrarTudo = document.getElementById(ID_MOSTRAR)
         btnMostrarTudo.onclick = funcaoOnClick
     }
    

}