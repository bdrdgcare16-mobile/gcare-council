# G Care Council Website — Gap Analysis Document

| Field | Detail |
|---|---|
| **Project** | G Care Council Website (`www.gcarecouncil.in`) |
| **Repository analyzed** | `C:\Users\PADMAVATHI\Documents\gcare_1` — `gcare-frontend/` (47 HTML pages, 19 CSS files, 18 JS files) + `gcare-backend/` (Node.js/Express REST API) |
| **Analysis basis** | Verified source code only. No code was modified. A feature is reported as implemented only when found in the repository. Items that could not be verified are marked **Not Verified**. |
| **Report date** | 2026-10-09 |
| **Related document** | `docs/gcare-council-website-scope-and-gap-analysis.md` (earlier analysis dated 2026-09-17; this document reflects the codebase as it exists today, including the admin-authentication and Google Drive storage work added since then) |

**Status legend used throughout this document:** ✅ Completed · ⚠️ Partial · ❌ Missing · ❓ Not Verified

---

## 1. Project Overview

### 1.1 Purpose

The G Care Council Website is the public-facing institutional website for G Care Council, a skill-training / community-college council in Tamil Nadu, India. It serves three purposes:

1. **Information publishing** — programmes catalogue, syllabi, training centres, community colleges, advisory committee, gallery, downloads, and contact information.
2. **Application intake** — three online application forms: Student Admission, Institutional Affiliation, and Internship, all backed by a REST API and MySQL persistence, plus a Contact/Enquiry form.
3. **Administration and LMS entry point** — an admin dashboard for reviewing applications, and an LMS login page intended to hand off users to a separate LMS system (Admin / Faculty / Student dashboards).

### 1.2 Technology Stack (verified)

| Layer | Technology | Evidence |
|---|---|---|
| Frontend | Static HTML5, CSS3, vanilla JavaScript; Font Awesome CDN. **No framework, no build step, no package.json** | `gcare-frontend/` — 47 `.html` files; README claims Bootstrap but no Bootstrap import was found |
| Backend | Node.js ≥18 + Express ^5.2.1 | `gcare-backend/package.json`, `app.js` |
| Database | MySQL via `mysql2` connection pool (callback API) + Sequelize ORM used **only** for `contact_messages` | `config/db.js`, `config/config.js`, `models/` |
| File storage | Google Drive API (OAuth2 refresh-token client) for all form uploads; legacy local `uploads/` paths still supported for old records | `config/googleDrive.js`, `services/driveService.js` |
| Email | Brevo transactional HTTP API (`api.brevo.com/v3/smtp/email`) via `fetch` | `services/emailService.js`, `admissionEmailService.js`, `internshipEmailService.js` |
| SMS / OTP | Fast2SMS `GET /dev/bulkV2` (DLT route) | `routes/otp.js` |
| Authentication | Custom stateless HMAC-SHA256 bearer token for admin (`middleware/adminAuth.js`); separate LMS authentication is delegated to an external LMS backend (`http://localhost:5000`) | `routes/adminAuthRoutes.js`, `js/lms-login.js:14` |
| Deployment | README references Railway (`backend-production-c5cb.up.railway.app` is hardcoded in frontend JS). **No deployment manifest exists in the repo** (no `railway.json`, `Dockerfile`, `Procfile`, CI) — Not Verified for the actual host | `js/admin-dashboard.js:28`, README |

### 1.3 Architecture

```
Static HTML/CSS/JS (gcare-frontend, 47 pages)
   │  fetch() → API_BASE_URL (localhost:3000/api OR hardcoded Railway URL — varies per file)
   ▼
Express 5 app (gcare-backend/app.js)
   ├── /api                → routes/otp.js        (email + mobile OTP via Brevo / Fast2SMS)
   ├── /api/contact        → routes/contactRoutes → controllers → services → Sequelize model
   ├── /api/admin          → routes/adminAuthRoutes (env-credential login → HMAC token)
   ├── /api/admissions     → routes → controllers → services → query/admissionQuery.js → mysql2
   ├── /api/internships    → routes → controllers (inline SQL via mysql2 promise pool)
   ├── /api/affiliations   → routes → controllers → services → query/affiliationQuery.js → mysql2
   ├── /api/google-drive   → routes/googleDriveAuthRoutes (dev-only OAuth re-setup)
   ├── /uploads            → static, protected by requireAdmin (legacy local files)
   └── /*                  → express.static(../gcare-frontend) — serves the website itself
   ▼
MySQL (external DB_HOST) + Google Drive + Brevo + Fast2SMS + api.postalpincode.in
```

**Serving model:** the backend statically serves `gcare-frontend` (`app.js:1204-1207`), so the whole site can run same-origin on port 3000. However, several frontend JS files still hardcode the Railway production URL (see §4, §5).

### 1.4 Main Modules

| Module | Entry point | Backend |
|---|---|---|
| Public website | `index.html` + 25 information pages | none (static) |
| Student Admission | `admission-online.html` | `POST/GET /api/admissions`, `PUT /:id/status`, `DELETE /:id`, `GET /documents/:documentId/file` |
| Affiliation | `affiliation.html` | `POST/GET /api/affiliations`, `PATCH /:id/status`, `DELETE /:id` |
| Internship | `internship-online.html` | `POST/GET /api/internships`, `PUT /:id/status`, `DELETE /:id`, `GET /:id/signature` |
| Contact / Enquiry | `contact.html` | `POST/GET/PATCH/DELETE /api/contact` |
| OTP subsystem | embedded in 4 form JS files | `POST /api/send-email-otp`, `/api/verify-email-otp`, `/api/send-mobile-otp`, `/api/verify-mobile-otp`, legacy `/api/send-otp`, `/api/verify-otp` |
| Website admin | `admin-login.html`, `admin-dashboard.html` | `POST /api/admin/login` + admin-protected routes above |
| LMS login | `lms-login.html` | external LMS backend `POST http://localhost:5000/api/auth/login` |
| LMS dashboards | `lms-dashboard.html`, `faculty-dashboard.html` | none in this repo |

### 1.5 Current Development Status

