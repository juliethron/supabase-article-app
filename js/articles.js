const articleForm = document.getElementById('article-form');
const message = document.getElementById('message');
const logoutButton = document.getElementById('logout-button');

async function checkAuthentication() {
    const {
        data: { user }
    } = await window.supabaseClient.auth.getUser();

    if (!user) {
        window.location.href = 'login.html';
        return false;
    }

    return true;
}


// Protect the create article page
if (articleForm) {
    checkAuthentication();

    articleForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const isAuthenticated = await checkAuthentication();

        if (!isAuthenticated) {
            return;
        }

        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value.trim();
        const body = document.getElementById('body').value.trim();

        // Check that all fields have been filled in
        if (!title || !category || !body) {
            message.textContent = 'Please fill in all fields.';
            return;
        }

        message.textContent = 'Publishing article...';

        // Add the article to Supabase
        // submitted_by is automatically filled using auth.uid()
        const { error } = await window.supabaseClient
            .from('articles')
            .insert({
                title: title,
                body: body,
                category: category
            });

        if (error) {
            console.error(error);
            message.textContent = `Could not publish article: ${error.message}`;
            return;
        }

        message.textContent = 'Article published successfully!';

        articleForm.reset();
    });
}


// Log out
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const { error } = await window.supabaseClient.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            return;
        }

        window.location.href = 'index.html';
    });
}