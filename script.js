// Criar animação de partículas de gelo
document.addEventListener('DOMContentLoaded', function() {
    createIceParticles();
    initComparisonSlider();
    initQuiz();
    initScrollEvents();
});

// Função para criar partículas de gelo
function createIceParticles() {
    const particlesContainer = document.querySelector('.ice-particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('ice-particle');
        
        // Tamanho aleatório entre 3 e 8 pixels
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição inicial aleatória
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Duração da animação aleatória entre 10 and 30 segundos
        const animationDuration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${animationDuration}s`;
        
        // Atraso inicial aleatório
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Inicializar o slider de comparação
function initComparisonSlider() {
    const slider = document.querySelector('.comparison-slider');
    const before = slider.querySelector('.before');
    const handle = slider.querySelector('.slider-handle');
    
    let isMoving = false;
    
    // Eventos para desktop
    handle.addEventListener('mousedown', function() {
        isMoving = true;
        handle.style.backgroundColor = '#a8d0e6';
    });
    
    document.addEventListener('mouseup', function() {
        isMoving = false;
        handle.style.backgroundColor = '#fff';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isMoving) return;
        
        let move = e.clientX - slider.getBoundingClientRect().left;
        if (move < 0) move = 0;
        if (move > slider.offsetWidth) move = slider.offsetWidth;
        
        const percentage = (move / slider.offsetWidth) * 100;
        before.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    });
    
    // Eventos para mobile
    handle.addEventListener('touchstart', function() {
        isMoving = true;
        handle.style.backgroundColor = '#a8d0e6';
    });
    
    document.addEventListener('touchend', function() {
        isMoving = false;
        handle.style.backgroundColor = '#fff';
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isMoving) return;
        
        const touch = e.touches[0];
        let move = touch.clientX - slider.getBoundingClientRect().left;
        if (move < 0) move = 0;
        if (move > slider.offsetWidth) move = slider.offsetWidth;
        
        const percentage = (move / slider.offsetWidth) * 100;
        before.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    });
}

// Inicializar o quiz
function initQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    const resultDiv = document.querySelector('.quiz-result');
    let correctAnswers = 0;
    let totalQuestions = document.querySelectorAll('.quiz-question').length;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleções anteriores da mesma pergunta
            const parentQuestion = this.closest('.quiz-question');
            parentQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                opt.style.backgroundColor = '';
                opt.style.color = '';
            });
            
            // Destacar a opção selecionada
            if (this.dataset.correct === 'true') {
                this.style.backgroundColor = '#4caf50';
                this.style.color = 'white';
            } else {
                this.style.backgroundColor = '#f44336';
                this.style.color = 'white';
                
                // Destacar também a resposta correta
                parentQuestion.querySelector('[data-correct="true"]').style.backgroundColor = '#4caf50';
                parentQuestion.querySelector('[data-correct="true"]').style.color = 'white';
            }
            
            // Calcular pontuação
            calculateScore();
        });
    });
    
    function calculateScore() {
        correctAnswers = 0;
        document.querySelectorAll('.quiz-option[data-correct="true"]').forEach(option => {
            if (option.style.backgroundColor === 'rgb(76, 175, 80)') {
                correctAnswers++;
            }
        });
        
        // Exibir resultado
        resultDiv.textContent = `Você acertou ${correctAnswers} de ${totalQuestions} perguntas!`;
        resultDiv.style.display = 'block';
        
        if (correctAnswers === totalQuestions) {
            resultDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
        } else if (correctAnswers >= totalQuestions / 2) {
            resultDiv.style.backgroundColor = 'rgba(255, 152, 0, 0.3)';
        } else {
            resultDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.3)';
        }
    }
}

// Inicializar eventos de scroll
function initScrollEvents() {
    const header = document.getElementById('header');
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Parallax effect for sections
        document.querySelectorAll('section').forEach(section => {
            const speed = 0.5;
            const yPos = -(window.scrollY * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// ADICIONE ESTE EVENT LISTENER PARA O BOTÃO PARTICIPAR
btnParticipate.addEventListener('click', function() {
    // Marcar que o convite foi aceito no sessionStorage
    sessionStorage.setItem('conviteAceito', 'true');
    
    // Redirecionar para a página principal
    window.location.href = 'main.html'; // Altere para o nome do seu arquivo principal
});