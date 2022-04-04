class JogoDaMemoria {

    // se mandar um objeto, vai pegar somente a propriedade "tela"
 constructor({tela,util}) {

    this.tela = tela
    this.util = util

    this.heroisIniciais = [
        {img: './imag/batima.png', nome:'batima'},
        {img: './imag/flash.png', nome:'flash'},
        {img: './imag/evil.png', nome:'evil'},
        {img: './imag/dead.png', nome:'dead'}

    ]

    this.iconePadrao = './imag/samurai.png'
    this.heroisEscondidos = []
    this.heroisSelecionados = []
 }
 //para usar o this nao e necessario static
    inicializar(){
     //vai pegar todas as funcoes da classe tela
     //coloca todos os herois na tela

     this.tela.atualizarImagens(this.heroisIniciais)

     //foca a tela a usar o THIs do jogo da memoria .bind
    
     this.tela.configurarBotãoJogar(this.jogar.bind(this))
     this.tela.configurarBotãoVerificarSelecao(this.verificarSelecao.bind(this))
     this.tela.configurarBotãoMostraTudo(this.mostrarHeroisEscondidos.bind(this))

    }

    esconderHerois(herois)
    {
        //trocar imagens de todos os herois pelo icon padrao
        //como fizemos no constructor, vamos extrari so o necessario
        // usando a sixtace ({chave:1}) estamos falando oq vamos retornar dento dos parenteses
        //quando nao usamos : (exemplo do id), o js entende que o noem e o mesmo valo
        // ex id:id vira id.
        const heroisOcultos = herois.map(({nome, id})=> ({
            id,
            nome,
            img:this.iconePadrao

        }))
        //atualizar tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        // guardamos os herois para trabalhar com eles depois
        this.heroisEscondidos = heroisOcultos

    }

    async  embaralhar() {
        const copias = this.heroisIniciais
       // duplicar itens
        .concat(this.heroisIniciais)
        //entrar em cada item e crirar um id aleatorio
         .map(item =>{
             return  Object.assign({}, item ,{ id:( Math.random()/0.5)})
         } )
         // ordenar aleatoriamente
        .sort(()=> Math.random() -0.5 )

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()
        //vamos espera 1 sec para atualizar a tela
        await this.util.timeout(3000)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        this.tela.limparContador(idDoIntervalo)
        
    }

   
    exibirHerois(nomedoHeroi)
    {
        //vamos procurar esse heroi pelo nome
        //obter somente a imagem dele
        const { img } = this.heroisIniciais.find(({nome}) => nomedoHeroi === nome )
        this.tela.exibirHerois(nomedoHeroi, img)
    }

    verificarSelecao(id,nome){
        const item = {id,nome} 
       const heroisSelecionados = this.heroisSelecionados.length
       switch(heroisSelecionados) {
           case 0:
               //adicionar escolha na lista
               //1 clicada
               this.heroisSelecionados.push(item)
               break;
            case 1:
                const [opcao1] = this.heroisSelecionados
                //zerar itens para nao selecionar mais de dois
                this.heroisSelecionados = []
                if(opcao1.nome === item.nome && opcao1!== item.id){
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return;
                }

                this.tela.exibirMensagem(false)
                break;

    }
}
    mostrarHeroisEscondidos(){
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos){
            const {img} = this.heroisIniciais.find(item=> item.nome === heroi.nome )
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }
    jogar() {
        this.embaralhar()
    }
}