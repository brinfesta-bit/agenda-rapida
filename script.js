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
        enterText: 'Digite suas anotações aqui...',
        colorSettings: 'Personalizar Cores dos Dias:',
        customizeColors: 'Configurar Cores',
        colorCustomizationTitle: 'Personalizar Cores dos Dias',
        resetColors: 'Restaurar Padrão',
        saveColors: 'Salvar Cores',
        colorsReset: 'Cores restauradas para o padrão',
        colorsSaved: 'Cores personalizadas salvas'
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
        enterText: 'Enter your notes here...',
        colorSettings: 'Customize Day Colors:',
        customizeColors: 'Configure Colors',
        colorCustomizationTitle: 'Customize Day Colors',
        resetColors: 'Reset Default',
        saveColors: 'Save Colors',
        colorsReset: 'Colors reset to default',
        colorsSaved: 'Custom colors saved'
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
        enterText: 'Ingrese sus notas aquí...',
        colorSettings: 'Personalizar Colores de Días:',
        customizeColors: 'Configurar Colores',
        colorCustomizationTitle: 'Personalizar Colores de Días',
        resetColors: 'Restaurar Predeterminado',
        saveColors: 'Guardar Colores',
        colorsReset: 'Colores restaurados por defecto',
        colorsSaved: 'Colores personalizados guardados'
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
        enterText: '在此输入您的笔记...',
        colorSettings: '自定义日期颜色:',
        customizeColors: '配置颜色',
        colorCustomizationTitle: '自定义日期颜色',
        resetColors: '恢复默认',
        saveColors: '保存颜色',
        colorsReset: '颜色已恢复为默认',
        colorsSaved: '自定义颜色已保存'
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
        enterText: 'यहाँ अपने नोट्स दर्ज करें...',
        colorSettings: 'दिन के रंग अनुकूलित करें:',
        customizeColors: 'रंग कॉन्फ़िगर करें',
        colorCustomizationTitle: 'दिन के रंग अनुकूलित करें',
        resetColors: 'डिफ़ॉल्ट रीसेट करें',
        saveColors: 'रंग सहेजें',
        colorsReset: 'रंग डिफ़ॉल्ट पर रीसेट हो गए',
        colorsSaved: 'कस्टम रंग सहेजे गए'
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

    // Configurar detecção automática de dias da semana
    setupWeekdayDetection();

// Configurar detecção automática de dias da semana
function setupWeekdayDetection() {
    const dayColors = {
        'segunda': '#FF5722',
        'terça': '#FF9800', 
        'quarta': '#FFC107',
        'quinta': '#4CAF50',
        'sexta': '#2196F3',
        'sábado': '#9C27B0',
        'domingo': '#F44336'
    };

    function checkForWeekdays(text, item) {
        const lowerText = text.toLowerCase();
        for (const [day, color] of Object.entries(dayColors)) {
            if (lowerText.includes(day)) {
                item.day = day;
                item.color = color;
                
                // Atualizar classe CSS do elemento
                const element = document.querySelector(`[data-id="${item.id}"]`);
                if (element) {
                    element.className = `agenda-item ${day}`;
                }
                saveData();
                return true;
            }
        }
        return false;
    }

    // Adicionar listeners para campos de título
    document.addEventListener('blur', (e) => {
        if (e.target.classList.contains('item-title')) {
            const itemElement = e.target.closest('.agenda-item');
            if (itemElement) {
                const itemId = itemElement.dataset.id;
                const item = agendaItems.find(item => item.id === itemId);
                if (item) {
                    checkForWeekdays(e.target.value, item);
                }
            }
        }
    }, true);

    // Adicionar listeners para campos de notas
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('item-notes')) {
            const itemElement = e.target.closest('.agenda-item');
            if (itemElement) {
                const itemId = itemElement.dataset.id;
                const item = agendaItems.find(item => item.id === itemId);
                if (item) {
                    checkForWeekdays(e.target.value, item);
                }
            }
        }
    }, true);

    // Adicionar listeners para entrada de texto em tempo real
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('item-title') || e.target.classList.contains('item-notes')) {
            const itemElement = e.target.closest('.agenda-item');
            if (itemElement) {
                const itemId = itemElement.dataset.id;
                const item = agendaItems.find(item => item.id === itemId);
                if (item) {
                    checkForWeekdays(e.target.value, item);
                }
            }
        }
    }, true);

    // Verificar itens existentes
    agendaItems.forEach(item => {
        const titleText = item.title || '';
        const notesText = item.notes || '';
        const combinedText = `${titleText} ${notesText}`;
        checkForWeekdays(combinedText, item);
    });
}

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
    
    // Event listener para o botão "Configurar Cores"
    const customizeColorsBtn = document.getElementById('customize-colors-btn');
    if (customizeColorsBtn) {
        customizeColorsBtn.addEventListener('click', () => {
            openColorCustomizationModal();
        });
    }
    
    // Event listener para o botão "Restaurar Padrão"
    const resetColorsBtn = document.getElementById('reset-colors-btn');
    if (resetColorsBtn) {
        resetColorsBtn.addEventListener('click', () => {
            resetColorsToDefault();
        });
    }
    
    // Event listener para o botão "Salvar Cores"
    const saveColorsBtn = document.getElementById('save-colors-btn');
    if (saveColorsBtn) {
        saveColorsBtn.addEventListener('click', () => {
            saveCustomColors();
        });
    }
}

