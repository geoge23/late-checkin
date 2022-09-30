const totp = new jsOTP.totp(30, 8);

let lastGenerationTime = 0;
const loadBar = document.getElementById('bar');
const qrHolder = document.getElementById('holder');
const interval = setInterval(() => {
    //if last generation time was more than 30s ago, generate a new code
    if (Date.now() - lastGenerationTime > 30000) {
        const code = totp.getOtp('MXTFP7AU675MQJQZ');
        lastGenerationTime = Date.now()
        console.log(code)
        const qr = qrcode(4, 'M');
        qr.addData(`https://localhost:3000/?code=${code}`);
        qr.make();
        qrHolder.innerHTML = qr.createImgTag();
    }
    loadBar.style.width = `${(1 - (Date.now() - lastGenerationTime) / 30000) * 100}%`
}, 10);

