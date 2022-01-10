import { 
    checkAuth, 
    addNewFamily, 
    logout
} from '../fetch-utils.js';

checkAuth();

const form = document.querySelector(`.family-form`);
const logoutButton = document.getElementById(`logout`);

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener(`submit`, async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    const getNewFamilyName = data.get(`family-name`);
    const newFamilyName = `the ${getNewFamilyName} family`;

    console.log(newFamilyName);
    form.reset();

    await addNewFamily(newFamilyName);
    window.location.href = `../families`;
});
