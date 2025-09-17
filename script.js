// Script para a página com tema de água
document.addEventListener('DOMContentLoaded', function() {
    // Criar partículas de água
    createWaterParticles();
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Botão de voltar ao topo
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Calculadora de consumo de água
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateWaterUsage);
    }
    
    // Quiz interativo
    setupQuiz();
    
    // Animação para os cards de estatísticas (se houver)
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        statCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-in');
        });
        
        // Contador animado para as estatísticas
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.round(count).toLocaleString() + 
                                  (stat.textContent.includes('%') ? '%' : '');
            }, 16);
        });
    }
});

// Função para criar partículas de água
function createWaterParticles() {
    const particlesContainer = document.querySelector('.water-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('water-particle');
        
        // Tamanho aleatório
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}%`;
        
        // Duração e delay aleatórios
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Função para calcular o uso de água - VERSÃO CORRIGIDA
function calculateWaterUsage() {
    const showerTime = parseInt(document.getElementById('shower-time').value) || 0;
    const showerFrequency = parseInt(document.getElementById('shower-frequency').value) || 0;
    const faucetTime = parseInt(document.getElementById('faucet-time').value) || 0;
    const toiletFlushes = parseInt(document.getElementById('toilet-flushes').value) || 0;
    const dishwasherUses = parseInt(document.getElementById('dishwasher-uses').value) || 0;
    const washingMachineUses = parseInt(document.getElementById('washing-machine-uses').value) || 0;
    
    // Cálculos aproximados (em litros)
    const showerUsage = showerTime * 6 * showerFrequency; // 6 litros por minuto no chuveiro
    const faucetUsage = faucetTime * 6 * 7; // 6 litros por minuto na torneira, 7 dias
    const toiletUsage = toiletFlushes * 10 * 7; // 10 litros por descarga, 7 dias
    const dishwasherUsage = dishwasherUses * 20; // 20 litros por uso
    const washingMachineUsage = washingMachineUses * 100; // 100 litros por uso
    
    const totalUsage = showerUsage + faucetUsage + toiletUsage + dishwasherUsage + washingMachineUsage;
    
    // Exibir resultado
    document.querySelector('.water-amount').textContent = `${totalUsage.toLocaleString()} litros/semana`;
    
    // Dar dicas baseadas no consumo
    const tipsElement = document.querySelector('.water-tips');
    let tipsHTML = '<h4>Dicas para economizar água:</h4><ul>';
    
    if (showerUsage > 300) {
        tipsHTML += '<li>Reduza o tempo no chuveiro para economizar água</li>';
    }
    
    if (faucetUsage > 100) {
        tipsHTML += '<li>Feche a torneira ao escovar os dentes ou ensaboar a louça</li>';
    }
    
    if (totalUsage > 1000) {
        tipsHTML += '<li>Considere coletar água da chuva para atividades não potáveis</li>';
    }
    
    tipsHTML += '<li>Conserte vazamentos - uma torneira pingando pode desperdiçar 45 litros por dia</li>';
    tipsHTML += '<li>Use a máquina de lavar apenas com carga completa</li>';
    tipsHTML += '</ul>';
    
    tipsElement.innerHTML = tipsHTML;
}

// Função para configurar o quiz - VERSÃO CORRIGIDA (única)
function setupQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResult = document.querySelector('.quiz-result');
    
    if (quizOptions.length === 0) return;
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleções e estilos anteriores
            quizOptions.forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            
            // Selecionar esta opção
            this.classList.add('selected');
            
            // Verificar resposta
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            // Destacar visualmente a resposta correta
            quizOptions.forEach(opt => {
                if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                }
            });
            
            // Destacar visualmente a resposta incorreta se for o caso
            if (!isCorrect) {
                this.classList.add('incorrect');
            }
            
            // Mostrar resultado
            quizResult.classList.remove('correct', 'incorrect');
            
            if (isCorrect) {
                quizResult.textContent = 'Correto! Parabéns pela conscientização!';
                quizResult.classList.add('correct');
            } else {
                quizResult.textContent = 'Resposta incorreta. Tente novamente!';
                quizResult.classList.add('incorrect');
            }
            
            quizResult.style.display = 'block';
        });
    });
}