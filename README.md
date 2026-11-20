# Bar Counter System

An all-in-one counter app for a bar: customer tabs, orders, stock and sales reports. It runs in Chrome on Android tablets and phones, installs like a normal app, and keeps every device in sync.

## Install on the tablet

1. Open the app's GitHub Pages address in **Chrome** on the tablet.
2. Tap the **⋮** menu, then **Add to Home screen** (or **Install app**).
3. Open it from the home screen icon. The very first time, tap **Create admin login**. On other devices, sign in with the admin login or a viewer login the admin created.

## Logins

| | Admin | Viewer |
|---|---|---|
| See customers, stock, reports, bills | ✓ | ✓ |
| Take orders and payments, split/move, print, close the day | ✓ | ✓ |
| Add or edit menu items, prices, restock | ✓ | |
| Setup (service charge, SST, happy hour), restore backup, test data | ✓ | |
| Remove a customer without charging, void or reopen a bill | ✓ | |
| Create and remove logins (Setup → Logins) | ✓ | |

The server enforces these rules, not just the screen.

## Where the data lives

Menu, stock, open customers and sales are stored in a private Supabase database (Singapore) and copied onto each signed-in device.

- **Sync:** changes show up on the other devices within a second or two. Stock counts add up correctly even when two devices sell the same item at once.
- **Offline:** the app keeps working without internet. Changes wait on the device (the top bar shows "Offline · N waiting") and are sent when the connection returns.
- **Privacy:** only the bar's own logins can read the data, and only within their role.
- **Backup:** Setup → **Download backup** saves a file of the last 62 days. **Restore from backup** replaces the shared data on every device.
- Supabase's free plan pauses a project after a week with no use at all. Daily use keeps it awake; if it ever pauses, it can be resumed from the Supabase dashboard.

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

The database has the tables `bars`, `bar_members` and `bar_docs` with row-level security; all writes go through the role-checked function `bar_put_many`.

To update the app, change `index.html` and raise `VERSION` in `sw.js` so tablets pick up the new copy.
