document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const filamentGrams = parseFloat(document.getElementById('filamentGrams').value);
        const filamentCost = parseFloat(document.getElementById('filamentCost').value);
        const printGrams = parseFloat(document.getElementById('printGrams').value);
        const profitPercentage = parseFloat(document.getElementById('profitPercentage').value);
        
        if (!filamentGrams || !filamentCost || !printGrams || isNaN(profitPercentage)) {
            document.getElementById('result').textContent = 'Please enter valid numbers for all fields.';
            return;
        }
        
        // Calculate cost per gram then final cost with profit markup
        const costPerGram = filamentCost / filamentGrams;
        const baseCost = costPerGram * printGrams;
        const totalCost = baseCost * (1 + profitPercentage / 100);
        
        document.getElementById('result').textContent = 'Cost: $' + totalCost.toFixed(2);
    });
});
