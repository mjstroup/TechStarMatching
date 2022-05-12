//User data (very important)
const userData = [
	[
		"Bickston",
		"Laenger",
		3,
		2,
		3,
		3,
		8,
		8,
		4,
		5,
		7,
		8,
		9,
		8,
		7,
		2,
		2,
		8,
		4,
		8,
		1,
		9,
	],
	[
		"Matthew",
		"Stroup",
		7,
		7,
		8,
		9,
		6,
		2,
		3,
		9,
		9,
		6,
		10,
		6,
		8,
		4,
		4,
		1,
		2,
		10,
		10,
		2,
	],
	[
		"Rosalee",
		"Ingmann",
		7,
		7,
		5,
		8,
		3,
		7,
		3,
		4,
		10,
		5,
		9,
		5,
		6,
		2,
		2,
		9,
		7,
		5,
		2,
		1,
	],
	[
		"Chidozie",
		"Nnaduruaku",
		7,
		2,
		5,
		6,
		7,
		9,
		3,
		3,
		5,
		7,
		3,
		5,
		5,
		1,
		3,
		1,
		1,
		1,
		5,
		5,
	],
	[
		"Freddy",
		"Guerrero",
		5,
		2,
		8,
		4,
		10,
		8,
		9,
		6,
		9,
		9,
		8,
		9,
		9,
		1,
		4,
		10,
		1,
		4,
		4,
		5,
	],
	[
		"Richard",
		"Luo",
		5,
		3,
		5,
		5,
		8,
		8,
		8,
		8,
		3,
		5,
		2,
		4,
		5,
		5,
		4,
		7,
		1,
		7,
		7,
		6,
	],
];
//example: [[matthew,stroup,3,6,1,2,6,8,2,1,10,2,5,3], [richard,luo,1,4,8,9,6,8,2,1,10,2,5,3]]

function printArr(arr) {
	let str = "";
	for (let item of arr) {
		if (Array.isArray(item)) str += printArr(item);
		else str += item + ", ";
	}
	console.log(str);
}

var similarity = [];

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
		if (userData[i][0] == undefined) {
			continue;
		}

		const row = [];

		//https://datascience.stackexchange.com/questions/27726/when-to-use-cosine-simlarity-over-euclidean-similarity
		//Fun fact: cosine similarity is roughly equivalent to Euclidean similarity for normalized data
		//Our data is all a scale of 1 to 10 so it's normalized and there is no difference between the 2 measurementss
		//However cosine similarity sounds cooler so I'm using it
		userData.forEach((element) => {
			element_data = [];
			user_data_temp = [];
			for (let temp = startIndex; temp < endIndex; temp++) {
				element_data.push(element[temp]);
				user_data_temp.push(userData[i][temp]);
			}

			row.push(cosineSimilarity(element_data, user_data_temp));
		});

		//For fun, if you want to use Euclidean similarity
		//userData.forEach(element => row.append(calculateEucSim(element.splice(startIndex, endIndex), userData[i].splice(startIndex, endIndex))));

		similarity.push(row);
	}

	return similarity;
}

/**
 * Calculates pair-wise similarities between all users
 * Returns a matrix of similarities
 * @param category
 * @param isAllCategories
 */
function calculateSimilarity() {
	//Format of data array is that first two elements are firstName lastName respectively

	//Calculate similarities
	const similarityAll = calculateSimilarityHelper(2, userData[0].length);
	const similarityPersonality = calculateSimilarityHelper(2, 7);
	const similarityHobby = calculateSimilarityHelper(7, 12);
	const similarityWork = calculateSimilarityHelper(12, 17);
	const similarityRandom = calculateSimilarityHelper(17, userData[0].length);

	//We can return an array of these arrays
	return [
		similarityAll,
		similarityPersonality,
		similarityHobby,
		similarityWork,
		similarityRandom,
	];
}

/**
 * Stolen code to find top 3 max
 * Helper for calculateMatches
 * Example: var indices = findIndicesOfMax(inputMatrix, 3);
 * @param inp matrix taken from
 * @param count number of top matches you want found
 */
function findIndicesOfMax(inp, count) {
	var outp = [];
	for (var i = 0; i < inp.length; i++) {
		outp.push(i); // add index to output array
		if (outp.length > count) {
			outp.sort(function (a, b) {
				return inp[b] - inp[a];
			}); // descending sort the output array
			outp.pop(); // remove the last index (index of smallest element in output array)
		}
	}
	return outp;
}

/**
takes in userIndex and the 3d similarity matrix and calculates top three
matches with given user in each category and overall
 * */
function calculateMatches(userIndex, simMatrix) {
	const matches = [];
	//I think this code works?
	//Correct me if I'm wrong
	//looks good to me, i was hoping there was an argmax function in JS like numpy has but apparently not :(
	for (let i = 0; i < simMatrix.length; i++) {
		matches.push(findIndicesOfMax(simMatrix[i][userIndex], 3));
	}
	return matches;
}

/** 
 This function gives the output that will be used in the results page.
 The format is a matrix with each row being (firstname, lastname, matchpercent)
 The first 3 rows are overall matches, next 3 are personality matches, and so on...
 * */
function outputInformation(data, matches, simMatrix, userIndex) {
	//to find names from given index do data[index][0] and data[index][1]
	//to find percent match from given index do simMatrix[x][userIndex][index]

	const output = [];
	//i is the current category
	for (let i = 0; i < 5; i++) {
		//j is the match number in that category
		for (let j = 0; j < 3; j++) {
			givenIndex = matches[i][j];
			//add first name, last name, match percent
			const matchInfo = [
				data[givenIndex][0],
				data[givenIndex][1],
				simMatrix[i][userIndex][givenIndex],
			];
			output.append(matchInfo);
		}
	}
	return output;
}

/**
 * Appends user data to global array
 * @param data is an array of data (e.g. [matthew, stroup, 3, 6, 1, 2, 3])
 */
function addUserData(data) {
	userData.push(data);

	similarity = calculateSimilarity();
	console.log("Similarity");
	printArr(similarity);
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

	var first_name = document.getElementById("firstname").value;
	var last_name = document.getElementById("lastname").value;

	//Change if we add more questions
	const NUM_QUESTIONS = 20;

	data = [first_name, last_name];
	for (let i = 1; i <= NUM_QUESTIONS; i++) {
		data.push(document.getElementById("q" + String(i)).value);
	}
	console.log("Data");
	console.log(data);

	addUserData(data);
	/**I think below is what we eventually want to do */
	//simMatrix=caldulateSimilarity()
	//matches=calculateMatches(userid, simMatrix)
	//return outputInformation(data, matches, simMatrix, userid)
}
