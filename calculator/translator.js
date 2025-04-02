function translateText() {
    const textElement = document.getElementById('text');
    const text = textElement && textElement.value ? textElement.value.trim() : null;
    let result = "";

    if (!text) {
        document.getElementById('result').innerHTML = "Please enter text.";
        return;
    }

    const fantasyType = document.getElementById('fantasy-type').value;
    if (fantasyType === "randeth") {
        result = translateToCustomLanguage(text, randethTranslation);
    } else {
        result = "This language is currently unavailable.";
    }

    document.getElementById('result').innerHTML = `Translation: ${result}`;
}

function translateToCustomLanguage(input, language) {
    const { combos, letters, applySuffixes } = language;

    // Convert input to uppercase
    input = input.toUpperCase();
    console.log("Input after converting to uppercase:", input);

    // Step 1: Replace priority combos first (EN, ND, VE)
    const priorityCombos = ["EN", "ND", "VE"];
    let comboReplaced = input;

    // Log the input before replacing priority combos
    console.log("Before priority combo replacements:", comboReplaced);

    // Replace priority combos first
    priorityCombos.forEach(combo => {
        const regex = new RegExp(combo, 'g');
        if (combos[combo]) {
            comboReplaced = comboReplaced.replace(regex, `{${combos[combo]}}`);
        }
    });

    // Log after replacing priority combos
    console.log("After priority combo replacements:", comboReplaced);

    // Step 2: Replace all other combos (non-priority) using the same process
    const sortedCombos = Object.entries(combos)
        .filter(([combo]) => !priorityCombos.includes(combo)) // Skip priority combos
        .sort((a, b) => b[0].length - a[0].length); // Sort by length (longest first)

    console.log("Combos to replace (sorted by length):", sortedCombos);

    // Replace the non-priority combos
    sortedCombos.forEach(([combo, replacement]) => {
        const regex = new RegExp(combo, 'g');
        comboReplaced = comboReplaced.replace(regex, `{${replacement}}`);
    });

    // Log after all combo replacements
    console.log("After all combo replacements:", comboReplaced);

    // Step 3: Replace single letters outside the marked brackets
    let finalResult = "";
    let insideCombo = false;

    console.log("Starting letter replacements...");

    for (let i = 0; i < comboReplaced.length; i++) {
        const char = comboReplaced[i];

        // Handle entering and exiting a combo
        if (char === "{") {
            insideCombo = true;
            finalResult += char;
        } else if (char === "}") {
            insideCombo = false;
            finalResult += char;
        } else if (!insideCombo && letters[char]) {
            finalResult += letters[char]; // Replace letter if it's outside of a combo
        } else {
            finalResult += char; // Add the character as is if it's not a letter to replace
        }
    }

    // Log after letter replacements
    console.log("After letter replacements:", finalResult);

    // Step 4: Clean up the {} markers that were used to mark combos
    finalResult = finalResult.replace(/{|}/g, "");
    console.log("After removing markers:", finalResult);

    // Step 5: Apply suffix rules if necessary
    finalResult = applySuffixes(finalResult);
    console.log("After applying suffixes:", finalResult);

    return finalResult;
}
