const usuarios = [

    {
      login:'Eduardo',
      pass:'mis1234'
    },
    {
      login:'Viviane',
      pass:'auditoria1234'
    },

    {
      login:'Magno',
      pass:'medvida1234'
    },

]

function logar(){

  let email = document.getElementById('email').value;
  let senha = document.getElementById('senha').value;

  for(let i in usuarios){

    if(email == usuarios[i].login && senha == usuarios[i].pass){
    
      location.href = "02_home.html";
      alert('Seja bem vindo (a) ao Sistema de Acompanhamento aos Internados da Rede San Miguel !!!')
      
      break 

    }else{
      
      
    }

  }
  alert('Usuário ou senha Inválidos !!!')
  email = ""
  senha = ""
  
}