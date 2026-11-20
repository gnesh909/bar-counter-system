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
| See the change history (History tab) | ✓ | |

The server enforces these rules, not just the screen.

## Where the data lives

Menu, stock, open customers and sales are stored in a private Supabase database (Singapore) and copied onto each signed-in device.

- **Sync:** changes show up on the other devices within a second or two. Stock counts add up correctly even when two devices sell the same item at once.
- **Offline:** the app keeps working without internet. Changes wait on the device (the top bar shows "Offline · N waiting") and are sent when the connection returns.
- **Privacy:** only the bar's own logins can read the data, and only within their role.
- **Backup:** Setup → **Download backup** saves a file of the last 62 days. **Restore from backup** replaces the shared data on every device.
- Supabase's free plan pauses a project after a week with no use at all. Daily use keeps it awake; if it ever pauses, it can be resumed from the Supabase dashboard.

## Passwords

- **Forgot password:** the admin goes to Setup → Logins → **Reset password** next to that login and sets a new one. The old password stops working and that login is signed out on every device.
- **Change my password:** Setup → Account and sync, for any signed-in login.
- **Forgot password?** on the sign-in screen emails a reset link. This needs the email service (Resend) connected to Supabase's sign-in emails; until then, use the admin reset.
- Keep a second admin login (or note the admin password somewhere safe) so the bar is never locked out.

## Reports

Reports → **Day / Week / Month / Year**, with ‹ › to move between periods. Each shows takings, gross profit, margin, bills, voids, payment methods and best sellers; Year adds a month-by-month table. Reports read all sales on the server, so past years are always available. **Print / PDF** opens Android's print screen (choose *Save as PDF* to keep a file); **Email** sends the report to the bar email.

## Customer spending

Reports → any Day / Week / Month / Year → **Customer spending**: visits, bills, total spent, average bill, last visit and favourite items per customer, top spender first. Tap a customer for their bills. Bills are grouped by the customer name typed at the counter (capitals and extra spaces ignored).

**Regular customers** (Setup → Regular customers, admin): saved regulars appear as suggestions when a name is typed at the counter, so their spending always adds up under one name. They're marked ★, and **Showing regulars only** filters the report to them.

## Services without stock (pool table)

Stock → Add item → tick **Don't track stock** for things like a pool game, karaoke or corkage. These sell like any item but have no stock count, never show as Out or Low, and are left out of restocking and stock value.

## Closing the day

Reports → Day → **Close the day**. After saving, the app:

1. saves a full backup of all bar data to private cloud storage (Supabase Storage). Backups can't be changed or deleted; the admin downloads them from Setup → Cloud backups. If the device is offline, the backup is saved as soon as it reconnects;
2. emails the closing report to the bar email (Setup → Bar email). Until automatic email is set up, an **Email report** button opens the device's email app with the report filled in.

## Change history

Every change is recorded with the login email and time, including every sign-in and sign-out (with the device) and password changes and resets. Filter **Sign-ins and passwords** shows just those. Also recorded: menu, prices, stock, customers, bills, voids, closings, settings, logins, backups, printed and emailed reports, and anything the server refused. Only admins can read it (History tab), and nobody, including the admin, can edit or delete it.

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

The database has the tables `bars`, `bar_members`, `bar_docs` and `bar_audit` (append-only) with row-level security; all writes go through the role-checked function `bar_put_many`, reports come from `bar_report`. Automatic email uses the Edge Function in `supabase/functions/send-report` with a `RESEND_API_KEY` secret.

To update the app, change `index.html` and raise `VERSION` in `sw.js` so tablets pick up the new copy.
