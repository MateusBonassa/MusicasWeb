window.addEventListener('load', function() {
    fetch('http://localhost:8081/buscar-categorias')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        
        var select = document.getElementById("categoria");
        select.innerHTML="";
        data.forEach(cat => {
            select.innerHTML+=`<option value="${cat.nome}">${cat.nome}</option>`;
        });
      })
      .catch(function(error) {
        console.error('Erro na requisição:', error);
      });
  });

function cadastrar()
{

  const data = {
    titulo: document.getElementById("titulo").value,
    artista: document.getElementById("artista").value,
    duracao: document.getElementById("duracao").value,
    categoria:document.getElementById("categoria").value
  };
  fetch('http://localhost:8081/cadastrar', {
  
    method: 'POST',
  
    headers: {
  
      'Content-Type': 'application/json'
  
    },
  
    body: JSON.stringify(data)
  
  })
  
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    if(res.status)
    {
      alert("Cadastro efetuado com sucesso");
      location.reload();
    }
   else
    {
      alert("Um erro ocorreu, verifique os dados");
    }
  })
  .catch(function(error) {
    console.error('Erro na requisição:', error);
  });
}

function fazerBusca()
{
  
  let filtro = document.getElementById("filtro").value;
  let tpfiltro = document.getElementById("tpfiltro").value;
  fetch('http://localhost:8081/buscar-musicas?filtro='+filtro+'&&tpfiltro='+tpfiltro)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var tabela = document.getElementById("tabcorpo");
    tabela.innerHTML="";
    data.forEach(msc => {
      tabela.innerHTML+=`<tr><td>${msc.titulo}</td><td>${msc.artista}</td><td>${msc.duracao}</td><td>${msc.categoria_id}</td></tr>`;
  });
  })
  .catch(function(error) {
    console.error('Erro na requisição:', error);
  });
}

 document.getElementById("btncad").addEventListener('click', function() {
   
    document.getElementById("musicasTab").style.display ='none';
    document.getElementById("formulario").style.display = 'block';
  });
  document.getElementById("btnbusca").addEventListener('click', function() {
   
    document.getElementById("formulario").style.display ='none';
    document.getElementById("musicasTab").style.display = 'block';
  });