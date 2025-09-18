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
    
    // Quiz interativo
    setupQuiz();
    
    // Configurar a calculadora de água
    setupWaterCalculator();
    
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

// Função para configurar o quiz
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

// Configurar a calculadora de consumo de água
function setupWaterCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', calculateWaterUsage);
}
// Versão mais segura com fallbacks
function calculateWaterUsage() {
    try {
        // Obter valores com fallback seguro
        const showerTime = parseInt(document.getElementById('shower-time')?.value || 0);
        const teethBrushing = document.getElementById('teeth-brushing')?.value || 'no';
        const washingMachine = parseInt(document.getElementById('washing-machine')?.value || 0);
        
        console.log('Valores obtidos:', {showerTime, teethBrushing, washingMachine});
        
        // Resto do código de cálculo...
        const showerUsagePerMinute = 12;
        const showerUsage = showerTime * 7 * showerUsagePerMinute;
        
        let teethUsage = 0;
        if (teethBrushing === 'yes') {
            teethUsage = 5 * 2 * 2 * 7;
        }
        
        const washingMachineUsage = washingMachine * 100;
        const totalUsage = showerUsage + teethUsage + washingMachineUsage;
        
        // Exibir resultado
        const resultElement = document.querySelector('.water-amount');
        if (resultElement) {
            resultElement.textContent = `${totalUsage.toLocaleString()} litros`;
        }
        
        showWaterTips(totalUsage);
        
    } catch (error) {
        console.error('Erro ao calcular consumo:', error);
        alert('Erro ao calcular. Verifique o console para detalhes.');
    }
}
// FUNÇÃO ADICIONADA: Mostrar dicas de economia de água
function showWaterTips(totalUsage) {
    const tipsElement = document.querySelector('.water-tips');
    if (!tipsElement) return;
    
    let tipsHTML = '<h4>Dicas para reduzir seu consumo:</h4><ul>';
    
    // Dicas personalizadas baseadas no consumo
    if (totalUsage > 1000) {
        tipsHTML += '<li><i class="fas fa-shower"></i> Reduza o tempo no banho - cada minuto a menos economiza 12 litros</li>';
    }
    
    if (totalUsage > 500) {
        tipsHTML += '<li><i class="fas fa-faucet"></i> Feche a torneira ao escovar os dentes - economize até 140 litros por semana</li>';
    }
    
    if (totalUsage > 300) {
        tipsHTML += '<li><i class="fas fa-tshirt"></i> Use a máquina de lavar apenas com carga completa</li>';
    }
    
    // Dicas gerais
    tipsHTML += '<li><i class="fas fa-toolbox"></i> Conserte vazamentos - um gotejamento pode desperdiçar 46 litros por dia</li>';
    tipsHTML += '<li><i class="fas fa-recycle"></i> Reaproveite água da chuva para regar plantas</li>';
    tipsHTML += '<li><i class="fas fa-hand-holding-water"></i> Feche bem as torneiras após o uso</li>';
    tipsHTML += '</ul>';
    
    // Adicionar comparação com média brasileira
    const weeklyAverage = 2950; // litros por semana (média brasileira)
    
    tipsHTML += `<div class="consumption-comparison">
        <p>Sua média semanal: <strong>${totalUsage.toLocaleString()} litros</strong></p>
        <p>Média semanal do brasileiro: <strong>${weeklyAverage.toLocaleString()} litros</strong></p>
        <div class="consumption-bar">
            <div class="your-consumption" style="width: ${Math.min((totalUsage / weeklyAverage) * 100, 100)}%">
                <span>Seu consumo</span>
            </div>
        </div>
    </div>`;
    
    tipsElement.innerHTML = tipsHTML;
}