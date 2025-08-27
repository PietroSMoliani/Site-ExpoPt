document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    
    const invitation = document.getElementById('invitation');
    const btnParticipate = document.getElementById('btnParticipate');
    const instructions = document.querySelector('.instructions');
    
    // Adicionar evento de clique ao convite
    invitation.addEventListener('click', function() {
        if (!invitation.classList.contains('opened')) {
            // Adicionar a classe para abrir o convite
            invitation.classList.add('opened');
            
            // Esconder instruções e mostrar botão após a animação
            setTimeout(function() {
                instructions.classList.add('hidden');
                btnParticipate.classList.remove('hidden');
            }, 800);
        }
    });
    
    // Adicionar evento de clique ao botão participar
    btnParticipate.addEventListener('click', function() {
        // Marcar que o convite foi aceito
        sessionStorage.setItem('conviteAceito', 'true');
    });
    
    // Adicionar efeito de flutuação ao convite
    setInterval(function() {
        if (!invitation.classList.contains('opened')) {
            invitation.style.transform = 'translateY(-10px)';
            setTimeout(function() {
                invitation.style.transform = 'translateY(0)';
            }, 1000);
        }
    }, 2000);
});

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 40;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Tamanho aleatório entre 2 e 6 pixels
        const size = Math.random() * 4 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Posição inicial aleatória
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        // Duração da animação aleatória entre 5 e 15 segundos
        const animationDuration = Math.random() * 10 + 5;
        snowflake.style.animationDuration = `${animationDuration}s`;
        
        // Atraso inicial aleatório
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        snowflakesContainer.appendChild(snowflake);
    }
}