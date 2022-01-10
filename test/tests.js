// import './example.test.js';
// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderBunny } from '../fetch-utils.js';

// const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';
// const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const test = QUnit.test;

test('time to test a function', (expect) => {

    const bunny = {
        name: 'doof',
        family_id: 3
    }
    //Arrange
    // Set up your arguments and expectations
    const expected = '<p class="bunny">doof</p>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderBunny(bunny);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});