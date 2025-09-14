// Agenda Rápida - Sistema de Agendamentos Mobile
// Variáveis globais
let agendaItems = [];
let trashItems = [];
let currentLanguage = 'pt';
let draggedItem = null;
let currentEditingItem = null;
let recognition = null;
let isRecording = false;
let currentUser = null;
let isOfflineMode = false;

// Cores dos dias da semana
const dayColors = {
    'segunda': '#FF5722',
    'terça': '#FF9800', 
    'quarta': '#FFC107',
    'quinta': '#4CAF50',
    'sexta': '#2196F3',
    'sábado': '#9C27B0',
    'domingo': '#E91E63'
};

// Traduções
const translations = {
    pt: {
        appTitle: 'Agenda Rápida',
        sort: 'Classificar',
        scroll: 'Rolar',
    
        settings: 'Configurações',
        newAgenda: 'Novo Agendamento',
        settingsTitle: 'Configurações',
        language: 'Idioma:',
        sortTitle: 'Classificar Por',
        sortByColor: 'Por Cor',
        sortByDate: 'Por Data',
    

        colorTitle: 'Escolher Dia da Semana',
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo',
        trashTitle: 'Lixeira',
        emptyTrash: 'Esvaziar Lixeira',
        changeColor: 'Cor',
        delete: 'Apagar',
        microphone: 'Áudio',
        addFile: 'Arquivo',
        restore: 'Restaurar',
        deleteForever: 'Excluir',
        newItem: '',
        enterText: 'Digite suas anotações aqui...'
    },
    en: {
        appTitle: 'Quick Agenda',
        sort: 'Sort',
        scroll: 'Scroll',
        organize: 'Organize',
        settings: 'Settings',
        newAgenda: 'New Schedule',
        settingsTitle: 'Settings',
        language: 'Language:',
        sortTitle: 'Sort By',
        sortByColor: 'By Color',
        sortByDate: 'By Date',
        organizeTitle: 'Organize By',
        organizeByColor: 'By Color',
        organizeByDate: 'By Date',
        colorTitle: 'Choose Day of Week',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        trashTitle: 'Trash',
        emptyTrash: 'Empty Trash',
        changeColor: 'Color',
        delete: 'Delete',
        microphone: 'Audio',
        addFile: 'File',
        restore: 'Restore',
        deleteForever: 'Delete',
        newItem: '',
        enterText: 'Enter your notes here...'
    },
    es: {
        appTitle: 'Agenda Rápida',
        sort: 'Clasificar',
        scroll: 'Desplazar',
    
        settings: 'Configuración',
        newAgenda: 'Nueva Cita',
        settingsTitle: 'Configuración',
        language: 'Idioma:',
        sortTitle: 'Clasificar Por',
        sortByColor: 'Por Color',
        sortByDate: 'Por Fecha',
    

        colorTitle: 'Elegir Día de la Semana',
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
        trashTitle: 'Papelera',
        emptyTrash: 'Vaciar Papelera',
        changeColor: 'Color',
        delete: 'Eliminar',
        microphone: 'Audio',
        addFile: 'Archivo',
        restore: 'Restaurar',
        deleteForever: 'Eliminar',
        newItem: '',
        enterText: 'Ingrese sus notas aquí...'
    },
    zh: {
        appTitle: '快速日程',
        sort: '排序',
        scroll: '滚动',
        organize: '整理',
        settings: '设置',
        newAgenda: '新日程',
        settingsTitle: '设置',
        language: '语言:',
        sortTitle: '排序方式',
        sortByColor: '按颜色',
        sortByDate: '按日期',
        organizeTitle: '整理方式',
        organizeByColor: '按颜色',
        organizeByDate: '按日期',
        colorTitle: '选择星期',
        monday: '星期一',
        tuesday: '星期二',
        wednesday: '星期三',
        thursday: '星期四',
        friday: '星期五',
        saturday: '星期六',
        sunday: '星期日',
        trashTitle: '回收站',
        emptyTrash: '清空回收站',
        changeColor: '颜色',
        delete: '删除',
        microphone: '音频',
        addFile: '文件',
        restore: '恢复',
        deleteForever: '删除',
        newItem: '',
        enterText: '在此输入您的笔记...'
    },
    hi: {
        appTitle: 'त्वरित एजेंडा',
        sort: 'क्रमबद्ध करें',
        scroll: 'स्क्रॉल करें',
        organize: 'व्यवस्थित करें',
        settings: 'सेटिंग्स',
        newAgenda: 'नया शेड्यूल',
        settingsTitle: 'सेटिंग्स',
        language: 'भाषा:',
        sortTitle: 'इसके द्वारा क्रमबद्ध करें',
        sortByColor: 'रंग के द्वारा',
        sortByDate: 'दिनांक के द्वारा',
        organizeTitle: 'इसके द्वारा व्यवस्थित करें',
        organizeByColor: 'रंग के द्वारा',
        organizeByDate: 'दिनांक के द्वारा',
        colorTitle: 'सप्ताह का दिन चुनें',
        monday: 'सोमवार',
        tuesday: 'मंगलवार',
        wednesday: 'बुधवार',
        thursday: 'गुरुवार',
        friday: 'शुक्रवार',
        saturday: 'शनिवार',
        sunday: 'रविवार',
        trashTitle: 'कूड़ादान',
        emptyTrash: 'कूड़ादान खाली करें',
        changeColor: 'रंग',
        delete: 'हटाएं',
        microphone: 'ऑडियो',
        addFile: 'फ़ाइल',
        restore: 'पुनर्स्थापित करें',
        deleteForever: 'हटाएं',
        newItem: '',
        enterText: 'यहाँ अपने नोट्स दर्ज करें...'
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthentication();
    initializeApp();
    loadData();
    setupEventListeners();
    setupSpeechRecognition();
    updateLanguage();
});

