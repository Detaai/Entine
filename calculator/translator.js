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

    // Step 1: Replace all combos and mark them with {}
    let comboReplaced = input;
    Object.entries(combos).forEach(([combo, replacement]) => {
        const regex = new RegExp(combo, 'g');
        // Wrap replacements in {}
        comboReplaced = comboReplaced.replace(regex, `{${replacement}}`);
    });
    console.log("After combo replacements:", comboReplaced);

    // Step 2: Replace single letters only outside the marked {} combos
    let finalResult = "";
    let insideCombo = false; // Flag to track whether we're inside a combo

    for (let i = 0; i < comboReplaced.length; i++) {
        const char = comboReplaced[i];

        if (char === "{") {
            insideCombo = true; // We're inside a combo replacement
            finalResult += char;
        } else if (char === "}") {
            insideCombo = false; // We're exiting the combo replacement
            finalResult += char;
        } else if (!insideCombo && letters[char]) {
            finalResult += letters[char]; // Replace letter if not inside a combo
        } else {
            finalResult += char; // Add original char if it's not a letter to replace
        }
    }

    // Step 3: Clean up the {} markers
    finalResult = finalResult.replace(/{|}/g, "");
    console.log("After letter replacements:", finalResult);

    // Step 4: Apply suffix rules if needed
    finalResult = applySuffixes(finalResult);
    console.log("After applying suffixes:", finalResult);

    return finalResult;
}
