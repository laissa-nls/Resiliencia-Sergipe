// Funcionalidades do site Acolher & Cuidar

document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    initSmoothNavigation();
    
    // Funcionalidade de copiar PIX
    initCopyPix();
    
    // Animações de scroll
    initScrollAnimations();
    
    // Menu mobile
    initMobileMenu();
    
    // Efeitos de hover nos cards
    initCardEffects();
});

// Navegação suave entre seções
function initSmoothNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn, [data-section]');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    // Calcular offset para compensar o header fixo
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Adicionar classe ativa ao botão de navegação
                    updateActiveNavButton(this);
                }
            }
        });
    });
}

// Atualizar botão ativo na navegação
function updateActiveNavButton(activeButton) {
    // Remover classe ativa de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe ativa ao botão clicado
    if (activeButton.classList.contains('nav-btn')) {
        activeButton.classList.add('active');
    }
}

// Funcionalidade de copiar chave PIX
function initCopyPix() {
    window.copyPix = function() {
        const pixKey = document.getElementById('pix-key').textContent;
        
        // Tentar usar a API moderna de clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(pixKey).then(() => {
                showCopyFeedback('Chave PIX copiada!');
            }).catch(() => {
                fallbackCopyText(pixKey);
            });
        } else {
            // Fallback para navegadores mais antigos
            fallbackCopyText(pixKey);
        }
    };
}

// Método alternativo para copiar texto
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback('Chave PIX copiada!');
    } catch (err) {
        showCopyFeedback('Erro ao copiar. Tente selecionar manualmente.');
    }
    
    document.body.removeChild(textArea);
}

// Mostrar feedback visual ao copiar
function showCopyFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // Adicionar animação CSS
    if (!document.querySelector('#copy-feedback-style')) {
        const style = document.createElement('style');
        style.id = 'copy-feedback-style';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar números das estatísticas
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .book-card, .action-card, .help-card, .contact-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animar números das estatísticas
function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, duration / steps);
}

// Menu mobile (para futuras implementações)
function initMobileMenu() {
    // Detectar cliques fora do menu para fechar
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav');
        const isClickInsideNav = nav.contains(e.target);
        
        if (!isClickInsideNav && window.innerWidth <= 768) {
            // Lógica para fechar menu mobile se implementado
        }
    });
}

// Efeitos de hover nos cards
function initCardEffects() {
    const cards = document.querySelectorAll('.card, .book-card, .action-card, .help-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Destacar seção ativa na navegação baseada no scroll
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navButtons = document.querySelectorAll('.nav-btn[data-section]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover classe ativa de todos os botões
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe ativa ao botão correspondente
                const activeButton = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    });
}

// Inicializar navegação ativa
initActiveNavigation();

// Funcionalidades de acessibilidade
function initAccessibility() {
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

initAccessibility();

// Lazy loading para imagens (se houver)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll se necessário
const debouncedScrollHandler = debounce(() => {
    // Handlers de scroll otimizados
}, 16); // ~60fps

// Adicionar classe CSS para navegação por teclado
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2196f3 !important;
        outline-offset: 2px !important;
    }
    
    .nav-btn.active {
        background: linear-gradient(135deg, #f8a5c2 0%, #e91e63 100%);
        color: white;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Funcionalidade para botões de ação
document.addEventListener('click', function(e) {
    // Botões de livros
    if (e.target.textContent === 'Adquirir Livros' || e.target.textContent === 'Versão Digital') {
        showMessage('Entre em contato conosco!');
    }
    
    // Botão de Whatsapp
    if (e.target.textContent === 'Entre em Contato pelo WhatsApp') {
        window.open('https://wa.me/5579999307947', '_blank');
    }

    // Botão de Whatsapp
    if (e.target.textContent === '(79) 99930-7947') {
        window.open('https://wa.me/5579999307947', '_blank');
    }

    // Botão de Instagram
    if (e.target.textContent === 'Instagram') {
        window.open('https://www.instagram.com/resilienciasergipe/', '_blank');
    }

        // Botão de Instagram
    if (e.target.textContent === '@resilienciasergipe') {
        window.open('https://www.instagram.com/resilienciasergipe/', '_blank');
    }
    
    // Botão seja voluntária
    if (e.target.textContent === 'Seja Voluntária') {
        const section = document.getElementById('contato');
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Mostrar mensagens informativas
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2196f3;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0.5rem;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        text-align: center;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}