// Verificar autenticação
async function checkAuthentication() {
    if (typeof supabase === 'undefined') {
        console.log('Supabase não configurado, usando modo offline');
        isOfflineMode = true;
        return;
    }
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            // Redirecionar para página de login
            window.location.href = 'auth.html';
            return;
        }
        
        currentUser = session.user;
        setupUserInterface();
        
        // Migrar dados do localStorage se necessário
        await migrateLocalDataToSupabase();
        
    } catch (error) {
        console.error('Erro na autenticação:', error);
        isOfflineMode = true;
    }
}

// Configurar interface do usuário autenticado
function setupUserInterface() {
    if (currentUser) {
        const userInfo = document.getElementById('user-info');
        const userEmail = document.getElementById('user-email');
        const logoutBtn = document.getElementById('logout-btn');
        
        userEmail.textContent = currentUser.email;
        userInfo.style.display = 'flex';
        
        logoutBtn.addEventListener('click', async () => {
            stopAutoSync();
            await supabase.auth.signOut();
            window.location.href = 'auth.html';
        });
        
        // Iniciar sincronização automática
        setupAutoSync();
    }
}

// Inicializar aplicativo
function initializeApp() {
    // Configurar tema baseado na preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Botões de controle
    
    document.getElementById('sort-btn').addEventListener('click', () => {
        document.getElementById('sort-modal').style.display = 'block';
    });
    
    document.getElementById('scroll-down-btn').addEventListener('click', scrollToBottom);

    document.getElementById('settings-btn').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'block';
    });
    
    // Botão adicionar agendamento
    document.getElementById('add-agenda-btn').addEventListener('click', createNewAgendaItem);
    
    // Modais
    setupModalListeners();
    
    // Classificação
    document.getElementById('sort-by-color').addEventListener('click', () => {
        sortItems('color');
        closeModal('sort-modal');
    });
    
    document.getElementById('sort-by-date').addEventListener('click', () => {
        sortItems('date');
        closeModal('sort-modal');
    });
    

    
    // Configurações
    document.getElementById('language-select').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        updateLanguage();
        saveData();
    });
    
    // Lixeira
    document.getElementById('empty-trash-btn').addEventListener('click', emptyTrash);
    
    // Input de arquivo
    document.getElementById('file-input').addEventListener('change', handleFileSelect);
    
    // Detectar dias da semana nos campos de texto
    setupWeekdayDetection();
}

