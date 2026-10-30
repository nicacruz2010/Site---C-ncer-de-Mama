
// =====================================
// BARRA DE PROGRESSO
// =====================================

const progressBar = document.createElement("div");
progressBar.id = "progress-bar";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const altura =
        document.documentElement.scrollHeight - window.innerHeight;

    const progresso = altura > 0
        ? (window.scrollY / altura) * 100
        : 0;

    progressBar.style.width = progresso + "%";

});


// =====================================
// EFEITO NO CABEÇALHO
// =====================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// =====================================
// MENU PARA CELULAR
// =====================================

const nav = document.querySelector("nav");
const menu = nav.querySelector("ul");

const menuButton = document.createElement("button");

menuButton.className = "menu-toggle";
menuButton.innerHTML = "☰";
menuButton.setAttribute("aria-label", "Abrir menu");
menuButton.setAttribute("aria-expanded", "false");

header.insertBefore(menuButton, nav);

menuButton.addEventListener("click", () => {

    menu.classList.toggle("open");

    const aberto = menu.classList.contains("open");

    menuButton.innerHTML = aberto ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", aberto);
    menuButton.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

});


// Fechar o menu depois de clicar em um link

menu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    });

});


// =====================================
// IDENTIFICAR A PÁGINA ATUAL
// =====================================

const paginaAtual = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach(link => {

    const destino = link.getAttribute("href");

    if (destino === paginaAtual) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }

});


// =====================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// =====================================

const secoes = document.querySelectorAll("main section");

secoes.forEach(secao => {
    secao.classList.add("reveal");
});

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("show");
            observador.unobserve(entrada.target);
        }

    });

}, {
    threshold: 0.15
});

secoes.forEach(secao => {
    observador.observe(secao);
});


// =====================================
// BOTÃO VOLTAR AO TOPO
// =====================================

const botaoTopo = document.createElement("button");

botaoTopo.id = "topo";
botaoTopo.innerHTML = "↑";
botaoTopo.setAttribute("aria-label", "Voltar ao topo");

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        botaoTopo.classList.add("show");
    } else {
        botaoTopo.classList.remove("show");
    }

});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =====================================
// ANIMAÇÃO NAS IMAGENS
// =====================================

document.querySelectorAll("main img").forEach(imagem => {

    imagem.addEventListener("mouseenter", () => {
        imagem.style.filter = "brightness(1.05)";
    });

    imagem.addEventListener("mouseleave", () => {
        imagem.style.filter = "brightness(1)";
    });

});


// =====================================
// ANO AUTOMÁTICO NO RODAPÉ
// =====================================

document.querySelectorAll("footer p").forEach(rodape => {

    rodape.innerHTML = rodape.innerHTML.replace(
        "2026",
        new Date().getFullYear()
    );

});
