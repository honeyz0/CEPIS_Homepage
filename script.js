document.addEventListener('DOMContentLoaded', function () {
    
    // ==========================================================================
    // 1. INICIALIZAÇÃO DO SWIPER
    // ==========================================================================
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

    // ==========================================================================
    // 2. CONTROLE DO MENU MOBILE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 3. MOTOR DE ANIMAÇÃO GLOBAL (INTERSECTION OBSERVER)
    // ==========================================================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na área útil da tela, adiciona a classe
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, {
        root: null, // Monitora a janela de visualização do navegador (viewport)
        rootMargin: '0px 0px -80px 0px', // Dispara um pouco antes do elemento tocar a base da tela
        threshold: 0.05 // Dispara quando pelo menos 5% do elemento estiver visível
    });

    // Função que varre a página procurando elementos para monitorar
    function aplicarObservadorDeAnimacao() {
        const elementosParaAnimar = document.querySelectorAll('.efeito-subir');
        elementosParaAnimar.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // Executa a primeira varredura assim que o site carrega (Home)
    aplicarObservadorDeAnimacao();

    // ==========================================================================
    // 4. SISTEMA DE NAVEGAÇÃO SPA COM RE-TRIGGER DE ANIMAÇÕES
    // ==========================================================================
    const pageLinks = document.querySelectorAll('.page-link');
    const views = document.querySelectorAll('.page-view');
    const homeLink = document.querySelector('a[href="#home"]');

    function switchView(targetId) {
        // Oculta todas as visões e remove o estado ativo de animação delas
        views.forEach(view => {
            view.style.display = 'none';
            // Reseta os elementos internos para o estado inicial para que possam re-animar na próxima visita
            view.querySelectorAll('.efeito-subir').forEach(el => el.classList.remove('visivel'));
        });
        
        // Exibe a visão desejada
        const targetView = document.getElementById(`view-${targetId}`);
        if (targetView) {
            targetView.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Pulo do gato para a SPA: Como os elementos ganham "display: block" instantaneamente, 
            // o navegador precisa de um milésimo de segundo (setTimeout) para calcular a nova posição na tela 
            // e aplicar o efeito de subida suave de forma natural.
            setTimeout(() => {
                targetView.querySelectorAll('.efeito-subir').forEach(el => {
                    el.classList.add('visivel');
                });
            }, 50);
        }
    }

    // Monitora cliques nas abas internas
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
            views.forEach(view => {
                view.style.display = 'none';
                view.querySelectorAll('.efeito-subir').forEach(el => el.classList.remove('visivel'));
            });
            
            const homeView = document.getElementById('view-home');
            homeView.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Força a re-execução do observador de scroll para a Home
            aplicarObservadorDeAnimacao();
        });
    }
});