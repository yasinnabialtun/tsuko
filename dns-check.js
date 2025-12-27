
const dns = require('dns');

const domain = 'tsukodesign.com';

console.log(`Checking DNS records for: ${domain}...`);

// Check MX Records (Mail Exchange)
dns.resolveMx(domain, (err, addresses) => {
    if (err) {
        console.error('❌ MX Records Check Failed:', err.message);
    } else {
        console.log('✅ MX Records found:', addresses);
        const hasResend = addresses.some(a => a.exchange === 'feedback-smtp.us-east-1.amazonses.com' || a.exchange.includes('resend'));
        if (!hasResend) {
            console.warn('⚠️  Warning: Resend/Amazon SES MX record might be missing. Usually looks like "feedback-smtp..."');
        }
    }
});

// Check TXT Records (SPF, DKIM)
dns.resolveTxt(domain, (err, records) => {
    if (err) {
        console.error('❌ TXT Records Check Failed:', err.message);
    } else {
        console.log('✅ TXT Records found:');
        records.forEach(r => console.log('   -', r.join(' ')));

        const hasSpf = records.some(r => r.join('').includes('v=spf1'));
        if (!hasSpf) console.warn('⚠️  Warning: SPF record (v=spf1) is missing.');

        const hasResendDkim = records.some(r => r.join('').includes('resend'));
        if (!hasResendDkim) console.warn('⚠️  Warning: Resend DKIM record might be missing.');
    }
});
