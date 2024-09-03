        document.addEventListener("DOMContentLoaded", function() {
            let livroSelecionado = JSON.parse(sessionStorage.getItem("livroSelecionado"));
            if (livroSelecionado) {
                let infoLivro = document.getElementById("info-livro");
                let html = `
                    <div>
                        <h2 class="titulo_livro">${livroSelecionado.title}</h2>
                        <p class ="autor"><strong>Autor:</strong> ${livroSelecionado.author}</p>
                        <p class ="descricao"><strong>Descrição:</strong> ${livroSelecionado.description}</p>
                        <p class ="editora"><strong>Editora:</strong> ${livroSelecionado.publisher}</p>
                        <p class ="idade"><strong>Faixa Etária:</strong> ${livroSelecionado.age_group}</p>
                    </div>
                `;
                infoLivro.innerHTML = html;
            }
        });