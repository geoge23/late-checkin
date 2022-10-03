<img src="https://user-images.githubusercontent.com/60108810/193490184-9ec7fb1d-3cda-4252-a04e-5e6d70ba7fa1.png" height="100">

# late-checkin
Commissioned project to generate un-tamperable digital late passes for use at Woodward Academy

The system uses a TOTP generator to create a rolling QR code, preventing users from re-using past QRs and thus requiring them to go to the check-in desk for a pass. This TOTP code is verified server-side and the user is supplied with an HMAC-signed cookie representing their pass.

## Screenshots
<img src="https://user-images.githubusercontent.com/60108810/193487935-05f21ad3-5bfc-41d7-a58c-a8cd218586c5.png" height="450" />
<p>
  <img src="https://user-images.githubusercontent.com/60108810/193488297-6b80324a-9a9a-4877-96ff-3e6863928577.png" height="400"/>
  <img src="https://user-images.githubusercontent.com/60108810/193488298-0c07151a-6725-403b-9060-c838a9073999.png" height="400"/>
</p>

## Example .env file
This app requires some environment variables to be set before it can run. Below is a sample .env file
```env
PERIOD=10
SECRET=KTIDPMJPVHPEY5TSFINNFCQTVEF34ZGO
```
Period defines the period (in seconds) that each token will be valid for

You can generate a secret at https://www.token2.com/site/page/totp-toolset (use the SEED box)

## Usage
If you'd like to use this tech in your school, please send me a message before implementing
