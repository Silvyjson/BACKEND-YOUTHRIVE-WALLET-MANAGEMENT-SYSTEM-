let generatedNumbers = new Set();

const generateAccountNumber = () => {
    while (true) {
        const randomNumber = Math.floor(Math.random() * 1000000000);

        const uniqueNumber = '2' + randomNumber.toString().padStart(9, '0');

        if (!generatedNumbers.has(uniqueNumber)) {
            generatedNumbers.add(uniqueNumber);
            return uniqueNumber;
        }
    }
}

module.exports = generateAccountNumber;
