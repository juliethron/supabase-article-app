const registerForm = document.getElementById('register-form');
const message = document.getElementById('message');

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match.';
            return;
        }

        message.textContent = 'Creating your account...';

        const { error } = await window.supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: `${window.location.origin}/login.html`
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

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        message.textContent = 'Logging in...';

        const { error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            message.textContent = error.message;
            return;
        }

        message.textContent = 'Login successful!';

        // We'll eventually send the user to the homepage.
        window.location.href = 'index.html';
    });
}

async function updateNavigation() {
    const {
        data: { user }
    } = await window.supabaseClient.auth.getUser();

    const loggedOutNav = document.getElementById('logged-out-nav');
    const loggedInNav = document.getElementById('logged-in-nav');
    const logoutButton = document.getElementById('logout-button');

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
            window.location.href = 'index.html';
        });
    }
}

updateNavigation();