**Active development, post-hardening phase.** Since the previous analysis (2026-09-17) the following were added: server-side admin authentication (HMAC bearer token + login rate limiting), admin protection on all application read/update/delete routes, Google Drive storage for admission and internship uploads (previously local disk), server-side application-number generation with a DB lock and transaction, and protected document-streaming endpoints. The LMS remains an external, unfinished integration.

---

## 2. Existing Features Analysis

| # | Feature | Status | Verified Evidence |
|---|---|---|---|
| 1 | Home page (`index.html`) | ✅ | Slideshow, intro, gallery preview, registration/login modals (`index.html:347-481`, `js/home.js`) |
| 2 | Website navigation | ⚠️ | Two nav variants: full dropdown nav on ~13 main pages vs simplified flat nav on 24+ syllabus pages; commented-out LMS submenu items in many pages; no mobile hamburger on public pages |
| 3 | About Us (`about.html`) | ✅ | Vision/mission/governance content; `js/about.js` |
| 4 | Programmes (`programmes.html`) | ⚠️ | ~1800-line hardcoded catalogue in `js/programmes.js`; **broken link**: `programmes.js:~2395` maps `d-pharm` → `dpharm-syllabus.html` but the file is `d-pharm-syllabus.html` → 404; `defaultProgrammeImage` referenced but undefined (`programmes.js:~2151`) |
| 5 | Training (`training-centers.html`) | ✅ | 30 hardcoded district centres (`js/training-centers.js:2-211`); this is the only "Training" page — there is no separate top-level Training page |
| 6 | Advisory (`advisory.html`) | ✅ | Member profiles + animation (`js/advisory-profile-animation.js`) |
| 7 | Other content pages | ✅ | `chairman.html`, `community-colleges.html`, `gallery.html`, `downloads.html`, `contact.html`, `privacy-policy.html`, 25+ syllabus pages |
| 8 | Student Online Admission Form | ✅ | `admission-online.html` + `js/admission-online.js` (~3,660 lines); ~40 fields; dual OTP gating client-side; 4 file uploads; pincode autofill via `api.postalpincode.in` |
| 9 | Affiliation Application Form | ✅ | `affiliation.html` (~100+ named inputs) + `js/affiliation.js`; conditional uploads (sale deed / rental agreement / building documents); 13 enclosure slots; **no OTP flow** |
| 10 | Internship Application Form | ✅ | `internship-online.html` + `js/internship-online.js` (~3,230 lines); employment details JSON; signature image; dual OTP gating |
| 11 | Form validation | ⚠️ | Strong client-side validation on all forms; server-side validation is **strong only for internship** (age 15–40, PIN, phone, email — `internshipController.js:267-549`) and affiliation (required fields + conditional files — `affiliationController.js:657-729`). Admission backend validates only file presence + branch whitelist (`admissionService.js:343-456`); contact validates presence only |
| 12 | Document uploads | ✅ | Multer memory storage → Google Drive (`driveService.js`); 5 MB (admission/internship) / 10 MB (affiliation) limits; MIME filters; `drive:<fileId>` references stored in DB; admin-only streaming endpoints |
| 13 | Node.js/Express backend APIs | ✅ | `app.js` mounts 6 route groups; JSON `{success, message/data}` convention; global 404 + error handlers |
| 14 | MySQL integration | ✅ | `mysql2` pool (`config/db.js`) for admissions/affiliations/otps; mysql2 promise pool for internships; Sequelize for contacts. Two parallel DB stacks exist |
| 15 | Google Drive document storage | ✅ | `config/googleDrive.js` (OAuth2 refresh token), `services/driveService.js` (upload/stream/delete); dev-only re-auth flow (`routes/googleDriveAuthRoutes.js`) |
| 16 | Email integration (Brevo) | ⚠️ | Working: OTP emails, admission admin notification + applicant status emails, internship applicant+admin emails. **Missing**: affiliation notifications, contact notifications, admission applicant acknowledgement on submit |
| 17 | SMS/OTP integration (Fast2SMS) | ⚠️ | Working send/verify with 5-min expiry; **not enforced** on any submission endpoint; `Math.random()` OTPs; OTPs logged to console (`otp.js:1307`) |
| 18 | Admin authentication | ✅ | `POST /api/admin/login` → HMAC-signed token (12 h TTL); timing-safe comparison; rate limiting (5 fails/15 min/IP); production password-strength gate (`adminAuthRoutes.js`) |
| 19 | Admin route protection | ⚠️ | `requireAdmin` on all admission/internship/affiliation read+write routes and `/uploads`. **Contact GET/PATCH/DELETE routes are still unauthenticated** (`contactRoutes.js`) |
| 20 | Admin dashboard (`admin-dashboard.html`) | ⚠️ | Real API wiring with Bearer token (`adminFetch`, `admin-dashboard.js:53-71`); covers **admissions + internships only** — no affiliation or contact tabs |
| 21 | LMS login integration | ⚠️ | `lms-login.html` + `js/lms-login.js` post to a **separate LMS backend hardcoded to `http://localhost:5000`** — cannot work in production; admin/super_admin roles redirect with a one-time `handoffCode`; faculty and student roles receive "not configured" errors |
| 22 | LMS Admin Dashboard | ❓ | Redirects to `{LMS_API_BASE_URL}/admin/dashboard?code=...` — the LMS backend/admin app is **not in this repository**; Not Verified |
| 23 | LMS Faculty Dashboard | ⚠️ | `faculty-dashboard.html` is a static mockup (hardcoded profile "Dr. Padmavathi S", fake stats, zero API calls); no role in `lms-login.js` routes to it; page has no auth check and no inbound links |
| 24 | LMS Student Dashboard | ❌ | `lms-dashboard.html` is a static placeholder; student role in `lms-login.js` shows "Student dashboard is not configured yet" (`lms-login.js:102-105`) |

---

## 3. Gap Analysis Table

