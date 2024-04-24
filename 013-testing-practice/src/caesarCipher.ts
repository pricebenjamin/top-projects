const alphabet = "abcdefghijklmnopqrstuvwxyz";
const lowercaseLetters = alphabet.split("");
const uppercaseLetters = alphabet.toUpperCase().split("");

const indexOfLetter = new Map<string, number>();

for (const [idx, letter] of lowercaseLetters.entries()) {
  indexOfLetter.set(letter, idx);
}

for (const [idx, letter] of uppercaseLetters.entries()) {
  indexOfLetter.set(letter, idx);
}

export function caesarCipher(msg: string, shift: number) {
  const cipher: string[] = [];

  for (const letter of msg) {
    if (!indexOfLetter.has(letter)) {
      cipher.push(letter);
      continue;
    }

    let shiftedIndex = (indexOfLetter.get(letter)! + shift) % alphabet.length;

    if (shiftedIndex < 0) {
      shiftedIndex += alphabet.length;
    }

    const letters = isLowerCase(letter) ? lowercaseLetters : uppercaseLetters;

    cipher.push(letters[shiftedIndex]);
  }

  return cipher.join("");
}

function isLowerCase(letter: string) {
  return letter >= "a" && letter <= "z";
}
