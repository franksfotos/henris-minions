const cdiv = document.querySelector('.container');

const farben = ['Krieger', 'Priester', 'Magier', 'Assasine', 'Schutzwall', 'Bogenschütze']

let zähler = 0;

// Add divs
for (let i = 1; i < 111; i++) {
    const div = document.createElement('div');
    div.onclick = function () {
        toggle(div)
    };

    const h5 = document.createElement('h5');
    div.appendChild(h5);

    cdiv.appendChild(div);





    let rechnerechneZ = Math.floor((i - 1) / 11) + 1
    let rechnerechne = (i - 1) % 11

    if (rechnerechne != 0) {
        div.id = rechnerechne + "-" + rechnerechneZ
    }

    // div.innerText = farben

}

function toggle(div) {
    // console.log(div)

    div_sz = div.id.split("-").map(Number)


    if (div.classList.contains("border")) {
        div.classList.toggle("border")
    } else {
        clicked = []
        for (z = 1; z < 11; z++) {
            for (s = 1; s < 11; s++) {
                id = s + "-" + z
                //console.log(id)
                zelle = document.getElementById(id)
                if (zelle.classList.contains("border")) {
                    clicked.push([s, z])
                }
            }

        }

       // console.log(clicked)

        if (clicked.length == 1) {
            if(Math.abs(clicked[0][0] - div_sz[0])<2 && clicked[0][1] - div_sz[1] == 0 || Math.abs(clicked[0][1] - div_sz[1])<2 && clicked[0][0] - div_sz[0] == 0 ) {
                div.classList.toggle("border")    
            }

        } 


        if (clicked.length == 0) {
            div.classList.toggle("border")
        }

    }


}


function tauschen() {
    swap = []

    
    for (z = 1; z < 11; z++) {
        for (s = 1; s < 11; s++) {
            id = s + "-" + z
            zelle = document.getElementById(id)
            if (zelle.classList.contains("border")) {
                swap.push(zelle)            

            }

        }
    }

    if (swap.length == 2) {
        swapstring = swap[0].classList.toString()

        swap[0].classList = swap[1].classList
        swap[1].classList = swapstring
        swap[0].classList.toggle("border")
        swap[1].classList.toggle("border")
    }

    pkt()
}

function nextMinion() {
    // console.log(zähler)
    zeile = Math.floor(zähler / 10) + 1
    spalte = zähler % 10 + 1
    id = spalte + "-" + zeile

    zähler = zähler + 1

    const div = document.getElementById(id)
    div.className = farben[getRandomInt(0, 5)]
    pkt()
}

function allMinions() {
    for (c = 0; c < 100; c++)
        nextMinion()
    // console.log(pktGesamt)

    result = {
        "Krieger": pktKrieger,
        "Bogenschützen": pktBogenschützen,
        "Assasine": pktAssasine,
        "Schutzwall": pktSchutzwall,
        "Magier": pktMagier,
        "Priester": pktPriester,
        "GESAMT": pktGesamt
    }

    return (result)

}

function clearAll() {
    for (z = 1; z < 11; z++) {
        for (s = 1; s < 11; s++) {
            id = s + "-" + z
            //console.log(id)
            zelle = document.getElementById(id)
            zelle.classList = id
            zelle.innerHTML = "<h5></h5>"

        }
    }
    zähler = 0

}

