const formFiguras = document.querySelector("#formFiguras");
const formEstatura = document.querySelector("#formEstatura");
const formLibreria = document.querySelector("#formLibreria");
const formLetras = document.querySelector("#formLetras");
const ladoA = document.querySelector("#ladoA");
const ladoB = document.querySelector("#ladoB");
const ladoC = document.querySelector("#ladoC");
const sexoN = document.querySelectorAll(".sexo");
const madreEst = document.querySelector("#madre");
const padreEst = document.querySelector("#padre");
const titulos = document.querySelector("#titulos");
const titulosTemp = document.querySelector("#titulosTemp");
const autor = document.querySelector("#autor");
const autorTemp = document.querySelector("#autorTemp");
const precio = document.querySelector("#precio");
const tabla = document.querySelector("tbody");
const libros = document.querySelector("#libros");
const borrar = document.querySelector("#borrar");
const palabra = document.querySelector("#palabra");
const vocales = document.querySelector("#vocales");
const letras = document.querySelector("#letras");

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});

function eventListeners() {
  formFiguras && formFiguras.addEventListener("submit", calcularValores);
  formEstatura && formEstatura.addEventListener("submit", calcularEstatura);
  formLetras && letras.addEventListener("click", contarLetras);
  formLetras && vocales.addEventListener("click", contarVocales);
}

//Areas y Perimetros
class Figura {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get nombre() {
    return this.nombreFigura();
  }

  get area() {
    return this.calcArea();
  }

  get perimetro() {
    return this.calcPerimetro();
  }

  nombreFigura() {
    let a = this.a;
    let b = this.b;
    let c = this.c;

    if (a && b && c != 0) {
      var nombre = "Triangulo";
    } else if (a && b != 0 && c === 0) {
      var nombre = a != b ? "Rectángulo" : "Cuadrado";
    } else {
      var nombre = "Cuadrado";
    }

    return nombre;
  }

  calcArea() {
    let a = this.a;
    let b = this.b;
    let c = this.c;

    if (a && b && c != 0) {
      let s = (a + b + c) / 2;
      var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else if (a && b != 0 && c === 0) {
      var area = a * b;
    } else {
      var area = a * a;
    }

    return area;
  }

  calcPerimetro() {
    let a = this.a;
    let b = this.b;
    let c = this.c;
    if (a && b && c != 0) {
      var perimetro = a + b + c;
    } else if (a && b != 0 && c === 0) {
      var perimetro = a * 2 + b * 2;
    } else {
      var perimetro = a * 4;
    }

    return perimetro;
  }
}

function calcularValores(e) {
  e.preventDefault();
  let ladoa = Number(ladoA.value);
  let ladob = Number(ladoB.value);
  let ladoc = Number(ladoC.value);

  const figura = new Figura(ladoa, ladob, ladoc);

  alert(
    `Tu figura es un: ${figura.nombre}\nEl área de tu figura es: ${figura.area}\nEl perímetro de tu figura es: ${figura.perimetro}`
  );
}

//Estaturas
class Hijo {
  constructor(sexo, estaturaMadre, estaturaPadre) {
    this.sexo = sexo;
    this.estaturaMadre = estaturaMadre;
    this.estaturaPadre = estaturaPadre;
  }

  get estatura() {
    return this.estaturaAdulto();
  }

  estaturaAdulto() {
    let estaturaA =
      this.sexo === "masc"
        ? (this.estaturaMadre + this.estaturaPadre + 13) / 2
        : (this.estaturaMadre + this.estaturaPadre - 13) / 2;

    return estaturaA;
  }
}

function calcularEstatura(e) {
  e.preventDefault();
  sexoN.forEach((element) => {
    sexo = element.checked && element.value;
  });
  let estaturaMadre = Number(madreEst.value);
  let estaturaPadre = Number(padreEst.value);

  const hijo = new Hijo(sexo, estaturaMadre, estaturaPadre);

  alert(
    `La estatura que tendrá el niño cuando sea adulto será ${hijo.estatura}`
  );
}

//Books
fetch("./books.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    llenarForm(jsondata);

    formLibreria &&
      formLibreria.addEventListener("submit", (e) => {
        e.preventDefault();
        llenarTabla(jsondata);
      });
    borrar.addEventListener("click", (e) => {
      e.preventDefault();
      borrarTabla();
    });
  })
  .catch((error) => {});

function llenarForm(jsondata) {
  jsondata.forEach((item) => {
    let title = titulosTemp.content.cloneNode(true);
    let optionT = title.querySelector("option");
    optionT.value = item.id;
    optionT.innerHTML = item.name;
    titulos.appendChild(title);

    let author = autorTemp.content.cloneNode(true);
    let optionA = author.querySelector("option");
    optionA.value = item.id;
    optionA.innerHTML = item.author;
    autor.appendChild(author);
  });
}

function filtrarDatos(jsondata, author, title, price) {
  let datosFiltrados = [];
  jsondata.forEach((element) => {
    if (author === element.id) {
      datosFiltrados.push(element);
    }
    if (title === element.id) {
      datosFiltrados.push(element);
    }
    if (price === "mayor20" && element.price >= 20) {
      datosFiltrados.push(element);
    }
    if (price === "menor20" && element.price <= 20) {
      datosFiltrados.push(element);
    }
  });

  return datosFiltrados;
}

function llenarTabla(jsondata) {
  let author = autor.value;
  let title = titulos.value;
  let price = precio.value;

  borrarTabla();

  let datosFiltrados =
    author || title || price != ""
      ? filtrarDatos(jsondata, author, title, price)
      : jsondata;

  datosFiltrados.forEach((element) => {
    let libro = libros.content.cloneNode(true);

    libro.querySelector("tr").innerHTML = `
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.genre_s}</td>
        <td>${element.cat}</td>
        <td>${element.pages_i}</td>
        <td>${element.inStock}</td>
        <td>${element.price}</td>
        `;

    tabla.appendChild(libro);
  });
}

function borrarTabla() {
  tabla.querySelectorAll("tr").forEach((row) => {
    tabla.deleteRow(row);
  });
}

//Contar Letras
function contarLetras(e) {
  e.preventDefault();
  let str = palabra.value;
  let contar = str.replace(/[^a-z]/gi, "").length;
  alert(`Tu palabra tiene ${contar} letras`);
}
function contarVocales(e) {
  e.preventDefault();
  let str = palabra.value;
  let contar = str.match(/[aeiou]/gi).length;
  alert(`Tu palabra tiene ${contar} vocales`);
}
