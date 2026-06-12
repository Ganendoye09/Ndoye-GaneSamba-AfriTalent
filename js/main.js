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
   6. FILTRAGE DYNAMIQUE DES FREELANCES
   Les cartes se filtrent par catégorie sans rechargement
   Uniquement sur la page freelances.html
========================================================= */

const boutonsFiltres = document.querySelectorAll('.btn-filter');
const cartesFreelances = document.querySelectorAll('.freelance-item');
const noResults = document.getElementById('noResults');

if (boutonsFiltres.length > 0) {

    boutonsFiltres.forEach(function (bouton) {

        bouton.addEventListener('click', function () {

            // Retirer la classe active de tous les boutons
            boutonsFiltres.forEach(function (btn) {
                btn.classList.remove('active');
            });

            // Ajouter la classe active au bouton cliqué
            bouton.classList.add('active');

            // Récupérer la valeur du filtre sélectionné
            const filtre = bouton.getAttribute('data-filter');

            let nbVisible = 0;

            // Afficher ou masquer chaque carte selon la catégorie
            cartesFreelances.forEach(function (carte) {
                const categorie = carte.getAttribute('data-category');

                if (filtre === 'all' || categorie === filtre) {
                    // La carte correspond au filtre : on l'affiche
                    carte.classList.remove('hidden');
                    nbVisible++;
                } else {
                    // La carte ne correspond pas : on la masque
                    carte.classList.add('hidden');
                }
            });

            // Afficher le message "aucun résultat" si aucune carte visible
            if (noResults) {
                noResults.style.display = nbVisible === 0 ? 'block' : 'none';
            }
        });
    });
}


/* =========================================================
   7. VALIDATION DU FORMULAIRE DE CONTACT
   Validation complète côté client avec retour visuel
   Uniquement sur la page contact.html
========================================================= */

const contactForm = document.getElementById('contactForm');

if (contactForm) {

    // Regex pour vérifier le format d'un email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Fonction utilitaire : afficher une erreur sur un champ
    function afficherErreur(champId, erreurId) {
        const champ = document.getElementById(champId);
        const erreur = document.getElementById(erreurId);
        champ.classList.remove('is-valid');
        champ.classList.add('is-invalid');
        erreur.classList.add('visible');
    }

    // Fonction utilitaire : marquer un champ comme valide
    function afficherSucces(champId, erreurId) {
        const champ = document.getElementById(champId);
        const erreur = document.getElementById(erreurId);
        champ.classList.remove('is-invalid');
        champ.classList.add('is-valid');
        erreur.classList.remove('visible');
    }

    // Écouter la soumission du formulaire
    contactForm.addEventListener('submit', function (e) {
        // Empêcher l'envoi réel du formulaire
        e.preventDefault();

        // Récupérer les valeurs de chaque champ
        const prenom  = document.getElementById('firstName').value.trim();
        const nom     = document.getElementById('lastName').value.trim();
        const email   = document.getElementById('email').value.trim();
        const sujet   = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        let formulaireValide = true;

        // Vérification du prénom
        if (prenom === '') {
            afficherErreur('firstName', 'firstNameError');
            formulaireValide = false;
        } else {
            afficherSucces('firstName', 'firstNameError');
        }

        // Vérification du nom
        if (nom === '') {
            afficherErreur('lastName', 'lastNameError');
            formulaireValide = false;
        } else {
            afficherSucces('lastName', 'lastNameError');
        }

        // Vérification de l'email avec regex
        if (email === '' || !regexEmail.test(email)) {
            afficherErreur('email', 'emailError');
            formulaireValide = false;
        } else {
            afficherSucces('email', 'emailError');
        }

        // Vérification du sujet (menu déroulant)
        if (sujet === '') {
            afficherErreur('subject', 'subjectError');
            formulaireValide = false;
        } else {
            afficherSucces('subject', 'subjectError');
        }

        // Vérification du message (minimum 20 caractères)
        if (message.length < 20) {
            afficherErreur('message', 'messageError');
            formulaireValide = false;
        } else {
            afficherSucces('message', 'messageError');
        }

        // Si tout est valide : afficher le message de succès et réinitialiser
        if (formulaireValide) {
            const successAlert = document.getElementById('successAlert');
            successAlert.classList.remove('d-none');

            // Remonter en haut du formulaire pour voir le message de succès
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Réinitialiser le formulaire après 3 secondes
            setTimeout(function () {
                contactForm.reset();
                successAlert.classList.add('d-none');

                // Retirer les classes de validation
                document.querySelectorAll('.form-control, .form-select').forEach(function (champ) {
                    champ.classList.remove('is-valid', 'is-invalid');
                });
            }, 3000);
        }
    });
}


/* =========================================================
   8. DARK MODE / LIGHT MODE
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