function getScores(num) {
    let scores = []
    for (i = 0; i < num; i++) {
        clearAll()
        scores.push(allMinions())
    }

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scores));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "scores.json");
    dlAnchorElem.click();

    return scores
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function pkt() {
    anzPriester = 0

    for (z = 1; z < 11; z++) {
        for (s = 1; s < 11; s++) {
            id = s + "-" + z
            //console.log(id)
            zelle = document.getElementById(id)
            if (zelle.classList.contains("Priester")) {
                anzPriester = anzPriester + 1
            }

        }
    }

    pktBogenschützen = 0
    pktKrieger = 0
    pktAssasine = 0
    pktMagier = 0
    pktSchutzwall = 0

    for (z = 1; z < 11; z++) {
        for (s = 1; s < 11; s++) {
            // Priester
            id = s + "-" + z
            zelle = document.getElementById(id)

            // console.log(zelle.classList)

            if (zelle.classList.contains("Priester")) {
                zelle.firstChild.innerText = (20 - anzPriester)
            } else if (zelle.classList.contains("Bogenschütze")) {
                // Bogenschützen
                zelle.firstChild.innerText = "0"
                if (s > 1 && s < 10 && z > 1 && z < 10) {
                    zelle.firstChild.innerText = "4.5"
                    pktBogenschützen += 4.5
                }
            } else if (zelle.classList.contains("Krieger")) {
                zelle.firstChild.innerText = "0"
                // Krieger
                punkte = 0

                // console.log(getClass(s - 1, z))
                if (getClass(s - 1, z) == "Krieger" || getClass(s - 1, z) == "Bogenschütze") {
                    punkte = punkte + 2.5
                }
                if (getClass(s + 1, z) == "Krieger" || getClass(s + 1, z) == "Bogenschütze") {
                    punkte = punkte + 2.5
                }
                if (getClass(s, z - 1) == "Krieger" || getClass(s, z - 1) == "Bogenschütze") {
                    punkte = punkte + 2.5
                }
                if (getClass(s, z + 1) == "Krieger" || getClass(s, z + 1) == "Bogenschütze") {
                    punkte = punkte + 2.5
                }


                zelle.innerHTML = "<h5>" + punkte + "</h5>"
                pktKrieger += punkte

            } else if (zelle.classList.contains("Assasine")) {
                // Assasine
                punkte = 5

                if (getClass(s - 1, z) == "Assasine") {
                    punkte = 0
                }
                if (getClass(s + 1, z) == "Assasine") {
                    punkte = 0
                }
                if (getClass(s, z - 1) == "Assasine") {
                    punkte = 0
                }
                if (getClass(s, z + 1) == "Assasine") {
                    punkte = 0
                }

                pktAssasine = pktAssasine + punkte
                zelle.firstChild.innerText = punkte

            } else if (zelle.classList.contains("Magier")) {
                // Magier

                punkte = 0
                neighbours = ""

                nklasse = getClass(s - 1, z)

                if (nklasse != "" && nklasse != "Magier") {
                    if (neighbours.indexOf(nklasse[0]) == -1) {
                        neighbours = neighbours + nklasse[0]
                    }
                }

                nklasse = getClass(s + 1, z)

                if (nklasse != "" && nklasse != "Magier") {
                    if (neighbours.indexOf(nklasse[0]) == -1) {
                        neighbours = neighbours + nklasse[0]
                    }
                }
                nklasse = getClass(s, z - 1)

                if (nklasse != "" && nklasse != "Magier") {
                    if (neighbours.indexOf(nklasse[0]) == -1) {
                        neighbours = neighbours + nklasse[0]
                    }
                }
                nklasse = getClass(s, z + 1)

                if (nklasse != "" && nklasse != "Magier") {
                    if (neighbours.indexOf(nklasse[0]) == -1) {
                        neighbours = neighbours + nklasse[0]
                    }
                }


                //console.log(neighbours.length)
                if (neighbours.length > 2) {
                    punkte = 5
                }

                zelle.firstChild.innerText = punkte
                pktMagier += punkte
            } else if (zelle.classList.contains("Schutzwall")) {
                // Schutzwall

                punkte = 0
                size = SWFeld(s, z, [], 0)

                if (size > 1) {
                    punkte = punkte + size
                }

                if (s == 1 || s == 10 || z == 1 || z == 10) {
                    punkte = punkte + 2
                }

                zelle.firstChild.innerText = punkte

                pktSchutzwall = pktSchutzwall + punkte


            }

        }
    }

    pktPriester = (20 - anzPriester) * anzPriester

    pktGesamt = pktAssasine + pktBogenschützen + pktKrieger + pktMagier + pktPriester + pktSchutzwall

    document.getElementById("pktPriester").innerText = pktPriester
    document.getElementById("pktBogenschützen").innerText = pktBogenschützen
    document.getElementById("pktKrieger").innerText = pktKrieger
    document.getElementById("pktAssasine").innerText = pktAssasine
    document.getElementById("pktMagier").innerText = pktMagier
    document.getElementById("pktSchutzwall").innerText = pktSchutzwall

    document.getElementById("pktGesamt").innerText = pktGesamt
}

function hausnummer(s, z) {
    if (s > 0 && s < 11 && z > 0 && z < 11) {
        return ((z - 1) * 10 + s)
    } else {
        return 0
    }


}

function SWFeld(s, z, hausnummern, size) {
    size += 1
    hausnummern.push(hausnummer(s, z))

    if (getClass(s - 1, z) == "Schutzwall" && !hausnummern.includes(hausnummer(s - 1, z))) {
        size = SWFeld(s - 1, z, hausnummern, size)
    }

    if (getClass(s + 1, z) == "Schutzwall" && !hausnummern.includes(hausnummer(s + 1, z))) {
        size = SWFeld(s + 1, z, hausnummern, size)
    }

    if (getClass(s, z - 1) == "Schutzwall" && !hausnummern.includes(hausnummer(s, z - 1))) {
        size = SWFeld(s, z - 1, hausnummern, size)
    }

    if (getClass(s, z + 1) == "Schutzwall" && !hausnummern.includes(hausnummer(s, z + 1))) {
        size = SWFeld(s, z + 1, hausnummern, size)
    }


    return size
}

function getClass(s, z) {
    id = s + "-" + z
    // console.log(id)


    let zelle = document.getElementById(id)
    let klasse = ""

    if (s > 0 && s < 11 && z > 0 && z < 11) {
        if (zelle.classList.contains("Krieger")) {
            klasse = "Krieger"
        }
        if (zelle.classList.contains("Bogenschütze")) {
            klasse = "Bogenschütze"
        }
        if (zelle.classList.contains("Schutzwall")) {
            klasse = "Schutzwall"
        }
        if (zelle.classList.contains("Magier")) {
            klasse = "Magier"
        }
        if (zelle.classList.contains("Assasine")) {
            klasse = "Assasine"
        }
        if (zelle.classList.contains("Priester")) {
            klasse = "Priester"
        }

    }
    return klasse
}