// Funções para personalização de cores
function openColorCustomizationModal() {
    const modal = document.getElementById('color-customization-modal');
    if (modal) {
        // Carregar cores atuais nos inputs
        loadCurrentColorsInInputs();
        modal.style.display = 'block';
    }
}

function loadCurrentColorsInInputs() {
    const colorInputs = {
        'segunda': document.getElementById('color-segunda'),
        'terça': document.getElementById('color-terca'),
        'quarta': document.getElementById('color-quarta'),
        'quinta': document.getElementById('color-quinta'),
        'sexta': document.getElementById('color-sexta'),
        'sábado': document.getElementById('color-sabado'),
        'domingo': document.getElementById('color-domingo')
    };
    
    Object.keys(colorInputs).forEach(day => {
        const input = colorInputs[day];
        if (input && dayColors[day]) {
            input.value = dayColors[day];
            // Atualizar também o círculo de cor correspondente
            const colorCircle = input.parentElement.querySelector('.color-circle');
            if (colorCircle) {
                colorCircle.style.backgroundColor = dayColors[day];
            }
        }
    });
}

function resetColorsToDefault() {
    const defaultColors = {
        'segunda': '#FFEB3B',
        'terça': '#FF9800', 
        'quarta': '#FFC107',
        'quinta': '#4CAF50',
        'sexta': '#2196F3',
        'sábado': '#9C27B0',
        'domingo': '#E91E63'
    };
    
    // Atualizar o objeto dayColors
    Object.assign(dayColors, defaultColors);
    
    // Atualizar os inputs
    loadCurrentColorsInInputs();
    
    // Atualizar os estilos CSS
    updateCSSColors();
    
    // Re-renderizar os itens para aplicar as novas cores
    renderAgendaItems();
    
    // Salvar no localStorage
    saveData();
    
    // Mostrar mensagem de confirmação
    showToast(translations[currentLanguage].colorsReset);
}

function saveCustomColors() {
    const colorInputs = {
        'segunda': document.getElementById('color-segunda'),
        'terça': document.getElementById('color-terca'),
        'quarta': document.getElementById('color-quarta'),
        'quinta': document.getElementById('color-quinta'),
        'sexta': document.getElementById('color-sexta'),
        'sábado': document.getElementById('color-sabado'),
        'domingo': document.getElementById('color-domingo')
    };
    
    // Atualizar o objeto dayColors com os novos valores
    Object.keys(colorInputs).forEach(day => {
        const input = colorInputs[day];
        if (input && input.value) {
            dayColors[day] = input.value;
        }
    });
    
    // Atualizar os estilos CSS
    updateCSSColors();
    
    // Re-renderizar os itens para aplicar as novas cores
    renderAgendaItems();
    
    // Fechar o modal
    closeModal('color-customization-modal');
    
    // Salvar no localStorage
    saveData();
    
    // Mostrar mensagem de confirmação
    showToast(translations[currentLanguage].colorsSaved);
}

function updateCSSColors() {
    // Remover estilos antigos se existirem
    const existingStyle = document.getElementById('custom-day-colors');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Criar novos estilos CSS
    const style = document.createElement('style');
    style.id = 'custom-day-colors';
    
    let cssRules = '';
    
    Object.keys(dayColors).forEach(day => {
        const color = dayColors[day];
        cssRules += `
            .agenda-item.${day} {
                border-left-color: ${color} !important;
            }
            .agenda-item.${day} {
                background: linear-gradient(135deg, ${color}, ${adjustBrightness(color, -20)}) !important;
                color: ${getContrastColor(color)} !important;
            }
        `;
    });
    
    style.textContent = cssRules;
    document.head.appendChild(style);
}

// Função auxiliar para ajustar o brilho de uma cor
function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Função auxiliar para determinar a cor do texto baseada no contraste
function getContrastColor(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
}

