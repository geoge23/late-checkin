const loadBar = document.getElementById('bar');
const qrHolder = document.getElementById('holder');
const SECRET = document.head.getAttribute('secret')
const PERIOD = document.head.getAttribute('period')

const totp = new OTPAuth.TOTP({
    algorithm: 'SHA1',
    digits: 8,
    period: PERIOD,
    secret: SECRET
});

let timeStep = 0;
const periodInMS = totp.period * 1000;

const interval = setInterval(() => {
    if (timeStep != getTimeStep()) {
        const code = totp.generate();
        makeQR(code);
        timeStep = getTimeStep()
    }
    loadBar.style.width = `${(1 - (Date.now() % periodInMS) / periodInMS) * 100}%`
}, 10);

function makeQR(code) {
    const qr = qrcode(4, 'M');
    qr.addData(`https://${window.location.host}/?code=${code}`);
    qr.make();
    qrHolder.innerHTML = qr.createImgTag();
}

function getTimeStep() {
    return parseInt(Date.now() / periodInMS);
}
