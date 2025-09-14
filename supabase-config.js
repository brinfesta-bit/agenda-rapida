// Configuração do Supabase para Agenda Rápida
// Substitua pelas suas credenciais do Supabase

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Ex: https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Chave pública (anon/public)

// Inicializar cliente Supabase
let supabaseClient = null;

// Função para inicializar o Supabase
function initSupabase() {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase inicializado com sucesso');
        return true;
    } else {
        console.error('Biblioteca do Supabase não carregada');
        return false;
    }
}

// Função para obter o cliente Supabase
function getSupabaseClient() {
    if (!supabaseClient) {
        initSupabase();
    }
    return supabaseClient;
}

// Verificar se o usuário está logado
async function getCurrentUser() {
    const client = getSupabaseClient();
    if (!client) return null;
    
    try {
        const { data: { user }, error } = await client.auth.getUser();
        if (error) {
            console.error('Erro ao obter usuário:', error);
            return null;
        }
        return user;
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        return null;
    }
}

// Função de login
async function loginUser(email, password) {
    const client = getSupabaseClient();
    if (!client) return { success: false, error: 'Supabase não inicializado' };
    
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Função de registro
async function registerUser(email, password) {
    const client = getSupabaseClient();
    if (!client) return { success: false, error: 'Supabase não inicializado' };
    
    try {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Função de logout
async function logoutUser() {
    const client = getSupabaseClient();
    if (!client) return { success: false, error: 'Supabase não inicializado' };
    
    try {
        const { error } = await client.auth.signOut();
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Função para salvar dados do usuário no Supabase
async function saveUserData(userId, agendaData) {
    const client = getSupabaseClient();
    if (!client) return { success: false, error: 'Supabase não inicializado' };
    
    try {
        const { data, error } = await client
            .from('user_agenda_data')
            .upsert({
                user_id: userId,
                agenda_items: agendaData.agendaItems || [],
                trash_items: agendaData.trashItems || [],
                language: agendaData.currentLanguage || 'pt',
                updated_at: new Date().toISOString()
            });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Função para carregar dados do usuário do Supabase
async function loadUserData(userId) {
    const client = getSupabaseClient();
    if (!client) return { success: false, error: 'Supabase não inicializado' };
    
    try {
        const { data, error } = await client
            .from('user_agenda_data')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data || null };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Listener para mudanças de autenticação
function setupAuthListener(callback) {
    const client = getSupabaseClient();
    if (!client) return null;
    
    return client.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}