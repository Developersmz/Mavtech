document.addEventListener("DOMContentLoaded", () => {
    
    // Footer current year
    document.querySelector('#current-year').textContent = new Date().getFullYear()

    document.getElementById('searchButton').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.toLowerCase()
        const sections = document.querySelectorAll('.sec')

        let found = false

        sections.forEach(section => {
            const keywords = section.getAttribute('data-keywords').toLowerCase()
            
            if (keywords.includes(query)) {
                section.scrollIntoView({ behavior: 'smooth' })
                found = true
            }
        })

        if (!found) {
            alert('Nenhum resultado encontrado para sua busca.')
        }
    })

    // Verificar se o parâmetro `logged_in` está presente na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('logged_in')) {
        // Remover o parâmetro da URL para evitar loops de refresh
        const cleanUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, cleanUrl);

        // Atualizar a página para refletir o estado de login
        window.location.reload(); // Força um refresh completo
    }
    // Show Navigation
    const navShowerBtn = document.querySelector("#nav-shower-btn")

    navShowerBtn.addEventListener("click", () => {
        document.querySelector(".nav-container").classList.toggle("visible")
    })

    window.onscroll = () => {
        document.querySelector('.nav-container').classList.remove("visible")
    }
    
    const themeBtn = document.querySelector('.theme')
      themeBtn.onclick = () => {
        themeBtn.classList.toggle('dark-mode-on')
        document.body.classList.toggle('dark-theme')

        if (localStorage.getItem("theme") == "light"){
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "light")
        }
    }

    if (localStorage.getItem("theme") == "light"){
        themeBtn.classList.remove('dark-mode-on')
        document.body.classList.remove('dark-theme')
    } else if (localStorage.getItem("theme") == "dark"){
        themeBtn.classList.add("dark-mode-on")
        document.body.classList.add("dark-theme")
    } else {
        localStorage.setItem("theme", "light")
    } 

    // Show/Hide news modal
    const closeModalBtn = document.querySelector("#close-news")

    // Close news card
    closeModalBtn.addEventListener("click", () => {
        document.querySelector(".news-modal").style.display="none"
    })

    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });

    const addTestBtn = document.querySelector('.add-testi')
    const closeNewTestBtn = document.querySelector(".close-btn-toggler")
    
    addTestBtn.addEventListener("click", () => {
        document.querySelector(".add-new-testi").style.display="grid"
    })

    closeNewTestBtn.addEventListener("click", () => {
        document.querySelector(".add-new-testi").style.display="none"
    })

})

// Open news
function openNews(news) {
    var modal = document.querySelector(".news-modal")
    var title = document.querySelector('#news-title')
    var content = document.querySelector("#news-content")
    
    modal.style.display = "flex"
    title.innerHTML = news.querySelector("h3").innerText
    content.innerHTML = news.querySelector("#allcontent").innerText

}
