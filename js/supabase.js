const SUPABASE_URL = 'https://ehiygojugxetwubhavrb.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_daTJQQrVxQ0Mgx-oAgbxJQ_j6zy5EO4';

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);