| Module | Expected Functionality | Current Implementation | Identified Gap | Priority | Recommended Solution | Status |
|---|---|---|---|---|---|---|
| Home page | Informational landing + user registration/login | Static page complete; register/login modal uses `localStorage` and plaintext passwords (`home.js:1040-1111`); calls `POST /api/check-email` which **does not exist** | Registration/login is fake client-side auth; `/api/check-email` silently 404s | High | Wire to real users API or remove the modal and route users to `lms-login.html` | ⚠️ Partial |
| About / Advisory / Chairman | Informational pages | Static pages complete | None significant | — | — | ✅ Completed |
| Programmes | Course catalogue + syllabus links | Hardcoded catalogue (~1800 lines in `programmes.js`); 24+ syllabus pages | `d-pharm` syllabus link broken (404); `defaultProgrammeImage` undefined → ReferenceError; no CMS | Medium | Fix link map; fix undefined variable; long-term move catalogue to DB | ⚠️ Partial |
| Training | Training-centre listing | `training-centers.html` with 30 hardcoded centres | Hardcoded data incl. personal phone numbers; no CMS | Low | Move to CMS/data table if content changes often | ⚠️ Partial |
| Admission form | Validated submission with OTP + documents | Full flow works; documents now go to Drive; server generates `application_no` with `GET_LOCK` | OTP verification not enforced server-side; no backend field validation (mobile/email/aadhaar/PIN/age trusted from client); no duplicate check; no applicant ack email; no applicant status tracking; client still calls now-protected `GET /api/admissions` to guess the next application number (returns 401 → falls back to `localStorage` counter → displayed number may differ from the assigned one) | Critical/High | Enforce `otps.isVerified` server-side before insert; add field validators; remove the `GET /admissions` call + local app-no generation; add unique constraints; send applicant ack | ⚠️ Partial |
| Affiliation form | Complete application with enclosures → admin review | ~100-field form → Drive upload → `affiliation_applications` insert | No OTP; no applicant contact fields (email/phone absent from schema → cannot notify applicant); **no admin UI** — submissions invisible in dashboard; no emails; multer field list missing `enclosure_file_1/2/8` (files silently dropped); `uploaded_files` JSON blobs not viewable (no streaming endpoint); Drive partial-orphan risk on failure; delete/status endpoints don't verify `affectedRows` | High | Add affiliation tab to admin dashboard; add contact fields + emails; fix enclosure field list; add document streaming; verify affectedRows | ⚠️ Partial |
| Internship form | Validated submission with OTP + signature | Strongest server-side validation; Drive signature upload; user+admin emails | OTP not enforced server-side; `internship_applications` has **no CREATE TABLE script** (must exist manually); no duplicate check on `enrolment_number`; Drive orphan if insert fails after upload | High | Add DDL script; enforce OTP; unique constraint on enrolment_number | ⚠️ Partial |
| Contact form | Enquiry capture + notification | `POST /api/contact` → `contact_messages` (Sequelize) | **GET/PATCH/DELETE routes are public** (no `requireAdmin`) — enquiry PII readable/editable by anyone; `contact_messages` table created only if Sequelize sync runs (never called at startup); no admin notification email; no admin UI; `course`/`enquiryType` fields exist only in dead code | Critical | Apply `requireAdmin` to read/update/delete routes; create table via setup script; add admin notification + dashboard tab | ⚠️ Partial |
| OTP subsystem | Verified contact channels gating submissions | Send/verify endpoints work via Brevo + Fast2SMS; `otps` table with expiry | Never enforced on submit (no controller checks `isVerified`); `Math.random()` OTPs; plaintext OTP storage; OTPs `console.log`ged; no verify-attempt limit → 6-digit brute-forceable; no resend cooldown server-side; duplicate legacy endpoints (`send-otp` vs `send-email-otp`); "already verified" returns success without OTP match | Critical | Enforce `isVerified` in each submit controller; `crypto.randomInt`; hash OTPs; attempts counter + rate limit; remove logging | ⚠️ Partial |
| Admin login | Real authentication | `POST /api/admin/login` with rate limiting, timing-safe compare, signed token | Token in `localStorage` (XSS-persistent); client-side `adminLoggedIn` flag still the gate; no logout endpoint (token revocation impossible); in-memory rate limiter resets on restart; single shared admin credential (no per-user accounts) | Medium | httpOnly cookie or short-lived tokens + refresh; server-side logout/revocation list; `admin_users` table | ✅ Completed (with caveats) |
| Admin dashboard | Manage all application types | Admissions + internships fully manageable (list/search/view/docs/approve/reject/delete) | No affiliation or contact modules; no pagination; no export; no audit trail; auth gate trivially bypassable client-side (real protection is server-side only); hardcoded Railway API base (no localhost branch) | High | Add affiliation + enquiry tabs, pagination, CSV export | ⚠️ Partial |
| Google Drive storage | Durable private document storage | All three forms upload to Drive; `drive:<fileId>` refs; admin streaming endpoints | Drive share permissions never set (`permissions.create` absent) — `webViewLink`s may be inaccessible; deleting an application does not delete Drive files (orphans); `google-service-account.json` present locally but unused | Medium | Set permissions on upload or keep stream-only access; delete Drive files on record delete; remove unused credential file | ⚠️ Partial |
| Email integration | Notifications on all forms | Admission (admin + status), internship (applicant + admin + status) | Affiliation + contact have **zero** email; no admission submission ack; `admissionEmailService.js:70` hardcodes `info@gcarecouncil.in` ignoring `ADMIN_EMAIL`; no HTML escaping of applicant data in admission emails | High | Route all notifications through `sendBrevoEmail`; use `ADMIN_EMAIL`; escape interpolated fields | ⚠️ Partial |
| LMS flow | Website → LMS login → role dashboards (admin/faculty/student) | `lms-login.js` posts to `http://localhost:5000/api/auth/login` (separate app, not in repo); admin handoff-code redirect implemented | **Hardcoded `localhost:5000` breaks all production logins**; faculty role → "being configured" error; student role → "not configured" error; `faculty-dashboard.html` + `lms-dashboard.html` are orphaned static pages with no auth and no data | Critical | Make LMS base URL configurable per environment; implement faculty/student paths or hide those roles; remove or protect orphan dashboard pages | ⚠️ Partial |
| Navigation | Consistent site-wide menu | Two nav variants; LMS link present on most pages | Commented-out role-login submenu items (`admin-login.html?role=student` etc.) — dead UI; `lms-dashboard.html`/`faculty-dashboard.html` unreachable from any link; `privacy-policy.html` not linked from shared footers; `admission-online.html`/`internship-online.html` reachable only via `downloads.html` JS cards | Medium | Single shared nav partial; remove dead links; add footer link to privacy policy | ⚠️ Partial |
| Responsive design | Mobile-friendly site | ~70 `@media` rules; breakpoints 1200/992/768/480 | Thin coverage in `admin-login.css`, `lms-login.css`, `syllabus.css` (single breakpoint); no hamburger nav on public pages; hover-only dropdowns unusable on touch; wide affiliation tables rely on horizontal scroll | Medium | Add mobile nav pattern; audit forms ≤480px | ⚠️ Partial |
| Testing | Automated test coverage | None | Zero test files, zero test framework, no `test` script | High | Introduce Jest/Vitest + Supertest; smoke tests per form | ❌ Missing |

