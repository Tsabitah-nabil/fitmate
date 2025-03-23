function hitungBMR(gender, umur, berat, tinggi) {
    if (gender === 'male') {
        return (10 * berat) + (6.25 * tinggi) - (5 * umur) + 5;
    } else {
        return (10 * berat) + (6.25 * tinggi) - (5 * umur) - 161;
    }
}

function handleLoad() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender'); // select
    const result = document.getElementById('result');

    function updateResult() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseFloat(ageInput.value);
        const gender = genderInput.value;
        if (isNaN(weight) || isNaN(height) || isNaN(age) || !gender) {
            result.textContent = '0.0';
            return;
        }
        const bmr = hitungBMR(gender, age, weight, height);
        result.textContent = bmr.toFixed(2);
    }

    weightInput.addEventListener('input', updateResult);
    heightInput.addEventListener('input', updateResult);
    ageInput.addEventListener('input', updateResult);
    genderInput.addEventListener('change', updateResult);
    updateResult();
}

document.addEventListener('DOMContentLoaded', handleLoad);