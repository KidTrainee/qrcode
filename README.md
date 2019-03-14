# QR Code Reader and Generator

[![Build Status](https://app.bitrise.io/app/f1d145ef19337c8a/status.svg?token=1ixKk28nzlq9R_E-Pb5uXw&branch=master)](https://app.bitrise.io/app/f1d145ef19337c8a)
[![codecov](https://codecov.io/gh/insiderdev/qrcode/branch/master/graph/badge.svg)](https://codecov.io/gh/insiderdev/qrcode)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/498cd80cad28425dad44c1fbc63243a1)](https://www.codacy.com/app/sdgaykov/qrcode?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=insiderdev/qrcode&amp;utm_campaign=Badge_Grade)

Cross-platform mobile app for Android and iOS written with React Native.

![Big Beautiful Picture](https://i.imgur.com/PKMCXY0.png)

<a target="_blank" href='https://play.google.com/store/apps/details?id=io.insider.apps.qr'><img width="200" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
<a target="_blank" href='https://itunes.apple.com/us/app/id1445350234'><img width="200" alt='Download on App Store' src='https://i.imgur.com/7IxtMV0.png'/></a>

# Features

QR Code Reader and Generator is a React Native application for both Android and iOS that allows you to scan any type of QR Code (Barcode included), with various types of data, such as contact information, wifi passwords, calendar events and much more. After scanning, you can easily perform action with scanned data: make a call, save calendar event, etc. And also, you can generate all this code types.

A few features:
- Act straight after scanning QR Code: 
- Make a call after scanning telephone number.
- Send SMS or email.
- Open link in the browser.
- Open maps application after scanning geocode.
- Add events to calendar right after scanning.
- Add a new contact after scanning a business card QR code.
- Unlimited storage for scan history.
- Generate any type of code: text, URL, email, phone number, SMS, contact, event and more.
- Customize created codes. Change background and foreground color.
- Share or save the generated codes.
- Batch scanning for scanning without interruptions.
- Flashlight supported for low-light environments.

# Tech Stuff Inside

- [React Native](https://facebook.github.io/react-native/) to build an app for both Android and iOS
- [Redux](https://redux.js.org/) and [Redux thunk](https://github.com/reduxjs/redux-thunk) for state management
- Modular architecture inspired by [this kit](https://github.com/futurice/pepperoni-app-kit)
- [Recompose](https://github.com/acdlite/recompose) to keep component-container structure
- ESlint with [airbnb config](https://github.com/airbnb/javascript) to keep the code clean
- [Detox](https://github.com/wix/Detox) for e2e testing

# Try it yourself

## 1. Clone and Install
```bash
# Clone the repo
git clone https://github.com/gaykov/minimal-quotes.git

# Install dependencies
yarn install
```

## 2. Run it on iOS or Android
```bash
# Run on iOS
yarn run:ios

# Run on Android
yarn run:android
```

# How can you help
If you find any problems, feature requests, please open an issue or submit a fix as a pull request.

# Want to talk?
If you have any questions or you want us to help you design and develop your application, send us an email at [hi@insider.io](mailto:hi@insider.io)

# License

[MIT License](LICENSE)