// Criar novo item de agendamento
function createNewAgendaItem() {
    const now = new Date();
    const item = {
        id: generateId(),
        title: translations[currentLanguage].newItem,
        notes: '',
        day: 'neutro',
        color: '#9E9E9E',
        datetime: now.toISOString(),
        files: []
    };
    
    agendaItems.unshift(item);
    renderAgendaItems();
    saveData();
    
    // Automaticamente focar no campo de notas do novo item
    setTimeout(() => {
        const newItemNotesElement = document.querySelector(`[data-id="${item.id}"] .item-notes`);
        if (newItemNotesElement) {
            newItemNotesElement.focus();
            // Posicionar cursor no final do placeholder
            newItemNotesElement.setSelectionRange(0, 0);
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
        <span class="item-title">${item.title}</span>
        <div class="item-datetime">${formattedDate} ${formattedTime}</div>
        <div class="item-content">
            <textarea class="item-notes" placeholder="${translations[currentLanguage].enterText}" 
                      onchange="updateItemNotes('${item.id}', this.value)">${item.notes}</textarea>
            <div class="item-files">
                ${item.files.map(file => `
                    <div class="file-item">
                        <span>📎 ${file.name}</span>
                        <span class="remove-file" onclick="removeFile('${item.id}', '${file.name}')"></span>
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
    
    // Adicionar event listener para edição do título
    const titleElement = div.querySelector('.item-title');
    titleElement.style.cursor = 'pointer';
    titleElement.addEventListener('click', () => editTitle(item.id, titleElement));
    
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

// Função para editar título clicando
function editTitle(id, element) {
    const currentTitle = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentTitle;
    input.className = 'item-title-edit';
    input.style.cssText = 'width: 100%; border: none; background: transparent; color: inherit; font-size: inherit; font-weight: inherit; outline: 2px solid #007bff; border-radius: 4px; padding: 2px;';
    
    // Substituir o div pelo input
    element.parentNode.replaceChild(input, element);
    input.focus();
    input.select();
    
    // Função para salvar e voltar ao div
    function saveAndRevert() {
        const newTitle = input.value.trim() || currentTitle;
        updateItemTitle(id, newTitle);
        
        const newDiv = document.createElement('div');
        newDiv.className = 'item-title';
        newDiv.onclick = () => editTitle(id, newDiv);
        newDiv.style.cursor = 'pointer';
        newDiv.textContent = newTitle;
        
        input.parentNode.replaceChild(newDiv, input);
    }
    
    // Salvar ao pressionar Enter ou perder foco
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveAndRevert();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            // Cancelar edição
            const newDiv = document.createElement('div');
            newDiv.className = 'item-title';
            newDiv.onclick = () => editTitle(id, newDiv);
            newDiv.style.cursor = 'pointer';
            newDiv.textContent = currentTitle;
            input.parentNode.replaceChild(newDiv, input);
        }
    });
    
    input.addEventListener('blur', saveAndRevert);
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

    // Atualizar textos da personalização de cores
    document.getElementById('color-settings-label').textContent = t.colorSettings;
    document.getElementById('customize-colors-text').textContent = t.customizeColors;
    document.getElementById('color-customization-title').textContent = t.colorCustomizationTitle;
    document.getElementById('reset-colors-text').textContent = t.resetColors;
    document.getElementById('save-colors-text').textContent = t.saveColors;
    
    // Atualizar labels dos dias da semana no modal de personalização
    document.getElementById('monday-label').textContent = t.monday;
    document.getElementById('tuesday-label').textContent = t.tuesday;
    document.getElementById('wednesday-label').textContent = t.wednesday;
    document.getElementById('thursday-label').textContent = t.thursday;
    document.getElementById('friday-label').textContent = t.friday;
    document.getElementById('saturday-label').textContent = t.saturday;
    document.getElementById('sunday-label').textContent = t.sunday;

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

// Função para rolar para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listener para abrir lixeira
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar botão da lixeira no final da lista de agendamentos
    const agendaContainer = document.getElementById('agenda-container');
    
    // Container para os botões
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '10px';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.marginTop = '15px';
    
    // Botão da lixeira
    const trashButton = document.createElement('button');
    trashButton.id = 'trash-btn';
    trashButton.className = 'trash-btn-bottom';
    trashButton.innerHTML = `
        <span class="icon">🗑️</span>
        <span>Lixeira</span>
    `;
    trashButton.addEventListener('click', () => {
        renderTrash();
        document.getElementById('trash-modal').style.display = 'block';
    });
    
    // Botão de seta para cima
    const scrollTopButton = document.createElement('button');
    scrollTopButton.id = 'scroll-top-btn';
    scrollTopButton.className = 'trash-btn-bottom';
    scrollTopButton.innerHTML = `
        <span class="icon">⬆️</span>
        <span>Topo</span>
    `;
    scrollTopButton.addEventListener('click', scrollToTop);
    
    // Adicionar botões ao container
    buttonsContainer.appendChild(trashButton);
    buttonsContainer.appendChild(scrollTopButton);
    
    // Inserir o container após o container de agendamentos
    agendaContainer.parentNode.insertBefore(buttonsContainer, agendaContainer.nextSibling);
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

// Função removida - a cor dos agendamentos agora só é alterada através da paleta de cores

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