---

## 4. Frontend Gap Analysis

### 4.1 Missing Pages / Dead Pages

| Item | Finding | Evidence |
|---|---|---|
| News / Events page | ❌ Missing entirely — no page, no nav link | file inventory |
| Applicant "check application status" page | ❌ Missing — no way for an applicant to track admission/affiliation/internship status | — |
| `lms-dashboard.html` | ❌ Orphaned 67-line placeholder; no inbound links, no auth, no data | `lms-dashboard.html` |
| `faculty-dashboard.html` | ❌ Orphaned static mockup; zero API calls, hardcoded "Dr. Padmavathi S" profile; no inbound links | `faculty-dashboard.js` |
| `beautician-syllabus-new.html` | ❌ Duplicate unlinked draft (live site uses `beautician-syllabus.html`) | `programmes.js:2404` |
| `login.html` | ❌ Referenced by IDE workspace but does **not** exist in the project | file inventory |

### 4.2 Navigation Problems

- Two nav variants: full dropdown nav (~13 main pages) vs flat nav (24+ syllabus pages).
- Commented-out LMS role-login submenu (`admin-login.html?role=student|faculty|centre`) present in most pages — dead/disabled UI.
- `lms-login.html` correctly linked from main + syllabus pages; `admin-login.html` linked only in some footers.
- Broken link: `js/programmes.js:~2395` maps `d-pharm` → `dpharm-syllabus.html`; actual file `d-pharm-syllabus.html` → 404.
- `privacy-policy.html` exists but is not linked from the shared footer (only links to itself).
- `admission-online.html` and `internship-online.html` are only reachable via JS-generated cards on `downloads.html` (`download.js:9,21`) — no direct nav entry.
- Hover-only dropdown submenus are unusable on touch devices; only `training-centers.js:363-388` has a mobile-width submenu toggle.

### 4.3 Form Validation & UX Gaps

- Client-side validation is rich (age, mobile pattern, PIN, email, Aadhaar, char restrictions), but **the backend trusts it** — bypassing the browser allows invalid admission/contact data (see §5).
- OTP inputs block paste on admission (inconsistent with contact which allows sanitized paste) — harms autofill/accessibility.
- The modal "Contact" form in `js/script.js` intercepts `#contactForm` and shows `alert("Form submitted successfully.")` **without sending anything** — fake success.
- `admin-login.html:26` label typo: "Emails".
- Script files use informal cache-busting query strings (`?v=mobile-email-fix-20260809-2`).

### 4.4 Error Messages / Leakage

- Sensitive `console.log` output throughout: OTP payloads including actual OTP values (`contact.js:996`, `admission-online.js` OTP senders), full affiliation `FormData` including files (`affiliation.js:~283`), API base URLs.
- `internship-online.js` contains an error-normalization hack that rewrites server messages "15 and 20/35" → "15 and 40" (`:~2909`), indicating earlier frontend/backend age-rule drift; current backend enforces 15–40 (`internshipController.js:372-384`) — aligned now, but the hack masks future mismatches.

### 4.5 Accessibility Concerns

- No skip-navigation link; no `aria-current` on nav.
- Affiliation enclosure/table inputs lack `<label>` associations.
- Hover-only dropdown menus; no keyboard-operable submenu.
- OTP paste-blocking reduces usability for assistive tech.
- Decorative `.social-btn` divs are not real links/buttons.
- Modal dialogs partially implement `role="dialog"`/`aria-modal` (main modal only).

### 4.6 Frontend Integration Issues

