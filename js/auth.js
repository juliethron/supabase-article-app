const message = document.getElementById('message');



const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email =
            document.getElementById('email').value.trim();

        const password =
            document.getElementById('password').value;

        const confirmPassword =
            document.getElementById('confirm-password').value;

        if (password.length < 8) {
            message.textContent =
                'Password must be at least 8 characters long.';
            return;
        }

        if (password !== confirmPassword) {
            message.textContent =
                'Passwords do not match.';
            return;
        }

        message.textContent =
            'Creating your account...';

        const { error } =
            await window.supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo:
                        `${window.location.origin}/supabase-article-app/login.html`
                }
            });

        if (error) {
            message.textContent = error.message;
            return;
        }

        message.textContent =
            'Account created! Please check your email to confirm your account.';
    });
}



const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email =
            document.getElementById('email').value.trim();

        const password =
            document.getElementById('password').value;

        message.textContent =
            'Logging in...';

        const { error } =
            await window.supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            message.textContent =
                error.message;
            return;
        }

        window.location.href =
            'index.html';
    });
}



const resetForm = document.getElementById('reset-form');

if (resetForm) {
    resetForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email =
            document.getElementById('email').value.trim();

        message.textContent =
            'Sending reset link...';

        const { error } =
            await window.supabaseClient.auth.resetPasswordForEmail(
                email,
                {
                    redirectTo:
                        `${window.location.origin}/supabase-article-app/update-password.html`
                }
            );

        if (error) {
            message.textContent =
                error.message;
            return;
        }

        message.textContent =
            'Password reset link sent! Please check your email.';
    });
}



const updatePasswordForm =
    document.getElementById('update-password-form');

if (updatePasswordForm) {
    updatePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const password =
            document.getElementById('password').value;

        const confirmPassword =
            document.getElementById('confirm-password').value;

        if (password.length < 8) {
            message.textContent =
                'Password must be at least 8 characters long.';
            return;
        }

        if (password !== confirmPassword) {
            message.textContent =
                'Passwords do not match.';
            return;
        }

        message.textContent =
            'Updating password...';

        const { error } =
            await window.supabaseClient.auth.updateUser({
                password: password
            });

        if (error) {
            message.textContent =
                error.message;
            return;
        }

        message.textContent =
            'Password updated successfully!';

        setTimeout(() => {
            window.location.href =
                'login.html';
        }, 1500);
    });
}



async function updateNavigation() {
    const loggedOutNav =
        document.getElementById('logged-out-nav');

    const loggedInNav =
        document.getElementById('logged-in-nav');

    const logoutButton =
        document.getElementById('logout-button');

    if (!loggedOutNav || !loggedInNav) {
        return;
    }

    const {
        data: { user }
    } = await window.supabaseClient.auth.getUser();

    if (user) {
        loggedOutNav.hidden = true;
        loggedInNav.hidden = false;
    } else {
        loggedOutNav.hidden = false;
        loggedInNav.hidden = true;
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            await window.supabaseClient.auth.signOut();

            window.location.href =
                'index.html';
        });
    }
}

updateNavigation();
