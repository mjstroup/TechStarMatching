Storage.prototype.setObj = function (key, obj) {
	return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
	return JSON.parse(this.getItem(key));
};
//User data (very important)
var userData;
var outputMatrix;
if (sessionStorage.getItem("userData") == null) {
	userData = [
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
} else {
	userData = sessionStorage.getObj("userData");
}
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
		//Please no bad data
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
	output = [];

	//i = category
	for (let i = 0; i < simMatrix.length; i++) {
		output.push(findIndicesOfMax(simMatrix[i][userIndex], 3));
	}

	return output;
}

/**
 * This function gives the output that will be used in the results page.
 * The format is a matrix with each row being (firstname, lastname, matchpercent)
 * The first 3 rows are overall matches, next 3 are personality matches, and so on...
 *
 * [1st match first name, 1st match last name, 1st match overall, 1st match personality, 1st match hobbies, 1st match work style, 1st match random.]
 * [2nd match first name, 2nd match last name, 2nd match overall, 2nd match personality, 2nd match hobbies, 2nd match work style, 2nd match random.]
 * [3rd match first name, 3rd match last name, 3rd match overall, 3rd match personality, 3rd match hobbies, 3rd match work style, 3rd match random.]
 *
 *
 *
 * [[1st match personality, 2nd match personality, 3rd match personality]
 * [1st match hobbies, 2nd match hobbies, 3rd match hobbies]
 *
 */
function outputInformation(data, matches, simMatrix, userIndex) {
	//to find names from given index do data[index][0] and data[index][1]
	//to find percent match from given index do simMatrix[x][userIndex][index]
	const output = [];

	//This gives you top matches for overall
	matches[0];

	//i represents the top i-th match
	for (let i = 0; i < 3; i++) {
		const row = [];
		const indexOverall = matches[0][i];
		row.push(data[indexOverall][0]);
		row.push(data[indexOverall][1]);
		row.push(simMatrix[0][userIndex][indexOverall]);

		const indexPersonality = matches[1][i];
		row.push(simMatrix[1][userIndex][indexPersonality]);

		const indexHobbies = matches[2][i];
		row.push(simMatrix[2][userIndex][indexHobbies]);

		const indexWork = matches[3][i];
		row.push(simMatrix[3][userIndex][indexWork]);

		const indexRandom = matches[4][i];
		row.push(simMatrix[4][userIndex][indexWork]);

		output.push(row);
	}

	return output;
}

/**
 * Appends user data to global array
 * @param data is an array of data (e.g. [matthew, stroup, 3, 6, 1, 2, 3])
 */
function addUserData(data) {
	userData.push(data);
	sessionStorage.setObj("userData", userData);
}

/**
 * receive from survey.html
 * https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
 *
 * Takes data from form on "Submit" button press
 * */

function getData() {
	//send to new webpage
	//window.location.href = "../html/results.html";

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

	if (
		first_name != undefined &&
		last_name != undefined &&
		first_name.length > 0 &&
		+last_name.length > 0
	) {
		addUserData(data);
	} else {
		return;
	}

	//the code below returns an output matrix that includes top matches for each user- do we need that?
	//otherwise we can just call return a call to outputInformation
	simMatrix = calculateSimilarity();

	outputMatrix = [];
	matches = calculateMatches(i, simMatrix);
	console.log("Matches");
	printArr(matches);

	outputMatrix.push(outputInformation(data, matches, simMatrix, i));

	sessionStorage.setObj("outputMatrix", outputMatrix);

	console.log("Output Matrix");
	printArr(outputMatrix);
}
