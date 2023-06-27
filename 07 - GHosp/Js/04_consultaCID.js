const KEY_BD = '@usuariosestudo'


var listaRegistros = {
    ultimoIdGerado:0,
    usuarios:[]
}


    var FILTRO = ''


function pesquisar(value){
    FILTRO = value;
    desenhar()
}


function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody2')
    if(tbody){
        var data = listaRegistros.usuarios;
        if(FILTRO.trim()){
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data = data.filter( usuario => {
                return expReg.test( usuario.Descrição ) || expReg.test( usuario.Ambos )
            } )
        }
        data = data
            .sort( (a, b) => {
                return a.Descrição < b.Descrição ? -1 : 1
            })
            .map( usuario => {

                return `<tr>
                <td>${usuario.Categoria}</td>
                <td>${usuario.Descrição}</td>
                <td>${usuario.Ambos}</td>
            
                    </tr>`
            } )
        tbody.innerHTML = data.join('')
        
    }
}


function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        if(novo) limparEdicao()
        if(id){
            const usuario = listaRegistros.usuarios.find( usuario => usuario.Categoria == id )
            if(usuario){
                
                document.getElementById('Categoria').value = usuario.Categoria
                document.getElementById('Descrição').value = usuario.Descrição
                document.getElementById('Ambos').value = usuario.Ambos
            }
        }
        document.getElementById('Categoria').focus()
    }
}
