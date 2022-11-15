window.addEventListener('load', function () {

    var juegoIniciado = false;


    function crearItem(i, j) {
        return `<div class="item" id="item-${i}-${j}" data-i="${i}" data-j="${j}">${i*8+j+1}</div>`
    }

    var items = '';

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 8; j++) {
            items += crearItem(i, j);
        }
    }

    container.innerHTML = items;


    function vecinos(i, j) {
        var v = [{
                i: i - 2,
                j: j - 1
            },
            {
                i: i - 1,
                j: j - 2
            },
            {
                i: i + 1,
                j: j - 2
            },
            {
                i: i + 2,
                j: j - 1
            },
            {
                i: i - 2,
                j: j + 1
            },
            {
                i: i + 2,
                j: j + 1
            },
            {
                i: i - 1,
                j: j + 2
            },
            {
                i: i + 1,
                j: j + 2
            },
        ]
        return v;

    }

    function removeClass(parent, className) {
        var items = document.getElementsByClassName(parent);
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove(className)
        }
    }

    function chequearFin() {
        var items = document.getElementsByClassName('item');
        var fin = true;
        for (let i = 0; i < items.length; i++) {
            fin = fin && items[i].classList.contains('visitado')
        }
        return fin;
    }

    function activarVecinos(item) {
        item.classList.add('visitado');
        let i = parseInt(item.dataset.i);
        let j = parseInt(item.dataset.j);
        guardarPaso(i, j);
        removeClass('item', 'visitable');
        let v = vecinos(parseInt(i), parseInt(j));
        for (var n = 0; n < v.length; n++) {
            var el = document.getElementById(`item-${v[n].i}-${v[n].j}`);

            if (el && !el.classList.contains('visitado')) {
                el.classList.add('visitable')
            }
        }
    }


    function guardarPaso(i, j) {
        respuesta.value += `${i*8+j+1},`;
    }

    var items = document.getElementsByClassName('item');

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.addEventListener('click', function () {
            if (!juegoIniciado) {
                juegoIniciado = true;
                activarVecinos(item);
            } else {
                if (item.classList.contains('visitable')) {
                    activarVecinos(item);

                    if (chequearFin()) {
                        alert('Al fin ganaste!!');
                    }
                }
            }
        })
    }

    probar.addEventListener('click', function () {
        var pasos = respuesta.value;
        respuesta.value = '';
        recorrerPasos(pasos)
    })


    function recorrerPasos(path) {
        path = path.split(',');

        function siguiente(index) {
            if (index < path.length) {
                let posicion = parseInt(path[index]) - 1;
                let i = parseInt(posicion / 8)
                let j = posicion % 8;

                let el= document.getElementById(`item-${i}-${j}`);
                if (el){
                    el.click();
                    setTimeout(function () {
                        siguiente(++index);
                    }, 486);
                }
            }
        }
        setTimeout(function () {
            siguiente(0);
        }, 300);
    }
})