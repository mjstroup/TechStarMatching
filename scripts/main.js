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



/*
code that can be used but this is really
more for my sanity than anything else
 
const names = [];

var name = first_name + last_name;

names[names.length] = name;

*/





//Store things in a Blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob
function extractData(blob_url) {
    const text = await blob_url.text(); //Note this has to be async

}