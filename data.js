const stateData = {
    states: [
        { name: 'Andhra Pradesh', domesticTariff: 6.95, publicChargingRate: 11.50 },
        { name: 'Arunachal Pradesh', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Assam', domesticTariff: 6.50, publicChargingRate: 11.00 },
        { name: 'Bihar', domesticTariff: 6.95, publicChargingRate: 11.50 },
        { name: 'Chhattisgarh', domesticTariff: 6.50, publicChargingRate: 11.00 },
        { name: 'Goa', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Gujarat', domesticTariff: 6.70, publicChargingRate: 11.25 },
        { name: 'Haryana', domesticTariff: 6.75, publicChargingRate: 11.30 },
        { name: 'Himachal Pradesh', domesticTariff: 5.00, publicChargingRate: 9.50 },
        { name: 'Jharkhand', domesticTariff: 6.25, publicChargingRate: 11.00 },
        { name: 'Karnataka', domesticTariff: 7.00, publicChargingRate: 11.75 },
        { name: 'Kerala', domesticTariff: 6.80, publicChargingRate: 11.40 },
        { name: 'Madhya Pradesh', domesticTariff: 7.00, publicChargingRate: 11.75 },
        { name: 'Maharashtra', domesticTariff: 7.20, publicChargingRate: 12.00 },
        { name: 'Manipur', domesticTariff: 5.90, publicChargingRate: 10.50 },
        { name: 'Meghalaya', domesticTariff: 5.75, publicChargingRate: 10.25 },
        { name: 'Mizoram', domesticTariff: 5.80, publicChargingRate: 10.30 },
        { name: 'Nagaland', domesticTariff: 5.85, publicChargingRate: 10.35 },
        { name: 'Odisha', domesticTariff: 6.20, publicChargingRate: 10.80 },
        { name: 'Punjab', domesticTariff: 7.00, publicChargingRate: 11.75 },
        { name: 'Rajasthan', domesticTariff: 7.10, publicChargingRate: 11.85 },
        { name: 'Sikkim', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Tamil Nadu', domesticTariff: 6.60, publicChargingRate: 11.20 },
        { name: 'Telangana', domesticTariff: 6.90, publicChargingRate: 11.45 },
        { name: 'Tripura', domesticTariff: 5.80, publicChargingRate: 10.30 },
        { name: 'Uttar Pradesh', domesticTariff: 7.00, publicChargingRate: 11.75 },
        { name: 'Uttarakhand', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'West Bengal', domesticTariff: 6.75, publicChargingRate: 11.30 },
        
        // Union Territories
        { name: 'Andaman and Nicobar Islands', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Chandigarh', domesticTariff: 6.20, publicChargingRate: 10.80 },
        { name: 'Dadra and Nagar Haveli and Daman and Diu', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Delhi', domesticTariff: 7.75, publicChargingRate: 12.50 },
        { name: 'Jammu and Kashmir', domesticTariff: 6.30, publicChargingRate: 11.00 },
        { name: 'Ladakh', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Lakshadweep', domesticTariff: 5.50, publicChargingRate: 10.00 },
        { name: 'Puducherry', domesticTariff: 6.10, publicChargingRate: 10.70 }
    ],
    fuelPrices: {
        petrol: {
            'Delhi': 96.72,
            'Mumbai': 106.31,
            'Chennai': 102.63,
            'Kolkata': 106.03,
            // Default price if state not found
            'default': 100.00
        },
        diesel: {
            'Delhi': 89.62,
            'Mumbai': 94.27,
            'Chennai': 94.24,
            'Kolkata': 92.76,
            // Default price if state not found
            'default': 90.00
        }
    }
}; 