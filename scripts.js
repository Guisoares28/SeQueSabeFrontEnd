let checkCasa = document.getElementById("casa");
let checkFora = document.getElementById("fora");
let buttonEnviar = document.getElementById("bt-enviar");
let resposta = document.getElementById("decidido");
let contador = document.getElementById("contador");

async function separarItensQueNaoGostam() {
  return document
    .getElementById("gosta")
    .value.split(",")
    .map((p) => p.trim())
    .filter((p) => p !== "");
}

async function fazerReq(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const dados = await response.json();
    return dados;
  } catch (erro) {
    console.error("Erro na requisição: ", erro.message);
    return "Erro na requisição";
  }
}

async function fazerReqComBody(url, lista) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lista),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const dados = await response.json();
    return dados;
  } catch (erro) {
    console.error("Erro na requisição: ", erro.message);
    return "Erro na requisição";
  }
}

buttonEnviar.addEventListener("click", async () => {
  let lista = await separarItensQueNaoGostam();
  let resultado = "";
  let tipo = "";
  if (checkCasa.checked) {
    tipo = "casa";
  } else if (checkFora.checked) {
    tipo = "fora";
  }
  url = "?tipo=" + encodeURIComponent(tipo);
  if (lista.length === 0) {
    resultado = await fazerReq("https://sequesabe.onrender.com/sequesabe/tudo" + url);
    resposta.textContent = resultado.resultado;
    contador.textContent = resultado.contador;
  } else {
    resultado = await fazerReqComBody(
      "https://sequesabe.onrender.com/sequesabe/tudo" + url,
      lista
    );
    resposta.textContent = resultado.resultado;
    contador.textContent = resultado.contador;
  }
});

checkCasa.addEventListener("change", () => {
  if (checkCasa.checked) {
    checkFora.checked = false; // ← aqui, mexe na propriedade checked do elemento
  }
});

checkFora.addEventListener("change", () => {
  if (checkFora.checked) {
    checkCasa.checked = false;
  }
});
