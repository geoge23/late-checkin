const loadBar = document.getElementById('bar');
const qrHolder = document.getElementById('holder');

otplib.totp.options = { time: 30, digits: 6, encoding: 'ascii' };
let currentCode;

const interval = setInterval(() => {
    //if last generation time was more than 30s ago, generate a new code
    if (!otplib.totp.check(currentCode, 'LEMGUTJJNNDAIBJ7')) {
        const code = otplib.totp.generate('LEMGUTJJNNDAIBJ7');
        console.log(code, otplib.totp.allOptions())
        currentCode = code;
        const qr = qrcode(4, 'M');
        qr.addData(`https://localhost:3000/?code=${code}`);
        qr.make();
        qrHolder.innerHTML = qr.createImgTag();
    }
    loadBar.style.width = `${(otplib.totp.timeRemaining() / 30) * 100}%`
}, 10);