// Configurar listeners dos modais
function setupModalListeners() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Opções de cor
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const day = e.currentTarget.dataset.day;
            const color = e.currentTarget.dataset.color;
            
            if (currentEditingItem) {
                changeItemColor(currentEditingItem, day, color);
                closeModal('color-modal');
            }
        });
    });
}

// Criar novo item de agendamento
function createNewAgendaItem() {
    const now = new Date();
    const item = {
        id: generateId(),
        title: translations[currentLanguage].newItem,
        notes: '',
        day: 'segunda',
        color: dayColors['segunda'],
        datetime: now.toISOString(),
        files: []
    };
    
    agendaItems.unshift(item);
    renderAgendaItems();
    saveData();
    
    // Focar no título do novo item
    setTimeout(() => {
        const newItemElement = document.querySelector(`[data-id="${item.id}"] .item-title`);
        if (newItemElement) {
            newItemElement.focus();
            newItemElement.select();
        }
    }, 100);
}

// Renderizar itens da agenda
function renderAgendaItems() {
    const container = document.getElementById('agenda-container');
    container.innerHTML = '';
    
    agendaItems.forEach(item => {
        const itemElement = createAgendaItemElement(item);
        container.appendChild(itemElement);
    });
}

// Criar elemento do item de agendamento
function createAgendaItemElement(item) {
    const div = document.createElement('div');
    div.className = `agenda-item ${item.day}`;
    div.dataset.id = item.id;
    div.draggable = true;
    
    const datetime = new Date(item.datetime);
    const formattedDate = datetime.toLocaleDateString(currentLanguage === 'pt' ? 'pt-BR' : currentLanguage);
    const formattedTime = datetime.toLocaleTimeString(currentLanguage === 'pt' ? 'pt-BR' : currentLanguage, {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    div.innerHTML = `
        <div class="item-header">
            <input type="text" class="item-title" value="${item.title}" 
                   onchange="updateItemTitle('${item.id}', this.value)">
            <div class="item-datetime">${formattedDate} ${formattedTime}</div>
        </div>
        <div class="item-content">
            <textarea class="item-notes" placeholder="${translations[currentLanguage].enterText}" 
                      onchange="updateItemNotes('${item.id}', this.value)">${item.notes}</textarea>
            <div class="item-files">
                ${item.files.map(file => `
                    <div class="file-item">
                        <span>📎 ${file.name}</span>
                        <span class="remove-file" onclick="removeFile('${item.id}', '${file.name}')">&times;</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="item-actions">
            <button class="action-btn" onclick="openColorModal('${item.id}')">
                <span class="icon">🎨</span>
                <span>${translations[currentLanguage].changeColor}</span>
            </button>
            <button class="action-btn" onclick="deleteItem('${item.id}')">
                <span class="icon">🗑️</span>
                <span>${translations[currentLanguage].delete}</span>
            </button>
            <button class="action-btn" onclick="startRecording('${item.id}')">
                <span class="icon">🎤</span>
                <span>${translations[currentLanguage].microphone}</span>
            </button>
            <button class="action-btn" onclick="openFileDialog('${item.id}')">
                <span class="icon">📎</span>
                <span>${translations[currentLanguage].addFile}</span>
            </button>
        </div>
    `;
    
    // Adicionar event listeners para drag and drop
    setupDragAndDrop(div);
    
    return div;
}

// Configurar drag and drop
function setupDragAndDrop(element) {
    element.addEventListener('dragstart', (e) => {
        draggedItem = element;
        element.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });
    
    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
        draggedItem = null;
    });
    
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    
    element.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem && draggedItem !== element) {
            const container = document.getElementById('agenda-container');
            const afterElement = getDragAfterElement(container, e.clientY);
            
            if (afterElement == null) {
                container.appendChild(draggedItem);
            } else {
                container.insertBefore(draggedItem, afterElement);
            }
            
            updateItemOrder();
        }
    });
}

// Obter elemento após posição do drag
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.agenda-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Atualizar ordem dos itens
function updateItemOrder() {
    const container = document.getElementById('agenda-container');
    const elements = container.querySelectorAll('.agenda-item');
    const newOrder = [];
    
    elements.forEach(element => {
        const id = element.dataset.id;
        const item = agendaItems.find(item => item.id === id);
        if (item) {
            newOrder.push(item);
        }
    });
    
    agendaItems = newOrder;
    saveData();
}

// Funções de atualização de itens
function updateItemTitle(id, title) {
    const item = agendaItems.find(item => item.id === id);
    if (item) {
        item.title = title;
        
        // Detectar dia da semana no título e alterar cor automaticamente
        const lowerTitle = title.toLowerCase();
        for (const [day, color] of Object.entries(dayColors)) {
            if (lowerTitle.includes(day)) {
                item.day = day;
                item.color = color;
                
                // Atualizar classe CSS do elemento
                const element = document.querySelector(`[data-id="${id}"]`);
                if (element) {
                    element.className = `agenda-item ${day}`;
                }
                break;
            }
        }
        
        saveData();
    }
}

function updateItemNotes(id, notes) {
    const item = agendaItems.find(item => item.id === id);
    if (item) {
        item.notes = notes;
        saveData();
    }
}

// Abrir modal de cores
function openColorModal(id) {
    currentEditingItem = id;
    document.getElementById('color-modal').style.display = 'block';
}

// Alterar cor do item
function changeItemColor(id, day, color) {
    const item = agendaItems.find(item => item.id === id);
    if (item) {
        item.day = day;
        item.color = color;
        
        // Atualizar elemento na tela
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.className = `agenda-item ${day}`;
        }
        
        saveData();
        showToast(`Cor alterada para ${translations[currentLanguage][getDayTranslationKey(day)]}`);
    }
}

// Obter chave de tradução do dia
function getDayTranslationKey(day) {
    const dayMap = {
        'segunda': 'monday',
        'terça': 'tuesday',
        'quarta': 'wednesday',
        'quinta': 'thursday',
        'sexta': 'friday',
        'sábado': 'saturday',
        'domingo': 'sunday'
    };
    return dayMap[day] || 'monday';
}

// Deletar item
function deleteItem(id) {
    const itemIndex = agendaItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const item = agendaItems.splice(itemIndex, 1)[0];
        trashItems.push(item);
        renderAgendaItems();
        saveData();
        showToast('Item movido para a lixeira');
    }
}

// Configurar reconhecimento de voz
function setupSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getLanguageCode(currentLanguage);
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            if (currentEditingItem) {
                const item = agendaItems.find(item => item.id === currentEditingItem);
                if (item) {
                    item.notes += (item.notes ? ' ' : '') + transcript;
                    renderAgendaItems();
                    saveData();
                }
            }
            isRecording = false;
        };
        
        recognition.onerror = function() {
            isRecording = false;
            showToast('Erro no reconhecimento de voz');
        };
        
        recognition.onend = function() {
            isRecording = false;
        };
    }
}

// Iniciar gravação
function startRecording(id) {
    if (!recognition) {
        showToast('Reconhecimento de voz não suportado');
        return;
    }
    
    if (isRecording) {
        recognition.stop();
        return;
    }
    
    currentEditingItem = id;
    recognition.lang = getLanguageCode(currentLanguage);
    recognition.start();
    isRecording = true;
    showToast('Gravando... Fale agora');
}

// Obter código do idioma para reconhecimento de voz
function getLanguageCode(lang) {
    const codes = {
        'pt': 'pt-BR',
        'en': 'en-US',
        'es': 'es-ES',
        'zh': 'zh-CN',
        'hi': 'hi-IN'
    };
    return codes[lang] || 'pt-BR';
}

// Abrir diálogo de arquivo
function openFileDialog(id) {
    currentEditingItem = id;
    document.getElementById('file-input').click();
}

// Manipular seleção de arquivo
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    if (files.length > 0 && currentEditingItem) {
        const item = agendaItems.find(item => item.id === currentEditingItem);
        if (item) {
            files.forEach(file => {
                // Simular upload (em uma implementação real, você faria upload para servidor)
                const fileInfo = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file) // Para preview local
                };
                item.files.push(fileInfo);
            });
            
            renderAgendaItems();
            saveData();
            showToast(`${files.length} arquivo(s) adicionado(s)`);
        }
    }
    
    // Limpar input
    event.target.value = '';
}

// Remover arquivo
function removeFile(itemId, fileName) {
    const item = agendaItems.find(item => item.id === itemId);
    if (item) {
        item.files = item.files.filter(file => file.name !== fileName);
        renderAgendaItems();
        saveData();
        showToast('Arquivo removido');
    }
}

// Classificar itens
function sortItems(type) {
    if (type === 'color') {
        const dayOrder = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];
        agendaItems.sort((a, b) => {
            return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        });
    } else if (type === 'date') {
        agendaItems.sort((a, b) => {
            return new Date(b.datetime) - new Date(a.datetime);
        });
    }
    
    renderAgendaItems();
    saveData();
    showToast(`Itens classificados por ${type === 'color' ? 'cor' : 'data'}`);
}

// Organizar itens (agrupamento visual)


// Rolar para o final
function scrollToBottom() {
    const container = document.getElementById('agenda-container');
    container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
    });
}

// Renderizar lixeira
function renderTrash() {
    const container = document.getElementById('trash-container');
    container.innerHTML = '';
    
    if (trashItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Lixeira vazia</p>';
        return;
    }
    
    trashItems.forEach(item => {
        const div = document.createElement('div');
        div.className = `trash-item ${item.day}`;
        div.innerHTML = `
            <div>
                <strong>${item.title}</strong>
                <br>
                <small>${new Date(item.datetime).toLocaleString()}</small>
            </div>
            <div class="trash-item-actions">
                <button class="trash-action-btn restore-btn" onclick="restoreItem('${item.id}')">
                    ${translations[currentLanguage].restore}
                </button>
                <button class="trash-action-btn delete-btn" onclick="deleteItemPermanently('${item.id}')">
                    ${translations[currentLanguage].deleteForever}
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Restaurar item da lixeira
function restoreItem(id) {
    const itemIndex = trashItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const item = trashItems.splice(itemIndex, 1)[0];
        agendaItems.unshift(item);
        renderAgendaItems();
        renderTrash();
        saveData();
        showToast('Item restaurado');
    }
}

// Deletar item permanentemente
function deleteItemPermanently(id) {
    const itemIndex = trashItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        trashItems.splice(itemIndex, 1);
        renderTrash();
        saveData();
        showToast('Item excluído permanentemente');
    }
}

// Esvaziar lixeira
function emptyTrash() {
    if (trashItems.length === 0) {
        showToast('Lixeira já está vazia');
        return;
    }
    
    if (confirm('Tem certeza que deseja esvaziar a lixeira? Esta ação não pode ser desfeita.')) {
        trashItems = [];
        renderTrash();
        saveData();
        showToast('Lixeira esvaziada');
    }
}

// Atualizar idioma
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Atualizar textos da interface
    document.getElementById('app-title').textContent = t.appTitle;
    document.getElementById('sort-text').textContent = t.sort;
    document.getElementById('scroll-text').textContent = t.scroll;

    document.getElementById('settings-text').textContent = t.settings;
    document.getElementById('add-agenda-text').textContent = t.newAgenda;
    document.getElementById('settings-title').textContent = t.settingsTitle;
    document.getElementById('language-label').textContent = t.language;
    document.getElementById('sort-title').textContent = t.sortTitle;
    document.getElementById('sort-color-text').textContent = t.sortByColor;
    document.getElementById('sort-date-text').textContent = t.sortByDate;


    document.getElementById('color-title').textContent = t.colorTitle;
    document.getElementById('monday-text').textContent = t.monday;
    document.getElementById('tuesday-text').textContent = t.tuesday;
    document.getElementById('wednesday-text').textContent = t.wednesday;
    document.getElementById('thursday-text').textContent = t.thursday;
    document.getElementById('friday-text').textContent = t.friday;
    document.getElementById('saturday-text').textContent = t.saturday;
    document.getElementById('sunday-text').textContent = t.sunday;
    document.getElementById('trash-title').textContent = t.trashTitle;
    document.getElementById('empty-trash-text').textContent = t.emptyTrash;
    
    // Atualizar select de idioma
    document.getElementById('language-select').value = currentLanguage;
    
    // Re-renderizar itens para atualizar textos
    renderAgendaItems();
    renderTrash();
}

