const KEY_BD = '@usuariosestudo'


var listaRegistros = {
    ultimoIdGerado:0,
    usuarios:[]
}

var FILTRO = ''


function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) )
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}


function pesquisar(value){
    FILTRO = value;
    desenhar()
}



function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody')
    if(tbody){
        var data = listaRegistros.usuarios;
        if(FILTRO.trim()){
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data = data.filter( usuario => {
                return expReg.test( usuario.nome ) || expReg.test( usuario.prestador )
            } )
        }
        data = data
            .sort( (a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map( usuario => {
                const data = document.querySelector("#opa");
                const date2 = new Date(usuario.dataAdmissao);
                                              
                var first = new Date()
                var second = new Date(usuario.dataAdmissao)

                var x = new Date(first);
                var y = new Date(second);

                // seconds = milliseconds/1000
                // minutes = seconds/60
                // hours = minutes/60
                // Days = hours/24

                const diaD = document.querySelector("#oba")
                const formatter = Intl.DateTimeFormat('pt-BR',{
                        dateStyle:"short",});

                const diffInDays = Math.floor((x - y) / (1000 * 60 * 60 * 24));
                usuario.diasInternado = diffInDays
                usuario.dataAdmissao = formatter.format(date2)

                return `<tr>
                <td>${usuario.id}</td>
                <td>${usuario.carteirinha}</td>
                <td style="width:15%;">${usuario.nome}</td>
                <td style="text-align: center;width:1%">${usuario.idade}</td>
                <td style="text-align: center;width:4%">${usuario.fone}</td>
                <td>${usuario.cidadeResidencia}</td>
                <td style="text-align: center;width:0.1%">${usuario.ufResidencia}</td>
                <td>${usuario.empresa}</td>
                <td>${usuario.cpt}</td>
                <td>${usuario.numdaGuia}</td>
                <td>${usuario.codCID1}</td>
                <td>${usuario.codCID2}</td>
                <td style="width:10%">${usuario.prestador}</td>
                <td>${usuario.acomodacao}</td>
                <td>${usuario.cidadeprestador}</td>
                <td>${usuario.ufprestador}</td>
                <td id="opa" style="text-align: center;width:4%">${usuario.dataAdmissao}</td>
                <td>${usuario.acomodacaoInstalada}</td>
                <td>${usuario.conteudo}</td>
                <td id="oba" style="text-align: center;">${usuario.diasInternado}</td>              
                
                        <td class="bottoesEdicao">
                            <button onclick='vizualizar("cadastro",false,${usuario.id})'>Editar Dados Cadastrais</button>
                            <button class='verde' onclick='perguntarSeDeleta(${usuario.id})'>Informar Alta Médica</button>
                        </td>
                    </tr>`
                
            } )
        tbody.innerHTML = data.join('')
        
    }
}

function insertUsuario(carteirinha ,nome ,idade ,fone ,cidadeResidencia ,ufResidencia ,empresa ,cpt ,numdaGuia ,codCID1 ,codCID2 ,prestador ,acomodacao ,cidadeprestador ,ufprestador ,dataAdmissao ,acomodacaoInstalada ,conteudo){
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.usuarios.push({
        id ,carteirinha ,nome ,idade ,fone ,cidadeResidencia ,ufResidencia ,empresa ,cpt ,numdaGuia ,codCID1 ,codCID2 ,prestador ,acomodacao ,cidadeprestador ,ufprestador ,dataAdmissao ,acomodacaoInstalada ,conteudo

    })
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function editUsuario(id ,carteirinha ,nome ,idade ,fone ,cidadeResidencia ,ufResidencia ,empresa ,cpt ,numdaGuia ,codCID1 ,codCID2 ,prestador ,acomodacao ,cidadeprestador ,ufprestador ,dataAdmissao ,acomodacaoInstalada ,conteudo){
    var usuario = listaRegistros.usuarios.find( usuario => usuario.id == id )
    usuario.carteirinha= carteirinha;
    usuario.nome = nome;
    usuario.idade = idade;
    usuario.fone = fone;
    usuario.cidadeResidencia = cidadeResidencia;
    usuario.ufResidencia = ufResidencia;
    usuario.empresa = empresa;
    usuario.cpt = cpt;
    usuario.numdaGuia = numdaGuia;
    usuario.codCID1 = codCID1;
    usuario.codCID2 = codCID2;
    usuario.prestador = prestador;
    usuario.acomodacao = acomodacao;
    usuario.cidadeprestador = cidadeprestador;
    usuario.ufprestador = ufprestador;
    usuario.dataAdmissao = dataAdmissao;
    usuario.acomodacaoInstalada = acomodacaoInstalada;
    usuario.conteudo = conteudo;
    


    gravarBD()
    desenhar()
    vizualizar('lista')
}

function deleteUsuario(id){
    listaRegistros.usuarios = listaRegistros.usuarios.filter( usuario => {
        return usuario.id != id
    } )
    gravarBD()
    desenhar()
}

function perguntarSeDeleta(id){

    if(confirm(`Deseja realizar a alta da paciente:`+id)){
        // desenhar2();
        deleteUsuario(id);
    }
}


function limparEdicao(){


    document.getElementById('id').value = ''
    document.getElementById('carteirinha').value = ''
    document.getElementById('nome').value = ''
    document.getElementById('idade').value = ''
    document.getElementById('fone').value = ''
    document.getElementById('cidadeResidencia').value = ''
    document.getElementById('ufResidencia').value = ''
    document.getElementById('empresa').value = ''
    document.getElementById('cpt').value = ''
    document.getElementById('numdaGuia').value = ''
    document.getElementById('codCID1').value = ''
    document.getElementById('codCID2').value = ''
    document.getElementById('prestador').value = ''
    document.getElementById('acomodacao').value = ''
    document.getElementById('cidadeprestador').value = ''
    document.getElementById('ufprestador').value = ''
    document.getElementById('dataAdmissao').value = ''
    document.getElementById('acomodacaoInstalada').value = ''
    document.getElementById('conteudo').value = ''


}

function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        if(novo) limparEdicao()
        if(id){
            const usuario = listaRegistros.usuarios.find( usuario => usuario.id == id )
            if(usuario){
                
                document.getElementById('id').value = usuario.id
                document.getElementById('carteirinha').value = usuario.carteirinha
                document.getElementById('nome').value = usuario.nome
                document.getElementById('idade').value = usuario.idade
                document.getElementById('fone').value = usuario.fone
                document.getElementById('cidadeResidencia').value = usuario.cidadeResidencia
                document.getElementById('ufResidencia').value = usuario.ufResidencia
                document.getElementById('empresa').value = usuario.empresa
                document.getElementById('cpt').value = usuario.cpt
                document.getElementById('numdaGuia').value = usuario.numdaGuia
                document.getElementById('codCID1').value = usuario.codCID1
                document.getElementById('codCID2').value = usuario.codCID2
                document.getElementById('prestador').value = usuario.prestador
                document.getElementById('acomodacao').value = usuario.acomodacao
                document.getElementById('cidadeprestador').value = usuario.cidadeprestador
                document.getElementById('ufprestador').value = usuario.ufprestador
                document.getElementById('dataAdmissao').value = usuario.dataAdmissao
                document.getElementById('acomodacaoInstalada').value = usuario.acomodacaoInstalada
                document.getElementById('conteudo').value = usuario.conteudo


            }
        }
        document.getElementById('carteirinha').focus()
    }
}



