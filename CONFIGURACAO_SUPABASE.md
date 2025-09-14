# Configuração do Supabase para Agenda Rápida

## Passos para configurar a autenticação:

### 1. Criar conta no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Clique em "New Project"
4. Escolha um nome para o projeto (ex: "agenda-rapida")
5. Defina uma senha para o banco de dados
6. Selecione uma região próxima ao Brasil

### 2. Configurar autenticação
1. No painel do Supabase, vá em "Authentication" > "Settings"
2. Em "Site URL", adicione:
   - Para desenvolvimento local: `http://localhost:3000` ou `http://127.0.0.1:5500`
   - Para GitHub Pages: `https://seuusuario.github.io/minha-agenda`
3. Em "Redirect URLs", adicione as mesmas URLs

### 3. Obter credenciais
1. Vá em "Settings" > "API"
2. Copie:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public key** (chave longa que começa com `eyJ...`)

### 4. Configurar no código
1. Abra o arquivo `supabase-config.js`
2. Substitua:
   ```javascript
   const SUPABASE_URL = 'SUA_URL_AQUI';
   const SUPABASE_ANON_KEY = 'SUA_CHAVE_AQUI';
   ```
   
   Por:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJ...';
   ```

### 5. Criar tabela para dados
1. No Supabase, vá em "SQL Editor"
2. Execute este comando:
   ```sql
   CREATE TABLE user_data (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     data JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Política de segurança (RLS)
   ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can only access their own data" ON user_data
     FOR ALL USING (auth.uid() = user_id);
   ```

### 6. Testar
1. Abra `auth.html` no navegador
2. Registre uma nova conta
3. Faça login
4. Verifique se os dados são sincronizados

## Problemas comuns:

- **Erro de CORS**: Verifique se adicionou corretamente as URLs no Supabase
- **Erro de autenticação**: Confirme se as credenciais estão corretas
- **Dados não salvam**: Verifique se a tabela foi criada e as políticas RLS estão ativas

## Modo offline
Se não configurar o Supabase, a aplicação funcionará apenas localmente usando localStorage.