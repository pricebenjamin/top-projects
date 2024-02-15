main();

function main() {
    const choices = ["rock", "paper", "scissors"];
    greet_user();

    // Begin game loop
        // Generate computer's choice
        // Begin user input loop
            // Get input from user
            // Sanitize input
            // Validate input
        // End user input loop
        // Determine outcome for this round
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
}
