// Function to load the translation data (from the JSON files)
async function loadTranslationData(language) {
    try {
        const response = await fetch(`translations/${language}.json`); // Fetch the JSON file
        if (!response.ok) {
            throw new Error(`Error loading translation data for language: ${language}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to load translation data:", error);
        throw error;
    }
}

// Function to translate the input text
async function translateText() {
    const textElement = document.getElementById('text');
    const text = textElement && textElement.value ? textElement.value.trim() : null;
    const resultElement = document.getElementById('result');
    const fantasyType = document.getElementById('fantasy-type').value;

    if (!text) {
        resultElement.innerHTML = "Please enter text.";
        return;
    }

    try {
        // Load translation data
        const translationData = await loadTranslationData(fantasyType);
        console.log("Loaded translation data:", translationData); // Debug: check if the data is loaded correctly

        let translatedText = text.toUpperCase(); // Convert input text to uppercase

        // Step 1: Replace combos
        const combos = Object.keys(translationData.combos || {}).sort((a, b) => b.length - a.length); // Sort combos by length
        combos.forEach(combo => {
            const regex = new RegExp(combo, 'g'); // Global match for the combo
            translatedText = translatedText.replace(regex, match => `{${translationData.combos[combo].toLowerCase()}}`); // Wrap in brackets
        });

        // Step 2: Replace single letters (ignore anything inside brackets)
        translatedText = translatedText.split('').map((char, index, arr) => {
            // Skip characters inside brackets
            if (char === '{' || arr.slice(index).join('').startsWith('{')) {
                return char; // Keep the bracket or skip the content inside
            }
            return translationData.letters && translationData.letters[char]
                ? translationData.letters[char].toLowerCase() // Translate and convert to lowercase
                : char; // Keep the character as is if no translation exists
        }).join('');

        // Step 3: Remove brackets from the final output
        translatedText = translatedText.replace(/{|}/g, '');

        // Display the final translated text
        resultElement.innerHTML = translatedText; // Output the translated text
    } catch (error) {
        resultElement.innerHTML = "Error loading translation data.";
        console.error("Translation Error:", error);
    }
}
