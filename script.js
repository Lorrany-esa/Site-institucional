document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // LÓGICA DE BUSCA
    // ===================================
    const botao = document.getElementById("botaoBusca");
    const input = document.getElementById("campoBusca");

    // Funções auxiliares para Busca
    function limparDestaques() {
        document.querySelectorAll(".marcado").forEach(el => {
            // Volta o conteúdo do span para o texto simples, removendo o span
            el.outerHTML = el.innerText;
        });
    }

    function buscar() {
        const termo = input.value.trim().toLowerCase();
        if (!termo) {
            alert("Digite algo para buscar.");
            return;
        }

        limparDestaques();

        const elementos = document.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, a, span, div, li"
        );

        let encontrou = false;

        elementos.forEach(el => {
            const textoOriginal = el.textContent;
            const textoLower = textoOriginal.toLowerCase();

            if (textoLower.includes(termo)) {
                // Remove destaques de dentro de elementos que já têm (para evitar aninhamento)
                let tempContent = textoOriginal;
                const regex = new RegExp(`(${termo})`, "gi");
                
                // Usamos innerHTML com replace para destacar
                el.innerHTML = tempContent.replace(regex, '<span class="marcado">$1</span>');
                encontrou = true;
            }
        });

        if (!encontrou) {
            alert("Nenhum resultado encontrado na página.");
            return;
        }

        const primeiro = document.querySelector(".marcado");
        if (primeiro) {
            primeiro.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
    
    // Event Listeners da Busca (Após a declaração das funções)
    if (botao && input) {
        botao.addEventListener("click", function(e) {
            e.preventDefault();
            buscar();
        });

        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                buscar();
            }
        });
    }


    // ===================================
    // LÓGICA DO SUBMENU MOBILE (Clique para Abrir)
    // ===================================
    
    // 1. Seleciona todos os links de menu que têm um submenu.
    const menuItemsComSubmenu = document.querySelectorAll('.menu .submenu > a');

    menuItemsComSubmenu.forEach(link => {
        link.addEventListener('click', function(event) {
            // Verifica se a largura da tela é menor ou igual a 992px
            if (window.matchMedia('(max-width: 992px)').matches) {
                
                // Impede que o link navegue para outra página
                event.preventDefault(); 
                
                // O <li> pai do link (o item que possui a classe 'submenu')
                const submenuPai = this.closest('.submenu');

                // Verifica se o submenu clicado já está aberto
                const estaAberto = submenuPai.classList.contains('ativo');

                // Fecha todos os submenus antes de abrir o novo (comportamento "acordeão")
                document.querySelectorAll('.menu .submenu').forEach(item => {
                    item.classList.remove('ativo');
                });
                
                // Se não estava aberto, abre o submenu (adiciona a classe 'ativo')
                if (!estaAberto) {
                    showSubmenu(submenuPai);
                }
                
                // O submenu agora será exibido pelo CSS '.submenu.ativo ul { display: block !important; }'
            }
        });

        link.addEventListener('mouseover', function(event) {
            event.preventDefault();
            showSubmenu(this.closest('.submenu'));
        });
    });

    function showSubmenu(submenuPai){
        const ul = submenuPai.querySelector('ul');
                    
        // Calcula a posição do elemento pai
        const rect = submenuPai.getBoundingClientRect();
        
        ul.style.position = 'fixed';
        ul.style.top = rect.bottom + 'px';
        ul.style.left = rect.left + 'px';
        ul.style.width = rect.width + 'px';
    } 





}); // Fim CORRETO do DOMContentLoaded


    
    


