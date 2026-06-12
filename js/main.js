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
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});


/* =========================================================
   3. BOUTON RETOUR EN HAUT
   Apparaît quand l'utilisateur scroll vers le bas
   Remonte en douceur au clic
========================================================= */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


/* =========================================================
   4. COMPTEURS ANIMÉS AU SCROLL
   Les chiffres s'animent de 0 à leur valeur cible
   quand ils entrent dans le viewport (IntersectionObserver)
========================================================= */

function animerCompteur(element) {
    const cible = parseInt(element.getAttribute('data-target'));
    const duree = 2000;
    const intervalle = 20;
    const increment = cible / (duree / intervalle);
    let valeurActuelle = 0;

    const timer = setInterval(function () {
        valeurActuelle += increment;

        if (valeurActuelle >= cible) {
            element.textContent = cible.toLocaleString('fr-FR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(valeurActuelle).toLocaleString('fr-FR');
        }
    }, intervalle);
}

const compteurObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            animerCompteur(entry.target);
            compteurObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const tousLesCompteurs = document.querySelectorAll('.counter');
tousLesCompteurs.forEach(function (compteur) {
    compteurObserver.observe(compteur);
});


/* =========================================================
   5. ANIMATIONS FADE-IN AU SCROLL
   Les sections apparaissent en fondu quand elles entrent
   dans le viewport (IntersectionObserver)
========================================================= */

const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const elementsFadeIn = document.querySelectorAll('.fade-in');
elementsFadeIn.forEach(function (el) {
    fadeObserver.observe(el);
});

// Vérifier les éléments déjà visibles dès le chargement de la page
setTimeout(function () {
    elementsFadeIn.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
}, 100);


/* =========================================================
   6. DARK MODE / LIGHT MODE
   Toggle dans la navbar — choix sauvegardé dans localStorage
   pour persister entre les pages
========================================================= */
const darkModeToggle = document.getElementById('darkModeToggle');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Activer le mode clair');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Activer le mode sombre');
        }
    }
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
        const currentTheme = localStorage.getItem('theme') || 'light';

        if (currentTheme === 'light') {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        }
    });
}
