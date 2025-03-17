function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "🎈","💥";

    // Define uma posição aleatória na tela
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = Math.random() * 20 + 10 + "px"; // Tamanhos variados

    document.body.appendChild(heart);

    // Remove o coração após a animação
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Criar corações continuamente
setInterval(createHeart, 200);
