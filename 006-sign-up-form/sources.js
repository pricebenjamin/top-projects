document.addEventListener('DOMContentLoaded', () => {
    const TOUCHED_CLASS = 'touched';
    const INVALID_CLASS = 'invalid';

    const form = document.querySelector('form');
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#password-confirm');
    const messageDiv = document.querySelector('#passwords-do-not-match');

    form.addEventListener('submit', (event) => {
        event.preventDefault();  // do not submit the form
        if (password.value === passwordConfirm.value) {
            const data = Object.fromEntries(new FormData(form));
            data.timestamp = Date.now();  // add some data that changes on every submission

            console.table(data);
            resetForm();
        }
    });

    document.addEventListener('focusout', (event) => {
        event.target.classList.add(TOUCHED_CLASS);
        displayPasswordMismatch();
    });

    password.addEventListener('input', displayPasswordMismatch);
    passwordConfirm.addEventListener('input', displayPasswordMismatch);

    function resetForm() {
        form.reset();
        document.querySelectorAll('input').forEach(
            (inputElement) => {
                inputElement.classList.remove(TOUCHED_CLASS);
                inputElement.classList.remove(INVALID_CLASS);
            }
        );
    }

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