- **Inconsistent API base resolution**: `admission-online.js`, `affiliation.js`, `contact.js`, `home.js` switch on `location.hostname`; `internship-online.js:9-12`, `admin-login.js:13`, `admin-dashboard.js:28` **hardcode the Railway URL with no localhost branch** — local testing writes to/reads from production.
- Two OTP endpoint naming conventions used (`send-otp`/`verify-otp` by contact+internship vs `send-email-otp`/`verify-email-otp` by admission+home).
- `admission-online.js:160-213` still calls `GET /api/admissions` unauthenticated to guess the next application number; the endpoint now requires admin auth → returns 401 → code falls back to a `localStorage` counter, so the **displayed application number can differ from the server-assigned one** (the server ignores the client's `applicationNo` and assigns its own via `GET_LOCK`).
- `home.js` registration calls `POST /api/check-email` — endpoint does not exist (silent 404 → treated as "not registered").
- `lms-login.js:14` hardcodes `http://localhost:5000` — production LMS login always fails.

---

## 5. Backend Gap Analysis

### 5.1 API Surface (verified)

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/api/send-email-otp`, `/api/verify-email-otp` | POST | none | Email OTP (Brevo) |
| `/api/send-mobile-otp`, `/api/verify-mobile-otp` | POST | none | Mobile OTP (Fast2SMS) |
| `/api/send-otp`, `/api/verify-otp` | POST | none | Legacy email OTP aliases |
| `/api/admin/login` | POST | rate-limited | Admin login → HMAC token |
| `/api/contact` | POST | none | Create enquiry |
| `/api/contact`, `/api/contact/:id` | GET / PATCH / DELETE | **none** | ❌ Public read/update/delete of enquiry PII |
| `/api/admissions` | POST | none | Submit admission (multipart) |
| `/api/admissions`, `/api/admissions/:id`, `/:id/status`, `/:id` | GET / GET / PUT / DELETE | `requireAdmin` | Admin management |
| `/api/admissions/documents/:documentId/file` | GET | `requireAdmin` | Stream Drive/local document |
| `/api/internships` | POST | none | Submit internship |
| `/api/internships`, `/:id`, `/:id/signature`, `/:id/status`, `/:id` | GET/GET/PUT/DELETE | `requireAdmin` | Admin management + signature streaming |
| `/api/affiliations` | POST | none | Submit affiliation |
| `/api/affiliations`, `/:id`, `/:id/status`, `/:id` | GET/GET/PATCH/DELETE | `requireAdmin` | Admin management |
| `/api/otp-config-status` | GET | none | ⚠️ Publicly discloses which provider keys are configured |
| `/api/debug/contact` | POST | none | Echo endpoint — now dev-only (`NODE_ENV !== production`) |
| `/api/google-drive/auth`, `/oauth2callback` | GET | localhost-only, dev | Temporary OAuth re-setup |
| `/`, `/test` | GET | none | Frontend / health check |
| `/uploads/*` | GET | `requireAdmin` | Legacy local files |

### 5.2 Controllers / Routes

- Consistent layered structure: `routes → controllers → services → query` for admissions/affiliations; internships do everything inside the controller with inline SQL; contacts go through the Sequelize model.
- **Missing**: `/api/check-email` (called by `home.js`), applicant status-check endpoint, logout endpoint, affiliation document streaming endpoint, contact admin protection.
- **Method inconsistency**: admission/internship status via `PUT`, affiliation status via `PATCH`, contact update via `PATCH` on `/:id`.
- Response shapes differ: `{data}` vs `{count, data}` vs `{applicationId}`.

### 5.3 Request Validation

| Module | Server-side validation |
|---|---|
| Internship | Strong — required fields, sex enum, age 15–40, PIN regex, mobile regex + blocklist, strict email rules |
| Affiliation | Required-field loop (16 fields) + conditional file rules + declaration |
| Admission | **Only** required file uploads + branch whitelist — no format validation on ~35 free fields |
| Contact | **Presence only** — no format checks on mobile/email |
| OTP | Format checks on inputs; no attempt limits, no resend throttle |

### 5.4 Authentication & Authorization

- ✅ `POST /api/admin/login` — env-based credentials, timing-safe compare, per-IP rate limit (5/15 min), production password-strength gate, HMAC-signed token, 12 h expiry.
- ✅ `requireAdmin` on admission/internship/affiliation admin routes and `/uploads`.
- ❌ Contact read/update/delete routes unprotected.
- ❌ No user accounts system (`users`/`admin_users` tables absent) — single shared env credential.
- ❌ No token revocation / logout endpoint; in-memory rate limiter resets on restart and does not scale across instances.
- ❌ No RBAC — a single "admin" role only.

### 5.5 File Uploads

- ✅ Multer MIME + size filters on all routes; memory storage → Drive; orphan cleanup on admission multi-file failure (`admissionService.js:542-552`); path-traversal guard in local legacy streaming.
- ⚠️ MIME filter trusts client-declared `file.mimetype` — no magic-byte/content sniffing; no AV scanning.
- ⚠️ Affiliation upload failure leaves partial Drive orphans (no compensation); deleting applications does not delete Drive files.
- ⚠️ Drive `webViewLink`s stored but `permissions.create` never called — reviewer access is Not Verified (links may be private).

### 5.6 Error Handling & Logging

- Global 404 + error handlers exist; multer errors mapped to friendly 400s.
- ❌ Raw `error.message` returned to clients in several places (OTP routes, internship controller `error` field, affiliation `error` field) — can leak env/config details.
- ❌ PII + OTP logging: `console.log("GENERATED MOBILE OTP:", otp)` (`otp.js:1307`), Fast2SMS response logged, `debugLog` correctly disabled in production but `console.log` calls are not.
- ✅ Request logger redacts OAuth query params (`app.js:824-835`).

### 5.7 Code Quality / Dead Code

- Every major backend file contains an entire commented-out prior implementation (~40–60% of file size): `app.js:1-733`, `routes/otp.js:1-683`, `routes/admissionRoutes.js:1-75`, `routes/affiliationRoutes.js:1-130`, `routes/internshipRoutes.js:1-322`, `controllers/*.js`, `services/*.js`, `models/contactmessage.js:1-38`, `config/db.js:1-29`.
- Dead artifacts: `query/contactQuery.js` (references non-existent model fields `mobileOtpVerified`/`emailOtpVerified`), `checkSchema.js`, `config/google-service-account.json` (unused — Drive uses OAuth2), `query/Documents - Shortcut.lnk` (Windows shortcut inside source), `uploads/admissions/internships` stray subdirectory, stray `t folderId = ...` file at repo root.
- `nodemailer` declared in `package.json` but never imported.
- Duplicate email transports: `emailService.js` and `admissionEmailService.js` implement separate Brevo callers.

---

## 6. Database Gap Analysis

### 6.1 Tables

| Table | Created by | Relationships / Constraints | Issues |
|---|---|---|---|
| `admissions` | `setupTables.js` / `recreateAdmissionTables.js` (manual scripts) | PK `id`; UNIQUE `application_no`; FK target of `admission_documents` | No unique on mobile/email/aadhaar → duplicates allowed; no `blood_group`; OTP-verified flags sent by frontend have no columns; no extra indexes |
| `admission_documents` | same scripts | FK `admission_id → admissions(id)` ON DELETE CASCADE | `file_path` stores `drive:<fileId>` refs (new) or stale local paths (legacy rows) |
| `affiliation_applications` | `CREATE TABLE IF NOT EXISTS` run on **every query call** (`affiliationService.js:25-27`) | none | 32-column table; courses/staff/enclosures/files stored as JSON in `LONGTEXT` — non-normalized, unqueryable; **no applicant email/phone columns** — applicants cannot be notified or contacted; no contact info at all |
| `internship_applications` | **No DDL script exists anywhere** — table must be created manually | none | Schema only inferable from INSERT column list in `internshipController.js:600-619`; no unique on `enrolment_number`/`email`; `candidate_signature` stores `drive:` ref or legacy local path |
| `contact_messages` | Sequelize model `contactmessage.js` — but `syncModels()`/`connectDB` are **never called** at startup; table exists only if created externally | none | `POST /api/contact` fails outright if the table is missing; camelCase timestamps vs `created_at` elsewhere |
| `otps` | `CREATE/ALTER` on the fly inside `routes/otp.js` | none | OTP stored **plaintext**; no `attempts` counter; no index on `email`/`mobile` (full scan per verify); rows never cleaned up |

### 6.2 Missing Tables (needed for stated scope)

`users` / `admin_users` (real auth), `students`, `faculty`, `courses`/`programmes`/`subjects`, `batches`, `enrolments`, `attendance`, `assignments` + `assignment_submissions`, `exams`, `results`, `certificates`, `announcements`, `notifications`, `enquiries` (distinct from contact), `audit_logs`, `application_status_history`.

### 6.3 Integrity / Security

- Only one foreign key in the whole schema (`admission_documents.admission_id`).
- Only one unique constraint (`admissions.application_no`); no duplicate prevention on identity fields.
- No soft-delete, no status history, no audit trail.
- All queries are parameterized (`?` placeholders / Sequelize) — **no SQL injection risk found** ✅.
- Two parallel DB stacks (raw `mysql2` + Sequelize) maintaining two connections to the same database — consolidation recommended.
- `application_no` generation is now server-side under `GET_LOCK` + transaction + unique retry ✅, but the frontend still computes and displays its own number (can diverge from the stored value).
- `.env` DB credentials are gitignored (`**/.env`, `**/.env.*`) ✅; no migrations tool — manual scripts only.

---

## 7. LMS Integration Gap Analysis

**Target flow:** `G Care Council Website → LMS Login → Role-Based Authentication → Admin / Faculty / Student Dashboard`

**Actual flow (verified):**

```
index.html  ──(fake register/login modal, localStorage)──►  home.js sets gcareStudentLoggedIn → lms-login.html
nav "LMS" link ──────────────────────────────────────────►  lms-login.html
lms-login.html  ──POST {email,password}──►  http://localhost:5000/api/auth/login   (SEPARATE app, not in this repo)
   ├─ role admin / super_admin ──► {LMS}/admin/dashboard?code=<handoffCode>   (one-time handoff, JWT never in URL ✅)
   ├─ role faculty ──► error message: "Faculty login integration is being configured."  (dead end)
   └─ role student ──► error message: "Student dashboard is not configured yet."        (dead end)
```

| Step | Expected | Current | Gap |
|---|---|---|---|
| Website → LMS link | Working login page | `lms-login.html` present and linked | ✅ Works, but targets a hardcoded `http://localhost:5000` base URL (`lms-login.js:14`) — **always fails in production** |
| LMS authentication | Server-side auth against LMS user DB | Delegated to external LMS backend (`/api/auth/login`) | LMS backend is **not in this repository** — implementation Not Verified; `localhost:5000` must become an env-configured production URL |
| Role-based redirect | admin→admin dash, faculty→faculty dash, student→student dash | Only admin/super_admin handled via `handoffCode` redirect (`lms-login.js:86-95`) | Faculty → "being configured" error; student → "not configured" error — two of three roles are dead ends |
| LMS Admin Dashboard | Admin dashboard app | Redirect target `{LMS}/admin/dashboard?code=…` exists in code | Target app is external — Not Verified in this repo |
| LMS Faculty Dashboard | Working dashboard | `faculty-dashboard.html` static mockup (hardcoded data, no auth, no API) and unreachable | Entirely non-functional |
| LMS Student Dashboard | Working dashboard | `lms-dashboard.html` static placeholder, unreachable | Entirely non-functional |
| Logout | Session termination | LMS pages have no sessions; `faculty-dashboard.html` logout just links to `index.html` | No real logout; admin website token has no revocation endpoint |
| Website-side fake auth | — | `home.js` register/login stores **plaintext passwords** in `localStorage` (`gcareRegisteredUsers`) and sets `gcareStudentLoggedIn` flag | Credentials readable by any script; sets expectations of an account that doesn't exist server-side |

**Pending student features:** everything — enrolment, courses, materials, attendance, assignments, exams, results, certificates, notifications — no student-side functionality exists in this codebase.

---

## 8. Security and Performance Gap Analysis

### 8.1 Security Findings

| # | Finding | Severity | Evidence |
|---|---|---|---|
| 1 | Contact API read/update/delete routes are **public** — enquiry PII (names, mobiles, emails, addresses, messages) retrievable/modifiable by anyone | **Critical** | `contactRoutes.js:52-73` — no `requireAdmin` |
| 2 | OTP not enforced on submit + weak mechanics: `Math.random()`, plaintext storage, no attempt limit, OTP `console.log`ged, "already verified" returns success without matching OTP | **Critical** | `routes/otp.js`; no controller checks `isVerified` |
| 3 | Plaintext passwords in `localStorage` + fake registration/login flows | **High** | `home.js:1040-1111` |
| 4 | Sensitive logging: OTP values, full request bodies (Aadhaar, addresses), Fast2SMS responses, affiliation FormData incl. files | **High** | `otp.js:1307`, `admissionController.js:149-159`, `affiliation.js:~283`, `contact.js:996` |
| 5 | Missing `/api/check-email` endpoint (silent 404 in registration flow) | **Medium** | `home.js:368` |
| 6 | Info disclosure: `/api/otp-config-status` publicly reveals provider key configuration; raw `error.message` returned by several routes | **Medium** | `app.js:1100-1191` |
| 7 | File-upload hardening: client-declared MIME trusted; no content sniffing; Drive share permissions unset | **Medium** | multer filters; `driveService.js` |
| 8 | CORS allows `origin === "null"`; allowlist omits the Railway backend origin itself | **Medium** | `app.js:760-767` |
| 9 | No helmet/security headers; no global rate limiting (only admin login); no request size limit beyond 2 MB body parser | **Medium** | `app.js`, `package.json` |
| 10 | Admin token in `localStorage` + client-side `adminLoggedIn` flag gate; no logout/revocation; single shared env credential | **Medium** | `admin-dashboard.js:7-20`, `admin-login.js:78-80` |
| 11 | No HTML escaping of applicant data in admission emails → HTML injection into admin/applicant inboxes | **Medium** | `admissionEmailService.js` (cf. `escapeHtml` in `internshipEmailService.js`) |
| 12 | Affiliation delete/status never verify `affectedRows` → success returned for non-existent IDs | **Low** | `affiliationService.js:91-99`, `affiliationController.js:983-1050` |
| 13 | `home.js` stores registered users incl. password, DOB, address in `localStorage` — persistent XSS-exfiltratable PII | **High** | `home.js:259-270` |
| 14 | Dev-only protections exist (`/api/debug/contact`, Google OAuth setup) — correctly gated, but verify `NODE_ENV=production` is actually set on the host | **Low** | `app.js:1213`, `googleDriveAuthRoutes.js:48-72` |

✅ **Positive controls verified:** parameterized SQL throughout; admin HMAC token with timing-safe verify + expiry; login rate limiting; upload MIME/size filters; `/uploads` behind auth; Drive streaming instead of public links; `.env` + service-account JSON gitignored; `escapeHtml` used in admin-dashboard rendering and internship emails; OAuth state + localhost restriction on the Drive setup flow.

### 8.2 Performance / Configuration Risks

- No pagination on any list endpoint (`SELECT *` / `findAll`) — admin dashboard loads everything.
- `affiliation_applications` `CREATE TABLE IF NOT EXISTS` executes on **every** affiliation query — unnecessary overhead.
- Affiliation Drive uploads are sequential (slow for many enclosures); no parallelism.
- `otps` table has no index on `email`/`mobile` and no cleanup job — grows unboundedly.
- No `.env.example`, no deployment manifest; env parity between local and production is manual.
- Two DB stacks (mysql2 pool + Sequelize) — double connections.
- Hardcoded API URLs in frontend (§4.6) → local dev hits production data.

---

## 9. Testing Gap Analysis

**Verified:** no test/spec files anywhere, no test framework in `package.json` (`jest`, `mocha`, `vitest`, `supertest`, `cypress` all absent), no `test` script. Zero coverage.

| Testing Area | Exists? | Missing | Recommended Tests |
|---|---|---|---|
| Unit tests | ❌ | All | OTP generation/validation, branch whitelist, age calc, status transitions |
| API tests | ❌ | All | Supertest: 201/400/401/404 per endpoint; auth-required assertions on every admin route |
| Integration tests | ❌ | All | Admission end-to-end (multipart → DB rows → Drive refs), Drive failure compensation |
| Form-submission tests | ❌ | All | OTP gating, conditional uploads (saleDeed/rental), multer size/type rejection |
| Database verification | ❌ | All | Table existence for `internship_applications`/`contact_messages`, FK cascade, `application_no` uniqueness under concurrency |
| Frontend tests | ❌ | All | Validation rules, pincode autofill, nav link integrity (would have caught the d-pharm 404) |
| End-to-end tests | ❌ | All | Full submission → admin approval → status email path; LMS login redirect |
| Smoke tests (prod) | ❌ | All | `/test`, one submission per form post-deploy, Drive connectivity check |

---

## 10. Priority-Based Action Plan

### Critical — Immediate Attention

| # | Gap | Fix | Depends on |
|---|---|---|---|
| C1 | Contact API exposes PII publicly | Add `requireAdmin` to `GET/PATCH/DELETE /api/contact*` | none |
| C2 | OTP never enforced on submit | Verify latest `isVerified` OTP for mobile+email inside each submit controller before insert | none |
| C3 | `lms-login.js` hardcodes `http://localhost:5000` | Environment-driven `LMS_API_BASE_URL` (prod LMS domain) | LMS backend deployed |
| C4 | OTP brute-force + plaintext + logging | `crypto.randomInt`, hash OTPs, attempts counter (e.g., max 5), remove OTP/PII `console.log`s | — |
| C5 | Admission `GET /api/admissions` call from public page (now 401s; app-number display can diverge) | Remove `fetchMaxApplicationNo` + localStorage counter; show server-returned `applicationNo` only after submit | none |

### High — Required Before Production Release

| # | Gap | Fix | Depends on |
|---|---|---|---|
| H1 | `internship_applications` + `contact_messages` have no DDL/setup path | Add setup scripts or a migration runner; call `syncModels()` or create table explicitly at startup | none |
| H2 | Affiliation is a write-only silo | Admin dashboard affiliation tab + document streaming endpoint + applicant contact fields + notification emails | none |
| H3 | No admin UI for contact enquiries | Dashboard enquiries tab | C1 |
| H4 | Fake registration/login + plaintext localStorage passwords | Replace with real users API or remove; at minimum stop storing passwords | users table |
| H5 | Backend field validation gaps (admission, contact) | Server-side validators for mobile/email/aadhaar/PIN/age parity with frontend | none |
| H6 | No tests | Introduce Jest + Supertest baseline: auth checks + submit paths | — |
| H7 | Missing applicant acknowledgement emails (admission, affiliation, contact) | Reuse `sendBrevoEmail`; add `ADMIN_EMAIL` usage (remove hardcoded `info@gcarecouncil.in`); escape interpolated fields | — |
| H8 | `/api/check-email` 404 in registration flow | Implement endpoint or remove the check | H4 |
| H9 | Missing endpoints/UI for faculty + student LMS roles | Implement role routing once LMS exists, or show "coming soon" UX deliberately | LMS backend |

### Medium — Important Improvements

| # | Gap | Fix |
|---|---|---|
| M1 | Hardcoded API base URLs (internship, admin-login, admin-dashboard) | Single shared `config.js` / hostname switch in every JS file |
| M2 | Nav inconsistencies + broken `d-pharm` link + `defaultProgrammeImage` ReferenceError | Shared nav partial; fix link map; fix undefined var |
| M3 | Drive hygiene: permissions unset, orphaned files on delete/failure | Set permissions or keep stream-only; delete Drive files with records; affiliation compensation rollback |
| M4 | No helmet / global rate limiting / sanitized error responses | `helmet`, `express-rate-limit`, uniform error shape |
| M5 | No users/RBAC/audit tables | `users`, `admin_users`, `audit_logs` + role middleware |
| M6 | No pagination/export on admin lists | `LIMIT/OFFSET` endpoints + CSV export |
| M7 | Duplicate OTP endpoints + duplicate Brevo transports + ~50% commented dead code | Consolidate to one route set + one email service; delete dead code |
| M8 | Contact `course`/`enquiryType` fields dropped | Add columns + form fields + admin view |
| M9 | HTTP method inconsistency (`PUT` vs `PATCH` for status) | Standardize on `PATCH` (or support both) |
| M10 | Admin session hardening | Logout endpoint, shorter TTL, consider httpOnly cookie |

### Low — Future Enhancements

| # | Gap | Fix |
|---|---|---|
| L1 | News/Events module | Build if in scope |
| L2 | CMS for programmes/gallery/training centres/downloads | DB-driven content + admin editors |
| L3 | Blood-group field in admission | Add column + field if required |
| L4 | Full LMS academic features (materials, attendance, assignments, exams, certificates) | LMS project scope |
| L5 | Accessibility pass (skip-nav, keyboard menus, label coverage) | WCAG audit |
| L6 | Repo hygiene | Remove `Documents - Shortcut.lnk`, stray `t folderId…` file, unused `nodemailer` dep, unused service-account JSON |

**Recommended implementation order:** C1 → C5 → C4 → C2 → H1 → C3 (LMS URL) → H5 → H7 → H2/H3 (dashboard tabs) → H4/H8 → H6 → Medium items → Low items.

---

## 11. Final Summary

### 11.1 Completed Functionalities (verified end-to-end)

- Public informational website: home, about, chairman, advisory, community colleges, training centres, programmes + 24 syllabus pages, gallery, downloads, contact, privacy policy.
- Student admission: full form → dual OTP UX → multipart submit → Drive upload → `admissions`/`admission_documents` → admin email → dashboard review → status emails (approve/reject).
- Affiliation: ~100-field form → conditional validation → Drive upload → `affiliation_applications` → admin-protected status/delete APIs.
- Internship: validated form → Drive signature upload → `internship_applications` → applicant + admin emails → admin review/status/delete.
- Contact enquiry → `contact_messages` insert.
- OTP subsystem (Brevo email + Fast2SMS mobile) with 5-minute expiry and verify endpoints.
- **Admin authentication**: `POST /api/admin/login` → HMAC token, rate limiting, timing-safe checks; `requireAdmin` protecting admission/internship/affiliation admin routes, `/uploads`, and document-streaming endpoints.
- Server-side `application_no` generation under DB lock + transaction.
- Same-origin serving of frontend by the backend; dev-only debug/OAuth-setup routes properly gated.

### 11.2 Partially Implemented Functionalities

- OTP security (functional but unenforced; weak RNG; logged; no attempt limits).
- Admin dashboard (covers 2 of 4 modules — no affiliation/contact tabs; no pagination/export).
- Email notifications (absent for affiliation/contact; no admission applicant ack).
- Backend validation (strong for internship only).
- LMS integration (login page + admin handoff only; hardcoded localhost target; faculty/student dead ends).
- Navigation and responsive design (two nav variants; thin mobile breakpoints on some pages).
- Authorization coverage (contact admin routes still public).

### 11.3 Missing Functionalities

- LMS Admin/Faculty/Student dashboards (in this repo — external LMS app is Not Verified).
- Applicant status-tracking for all application types.
- Real user registration/login system (`users` table, server auth).
- News/Events module; CMS for all hardcoded content; reports/export; audit logging; RBAC.
- `/api/check-email`; affiliation document streaming; logout endpoint.
- All automated testing; deployment manifests; `.env.example`; DB migrations.

### 11.4 Existing Technical Issues (verified bugs)

1. `GET /api/admissions` fetched unauthenticated by `admission-online.js` → 401 → client-side fallback counter → displayed application number can diverge from the server-assigned one.
2. `POST /api/check-email` called by `home.js` → endpoint does not exist → silent failure treated as "not registered".
3. `programmes.js` `d-pharm` → `dpharm-syllabus.html` → 404; `defaultProgrammeImage` undefined → ReferenceError.
4. Contact admin routes public (Critical — see C1).
5. `internship_applications` and `contact_messages` have no setup path — forms fail if tables absent.
6. Multer field list omits `enclosure_file_1/2/8` — those enclosure files are silently dropped.
7. Modal `#contactForm` in `script.js` fakes success without sending data.
8. Massive commented-out v1 code in every backend file and several frontend files (~40–60% of file size).
9. `admissionEmailService.js` hardcodes `info@gcarecouncil.in`; no HTML escaping of applicant data.
10. Orphaned pages: `lms-dashboard.html`, `faculty-dashboard.html`, `beautician-syllabus-new.html`.

### 11.5 Pending Integrations

- **LMS backend** (`localhost:5000`) — external project; admin handoff code implemented, faculty/student pending, production URL unconfigured.
- **Fast2SMS / Brevo / Google Drive** — integrated and env-configured; production behavior Not Verified (no runtime exercise in this analysis).
- **Google Drive permissions** for uploaded-file links — not set in code.
- **api.postalpincode.in** — client-side pincode autofill (working, third-party dependency).

### 11.6 Recommended Next Development Steps

1. Apply `requireAdmin` to contact routes and re-test admin flows (C1, C5).
2. Enforce OTP verification server-side + harden OTP mechanics (C2, C4).
3. Add DDL for `internship_applications`/`contact_messages` + migrations (H1).
4. Extend admin dashboard to affiliations + enquiries; add notification emails (H2, H3, H7).
5. Fix verified frontend bugs: d-pharm link, `defaultProgrammeImage`, app-number display, `/api/check-email`, fake contact modal (M2, H8).
6. Configure the LMS base URL per environment; decide faculty/student UX (C3, H9).
7. Replace fake registration with real user accounts (prerequisite for LMS roles) (H4, M5).
8. Introduce a baseline automated test suite and deployment manifest (H6, L6).

### 11.7 Production Readiness Assessment

**Not production-ready, but substantially closer than the 2026-09-17 baseline.** The most dangerous prior gaps — fully public PII endpoints and fake admin credentials — are resolved for admissions/internships/affiliations. Remaining blockers: the **still-public contact API** (C1), **unenforced OTP verification** on all public forms (C2), **OTP security weaknesses** (C4), **undocumented/manual database setup** for two tables (H1), and a **hardcoded localhost LMS URL** that makes the LMS entry point non-functional in production (C3). Once the Critical items and H1 are closed, the site is viable for a limited production rollout of the website + forms + admin flows; the LMS dashboards require their own backend before they can be assessed.

---

*This report was generated from static source-code analysis of `gcare-frontend` and `gcare-backend`. Runtime behavior (live deployment, actual env values, real DB contents, external LMS availability) was not exercised; items that could not be established from code are marked "Not Verified".*
