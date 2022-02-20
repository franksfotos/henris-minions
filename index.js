const cdiv = document.querySelector('.container');

const farben = ['Krieger', 'Priester', 'Magier', 'Assasine', 'Schutzwall', 'Bogenschütze']

let zähler = 0;

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
}



// Add 16 divs
for (let i = 1; i < 111; i++) {
    const div = document.createElement('div');
    cdiv.appendChild(div);

    let rechnerechneZ = Math.floor((i - 1) / 11) + 1
    let rechnerechne = (i - 1) % 11

    if (rechnerechne != 0) {
        div.id = rechnerechne + "-" + rechnerechneZ
    }

    // div.innerText = farben

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
                zelle.innerText = (20 - anzPriester)
            } else if (zelle.classList.contains("Bogenschütze")) {
                // Bogenschützen
                zelle.innerText = "0"
                if (s > 1 && s < 10 && z > 1 && z < 10) {
                    zelle.innerText = "4.5"
                    pktBogenschützen += 4.5
                }
            } else if (zelle.classList.contains("Krieger")) {
                zelle.innerText = "0"
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


                zelle.innerText = punkte
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
                zelle.innerText = punkte

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

                zelle.innerText = punkte
                pktMagier += punkte
            } else if (zelle.classList.contains("Schutzwall")) {
                // Schutzwall
                
                punkte = 0
                size = SWFeld(s,z, [], 0)
                
                if (size > 1) {
                    punkte = punkte + size
                }
                
                if (s==1 || s==10 || z == 1|| z == 10) {
                    punkte = punkte +2
                }

                zelle.innerText = punkte

                pktSchutzwall = pktSchutzwall + punkte


            }

        }
    }

    pktPriester = (20 - anzPriester) * anzPriester

    pktGesamt = pktAssasine + pktBogenschützen + pktKrieger + pktMagier + pktPriester+ pktSchutzwall

    document.getElementById("pktPriester").innerText = pktPriester
    document.getElementById("pktBogenschützen").innerText = pktBogenschützen
    document.getElementById("pktKrieger").innerText = pktKrieger
    document.getElementById("pktAssasine").innerText = pktAssasine
    document.getElementById("pktMagier").innerText = pktMagier
    document.getElementById("pktSchutzwall").innerText = pktSchutzwall

    document.getElementById("pktGesamt").innerText = pktGesamt
}

function hausnummer(s,z) {
    if (s > 0 && s < 11  && z > 0 && z< 11) {
        return((z - 1) * 10 + s)
    } else {
        return 0
    }

    
}

function SWFeld(s,z, hausnummern, size) {    
    size += 1
    hausnummern.push(hausnummer(s,z))
    
    if ( getClass(s-1, z) == "Schutzwall" && !hausnummern.includes(hausnummer(s-1,z)))  {  
        size = SWFeld(s-1,z, hausnummern, size)
    }

    if ( getClass(s+1, z) == "Schutzwall" && !hausnummern.includes(hausnummer(s+1,z)))  {  
        size = SWFeld(s+1,z, hausnummern, size)
    }

    if ( getClass(s, z-1) == "Schutzwall" && !hausnummern.includes(hausnummer(s ,z-1)))  {  
        size = SWFeld(s, z-1, hausnummern, size)
    }

    if ( getClass(s, z+1) == "Schutzwall" && !hausnummern.includes(hausnummer(s ,z+1)))  {  
        size = SWFeld(s, z+1, hausnummern, size)
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
