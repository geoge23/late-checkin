const loadBar = document.getElementById('bar');
const qrHolder = document.getElementById('holder');
const SECRET = 'LEMGUTJJNNDAIBJ7';

const totp = new OTPAuth.TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 10,
    secret: SECRET
});

let timeStep = 0;
const periodInMS = totp.period * 1000;

const interval = setInterval(() => {
    if (timeStep != getTimeStep()) {
        const code = totp.generate();
        console.log(code)
        makeQR(code);
        timeStep = getTimeStep()
    }
    loadBar.style.width = `${(1 - (Date.now() % periodInMS) / periodInMS) * 100}%`
}, 10);

function makeQR(code) {
    const qr = qrcode(4, 'M');
    qr.addData(`https://localhost:3000/?code=${code}`);
    qr.make();
    qrHolder.innerHTML = qr.createImgTag();
}

function getTimeStep() {
    return parseInt(Date.now() / periodInMS);
}
