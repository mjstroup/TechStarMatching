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

/**
 * Calculates pair-wise similarities between all users
 * Returns a matrix of similarities
 */
function calculateSimilarity() {
    //Format of data array is that first two elements are firstName lastName respectively
    const names = userData.map(subarray => (subarray.splice(0, 2))); //Last index is non inclusive!
    const datas = userData.map(subarray => (subarray.splice(2)));

    //Similarity matrix
    const similarity = [];
    for (let i = 0; i < userData.length; i++) {
        const row = [];
        userData.forEach(element => row.append(calculateEucSim(userData[i].splice(2), userData[j].splice(2))));
        similarity.append(row);
    }

    return similarity;
}

//receive from survey.html
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
function getData() {
    var first_name = document.getElementById('firstname').value;
    var last_name = document.getElementById('lastname').value;

    data = [first_name, last_name];
    for(let i = 1; i <= 20; i++) {
        data.push(document.getElementById('q' + String(i)).value);
    }
    console.log(data);
    alert(data);

    //addUserData(data);
    alert(userData);
}