// Fechar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Mostrar toast
function showToast(message) {
    // Criar elemento de toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        z-index: 10000;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        animation: toastSlideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Gerar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Salvar dados
async function saveData() {
    const data = {
        agendaItems,
        trashItems,
        currentLanguage,
        version: '1.0'
    };
    
    try {
        // Salvar no localStorage (backup local)
        localStorage.setItem('agendaRapida', JSON.stringify(data));
        
        // Salvar no Supabase se autenticado
        if (!isOfflineMode && currentUser && typeof supabase !== 'undefined') {
            await saveUserData(currentUser.id, data);
        }
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        showToast('Erro ao salvar dados');
    }
}

// Carregar dados
async function loadData() {
    try {
        let data = null;
        
        // Tentar carregar do Supabase primeiro se autenticado
        if (!isOfflineMode && currentUser && typeof supabase !== 'undefined') {
            try {
                data = await loadUserData(currentUser.id);
            } catch (error) {
                console.log('Erro ao carregar do Supabase, usando localStorage:', error);
            }
        }
        
        // Fallback para localStorage se não conseguiu carregar do Supabase
        if (!data) {
            const savedData = localStorage.getItem('agendaRapida');
            if (savedData) {
                data = JSON.parse(savedData);
            }
        }
        
        if (data) {
            agendaItems = data.agendaItems || [];
            trashItems = data.trashItems || [];
            currentLanguage = data.currentLanguage || 'pt';
            
            renderAgendaItems();
            renderTrash();
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showToast('Erro ao carregar dados');
    }
}

// Event listener para abrir lixeira
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar botão da lixeira aos controles
    const controlButtons = document.querySelector('.button-grid');
    const trashButton = document.createElement('button');
    trashButton.className = 'grid-btn small-btn';
    trashButton.innerHTML = `
        <span class="icon">🗑️</span>
        <span>Lixeira</span>
    `;
    trashButton.addEventListener('click', () => {
        renderTrash();
        document.getElementById('trash-modal').style.display = 'block';
    });
    
    // Inserir antes do botão de configurações
    const settingsBtn = document.getElementById('settings-btn');
    controlButtons.insertBefore(trashButton, settingsBtn);
});

