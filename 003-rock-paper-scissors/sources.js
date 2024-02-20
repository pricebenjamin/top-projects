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
    display_winner(computer_choice, user_choice);

    function display_winner(computer_choice, user_choice) {
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

        console.log(`User chose ${user_choice}`);
        console.log(`Computer chose ${computer_choice}`);
        console.log(
            user_won === null ? "You tied!" :
            (user_won ? `You won! ${reason}` : `You lost! ${reason}`)
        );
    }

    function computer_pick_random_choice() {
        const random_idx = Math.floor(Math.random() * choices.length);
        return choices[random_idx];
    }
}
