import { 
    updateBunny,
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const familyName = document.querySelector(`form select`);
const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let bunny = {};

export async function storeBunny(id){
    console.log(id);
}

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const x = document.getElementById(`family-id`);
    const val = x.options[x.selectedIndex].value;
    // const txt = x.options[x.selectedIndex].text;
    console.log(val);

    bunny.family_id = val;

    console.log(bunny);
    await updateBunny(bunny.family_id, bunny.id);

    form.reset();

    window.location.href = `../families`;
});

window.addEventListener(`load`, async() => {
    bunny = {
        id: urlParams.get(`id`),
        name: urlParams.get(`name`),
        user_id: urlParams.get(`user_id`),
        family_id: urlParams.get(`family_id`),
    };
    console.log(bunny);

    const families = await getFamilies();
    for (let each of families){
        const option = document.createElement(`option`);

        option.value = each.id;
        option.textContent = each.name;

        familyName.append(option);
    }

});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});