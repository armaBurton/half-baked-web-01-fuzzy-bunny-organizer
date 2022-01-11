const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

// import { storeBunny } from './update/update.js';


const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function getFamilies() {
    // fetch all families and their bunnies
    const response = await client
        .from(`loving_families`)
        .select(`*, fuzzy_bunnies (*)`);

    return checkError(response);    
}

export async function deleteBunny(id) {
    // delete a single bunny using the id argument
    const response = await client
        .from(`fuzzy_bunnies`)
        .delete()
        .match({ id })
        .single();

    return checkError(response);    
}

export async function createBunny(bunny) {
    const response = await client
        .from(`fuzzy_bunnies`)
        .insert({
            ...bunny,
            user_id: client.auth.session().user.id
        });

    return checkError(response);    
}

export async function updateBunny(family_id, id){
    const response = await client
        .from(`fuzzy_bunnies`)
        .update({ 
            family_id
        })
        .match({ id });

    return checkError(response); 
}

export async function addNewFamily(name){
    const response = await client
        .from(`loving_families`)
        .insert({ 
            name,
        });

    return checkError(response);
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
