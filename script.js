const gameBoard = document.getElementById('game-board');
const cardValues = ['🐶','🐱','🦁','🐸','🐵','🐰','🐼','🐷'];
let cards = [...cardValues, ...cardValues]; // Duplicate for pairs
cards.sort(() => 0.5 - Math.random()); // Shuffle

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Create cards
cards.forEach(value => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">?</div>
    <div class="back">${value}</div>
  `;

  // Handle card click
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flip') || card === firstCard) return;

    card.classList.add('flip');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      // Check if they match
      const firstEmoji = firstCard.querySelector('.back').textContent;
      const secondEmoji = secondCard.querySelector('.back').textContent;

      if (firstEmoji === secondEmoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
      
        // Check win condition
        const allMatched = document.querySelectorAll('.matched').length;
        if (allMatched === cards.length) {
          document.getElementById('win-message').style.display = 'block';
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetBoard();
        }, 1000);
      }
    }
  });

  gameBoard.appendChild(card);
});

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

