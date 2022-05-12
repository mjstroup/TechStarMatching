/**
 * Calculates Euclidean similarity between 2 vectors
 * USE THIS FOR NUMERICAL INPUTS
 * Returns a similarity (float between 0 and 1)
 */
 function calculateEucSim(a, b) {
    return 1 / (1 + euclideanDistance(a, b)); //This is the most common statistical representation of Euclidean Similarity
}

/**
 * Calculate Euclidean Distance between 2 vectors
 * USE THIS FOR NUMERICAL INPUTS
 * Returns a raw distance
 * Example input: let euc = euclideanDistance([1,2,5,6,4.6], [4,6,33,45,2.5]);
 */
 function euclideanDistance(a, b) {
    return a
        .map((x, i) => Math.abs(x - b[i]) ** 2) // Square the difference
        .reduce((sum, now) => sum + now) // Sum
        ** (1 / 2)
}

/**
 * Literally count the number of times a word appears
 */
function wordCountMap(str) {
    let words = str.split(' ');
    let wordCount = {};
    words.forEach((w) => {
        wordCount[w] = (wordCount[w] || 0) + 1;
    });
    return wordCount;
}

/**
 * Add words to a dictionary
 */
function addWordsToDictionary(wordCountmap, dict) {
    for (let key in wordCountmap) {
        dict[key] = true;
    }
}

/**
 * Convert to Vector
 * What is a vector: https://machinelearningmastery.com/gentle-introduction-vectors-machine-learning
 */
function wordMapToVector(map, dict) {
    let wordCountVector = [];
    for (let term in dict) {
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;
}

/**
 * Calculate the Cartesian dot product between the two vectors
 */
function dotProduct(vecA, vecB) {
    let product = 0;
    for (let i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
}

/**
 * Calculate magnitude of vector
 */
function magnitude(vec) {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

/**
 * Calculate cosine similarity between the two vectors
 */
function cosineSimilarity(vecA, vecB) {
    return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

/**
 * Creates a word mapping and dictionary for the two texts, then calculates cosine similarity
 * Returns a decimal number between 0 and 1.0 representing percentage
 */
function textCosineSimilarity(txtA, txtB) {
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA, dict);
    addWordsToDictionary(wordCountB, dict);
    const vectorA = wordMapToVector(wordCountA, dict);
    const vectorB = wordMapToVector(wordCountB, dict);
    return cosineSimilarity(vectorA, vectorB);
}

/**
 * Converts decimal to percentage
 */
function getSimilarityScore(val) {
    return Math.round(val * 100)
}

/**
 * Checks similarity between two strings
 * Uses cosine similarity
 */
function checkCosineSimilarity(text1, text2) {
    const similarity = getSimilarityScore(textCosineSimilarity(text1, text2));
    console.log(similarity)
}