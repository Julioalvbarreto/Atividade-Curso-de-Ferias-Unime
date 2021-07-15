
        let estados = document.querySelector("#estados")
        let imagemHiden = document.querySelector(".dados")
        let tableNoHiden = document.querySelector(".dadosEstatisticas")
        let dadosApresentar = document.querySelector(".dados")
        
        let urlApi = "https://covid19-brazil-api.vercel.app/api/report/v1"

        
        fetch(urlApi).then(response => response.json()).then(json => {
            dadosApresentar.innerHTML = '<img id="boletim" width="600" src="./imagens/capa-boletim.png" alt="img do google boletim COVID-19">'
            // var date = json.data[0].datetime
            
            
            json.data.forEach(estado => {
                estados.innerHTML += `<option id="${estado.uid}" value="${estado.uf}">${estado.state}</option>`
            });

            estados.addEventListener("change", function (){
            imagemHiden.setAttribute("style", "display : none;")
            tableNoHiden.setAttribute("style", "display: table;")
            var ufSelecionada = this.value
        
            json.data.forEach(estado => {
                if(estado.uf == ufSelecionada){
                    tableNoHiden.innerHTML = `
                <table>
                    <tr>
                        <td class="menu-info">Numero de casos (Confirmados)</td>
                        <td class="td2 menu-info">Numero de óbitos</td>
                    </tr>
                    <tr>
                        <td >${estado.cases}</td>
                        <td class="td2">${estado.deaths}</td>
                    </tr>
                    <tr>
                        <td class="menu-info">Número de casos (Suspeitos)</td>
                        <td class="td2 menu-info">Casos rejeitados</td>
                    </tr>
                    <tr>
                        <td>${estado.suspects}</td>
                        <td class="td2">${estado.refuses}</td>
                    </tr>
                </table>
            <span>Atualizado em: ${data(estado.datetime)}</span>`
                } if(ufSelecionada == "selecionar"){
                    dadosApresentar.innerHTML = '<img id="boletim" width="600" src="./imagens/capa-boletim.png" alt="img do google boletim epidemiologico">'
                    imagemHiden.setAttribute("style", "display : block;")
                    tableNoHiden.setAttribute("style", "display: none;")
                    tableNoHiden.innerHTML = ""

                }
                
            });
             
            })
            
            function data(dados){
                    var data = new Date(dados),
                        dia  = data.getDate().toString().padStart(2, '0'),
                        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
                        ano  = data.getFullYear();
                        var hours = dados
                        hours = dados.substring(11,16).split('-').reverse().join('-');
                    return `${dia}/${mes}/${ano} ás ${hours}`;
                }
        })