function autocomplete(inp, arr) {
    /*A função autocomplete leva dois parâmetros, o elemento da caixa de texto e um array de possíveis valores preenchidos automaticamente:*/
    let currentFocus;
    /*Executa uma função quando o usuário escreve na caixa de texto:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        /*Fecha todas as listas já abertas de valores preenchidos automaticamente*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*cria um elemento DIV que conterá os itens (valores):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*anexa o elemento DIV como elemento-filho do container autocomplete:*/
        this.parentNode.appendChild(a);
        /*Para cada item do array*/
        for (i = 0; i < arr.length; i++) {
            /*Verifica se o item começa com as mesmas letras do valor da caixa de texto:*/
            if (arr[i].substring(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*Cria um elemento DIV para cada elemento correspondente:*/
                b = document.createElement("DIV");
                /*Destaca as letras correspondentes em negrito:*/
                b.innerHTML = "<strong>" + arr[i].substring(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substring(val.length);
                /*Insere um campo de entrada que conterá o valor atual do item do array:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*Executa uma função quando o usuário clica no valor do item (elemento DIV):*/
                b.addEventListener("click", function (e) {
                    /*Insere o valor para a caixa de texto de autocomplete:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*Fecha a lista de valores preenchidos automaticamente (ou qualquer outra lista aberta de valores preenchidos automaticamente):*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*Executa uma função quando determinadas teclas são pressionadas no teclado:*/
    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*Se a tecla de seta PARA BAIXO for pressionada, a variável currentFocus recebe um incremento:*/
            currentFocus++;
            /*E torna o item atual mais visível:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*Se a tecla de seta PARA CIMA for pressionada, a variável currentFocus recebe um decremento:*/
            currentFocus--;
            /*E torna o item atual mais visível:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*Se a tecla ENTER for pressionada, evita que o formulário seja enviado:*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*E simula um clique no item "active" (ou "ativo"):*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*Uma função para classificar um item como "active" (ou "ativo"):*/
        if (!x) return false;
        /*Começa por remover a classe "active" em todos os itens:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*Adiciona a classe "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*Uma função para remover a classe "active" de todos os itens de preenchimento automático:*/
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(element) {
        /*Fecha todas as listas de preenchimento automático no documento, exceto aquele passado como parâmetro:*/
        let y = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < y.length; i++) {
            if (element != y[i] && element != inp) {
                y[i].parentNode.removeChild(y[i]);
            }
        }
    }
    /*Executa uma função quando o usuário clica em algum lugar da página (do documento):*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// Um array para autocomplete
let drinks = ["7UP - 310ml", "Açaí na tigela c/ frutas e granola", "Água de Coco KERO COCO - 1L", "Água Mineral Crystal - 500ml", "Água Tônica Antarctica - 350ml", "Amendoim Japonês - 145g", "Banana Split", "Brahma - 350ml", "Brahma - 600ml", "Café Expresso c/ Chantily ou Leite - 30ml", "Café Expresso - 30ml", "Café Gelado - 450ml", "Chá Gelado - 450ml", "Cheetos Onda Requeijão - 122g", "Coca-Cola 310ml", "Coca-Cola 600ml", "Coca-Cola 2L", "Doce de Leite c/ Coco", "Doritos Queijo Nacho - 84g", "Eisenbahn - 355ml", "Eisenbahn - 473ml", "Fanta Laranja ou Uva - 330ml", "Fanta Laranja ou Uva - 2L", "Gatorade - 600ml", "Guaraná Antarctica - 350ml", "Guaraná Antarctica - 2L", "H2O - 500ml", "Heineken - 350ml", "Heineken - 600ml", "Lays Clássica - 80g", "Limonada - 200ml", "Monster Energy - 473ml", "Mountain Dew - 355ml", "Mousse de Chocolate ou Maracujá", "Original - 350ml", "Original - 600ml", "Pepsi - 350ml", "Pepsi - 2L", "Petit Gateau", "Powerade - 600ml", "Pudim de Leite c/ Calda de Caramelo", "Red Bull - 250ml", "Ruffles Original - 76g", "Saco de Gelo em Cubos - 5kg", "Saco de Gelo em Cubos - 10kg", "Schweppes Citrus - 350ml", "Skol - 350ml", "Skol - 600ml", "Sprite - 330ml", "Stella Artois - 275ml", "Suco c/ Leite - 300ml", "Suco de Abacaxi - 300ml", "Suco de Acerola - 300ml", "Suco de Graviola - 300ml", "Suco de Laranja Natural - 300ml", "Suco de Limão Natural - 300ml", "Suco de Manga - 300ml", "Suco de Maracujá - 300ml", "Suco de Melão - 300ml", "Suco de Morango - 300ml", "Sundae", "Torta Holandesa", "Vinho Cabernet Sauvignon - 150ml", "Vinho Rosé Merlot - 750ml", "Vinho Tinto Malbec - 750ml"];

// Uso do método setTimeout para atrasar a execução da tarefa especificada:
setTimeout(function () {
    autocomplete(document.getElementById("searchInput"), drinks);
}, 3000);