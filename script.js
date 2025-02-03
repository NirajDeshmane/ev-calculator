// Add this at the beginning of script.js
(function() {
    function preventDevTools() {
        const devtools = {
            isOpen: false,
            orientation: undefined
        };

        const threshold = 160;

        const emitEvent = (isOpen, orientation) => {
            window.dispatchEvent(new CustomEvent('devtoolschange', {
                detail: {
                    isOpen,
                    orientation
                }
            }));
        };

        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            const orientation = widthThreshold ? 'vertical' : 'horizontal';

            if (
                !(heightThreshold && widthThreshold) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
            ) {
                if (!devtools.isOpen || devtools.orientation !== orientation) {
                    emitEvent(true, orientation);
                }
                devtools.isOpen = true;
                devtools.orientation = orientation;
            } else {
                if (devtools.isOpen) {
                    emitEvent(false, undefined);
                }
                devtools.isOpen = false;
                devtools.orientation = undefined;
            }
        }, 500);

        if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
        }
    }

    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (
            // Disable F12
            e.keyCode === 123 || 
            // Disable Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
            // Disable Ctrl+Shift+J
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
            // Disable Ctrl+U
            (e.ctrlKey && e.keyCode === 85)
        ) {
            e.preventDefault();
        }
    });

    preventDevTools();
})();

// Populate states when the page loads
window.onload = function() {
    const stateSelect = document.getElementById('state');
    
    // Clear existing options except the first one
    stateSelect.innerHTML = '<option value="">Select State</option>';
    
    // Add all states from the data
    stateData.states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.name;
        option.textContent = state.name;
        stateSelect.appendChild(option);
    });

    // Set default values for charging percentages
    document.getElementById('homeChargePercentage').value = "80";
    document.getElementById('publicChargePercentage').value = "20";

    // Add event listeners for charging percentage updates
    const homeChargeInput = document.getElementById('homeChargePercentage');
    const publicChargeInput = document.getElementById('publicChargePercentage');

    homeChargeInput.addEventListener('input', function() {
        const homeValue = parseFloat(this.value) || 0;
        publicChargeInput.value = Math.max(0, 100 - homeValue);
    });

    publicChargeInput.addEventListener('input', function() {
        const publicValue = parseFloat(this.value) || 0;
        homeChargeInput.value = Math.max(0, 100 - publicValue);
    });

    // Add event listeners for journey distance calculation
    const journeyDistanceInput = document.getElementById('journeyDistance');
    const journeyFrequencySelect = document.getElementById('journeyFrequency');
    const annualJourneyDistanceInput = document.getElementById('annualJourneyDistance');

    function calculateAnnualDistance() {
        const distance = parseFloat(journeyDistanceInput.value) || 0;
        const frequency = journeyFrequencySelect.value;
        let multiplier = 0;

        switch(frequency) {
            case 'daily':
                multiplier = 365;
                break;
            case 'weekly':
                multiplier = 52;
                break;
            case 'monthly':
                multiplier = 12;
                break;
        }

        const annualDistance = distance * multiplier;
        annualJourneyDistanceInput.value = annualDistance;
    }

    journeyDistanceInput.addEventListener('input', calculateAnnualDistance);
    journeyFrequencySelect.addEventListener('change', calculateAnnualDistance);
};

