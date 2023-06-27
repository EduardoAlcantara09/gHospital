const KEY_BD2 = '@desospitalizados'

var listaRegistros2 = {
    ultimoIdGerado2:0,
    usuarios2:[]
}

var FILTRO2 = ''

function gravarBD2(){
    localStorage.setItem(KEY_BD2, JSON.stringify(listaRegistros2) )
}

function lerBD2(){
    const data2 = localStorage.getItem(KEY_BD2)
    if(data2){
        listaRegistros2 = JSON.parse(data2)
    }
    desenhar2()
}


function pesquisar2(value){
    FILTRO2 = value;
    desenhar2()
}

function desenhar2(){
    const tbody2 = document.getElementById('listaRegistrosBody2')
    if(tbody2){
        var data2 = listaRegistros2.usuarios2;
        if(FILTRO2.trim()){
            const expReg2 = eval(`/${FILTRO2.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data2 = data2.filter( usuario => {
                return expReg2.test( usuario.nome ) || expReg2.test( usuario.prestador )
            } )
        }
        data2 = data2
            .sort( (a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map( usuarios2 => {
             
                return `<tr>
                <td>${usuarios2.id}</td>
                <td>${usuarios2.carteirinha}</td>
                <td>${usuarios2.nome}</td>
                <td>${usuarios2.idade}</td>
                <td>${usuarios2.fone}</td>
                <td>${usuarios2.cidadeResidencia}</td>
                <td>${usuarios2.ufResidencia}</td>
                <td>${usuarios2.empresa}</td>
                <td>${usuarios2.cpt}</td>
                <td>${usuarios2.numdaGuia}</td>
                <td>${usuarios2.codCID1}</td>
                <td>${usuarios2.codCID2}</td>
                <td>${usuarios2.prestador}</td>
                <td>${usuarios2.acomodacao}</td>
                <td>${usuarios2.cidadeprestador}</td>
                <td>${usuarios2.ufprestador}</td>
                <td id="opa">${usuario.dataAdmissao}</td>
                <td>${usuarios2.acomodacaoInstalada}</td>
                <td>${usuarios2.conteudo}</td>
                <td id="oba">${usuarios2.diasInternado}</td>
                <td id="motivoAlta">${usuarios2.motivoAlta}</td>
                
                    </tr>`
            } )
        tbody2.innerHTML = data2.join('')
        
    }
}

function insertUsuario2(carteirinha ,nome ,idade ,fone ,cidadeResidencia ,ufResidencia ,empresa ,cpt ,numdaGuia ,codCID1 ,codCID2 ,prestador ,acomodacao ,cidadeprestador ,ufprestador ,dataAdmissao ,acomodacaoInstalada ,conteudo, motivoAlta){
    const id2 = listaRegistros2.ultimoIdGerado2 + 1;
    listaRegistros2.ultimoIdGerado2 = id2;
    listaRegistros2.usuarios2.push({
        id ,carteirinha ,nome ,idade ,fone ,cidadeResidencia ,ufResidencia ,empresa ,cpt ,numdaGuia ,codCID1 ,codCID2 ,prestador ,acomodacao ,cidadeprestador ,ufprestador ,dataAdmissao ,acomodacaoInstalada ,conteudo, motivoAlta
 
    })
    gravarBD2()
    desenhar2()
    vizualizar2('lista2')
}

function editUsuario2(id ,carteirinha ,nome ,idade ,fone ,cidadeResidencia ,ufResidencia ,empresa ,cpt ,numdaGuia ,codCID1 ,codCID2 ,prestador ,acomodacao ,cidadeprestador ,ufprestador ,dataAdmissao ,acomodacaoInstalada ,conteudo, motivoAlta){
    var usuarios2 = listaRegistros2.usuarios2.find( usuarios2 => usuarios2.id == id )
    usuarios2.carteirinha= carteirinha;
    usuarios2.nome = nome;
    usuarios2.idade = idade;
    usuarios2.fone = fone;
    usuarios2.cidadeResidencia = cidadeResidencia;
    usuarios2.ufResidencia = ufResidencia;
    usuarios2.empresa = empresa;
    usuarios2.cpt = cpt;
    usuarios2.numdaGuia = numdaGuia;
    usuarios2.codCID1 = codCID1;
    usuarios2.codCID2 = codCID2;
    usuarios2.prestador = prestador;
    usuarios2.acomodacao = acomodacao;
    usuarios2.cidadeprestador = cidadeprestador;
    usuarios2.ufprestador = ufprestador;
    usuarios2.dataAdmissao = dataAdmissao;
    usuarios2.acomodacaoInstalada = acomodacaoInstalada;
    usuarios2.conteudo = conteudo;
    usuarios2.motivoAlta = motivoAlta;
    


    gravarBD2()
    desenhar2()
    vizualizar2('lista')
}

function deleteUsuario2(id){
    listaRegistros2.usuarios2 = listaRegistros2.usuarios2.filter( usuario => {
        return usuario.id != id
    } )
    gravarBD2()
    desenhar2()
}

function perguntarSeDeleta2(id){
    if(confirm('Deseja realizar a alta da paciente:'+' - '+id)){
        deleteUsuario2(id)
    }
}


function limparEdicao2(){


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

function vizualizar2(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        if(novo) limparEdicao2()
        if(id){
            const usuario = listaRegistros2.usuarios2.find( usuario => usuario.id == id )
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



function submeter2(e){
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
        editUsuario2(data.id, data.carteirinha,data.nome, data.idade, data.fone, data.cidadeResidencia, data.ufResidencia, data.empresa, data.cpt, data.numdaGuia, data.codCID1, data.codCID2, data.prestador, data.acomodacao, data.cidadeprestador, data.ufprestador, data.dataAdmissao, data.acomodacaoInstalada, data.conteudo)
    }else{
        insertUsuario2( data.carteirinha,data.nome, data.idade, data.fone, data.cidadeResidencia, data.ufResidencia, data.empresa, data.cpt, data.numdaGuia, data.codCID1, data.codCID2, data.prestador, data.acomodacao, data.cidadeprestador, data.ufprestador, data.dataAdmissao, data.acomodacaoInstalada, data.conteudo )
    }
}


window.addEventListener('load', () => {
    lerBD2()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter2)
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {
        pesquisar2(e.target.value)
    })

})