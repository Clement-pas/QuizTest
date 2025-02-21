const categories = {
    animaux: [
        { question: "Quel animal est le roi de la jungle ?", answer: "Le lion" },
        { question: "Quel animal a une longue trompe ?", answer: "L'éléphant" },
        { question: "Quel animal est le plus grand du monde ?", answer: "La baleine bleue" }
    ],
    geographie: [
        { question: "Quelle est la capitale de la France ?", answer: "Paris" },
        { question: "Quel est le plus grand pays du monde ?", answer: "La Russie" },
        { question: "Quel fleuve traverse l'Égypte ?", answer: "Le Nil" }
    ],
    histoire: [
        { question: "Qui a été le premier empereur de Rome ?", answer: "Auguste" },
        { question: "Qui a découvert l'Amérique en 1492 ?", answer: "Christophe Colomb" },
        { question: "Qui a écrit 'Les Misérables' ?", answer: "Victor Hugo" }
    ],
    "Les bronzés font du ski": 
    [
        { question: "Comment ce nomme l'élève de Popeye qui tombe dans les premières minutes du film ?", answer: "Mme Schmitt" },
        { question: "De quoi souffre Mme Schimitt ?", answer: "La hanche luxée" },
        { question: "Pourquoi Jean-Claude Dusse a été retenu à Paris ?", answer: "Par une copine, une chieuse" },
        { question: "Qu’a expressément demandé M. Dusse ?", answer: "Une chambre double puisqu’il aura peut-être une copine qui vient de Paris" },
        { question: "Quel est le nom du propriétaire de la chambre 205 du 15 au 30 ?", answer: "M. Morin" },
        { question: "Pourquoi la chambre 205 a été libérée plus tard ?", answer: "Sa femme a été malade" },
        { question: "Qu’ont oublié, les anciens propriétaires de la chambre 205 ?", answer: "Leur Scrabble" },
        { question: "Citez les ingrédients de la crêpe gigi ?", answer: "C’est une fine couche de sarrasin saisie dessus dessous et parsemée de pétales de rose tiède" },
        { question: "Qui dit : 'C’est moi… c’est Christiane, Christiane l’esthéticienne !' ?", answer: "Christiane" },
        { question: "Quel acteur dit 'Je t’expliquerai' à plusieurs reprises ?", answer: "Thierry Lhermitte" },
        { question: "Quel est le défaut principal de Bernard ?", answer: "Il est égoïste" },
        { question: "Que dit Bernad quand il fait tombé tout les skis ?", answer: "ça tombera pas plus bas" },
        { question: "Quel sport pratique Christiane ?", answer: "Du ski de fond" },
        { question: "Avec qui Jean-Claude Dusse prend-il des cours ?", answer: "Anne LAURENCIN" },
        { question: "Pourquoi Anne Laurencin n’a-t-elle pas pu venir ?", answer: "Elle est souffrante" },
        { question: "Quelle est la voiture de Jérôme ?", answer: "Une 4L fourgonnette" },
        { question: "Quel est le temps de Jérôme à la compétition ?", answer: "45'8" },
        { question: "Que met Marius dans la fondue ?", answer: "Son fil dentaire" },
        { question: "De quelle nationalité sont les gens dans le refuge ?", answer: "Italiens" },
        { question: "Quel cadeau offre Marius avant de partir ?", answer: "Une huître en plastique qui fait pouic pouic" },
        { question: "Comment s’appelle le chien de Gigi ?", answer: "Pépette" },
        { question: "Que jette Popeye lors de l’ascension ?", answer: "Sa gourmette en Or" },
        { question: "Que mangent t'ils sur le pain quans ils arrivent à la ferme ?", answer: "La fougne" },
        { question: "Combien d’huîtres Christiane mange-t-elle à la fin ?", answer: "12 douzaines" },
        { question: "Qui joue Jean-Claude Dusse ?", answer: "Michel Blanc" },
        { question: "Quelle réplique concerne les Parisiens ?", answer: "Parisien, tête de chien… Parigot, tête de veau !" },
        { question: "Quelle est la réplique de Gilbert sur la fondue ?", answer: "Vous avez de la pâte… vous avez du sucre… alors avec la pâte, vous faites une crêpe et vous mettez du sucre dessus !" },
        { question: "Quelle est la réplique de Jérôme sur les généralistes ?", answer: "De toute façon, on n’a jamais vu un généraliste gagner !" },
        { question: "Quelle est la réplique de Marius sur son départ ?", answer: "Je ne m’arrête pas… je suis lancé !" },
    ]
    
};

let currentCategory;
let questions;
let usedQuestions = [];
let timeLeft;
let timerInterval = null; // Initialisé à null pour éviter les doublons
let score = 0;
let totalTimePerQuestion;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('skip-btn').addEventListener('click', skipQuestion);
document.getElementById('show-answer-btn').addEventListener('click', showAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('close-btn').addEventListener('click', returnToMainMenu);
document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('main-menu-btn').addEventListener('click', returnToMainMenu); // Nouveau bouton

// Remplir les catégories dans le menu
function populateCategories() {
    const categorySelect = document.getElementById('category');
    for (const category in categories) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    }
}

function startGame() {
    currentCategory = document.getElementById('category').value;
    totalTimePerQuestion = parseInt(document.getElementById('time-input').value, 10);
    questions = [...categories[currentCategory]];
    usedQuestions = [];
    score = 0;
    timeLeft = totalTimePerQuestion;

    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('quiz-game').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');

    resetTimer(); // Réinitialiser le chronomètre
    nextQuestion();
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval); // Nettoyer l'intervalle précédent
    }
    timerInterval = setInterval(updateTimer, 1000); // Démarrer un nouvel intervalle
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function nextQuestion() {
    if (questions.length === usedQuestions.length) {
        endGame();
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    document.getElementById('question').textContent = questions[randomIndex].question;
    document.getElementById('answer').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('skip-btn').disabled = false;
    document.getElementById('show-answer-btn').disabled = false;

    // Réinitialiser le chronomètre pour la nouvelle question
    timeLeft = totalTimePerQuestion;
    document.getElementById('time').textContent = formatTime(timeLeft);
    resetTimer(); // Redémarrer le chronomètre
}

function skipQuestion() {
    clearInterval(timerInterval); // Arrêter le chronomètre
    document.getElementById('answer').textContent = `Réponse : ${questions[usedQuestions[usedQuestions.length - 1]].answer}`;
    document.getElementById('answer').classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('skip-btn').disabled = true;
    document.getElementById('show-answer-btn').disabled = true;
}

function showAnswer() {
    clearInterval(timerInterval); // Arrêter le chronomètre
    document.getElementById('answer').textContent = `Réponse : ${questions[usedQuestions[usedQuestions.length - 1]].answer}`;
    document.getElementById('answer').classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('skip-btn').disabled = true;
    document.getElementById('show-answer-btn').disabled = true;
}

function endGame() {
    clearInterval(timerInterval); // Arrêter le chronomètre
    document.getElementById('quiz-game').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').textContent = score;
}

function returnToMainMenu() {
    clearInterval(timerInterval); // Arrêter le chronomètre
    document.getElementById('quiz-game').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}

function restartGame() {
    returnToMainMenu();
    startGame();
}

// Initialisation
populateCategories();