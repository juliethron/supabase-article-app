async function loadArticles() {
    const articlesContainer = document.getElementById('articles');

    if (!articlesContainer) {
        return;
    }

    articlesContainer.innerHTML = '<p>Loading articles...</p>';

    const { data, error } = await window.supabaseClient
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error(error);

        articlesContainer.innerHTML =
            '<p>Could not load articles. Please try again later.</p>';

        return;
    }

    if (data.length === 0) {
        articlesContainer.innerHTML =
            '<p>No articles have been published yet.</p>';

        // Show 000 when there are no articles
        const articleCount =
            document.getElementById('system-article-count');

        if (articleCount) {
            articleCount.textContent = '000';
        }

        return;
    }

    articlesContainer.innerHTML = '';


    /* =========================
       Update article count
       ========================= */

    const articleCount =
        document.getElementById('system-article-count');

    if (articleCount) {
        articleCount.textContent =
            String(data.length).padStart(3, '0');
    }


    /* =========================
       Create article windows
       ========================= */

    data.forEach((article, index) => {

        const articleElement = document.createElement('article');
        articleElement.className = 'article-window';


        /* =========================
           Article window title bar
           ========================= */

        const articleBar = document.createElement('div');
        articleBar.className = 'article-window-bar';

        const articleName = document.createElement('span');
        articleName.className = 'article-window-name';

        articleName.textContent =
            `ARTICLE_${String(index + 1).padStart(3, '0')}.TXT`;

        const articleControls =
            document.createElement('div');

        articleControls.className =
            'article-window-controls';

        articleControls.innerHTML = `
            <span>_</span>
            <span>□</span>
            <span>×</span>
        `;

        articleBar.appendChild(articleName);
        articleBar.appendChild(articleControls);


        /* =========================
           Article content
           ========================= */

        const articleContent =
            document.createElement('div');

        articleContent.className =
            'article-window-content';


        const title =
            document.createElement('h2');

        title.textContent =
            article.title;


        const category =
            document.createElement('p');

        category.className =
            'article-category';

        category.textContent =
            `CATEGORY: ${article.category}`;


        const body =
            document.createElement('p');

        body.className =
            'article-body';

        body.textContent =
            article.body;


        const divider =
            document.createElement('div');

        divider.className =
            'article-divider';


        const date =
            document.createElement('small');

        date.className =
            'article-date';

        date.textContent =
            `Published: ${new Date(article.created_at).toLocaleDateString()}`;


        /* =========================
           Put everything together
           ========================= */

        articleContent.appendChild(title);
        articleContent.appendChild(category);
        articleContent.appendChild(body);
        articleContent.appendChild(divider);
        articleContent.appendChild(date);

        articleElement.appendChild(articleBar);
        articleElement.appendChild(articleContent);

        articlesContainer.appendChild(articleElement);
    });
}


/* =========================
   Navigation
   ========================= */

async function updateNavigation() {

    const loggedOutNav =
        document.getElementById('logged-out-nav');

    const loggedInNav =
        document.getElementById('logged-in-nav');


    const {
        data: { session }
    } = await window.supabaseClient.auth.getSession();


    /* =========================
       Update navigation
       ========================= */

    if (session) {

        loggedOutNav.hidden = true;
        loggedInNav.hidden = false;


        /* =========================
           Update system user status
           ========================= */

        const userStatus =
            document.getElementById('system-user-status');

        if (userStatus) {
            userStatus.textContent =
                'LOGGED IN';
        }

    } else {

        loggedOutNav.hidden = false;
        loggedInNav.hidden = true;


        /* =========================
           Update system user status
           ========================= */

        const userStatus =
            document.getElementById('system-user-status');

        if (userStatus) {
            userStatus.textContent =
                'GUEST';
        }
    }
}


/* =========================
   Log out
   ========================= */

const logoutButton =
    document.getElementById('logout-button');

if (logoutButton) {

    logoutButton.addEventListener(
        'click',
        async () => {

            const { error } =
                await window.supabaseClient.auth.signOut();

            if (error) {

                console.error(
                    'Logout error:',
                    error
                );

                return;
            }

            window.location.href =
                'index.html';
        }
    );
}


/* =========================
   Page initialization
   ========================= */

// Check login status when the page loads
updateNavigation();

// Load articles from Supabase
loadArticles();

// Update navigation when authentication state changes
window.supabaseClient.auth.onAuthStateChange(() => {
    updateNavigation();
});