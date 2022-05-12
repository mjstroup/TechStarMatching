//receive from survey.html
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript

var first_name = document.getElementById('firstname');
var last_name = document.getElementById('lastname');

var q1_slider_value = document.getElementById('q1');
var q2_slider_value = document.getElementById('q2');
var q1_slider_value = document.getElementById('q3');
var q2_slider_value = document.getElementById('q4');
var q1_slider_value = document.getElementById('q5');
var q2_slider_value = document.getElementById('q6');



/*
code that can be used but this is really
more for my sanity than anything else
 
const names = [];

var name = first_name + last_name;

names[names.length] = name;

*/





//Store things in a Blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob
function extractData(blob_url) {
    const text = await blob_url.text();

}