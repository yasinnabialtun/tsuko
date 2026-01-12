


async function testCheckout() {
    const payload = {
        items: [{ id: 'cmk0h3imb0008htdgccuqczx7', quantity: 1 }],
        customer: {
            firstName: 'Test',
            lastName: 'Order',
            email: 'test@tsukodesign.com',
            phone: '05555555555',
            address: 'Test Mah. Test Sok. No:1',
            city: 'Istanbul',
            district: 'Besiktas',
            zipCode: '34000'
        }
    };

    console.log('Sending request to https://tsukodesign.com/api/checkout...');

    try {
        const response = await fetch('https://tsukodesign.com/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const status = response.status;
        const text = await response.text();

        console.log('Status:', status);
        console.log('Response Body:', text);

        try {
            const json = JSON.parse(text);
            if (json.url) {
                console.log('SUCCESS! Shopier URL received:', json.url);
            }
        } catch (e) {
            // ignore
        }

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testCheckout();
