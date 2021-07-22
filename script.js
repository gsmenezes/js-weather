document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault(); //previne que a página tenha o comportamento padrão que o formulário deveria ter

  let input = document.querySelector("#searchInput").value; //tenho acesso ao que foi digitado pelo usuário

  if (input !== "") {
    clearInfo();
    showWarning("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encondeURI(
      input
    )}}&appid=6d73bf1de47e25902ebf83231ca56862&units=metric&lang=pt_br`;
    let results = await fetch(url); //espera o resultado da requisição
    let json = await results.json(); // transforma o resultado em json

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("Não encontramos essa cidade. Por favor, verifique o nome.");
    }
  }
});

function clearInfo() {
  //limpa a tela
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}

function showInfo(json) {
  //exibe as informações recebidas da chamada da api
  showWarning("");

  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    ); //seleciona a tag img dentro da classe .temp, e seta o atributo src, substituindo pelo dinâmico

  document.querySelector(".resultado").style.display = "block";
  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;
}

function showWarning(msg) {
  // exibe a mensagem estipulada
  document.querySelector(".aviso").innerHTML = msg;
}
