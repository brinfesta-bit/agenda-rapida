# 📱 Agenda Rápida

Um aplicativo web mobile para gerenciamento rápido de agendamentos com interface intuitiva e funcionalidades avançadas.

## ✨ Funcionalidades

### 🎨 Sistema de Cores Automático
- 7 cores distintas para cada dia da semana
- Mudança automática de cor ao digitar o nome do dia
- Seletor manual de cores

### 📱 Interface Mobile-First
- Design responsivo para Android e iOS
- Botões verticais arrastáveis e editáveis
- Layout otimizado para toque
- PWA (Progressive Web App) instalável

### 🔧 Subbotões Funcionais
Cada agendamento possui 4 subbotões:
1. **🎨 Mudança de Cor** - Seletor visual das 7 cores
2. **🗑️ Apagar** - Sistema de lixeira com restaurar/excluir
3. **🎤 Microfone** - Transcrição de áudio para texto
4. **📎 Adicionar Arquivo** - Fotos, PDFs, documentos e câmera

### 🎛️ Controles Horizontais
4 botões principais:
1. **📝 Adicionar Notas** - Editor de texto completo
2. **📊 Classificar** - Ordenação por cor e data
3. **⬇️ Rolar para Baixo** - Navegação rápida
4. **⚙️ Configurações** - Múltiplos idiomas e preferências

### 🌍 Suporte a Idiomas
- Português (padrão)
- Inglês
- Espanhol
- Mandarim
- Hindi

### 📅 Recursos Adicionais
- Data e hora automática na criação
- Arrastar e soltar para reordenar
- Sistema de lixeira completo
- Salvamento automático no navegador
- Backup e restauração

## 🚀 Como Usar

### Instalação Local
1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd agenda-rapida
   ```

2. Abra o arquivo `index.html` em qualquer navegador moderno

### Instalação como PWA
1. Acesse o app no navegador mobile
2. Toque em "Adicionar à tela inicial"
3. O app será instalado como aplicativo nativo

## 📁 Estrutura do Projeto

```
agenda-rapida/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS responsivos
├── script.js           # Funcionalidades JavaScript
├── manifest.json       # Configuração PWA
├── .gitignore         # Arquivos ignorados pelo Git
├── README.md          # Documentação
└── backup_agenda_rapida/  # Backup de segurança
    ├── README_RESTAURACAO.md
    └── [arquivos de backup]
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e animações
- **JavaScript ES6+** - Funcionalidades interativas
- **Web APIs**:
  - Speech Recognition (reconhecimento de voz)
  - File API (manipulação de arquivos)
  - Local Storage (armazenamento local)
  - Drag and Drop API
- **PWA** - Service Worker e Manifest

## 🎨 Paleta de Cores

| Dia | Cor | Código |
|-----|-----|--------|
| Domingo | Vermelho | `#ff6b6b` |
| Segunda | Azul | `#4ecdc4` |
| Terça | Verde | `#45b7d1` |
| Quarta | Amarelo | `#f9ca24` |
| Quinta | Roxo | `#6c5ce7` |
| Sexta | Rosa | `#fd79a8` |
| Sábado | Laranja | `#fdcb6e` |

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Chrome Mobile
- ✅ Safari Mobile

## 🔧 Desenvolvimento

### Requisitos
- Navegador moderno com suporte a ES6+
- Servidor local (opcional, para desenvolvimento)

### Executar Localmente
```bash
# Opção 1: Abrir diretamente
start index.html

# Opção 2: Servidor local (Python)
python -m http.server 8000

# Opção 3: Servidor local (Node.js)
npx serve .
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue!

---

**Agenda Rápida** - Desenvolvido com ❤️ para facilitar seu dia a dia!