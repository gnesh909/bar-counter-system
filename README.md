# Bar Counter System

An all-in-one counter app for a bar: customer tabs, orders, stock and sales reports. It runs in Chrome on an Android tablet and installs like a normal app.

## Install on the tablet

1. Open the app's GitHub Pages address in **Chrome** on the tablet.
2. Tap the **⋮** menu, then **Add to Home screen** (or **Install app**).
3. Open it from the home screen icon. After the first visit it works without internet.

## Where the data lives

Everything (menu, stock, open customers, sales) is saved **on the tablet only**, inside Chrome's storage for this app. Nothing is sent anywhere.

- **Back up weekly:** Setup → **Download backup**. Keep the file somewhere off the tablet (Google Drive, email, WhatsApp to yourself).
- **Restore:** Setup → **Restore from backup** and pick the file. This replaces what's on the device.
- Clearing Chrome's site data, or uninstalling Chrome, deletes the app's data. Restore from a backup if that happens.

## Printing

**Print receipt**, **Print bill** and **Save and print** (day closing) open Android's print screen with an 80 mm-style receipt. Pick your printer there. Most Bluetooth or Wi-Fi receipt printers need their maker's print service app installed first.

## Features

- Customers first: add a name or table, then add drinks and food inside that customer
- Quick keys (pinned items and best sellers), doubles, happy hour pricing by time and day
- Split, move or merge bills; reopen or void a closed bill
- Stock by unit or by bottle (pours per bottle), low-stock warnings, restock
- Service charge, SST, cash rounding to 5 sen
- Reports: takings, best sellers, payment methods, end-of-day cash closing
- Optional test data you can load and remove in one tap (Setup)

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | Name and icons for installing |
| `sw.js` | Offline support |
| `icon-192.png`, `icon-512.png` | App icons |

To update the app, change `index.html` and raise `VERSION` in `sw.js` so tablets pick up the new copy.
