import { 
    checkAuth, 
    getFamilies,
    deleteBunny,
    logout,
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const familiesEl = document.querySelector('.families-container');

logoutButton.addEventListener('click', () => {
    logout();
});

export async function displayFamilies(families) {
    // fetch families from supabase
    // clear out the familiesEl
    familiesEl.textContent = ``;
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyEl = document.createElement(`div`);
        const familyName = document.createElement(`p`);
        const bunniesEl = document.createElement(`div`);

        familyEl.classList.add(`family`);
        bunniesEl.classList.add(`bunnies`);

        familyName.textContent = family.name;

        for (let bun of family.fuzzy_bunnies){
            const bunny = renderBunny(bun);

            bunniesEl.append(bunny);
        }

        familyEl.append(familyName, bunniesEl);
    
        familiesEl.append(familyEl);
    }
}

export function renderBunny(bun){
    const bunny = document.createElement(`p`);
    bunny.classList.add(`bunny`);
    bunny.textContent = bun.name;
    console.log(bun);
    bunny.addEventListener(`click`, async() => {
        window.location.href = `../update/index.html?id=${bun.id}&name=${bun.name}&family_id=${bun.family_id}&user_id=${bun.user_id}`;
        const families = await getFamilies();
        displayFamilies(families);
    });

    return bunny;
}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});