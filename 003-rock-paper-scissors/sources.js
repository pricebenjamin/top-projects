const start_button = document.querySelector("button");
start_button.addEventListener("click", main);

function main() {
    const choices = ["rock", "paper", "scissors"];
    greet_user();

    while (true) {
        const computer_choice = computer_pick_random_choice();
        const user_choice = get_user_choice();
        if (!user_choice) break;
        display_winner(computer_choice, user_choice);
    }

    function greet_user() {
        const msg = (
`Welcome!

To play, you must type your choice when prompted then press Enter.
The valid choices are: ${choices.join(", ")}

Note: spelling matters but capitalization will be ignored.`
        );
        console.log(msg);
    }

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

    function get_user_choice() {
        while (true) {
            const raw_input = prompt(`Your choice:`)

            if (raw_input === null)
                return undefined;

            const sanitized = raw_input.toLowerCase();

            // validate user input
            if (choices.includes(sanitized)) {
                return sanitized;
            } else {
                console.log(`Info: invalid choice: ${raw_input}`);
                console.log(`valid choices: ${choices.join(", ")}`);
            }
        }
    }
}
