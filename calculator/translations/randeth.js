const randethTranslation = {
    combos: {
        "AN": "SHU", "ED": "VY", "EE": "RG", "EN": "NINI", "ER": "NAPA",
        "ES": "UY", "FF": "HK", "HE": "DC", "ING": "WEF", "IN": "MOMO",
        "LL": "GH", "ND": "TEFA", "NE": "FRW", "NT": "FHS", "ON": "FHK",
        "OO": "MB", "OR": "SOCK", "RE": "WET", "SE": "FHS", "SS": "VNC",
        "ST": "RY", "TE": "HAHA", "TH": "BOGO", "TR": "NFG", "TO": "CN",
        "VE": "BIT"
    },
    letters: {
        "A": "VEH", "B": "SHE", "C": "MI", "D": "TI", "E": "TE", "F": "FI",
        "G": "SHI", "H": "FLI", "I": "FLU", "J": "FLE", "K": "CIN", "L": "TII",
        "M": "MA", "N": "ME", "O": "VO", "P": "LI", "Q": "WOO", "R": "SIT",
        "S": "UTA", "T": "MAS", "U": "GAN", "V": "KI", "W": "DE", "X": "SU",
        "Y": "KA", "Z": "POO"
    },
    applySuffixes(word) {
        if (word.endsWith("T")) word += "MAS";
        if (word.endsWith("E")) word += "TE";
        return word;
    }
};
