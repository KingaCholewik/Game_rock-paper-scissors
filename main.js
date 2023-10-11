const gameSummery = {
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: '',
  aiHand: '',
};

const hands = [...document.querySelectorAll('.select img')];

const handSelection = (e) => {
  game.playerHand = e.target.dataset.option;
  hands.forEach((hand) => (hand.style.boxShadow = ''));
  e.target.style.boxShadow = '0 0 0 4px red';
};

hands.forEach((hand) => {
  hand.addEventListener('click', handSelection);
});

const aiChoice = () => {
  const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;

  return `${aiHand}`;
};

const checkResult = (player, ai) => {
  if (player === ai) {
    gameSummery.draws++;
    document.querySelector('[data-summary="who-win"]').textContent = 'Draw';
    document.querySelector('[data-summary="who-win"]').style.color = 'black';
    return 'draw';
  } else if (
    (player === 'rock' && ai === 'scissors') ||
    (player === 'paper' && ai === 'rock') ||
    (player === 'scissors' && ai === 'paper')
  ) {
    document.querySelector('[data-summary="who-win"]').textContent =
      'You win !!!';
    document.querySelector('[data-summary="who-win"]').style.color = 'green';
    gameSummery.wins++;

    return 'win';
  } else {
    document.querySelector('[data-summary="who-win"]').textContent =
      'Computer win :(';
    document.querySelector('[data-summary="who-win"]').style.color = 'red';
    gameSummery.losses++;
    return 'loss';
  }
};

const publishResults = (player, ai) => {
  document.querySelector('.choices').style.display = 'block';
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
};

const startGame = () => {
  if (!game.playerHand) {
    return alert('Pick your hand :)');
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResults(game.playerHand, game.aiHand);

  document.querySelector('.points-player-result').textContent =
    gameSummery.wins;
  document.querySelector('.points-comp-result').textContent =
    gameSummery.losses;
  document.querySelector('.restart-game').style.display = 'block';
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    '';
};

document.querySelector('.start').addEventListener('click', startGame);

const restartGame = () => {
  gameSummery.draws = 0;
  gameSummery.losses = 0;
  gameSummery.wins = 0;
  game.aiHand = '';
  game.playerHand = '';
  document.querySelector('.restart-game').style.display = 'none';
  document.querySelector('.choices').style.display = 'none';

  document.querySelector('.points-player-result').textContent = '';
  document.querySelector('.points-comp-result').textContent = '';
};

document.querySelector('.restart-game').addEventListener('click', restartGame);