// Adicionar estilos de animação para toast
const style = document.createElement('style');
style.textContent = `
    @keyframes toastSlideIn {
        from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
// Migrar dados do localStorage para Supabase
async function migrateLocalDataToSupabase() {
    if (isOfflineMode || !currentUser || typeof supabase === 'undefined') {
        return;
    }
    
    try {
        // Verificar se já existem dados no Supabase
        const existingData = await loadUserData(currentUser.id);
        
        if (!existingData) {
            // Carregar dados do localStorage
            const localData = localStorage.getItem('agendaRapida');
            
            if (localData) {
                const data = JSON.parse(localData);
                
                // Salvar no Supabase
                await saveUserData(currentUser.id, data);
                
                console.log('Dados migrados do localStorage para Supabase');
                showToast('Dados sincronizados com a nuvem');
            }
        }
    } catch (error) {
        console.error('Erro na migração de dados:', error);
    }
}

// Sincronização automática de dados
let syncInterval = null;

function setupAutoSync() {
    if (isOfflineMode || !currentUser || typeof supabase === 'undefined') {
        return;
    }
    
    // Sincronizar a cada 30 segundos
    syncInterval = setInterval(async () => {
        try {
            await syncDataWithSupabase();
        } catch (error) {
            console.error('Erro na sincronização automática:', error);
        }
    }, 30000);
    
    // Sincronizar quando a página ganha foco
    window.addEventListener('focus', async () => {
        if (!isOfflineMode && currentUser) {
            await syncDataWithSupabase();
        }
    });
    
    // Sincronizar antes de fechar a página
    window.addEventListener('beforeunload', async () => {
        if (!isOfflineMode && currentUser) {
            await saveData();
        }
    });
}

async function syncDataWithSupabase() {
    if (isOfflineMode || !currentUser || typeof supabase === 'undefined') {
        return;
    }
    
    try {
        // Carregar dados mais recentes do Supabase
        const cloudData = await loadUserData(currentUser.id);
        
        if (cloudData) {
            // Verificar se os dados locais são diferentes
            const localData = {
                agendaItems,
                trashItems,
                currentLanguage,
                version: '1.0'
            };
            
            const localDataString = JSON.stringify(localData);
            const cloudDataString = JSON.stringify(cloudData);
            
            if (localDataString !== cloudDataString) {
                // Atualizar dados locais com dados da nuvem
                agendaItems = cloudData.agendaItems || [];
                trashItems = cloudData.trashItems || [];
                currentLanguage = cloudData.currentLanguage || 'pt';
                
                // Atualizar interface
                renderAgendaItems();
                renderTrash();
                updateLanguage();
                
                // Salvar no localStorage
                localStorage.setItem('agendaRapida', JSON.stringify(cloudData));
                
                console.log('Dados sincronizados da nuvem');
            }
        }
    } catch (error) {
        console.error('Erro na sincronização:', error);
    }
}

function stopAutoSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
    }
}
    @keyframes toastSlideOut {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função para detectar dias da semana e alterar cores dos botões
function setupWeekdayDetection() {
    // Mapeamento dos dias da semana para classes CSS
    const weekdayMap = {
        'segunda': 'segunda',
        'segunda-feira': 'segunda',
        'seg': 'segunda',
        'terça': 'terca',
        'terca': 'terca',
        'terça-feira': 'terca',
        'terca-feira': 'terca',
        'ter': 'terca',
        'quarta': 'quarta',
        'quarta-feira': 'quarta',
        'qua': 'quarta',
        'quinta': 'quinta',
        'quinta-feira': 'quinta',
        'qui': 'quinta',
        'sexta': 'sexta',
        'sexta-feira': 'sexta',
        'sex': 'sexta',
        'sábado': 'sabado',
        'sabado': 'sabado',
        'sab': 'sabado',
        'domingo': 'domingo',
        'dom': 'domingo'
    };
    
    // Função para verificar texto e alterar cor do agendamento completo
    function checkForWeekdays(text, targetElement) {
        if (!text || !targetElement) return;
        
        const lowerText = text.toLowerCase();
        
        // Encontrar o item de agendamento completo
        const agendaItem = targetElement.closest('.agenda-item');
        if (!agendaItem) return;
        
        // Remover todas as classes de dias da semana primeiro
        agendaItem.classList.remove('segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo');
        
        // Verificar se algum dia da semana foi mencionado
        for (const [keyword, className] of Object.entries(weekdayMap)) {
            if (lowerText.includes(keyword)) {
                agendaItem.classList.add(className);
                break; // Parar no primeiro dia encontrado
            }
        }
    }
    
    // Adicionar listeners para mudanças nos campos (apenas no blur para não interferir na digitação)
    document.addEventListener('blur', function(e) {
        if (e.target.classList.contains('item-title') || e.target.classList.contains('item-notes')) {
            checkForWeekdays(e.target.value, e.target);
        }
    }, true);
    
    // Adicionar listeners para mudanças nos campos
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('item-title') || e.target.classList.contains('item-notes')) {
            checkForWeekdays(e.target.value, e.target);
        }
    });
    
    // Adicionar listener para detectar quando o usuário para de digitar (debounce)
    let typingTimer;
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('item-title') || e.target.classList.contains('item-notes')) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                checkForWeekdays(e.target.value, e.target);
            }, 500); // Aguarda 500ms após parar de digitar
        }
    });
    
    // Adicionar listeners para campos já existentes na página
    document.querySelectorAll('.item-title, .item-notes').forEach(field => {
        if (field.value) {
            checkForWeekdays(field.value, field);
        }
    });
}

// Exportar funções globais para uso no HTML
window.updateItemTitle = updateItemTitle;
window.updateItemNotes = updateItemNotes;
window.openColorModal = openColorModal;
window.deleteItem = deleteItem;
window.startRecording = startRecording;
window.openFileDialog = openFileDialog;
window.removeFile = removeFile;
window.restoreItem = restoreItem;
window.deleteItemPermanently = deleteItemPermanently;