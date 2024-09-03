function rendenizarCards() {
    const key = 'XqGCVYChfGH3UqPm82TqzbFjwQLz8Nb8';
    const url = `https://api.nytimes.com/svc/books/v3/lists.json?list=Young%20Adult%20Hardcover&api-key=${key}`;
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    };
  
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.text().then(err => {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    errorMessage: err,
                });
            });
        })
        .then(data => {
            console.log(data); 

            const booksList = document.getElementById('lista_livros');
            const livros = []; 

            data.results.forEach(resp => { 
                resp.book_details.forEach(livro => { 
                    const listaLivros = document.createElement('div');
                    listaLivros.classList.add('card');
                    listaLivros.setAttribute('data-time-id', livro.title);
                    listaLivros.innerHTML = `
                        <div class="dados_livro">
                            <h4 class="title">${livro.title}</h4>
                            <p class="author"><strong>Autor:</strong> ${livro.author}</p>
                            <p class="description"><strong>Descrição:</strong> ${livro.description}</p>
                            <p class="publisher"><strong>Editora:</strong> ${livro.publisher}</p>
                            <p class="age_group"><strong>Faixa Etária:</strong> ${livro.age_group }</p>
                        </div>
                    `;

                    booksList.appendChild(listaLivros);
                    livros.push(livro); 
                });
            });

            sessionStorage.setItem("livros", JSON.stringify(livros));
            detalhes_cards(livros);
        })
}
rendenizarCards();

function detalhes_cards(livros){
    let Livros = document.querySelectorAll('div.card');
            Livros.forEach((cardSelecionado) => {
                cardSelecionado.addEventListener('click', () => {
                    let tituloLivro = cardSelecionado.querySelector('.title').textContent; 
                    let livroSelecionado = livros.find(livro => livro.title === tituloLivro); 
                    if (livroSelecionado) {
                        sessionStorage.setItem("livroSelecionado", JSON.stringify(livroSelecionado)); 
                        window.location.href = "detalhes.html";
                }
            });
        });
}


function filtrar() {
    let inputSearch = document.querySelector("input[type='search']");
    document.querySelector("input[type = 'search']").addEventListener('input',filtrar);
    let filter = inputSearch.value.toLowerCase();  //garante que a pesquisa não seja sensível a maiúsculo e minúsculo
    let listaLivros = document.querySelectorAll("#lista_livros .card");

    listaLivros.forEach((livroPesquisado)=>{

        let tituloLivro = livroPesquisado.querySelector(".title").innerText.toLowerCase();
        let autorLivro = livroPesquisado.querySelector(".author").innerText.toLowerCase();

        if(tituloLivro.includes(filter) || autorLivro.includes(filter)){
            livroPesquisado.style.display ="";
        }else{
            livroPesquisado.style.display = "none";
        }
    });
}

filtrar();