// Efeito de rolagem suave ao clicar nos links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Compensa a altura da navbar
                behavior: 'smooth'
            });
        }
    });
});

// Exemplo de interação simples (alerta ao clicar em doar)
const btnDoe = document.querySelector('.btn-doe');
btnDoe.addEventListener('click', () => {
    alert('Obrigado pelo interesse em apoiar a ONG CEPIS!');
});