document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado com sucesso!");

  const botaoIniciar = document.getElementById("iniciar");
  if (!botaoIniciar) {
    console.error("Erro: Botão 'iniciar' não encontrado!");
    return;
  }

  botaoIniciar.addEventListener("click", () => {
    console.log("Botão 'Clica Aqui' clicado!");
    const telaBoasVindas = document.getElementById("tela-boas-vindas");
    const telaCarregamento = document.getElementById("tela-carregamento");

    if (!telaBoasVindas || !telaCarregamento) {
      console.error("Erro: Uma das telas não foi encontrada!");
      return;
    }

    telaBoasVindas.style.display = "none";
    telaCarregamento.style.display = "flex";
    console.log("Tela de boas-vindas escondida, carregamento exibido.");

    setTimeout(() => {
      console.log("Fim do carregamento, iniciando contagem regressiva.");
      telaCarregamento.style.display = "none";
      document.getElementById("tela-contagem-regressiva").style.display = "block";
      iniciarContagemRegressiva();
    }, 3000);
  });
});

function iniciarContagemRegressiva() {
  console.log("Iniciando contagem regressiva...");
  let contador = 3;
  const contadorElemento = document.getElementById("contador");

  if (!contadorElemento) {
    console.error("Erro: Elemento 'contador' não encontrado!");
    return;
  }

  contadorElemento.textContent = contador;

  const intervalo = setInterval(() => {
    contador--;
    contadorElemento.textContent = contador;
    console.log(`Contagem: ${contador}`);

    if (contador === 0) {
      clearInterval(intervalo);
      console.log("Contagem finalizada, exibindo surpresa.");
      exibirSurpresa();
    }
  }, 1000);
}

function exibirSurpresa() {
  const telaContagem = document.getElementById("tela-contagem-regressiva");
  const telaConfetes = document.getElementById("tela-confetes");

  if (!telaContagem || !telaConfetes) {
    console.error("Erro: Telas de contagem ou confetes não encontradas!");
    return;
  }

  telaContagem.style.display = "none";
  telaConfetes.style.display = "block";
  console.log("Tela de confetes exibida.");

  gerarConfetes();
  iniciarCarrossel();
}

function iniciarCarrossel() {
  console.log("Iniciando carrossel...");
  const imagens = document.querySelectorAll(".carrossel img");
  if (imagens.length === 0) {
    console.error("Erro: Nenhuma imagem encontrada no carrossel!");
    return;
  }

  let index = 0;
  setInterval(() => {
    imagens[index].classList.remove("ativo");
    index = (index + 1) % imagens.length;
    imagens[index].classList.add("ativo");
    console.log(`Imagem ativa: ${index}`);
  }, 4000);
}

function gerarConfetes() {
  console.log("Gerando confetes...");
  const canvas = document.getElementById("confetesCanvas");
  if (!canvas) {
    console.error("Erro: Canvas 'confetesCanvas' não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;

  let confetes = [];

  function criarConfete() {
    const formas = ["estrela", "circulo", "quadrado"];
    const forma = formas[Math.floor(Math.random() * formas.length)];
    return {
      x: Math.random() * canvas.width,
      y: -10,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      sparkle: Math.random() * 0.3 + 0.7,
      forma: forma,
    };
  }

  function desenharConfetes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetes.forEach((confete, index) => {
      ctx.save();
      ctx.translate(confete.x, confete.y);
      ctx.rotate((confete.rotation * Math.PI) / 180);

      if (confete.forma === "estrela") {
        ctx.beginPath();
        ctx.moveTo(0, -confete.size);
        for (let i = 0; i < 5; i++) {
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, -confete.size * confete.sparkle);
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, -confete.size);
        }
        ctx.closePath();
      } else if (confete.forma === "circulo") {
        ctx.beginPath();
        ctx.arc(0, 0, confete.size / 2, 0, Math.PI * 2);
      } else if (confete.forma === "quadrado") {
        ctx.beginPath();
        ctx.rect(-confete.size / 2, -confete.size / 2, confete.size, confete.size);
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

  for (let i = 0; i < 100; i++) {
    confetes.push(criarConfete());
  }

  desenharConfetes();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  });
}