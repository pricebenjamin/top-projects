main();

function main() {
    const choices = ["rock", "paper", "scissors"];
    greet_user();

    // Begin game loop
        play_round();
    // End game loop

    function greet_user() {
        const msg = (
`Welcome!

To play, you must type your choice when prompted then press Enter.
The valid choices are: ${choices.join(", ")}

Note: spelling matters but capitalization will be ignored.`
        );
        console.log(msg);
    }

    function play_round() {
        const computer_choice = computer_pick_random_choice();
        const user_choice = get_user_choice();
        // TODO: Determine outcome for this round
        console.log(`Computer: ${computer_choice}`);
        console.log(`User: ${user_choice}`);
    }

    function computer_pick_random_choice() {
        const random_idx = Math.floor(Math.random() * choices.length);
        return choices[random_idx];
    }

    function get_user_choice() {
        while (true) {
            const raw_input = prompt(`Your choice:`)
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
