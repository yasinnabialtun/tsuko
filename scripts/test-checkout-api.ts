async function testCheckout() {
    const payload = {
        items: [{ id: 'cmk0h3iv2000ahtdgy7z130dp', quantity: 1 }],
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

    console.log('1. Getting Form Data from https://tsukodesign.com/api/checkout...');

    try {
        const response = await fetch('https://tsukodesign.com/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log('My API Status:', response.status);

        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse JSON:', text);
            return;
        }

        if (json.formData && json.url) {
            console.log('2. Success! Got form data. Now submitting to Shopier...');

            // Convert formData to URLSearchParams for form submission
            const formBody = new URLSearchParams();
            for (const key in json.formData) {
                formBody.append(key, json.formData[key]);
            }

            const shopierResponse = await fetch(json.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            });

            console.log('------------------------------------------------');
            console.log('SHOPIER RESPONSE STATUS:', shopierResponse.status);
            console.log('SHOPIER URL:', shopierResponse.url);

            const shopierText = await shopierResponse.text();
            if (shopierText.includes('Kurulumda bir hata oldu') || shopierText.includes('error=500')) {
                console.error('❌ FAILED: Shopier returned the installation error page.');
            } else if (shopierResponse.status === 200) {
                console.log('✅ SUCCESS: Shopier accepted the request and returned the payment page.');
                console.log('Page Title Snippet:', shopierText.match(/<title>(.*?)<\/title>/)?.[1]);
            } else {
                console.log('⚠️ Unknown Response.');
            }
            console.log('------------------------------------------------');

        } else {
            console.error('❌ Failed to get formData from local API:', json);
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testCheckout();
