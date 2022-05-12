//User data (very important)
const userData = [];
//example: [[matthew,stroup,3,6,1,2,6,8,2,1,10,2,5,3], [richard,luo,1,4,8,9,6,8,2,1,10,2,5,3]]

/**
 * Appends data to array
 * Data is an array of data (e.g. [matthew, stroup, 3, 6, 1, 2, 3])
 */
function addUserData(data) {
    userData.push(data);
}

function calculateSimilarity() {
    //Format of data array is that first two elements are firstName lastName respectively
    const names = userData.map(subarray => (subarray.splice(0, 2))); //Last index is non inclusive!
    const datas = userData.map(subarray => (subarray.splice(2)));
    
    //Similarity matrix
    similarity = []
    for(let i = 0; i < userData.length; i++) {
        for(let j = 0; j < userData.length; j++) {
            


        }
    }

    
}

//receive from survey.html
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript

var first_name = document.getElementById('firstname');
var last_name = document.getElementById('lastname');

var q1_slider_value = document.getElementById('q1');
var q2_slider_value = document.getElementById('q2');
var q3_slider_value = document.getElementById('q3');
var q4_slider_value = document.getElementById('q4');
var q5_slider_value = document.getElementById('q5');
var q6_slider_value = document.getElementById('q6');
var q7_slider_value = document.getElementById('q7');
var q8_slider_value = document.getElementById('q8');
var q9_slider_value = document.getElementById('q9');
var q10_slider_value = document.getElementById('q10');
var q11_slider_value = document.getElementById('q11');
var q12_slider_value = document.getElementById('q12');
var q13_slider_value = document.getElementById('q13');
var q14_slider_value = document.getElementById('q14');
var q15_slider_value = document.getElementById('q15');



/*
code that can be used but this is really
more for my sanity than anything else
 
const names = [];

var name = first_name + last_name;

names[names.length] = name;

*/




