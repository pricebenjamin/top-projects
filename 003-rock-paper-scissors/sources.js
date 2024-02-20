const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (e) => {
    if (!e.target.id) return;
    play_round(e.target.id);
});

function play_round(user_choice) {
    const choices = ["rock", "paper", "scissors"];

    if (!choices.includes(user_choice)) {
        console.log(`info: invalid choice: '${user_choice}'`);
        return;
    }

    const computer_choice = computer_pick_random_choice();
    const [user_win, reason] = determine_outcome(computer_choice, user_choice);
    display_outcome(user_win, reason);

    function determine_outcome(computer_choice, user_choice) {
        const user_choice_idx = choices.findIndex(x => x === user_choice);
        const computer_choice_idx = choices.findIndex(x => x === computer_choice);

        // To determine if the user won, we lookup the result from this matrix.
        // note: null => tied game

        const user_win_matrix = [
            // computer choice:
            // [ rock, paper, scissors]
            [    null, false,  true   ], // user choice: rock
            [    true,  null, false   ], // user choice: paper
            [   false,  true,  null   ], // user choice: scissors
        ];
        const user_won = user_win_matrix[user_choice_idx][computer_choice_idx];

        // Win or lose, the reason can stay the same.
        const win_or_loss_reason = {
            1: "Paper covers rock!",
            2: "Rock breaks scissors!",
            3: "Scissors cuts paper!",
        }
        const reason = win_or_loss_reason[user_choice_idx + computer_choice_idx];
        // note: reason will be 'undefined' for ties

        return [user_won, reason];
    }

    function computer_pick_random_choice() {
        const random_idx = Math.floor(Math.random() * choices.length);
        return choices[random_idx];
    }

    function display_outcome(outcome, reason) {
        const outcome_msg = (
            outcome === null ? `You tied!` :
            outcome ? `You won! ${reason}` : `You lost! ${reason}`
        );
        console.log(outcome_msg);
    }
}