function calculateCosts() {
    // Validate form
    const form = document.getElementById('calculatorForm');
    if (!form.checkValidity()) {
        alert('Please fill all required fields correctly');
        return;
    }

    // Get all input values
    const journeyDistance = parseFloat(document.getElementById('journeyDistance').value);
    const batteryCapacity = parseFloat(document.getElementById('batteryCapacity').value);
    const evRange = parseFloat(document.getElementById('evRange').value);
    const domesticTariff = parseFloat(document.getElementById('domesticTariff').value);
    const publicChargingCost = parseFloat(document.getElementById('publicChargingCost').value);
    const homeChargePercentage = parseFloat(document.getElementById('homeChargePercentage').value) / 100;
    const publicChargePercentage = parseFloat(document.getElementById('publicChargePercentage').value) / 100;
    const conventionalMileage = parseFloat(document.getElementById('conventionalMileage').value);
    const fuelType = document.getElementById('comparingVehicle').value;
    const frequency = document.getElementById('journeyFrequency').value;

    // Calculate EV costs
    const energyPerKm = batteryCapacity / evRange;
    const totalEnergy = journeyDistance * energyPerKm;
    const homeChargingCost = totalEnergy * homeChargePercentage * domesticTariff;
    const publicChargingCostTotal = totalEnergy * publicChargePercentage * publicChargingCost;
    const totalEvCost = homeChargingCost + publicChargingCostTotal;
    const evCostPerKm = totalEvCost / journeyDistance;

    // Calculate conventional vehicle costs
    const selectedState = document.getElementById('state').value;
    const fuelPrice = stateData.fuelPrices[fuelType][selectedState] || stateData.fuelPrices[fuelType]['default'];
    const fuelRequired = journeyDistance / conventionalMileage;
    const totalConventionalCost = fuelRequired * fuelPrice;
    const conventionalCostPerKm = totalConventionalCost / journeyDistance;

    // Calculate annual costs based on frequency
    const tripsPerYear = frequency === 'daily' ? 365 : frequency === 'weekly' ? 52 : 12;
    const annualEvCost = totalEvCost * tripsPerYear;
    const annualConventionalCost = totalConventionalCost * tripsPerYear;
    const annualSavings = annualConventionalCost - annualEvCost;

    displayResults({
        journeyCosts: {
            ev: totalEvCost,
            conventional: totalConventionalCost
        },
        costPerKm: {
            ev: evCostPerKm,
            conventional: conventionalCostPerKm
        },
        annualCosts: {
            ev: annualEvCost,
            conventional: annualConventionalCost
        },
        savings: {
            perJourney: totalConventionalCost - totalEvCost,
            annual: annualSavings
        }
    });
}

function displayResults(results) {
    const resultDiv = document.getElementById('result');
    const evCostsDiv = document.getElementById('evCosts');
    const iceCostsDiv = document.getElementById('iceCosts');
    const savingsSummaryDiv = document.getElementById('savingsSummary');

    evCostsDiv.innerHTML = `
        <div class="cost-item">
            <span>Journey Fuel Cost:</span>
            <span>₹${results.journeyCosts.ev.toFixed(2)}</span>
        </div>
        <div class="cost-item">
            <span>Cost per km:</span>
            <span>₹${results.costPerKm.ev.toFixed(2)}</span>
        </div>
        <div class="cost-item total-cost">
            <span>Annual Fuel Costs:</span>
            <span>₹${results.annualCosts.ev.toFixed(2)}</span>
        </div>
    `;

    iceCostsDiv.innerHTML = `
        <div class="cost-item">
            <span>Journey Fuel Cost:</span>
            <span>₹${results.journeyCosts.conventional.toFixed(2)}</span>
        </div>
        <div class="cost-item">
            <span>Cost per km:</span>
            <span>₹${results.costPerKm.conventional.toFixed(2)}</span>
        </div>
        <div class="cost-item total-cost">
            <span>Annual Fuel Costs:</span>
            <span>₹${results.annualCosts.conventional.toFixed(2)}</span>
        </div>
    `;

    savingsSummaryDiv.innerHTML = `
        <h5>How much will I save?</h5>
        <p>The cost savings will be ₹${results.savings.perJourney.toFixed(2)}. 
        The total annual cost savings will be approximately 
        ₹${results.savings.annual.toFixed(2)} by switching to an electric vehicle instead of a 
        conventional vehicle.</p>
    `;

    resultDiv.classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on iOS when focusing inputs
    const metas = document.getElementsByTagName('meta');
    let viewportFound = false;
    
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].name === "viewport") {
            viewportFound = true;
            break;
        }
    }

    if (!viewportFound) {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1, maximum-scale=1";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Add loading state to button
    const calculateButton = document.querySelector('button[onclick="calculateCosts()"]');
    calculateButton.addEventListener('click', function() {
        this.classList.add('btn-loading');
        setTimeout(() => {
            this.classList.remove('btn-loading');
        }, 1000);
    });

    // Smooth scroll to results
    function scrollToResults() {
        const resultDiv = document.getElementById('result');
        if (!resultDiv.classList.contains('d-none')) {
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Add scroll to original calculate function
    const originalCalculate = window.calculateCosts;
    window.calculateCosts = function() {
        originalCalculate();
        setTimeout(scrollToResults, 100);
    };
}); 