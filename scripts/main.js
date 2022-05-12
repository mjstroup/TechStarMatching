//User data (very important)
const userData = [
    [Bickston, Laenger, 3, 2, 3, 3, 8, 8, 4, 5, 7, 8, ], 
    [Matthew, Stroup, ], 
    [Rosalee, Ingmann, ], 
    [Chidozie, Nnaduruaku, ],
    [Freddy, Guerrero, 5],
    [Richard, Luo, 5, 3, 5, 5, 8, 8, 8, 8, 3, 5, 2, 4, 5, 5, 4, ]
];
//example: [[matthew,stroup,3,6,1,2,6,8,2,1,10,2,5,3], [richard,luo,1,4,8,9,6,8,2,1,10,2,5,3]]

/**
 * Appends user data to global array
 * @param data is an array of data (e.g. [matthew, stroup, 3, 6, 1, 2, 3])
 */
function addUserData(data) {
    userData.push(data);
}

/**
 * Calculates pair-wise similarities between all users
 * Returns a matrix of similarities
 * @param category 
 * @param isAllCategories 
 */
function calculateSimilarity() {
    //Format of data array is that first two elements are firstName lastName respectively
    const names = userData.map(subarray => (subarray.splice(0, 2))); //Last index is non inclusive!

    //Calculate similarities
    const similarityAll = calculateSimilarityHelper(2, names.length);
    const similarityPersonality = calculateSimilarityHelper(2, 7);
    const similarityHobby = calculateSimilarityHelper(7, 12);
    const similarityWork = calculateSimilarityHelper(12, 17);
    const similarityRandom = calculateSimilarityHelper(17, names.length);

    //We can return an array of these arrays
    return [similarityAll, similarityPersonality, similarityHobby, similarityWork, similarityRandom];
}

/**
 * Helper function for similarity calculations
 * startIndex and endIndex represent the data splices we want to calculate for
 * Ex: aggregate data is 2, names.length
 * Ex: work data is 12, 17
 */
function calculateSimilarityHelper(startIndex, endIndex) {
    //Similarity matrix
    const similarity = [];
    for (let i = 0; i < userData.length; i++) {
        const row = [];
        
        //https://datascience.stackexchange.com/questions/27726/when-to-use-cosine-simlarity-over-euclidean-similarity
        //Fun fact: cosine similarity is roughly equivalent to Euclidean similarity for normalized data
        //Our data is all a scale of 1 to 10 so it's normalized and there is no difference between the 2 measurementss
        //However cosine similarity sounds cooler so I'm using it
        userData.forEach(element => row.append(cosineSimilarity(element.splice(startIndex, endIndex), userData[i].splice(startIndex, endIndex))));

        //For fun, if you want to use Euclidean similarity
        //userData.forEach(element => row.append(calculateEucSim(element.splice(startIndex, endIndex), userData[i].splice(startIndex, endIndex))));

        similarity.append(row);
    }

    return similarity;
}

/**
 * Stolen code to find top 3 max
 * Example: var indices = findIndicesOfMax(inputMatrix, 3);
 * @param inp matrix taken from
 * @param count number of top matches you want found
 */
function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function (a, b) { return inp[b] - inp[a]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}


function calculateMatches(userIndex, simMatrix) {
    const matches = [];

    //Sample call
    matches.push((simMatrix[0][userIndex], 3));

    //first do overall matches
    const values = simMatrix[0][userIndex];
    const matchIndices= []
    for (var i = 0; i < values.length; i++){
        matchIndices.append(values.indexOf(Math.max(values)));
        
    }
    //find maximum three index values excluding userIndex (will be 1), put in 1d array []
    //append array to matches
    //then personality
    //index to simMatrix[1,userIndex]
    //then hobby
    //index to simMatrix[2,userIndex]
    //then work
    //index to simMatrix[3,userIndex]
    //then random
    //index to simMatrix[4,userIndex]
    //return matches
}


/**
 * receive from survey.html
 * https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
 * 
 * Takes data from form on "Submit" button press
 * */

function getData() {
    //send to new webpage
    window.location.href = "../html/results.html";
    var first_name = document.getElementById('firstname').value;
    var last_name = document.getElementById('lastname').value;

    //Change if we add more questions
    const NUM_QUESTIONS = 20;

    data = [first_name, last_name];
    for (let i = 1; i <= NUM_QUESTIONS; i++) {
        data.push(document.getElementById('q' + String(i)).value);
    }
    console.log(data);
    alert(data);

    addUserData(data);
    alert(userData);
}



