document.addEventListener('DOMContentLoaded', () => {
    const TOUCHED_CLASS = 'touched';
    const INVALID_CLASS = 'invalid';

    const form = document.querySelector('form');
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#password-confirm');
    const messageDiv = document.querySelector('#passwords-do-not-match');

    form.addEventListener('submit', (event) => {
        if (password.value !== passwordConfirm.value) {
            event.preventDefault();
        }
    });

    document.addEventListener('focusout', (event) => {
        event.target.classList.add(TOUCHED_CLASS);
        displayPasswordMismatch();
    });

    password.addEventListener('input', displayPasswordMismatch);
    passwordConfirm.addEventListener('input', displayPasswordMismatch);

    function displayPasswordMismatch() {
        if (
            password.classList.contains(TOUCHED_CLASS)
            && passwordConfirm.classList.contains(TOUCHED_CLASS)
        ) {
            if (password.value !== passwordConfirm.value) {
                messageDiv.textContent = "* Passwords do not match";
                password.classList.add(INVALID_CLASS);
                passwordConfirm.classList.add(INVALID_CLASS);
            } else {
                messageDiv.textContent = "";
                password.classList.remove(INVALID_CLASS);
                passwordConfirm.classList.remove(INVALID_CLASS);
            }
        }
    }
});
