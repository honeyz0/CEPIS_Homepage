document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Inicialização do Swiper
    const swiper = new Swiper('.swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true 
        },
        autoplay: {
            delay: 11000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 2. Controle do Menu Mobile (Protegido dentro do carregamento do DOM)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu mobile ao clicar em qualquer link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Sistema de Navegação SPA
    const pageLinks = document.querySelectorAll('.page-link');
    const views = document.querySelectorAll('.page-view');
    const homeLink = document.querySelector('a[href="#home"]');

    function switchView(targetId) {
        // Oculta todas as visões
        views.forEach(view => view.style.display = 'none');
        
        // Exibe a visão desejada
        const targetView = document.getElementById(`view-${targetId}`);
        if (targetView) {
            targetView.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Monitora cliques nos links das páginas internas com proteção de caixa alta/baixa
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent.toLowerCase();

            if(linkText.includes('inscrição')) switchView('inscricao');
            if(linkText.includes('prêmios')) switchView('premios');
            if(linkText.includes('notícias')) switchView('noticias');
            if(linkText.includes('fale conosco')) switchView('fale-conosco');
            if(linkText.includes('doe agora')) switchView('doe-agora');
        });
    });

    // Voltar para a Home ao clicar em "Início"
    if(homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            views.forEach(view => view.style.display = 'none');
            document.getElementById('view-home').style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});