const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Funktion zum Umdrehen der Karten
function flipCard() {
    if (lockBoard) return; // Wenn das Board gesperrt ist, tun wir nichts
    if (this === firstCard) return; // Verhindert, dass die gleiche Karte zweimal angeklickt wird

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // Erste Karte
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Zweite Karte
    secondCard = this;
    checkForMatch();
}

// Funktion zum Überprüfen, ob die Karten übereinstimmen
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        // Wenn sie übereinstimmen
        disableCards();
        return;
    }

    // Wenn sie nicht übereinstimmen
    unflipCards();
}

// Funktion zum Deaktivieren der Karten
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Funktion zum Umdrehen der Karten, wenn sie nicht übereinstimmen
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Funktion zum Zurücksetzen des Boards
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Karten auf das Klicken vorbereiten
cards.forEach(card => card.addEventListener('click', flipCard));

// Karten zufällig mischen
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
