document.addEventListener("DOMContentLoaded", () => {
    // Elementos
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    const goBackBtns = document.querySelectorAll(".go-back-btn");

    // Função para alternar a visibilidade do sidebar
    sidebarToggle?.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        document.querySelector(".main-content").classList.toggle("expanded");
    });

    // Função para ir "voltar" quando o botão "Cancelar e Voltar" é clicado
    goBackBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            // Exemplo: Redirecionar para a página principal ou limpar o formulário
            window.history.back(); // ou window.location.href = '/admin/dashboard';
        });
    });

    const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.getElementById('theme').value = savedTheme;
            applyTheme(savedTheme);
        }

        // Função para aplicar o tema
    function applyTheme(theme) {
        document.body.className = theme; // Troque a classe do body, por exemplo
    }

    // Salva o tema no Local Storage ao clicar no botão
    document.getElementById('saveTheme').addEventListener('click', () => {
        const theme = document.getElementById('theme').value;
        localStorage.setItem('theme', theme);
        applyTheme(theme);
        //alert('Tema salvo com sucesso!');
    });

    function showSection(sectionId) {
        const sections = document.querySelectorAll('section')
        
        sections.forEach(section => {
            section.style.display =section.id === sectionId ? 'block' : 'none'
        })
    }

   document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault()
        const targetId = item.getAttribute('href').substring(1)
        showSection(targetId)
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'))
        item.classList.add('active')
    })
   })

   showSection('overview')
});
