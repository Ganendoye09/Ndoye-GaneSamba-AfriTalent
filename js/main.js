/* =========================================================
   AFRITALENT — JAVASCRIPT PRINCIPAL
   Auteur : [Votre Nom]
   Description : Interactivité du site AfriTalent
========================================================= */


/* =========================================================
   1. ANNÉE DYNAMIQUE — FOOTER
   Met à jour automatiquement l'année dans le footer
========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}


/* =========================================================
   2. NAVBAR DYNAMIQUE AU SCROLL
   La navbar change de style quand l'utilisateur scroll
========================================================= */
const mainNav = document.getElementById('mainNAV');

window.addEventListener('scroll', function () {

    if (window.scrollY > 50) {
        // L'utilisateur a scrollé : on ajoute la classe "scrolled"
        mainNav.classList.add('scrolled');
    } else {
        // On est en haut de la page : on retire la classe "scrolled"
        mainNav.classList.remove('scrolled');
    }
});


/* =========================================================
   3. BOUTON RETOUR EN HAUT
   Apparaît quand l'utilisateur scroll vers le bas
   Remonte en douceur au clic
========================================================= */
const backToTopBtn = document.getElementById('backToTop');

// Afficher ou masquer le bouton selon la position du scroll
window.addEventListener('scroll', function () {

    if (window.scrollY > 300) {
        // On affiche le bouton (flex pour centrer l'icône)
        backToTopBtn.style.display = 'flex';
    } else {
        // On cache le bouton
        backToTopBtn.style.display = 'none';
    }
});

// Remonter en haut de la page au clic
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // défilement fluide
        });
    });
}


/* =========================================================
   4. DARK MODE / LIGHT MODE
   Toggle dans la navbar — choix sauvegardé dans localStorage
   pour persister entre les pages
========================================================= */
const darkModeToggle = document.getElementById('darkModeToggle');

// Fonction qui applique le thème (dark ou light)
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        // Changer l'icône en soleil si dark mode actif
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Activer le mode clair');
        }
    } else {
        document.body.classList.remove('dark-mode');
        // Changer l'icône en lune si light mode actif
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Activer le mode sombre');
        }
    }
}

// Au chargement de la page : lire le thème sauvegardé dans localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Au clic sur le bouton toggle : changer de thème et sauvegarder
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {

        // Vérifier le thème actuel
        const currentTheme = localStorage.getItem('theme') || 'light';

        if (currentTheme === 'light') {
            // Passer en dark mode
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        } else {
            // Passer en light mode
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        }
    });
}
