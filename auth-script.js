// Script simplificado para Agenda Rápida - Acesso direto

// Elementos do DOM
const useOfflineBtn = document.getElementById('useOffline');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listener para o botão de acesso
    setupEventListeners();
});

// Verificar sessão existente
async function checkExistingSession() {
    showLoading(true);
    
    const user = await getCurrentUser();
    if (user) {
        currentUser = user;
        await redirectToApp();
    }
    
    showLoading(false);
}

// Configurar event listeners
function setupEventListeners() {
    // Botão de acesso ao app
    useOfflineBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Script simplificado - apenas redirecionamento direto para o app