function submeter(e){
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        carteirinha: document.getElementById('carteirinha').value,
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        fone: document.getElementById('fone').value,
        cidadeResidencia: document.getElementById('cidadeResidencia').value,
        ufResidencia: document.getElementById('ufResidencia').value,
        empresa: document.getElementById('empresa').value,
        cpt: document.getElementById('cpt').value,
        numdaGuia: document.getElementById('numdaGuia').value,
        codCID1: document.getElementById('codCID1').value,
        codCID2: document.getElementById('codCID2').value,
        prestador: document.getElementById('prestador').value,
        acomodacao: document.getElementById('acomodacao').value,
        cidadeprestador: document.getElementById('cidadeprestador').value,
        ufprestador: document.getElementById('ufprestador').value,
        dataAdmissao: document.getElementById('dataAdmissao').value,
        acomodacaoInstalada: document.getElementById('acomodacaoInstalada').value,
        conteudo: document.getElementById('conteudo').value,

        
    }
    if(data.id){
        editUsuario(data.id, data.carteirinha,data.nome, data.idade, data.fone, data.cidadeResidencia, data.ufResidencia, data.empresa, data.cpt, data.numdaGuia, data.codCID1, data.codCID2, data.prestador, data.acomodacao, data.cidadeprestador, data.ufprestador, data.dataAdmissao, data.acomodacaoInstalada, data.conteudo)
    }else{
        insertUsuario( data.carteirinha,data.nome, data.idade, data.fone, data.cidadeResidencia, data.ufResidencia, data.empresa, data.cpt, data.numdaGuia, data.codCID1, data.codCID2, data.prestador, data.acomodacao, data.cidadeprestador, data.ufprestador, data.dataAdmissao, data.acomodacaoInstalada, data.conteudo )
    }
}


window.addEventListener('load', () => {
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {
        pesquisar(e.target.value)
    })

})