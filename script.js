document.getElementById("iniciar").addEventListener("click", function () {
  document.getElementById("tela-boas-vindas").style.display = "none";
  document.getElementById("tela-carregamento").style.display = "block";

  setTimeout(() => {
    document.getElementById("tela-carregamento").style.display = "none";
    document.getElementById("tela-contagem-regressiva").style.display = "block";
    iniciarContagemRegressiva();
  }, 3000);
});

function iniciarContagemRegressiva() {
  let contador = 3;
  const contadorElemento = document.getElementById("contador");

  const intervalo = setInterval(() => {
    contador--;
    contadorElemento.textContent = contador;

    if (contador === 0) {
      clearInterval(intervalo);
      exibirSurpresa();
    }
  }, 1000);
}

function exibirSurpresa() {
  document.getElementById("tela-contagem-regressiva").style.display = "none";
  document.getElementById("tela-confetes").style.display = "block";

  gerarConfetes();



  iniciarCarrossel();
}

function iniciarCarrossel() {
  const imagens = [ "./src/Thali3.jpeg"];
  let index = 0;
  const imgElement = document.getElementById("imagemCarrossel");

  // Define a primeira imagem como ativa
  imgElement.src = imagens[index];
  imgElement.classList.add("ativo");

  setInterval(() => {
      // Remove a classe ativo da imagem atual
      imgElement.classList.remove("ativo");

      // Atualiza a imagem com um pequeno delay para suavizar a transição
      setTimeout(() => {
          index = (index + 1) % imagens.length;
          imgElement.src = imagens[index];
          imgElement.classList.add("ativo");
      }, 500); // Delay de 500ms antes de mudar a imagem
  }, 4000); // Agora o tempo entre as imagens é de 4s para transições mais lentas
}


function gerarConfetes() {
  const canvas = document.getElementById("confetesCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetes = [];

  function criarConfete() {
    return {
      x: Math.random() * canvas.width,
      y: -10,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      sparkle: Math.random() * 0.3 + 0.7,
    };
  }

  function desenharConfetes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetes.forEach((confete, index) => {
      ctx.save();
      ctx.translate(confete.x, confete.y);
      ctx.rotate((confete.rotation * Math.PI) / 180);

      ctx.beginPath();
      ctx.moveTo(0, -confete.size);
      for (let i = 0; i < 5; i++) {
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, -confete.size * confete.sparkle);
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, -confete.size);
      }
      ctx.fillStyle = confete.color;
      ctx.globalAlpha = confete.opacity;
      ctx.fill();
      ctx.restore();

      confete.y += confete.speed;
      confete.rotation += 2;

      if (confete.y > canvas.height) {
        confetes[index] = criarConfete();
      }
    });

    requestAnimationFrame(desenharConfetes);
  }

  for (let i = 0; i < 50; i++) {
    confetes.push(criarConfete());
  }

  desenharConfetes();
}
