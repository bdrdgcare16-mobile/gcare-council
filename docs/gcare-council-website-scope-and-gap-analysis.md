# GCare Council Website – Application Scope and Gap Analysis

**Application:** GCare Council Website (`www.gcarecouncil.in`)
**Repository analyzed:** `C:\Users\PADMAVATHI\Documents\gcare_1` — `gcare-frontend/` (43 HTML pages, 17 CSS files, 18 JS files) and `gcare-backend/` (Node.js/Express REST API)
**Analysis basis:** Verified source code only. No code was modified, and no feature is reported as implemented unless found in the repository.
**Report date:** 2026-09-17

---

## 1. EXECUTIVE SUMMARY

### Application purpose

A public-facing institutional website for GCare Council (a skill-training / community-college council in Tamil Nadu) that presents programmes, syllabi, training centres, gallery and contact information, and accepts three online application types:

1. **Student Admission** (`admission-online.html` → `POST /api/admissions`)
2. **Institutional Affiliation** (`affiliation.html` → `POST /api/affiliations`)
3. **Internship applications** (`internship-online.html` → `POST /api/internships`)

plus a **Contact/Enquiry** form and **email + mobile OTP verification** for public forms.

### Current development stage

**Active development, pre-hardening.** A functional public website + form-submission backend exists and appears deployed (frontend references a live Railway backend `https://backend-production-c5cb.up.railway.app`). However, the codebase contains large volumes of commented-out "v1" code in nearly every file, duplicated email transports, fake client-side-only authentication, no deployment configuration in the repo, and no tests. The LMS is planned but effectively non-existent (one placeholder page + one static mockup).

### Major implemented areas

- Static public website (43 pages): home, about, chairman, advisory, community colleges, training centres, programmes catalogue, 24+ syllabus pages, gallery, downloads, contact — verified content.
- Express REST API (`gcare-backend/app.js`) with 4 resource groups: admissions, affiliations, internships, contact — full CRUD + status workflow each.
- MySQL persistence for `admissions`, `admission_documents`, `affiliation_applications`, `internship_applications`, `contact_messages`, `otps`.
- OTP subsystem (6-digit, MySQL `otps` table, 5-minute expiry) via Brevo (email) and Fast2SMS (mobile) — `routes/otp.js`.
- Email notifications via Brevo HTTP API for admission (admin notify, applicant approve/reject) and internship (applicant ack, admin notify, status emails).
- Google Drive upload integration for affiliation documents (OAuth2 refresh-token, `config/googleDrive.js`, `services/driveService.js`).
- Admin dashboard (`admin-dashboard.html`) listing/searching admission + internship applications with approve/reject/delete — wired to real APIs.
- Input validation: multer MIME/size filters on all upload routes; field validation in internship controller; branch whitelist in admission service; required-field validation in affiliation controller.

### Major incomplete areas

- **Authentication/authorization: none on the backend.** Every API route is public, including list/delete/status endpoints returning applicant PII. The admin "login" is a hardcoded credential check in client-side JS (`js/admin-login.js:33-47`) + a `localStorage` flag.
- **LMS: absent.** `lms-dashboard.html` is a 67-line placeholder; `faculty-dashboard.html` is a static mockup (no API calls); student "registration/login" stores plaintext passwords in `localStorage` (`js/home.js`).
- **Affiliation admin workflow:** submissions are stored and files go to Drive, but no admin UI consumes `GET /api/affiliations`; no email acknowledgement; no notification.
- **News/Events, Enquiry as separate module:** no pages exist; enquiry is folded into `contact.html`.
- **Tests:** zero test files, zero test scripts.

### Major technical gaps

- No backend auth middleware, JWT, session, password hashing (bcrypt absent from `package.json`), rate limiting, or OTP attempt limits.
- OTPs are generated with `Math.random()`, stored in plaintext, logged to console, and never enforced server-side — no controller checks `otps.isVerified`; the "verified" flags sent by the frontend are ignored.
- Local-disk uploads for admissions/internships on a Railway deployment with an ephemeral filesystem → files will be lost on redeploy/restart; only affiliation uses durable Drive storage.
- Hardcoded production API base URLs in 6 frontend JS files; only `affiliation.js` has local/prod switching — local development hits the production database.
- One broken syllabus link: `programmes.js:2403` maps `d-pharm` → `dpharm-syllabus.html` (actual file is `d-pharm-syllabus.html`) → 404.
- `home.js:365` calls `POST /api/check-email` — **no such endpoint exists** (silent failure).
- Internship age rule mismatch: backend enforces 15–20, frontend enforces 15–35.
- `programmes.js:2151` references undefined `defaultProgrammeImage` → ReferenceError for any subcourse without an `image`.
- Massive dead code: roughly 40–60% of every backend file and several HTML files is commented-out v1 code.

### Major business/functional gaps

- No applicant-side "check status" feature for admission/affiliation/internship.
- No affiliation admin review UI; no CMS for programmes/gallery/training-centres/downloads (all hardcoded JS data arrays).
- No reports/export, no audit trail, no user/role management.
- No enquiry routing (course/enquiryType fields exist only in commented-out code).

### Overall readiness for production

**Not production-ready.** Core submission flows work end-to-end, but the absence of authentication on all admin/data endpoints (anyone can list, approve, or delete applications containing applicant PII — Aadhaar numbers, phone numbers, addresses, document links) is a critical blocker, compounded by ephemeral file storage for admission/internship documents.

---

## 2. APPLICATION ARCHITECTURE

### Actual architecture

```
Static HTML/CSS/JS frontend (43 pages, no framework, no build step)
        │  fetch() → hardcoded https://backend-production-c5cb.up.railway.app/api
        ▼
Express 5 REST API (gcare-backend/app.js, port 3000/PORT env)
        │  routes/ → controllers/ → services/ → query/ (mixed styles)
        ▼
MySQL via mysql2 pool (config/db.js, callback style)
   +  Sequelize ORM — used ONLY for contact_messages (models/)
        ▼
External: Brevo HTTP API (email/OTP), Fast2SMS (SMS OTP),
          Google Drive API (affiliation documents), api.postalpincode.in (pincode lookup)
```

| Layer | Technology | Evidence |
|---|---|---|
| Frontend | Vanilla HTML5/CSS3/vanilla JS + Font Awesome CDN; **no React, no build tooling, no package.json** | `gcare-frontend/` — 43 `.html` files; README claims Bootstrap but no Bootstrap asset/import found in pages sampled |
| Backend | Node.js ≥18 + Express ^5.2.1 | `package.json` deps: `express`, `mysql2`, `sequelize`, `multer`, `googleapis`, `nodemailer` (installed but unused — Brevo called via `fetch`), `cors`, `dotenv` |
| API | REST, `/api/*`, JSON `{success, message/data}` convention | `app.js` mounts: `/api` (otp), `/api/contact`, `/api/admissions`, `/api/internships`, `/api/affiliations`; health `GET /`, `GET /test`, `GET /api/otp-config-status`, `POST /api/debug/contact` |
| Database | MySQL via `mysql2` connection pool (callback API); Sequelize ORM used only for `contact_messages` | `config/db.js`, `config/config.js`, `models/contactmessage.js`, `models/index.js` |
| File storage | Mixed: local disk `uploads/admissions`, `uploads/internships` (multer diskStorage, served at `/uploads`) + Google Drive for affiliation files | `routes/admissionRoutes.js:95-160`, `routes/internshipRoutes.js:360-515`, `services/driveService.js` |
| Email | Brevo transactional HTTP API (`api.brevo.com/v3/smtp/email`) | `services/emailService.js`, `admissionEmailService.js`, `internshipEmailService.js` |
| SMS/OTP | Fast2SMS `GET /dev/bulkV2` DLT route | `routes/otp.js` |
| Authentication | **None server-side.** Client-side hardcoded credentials + `localStorage` flag | `js/admin-login.js:33-47` |
| Deployment | Railway referenced in code/README but **no deployment config in repo** (no `railway.json`, `nixpacks.toml`, `Procfile`, `Dockerfile`, CI) | repo-wide search returned none |
| Env config | `gcare-backend/.env` (gitignored ✔): `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `DB_HOST/USER/PASSWORD/NAME/PORT`, `ADMIN_EMAIL`, `SENDER_NAME`, `EMAIL_FROM`, `FAST2SMS_API_KEY/ROUTE/SENDER_ID/TEMPLATE_ID`, `GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI/REFRESH_TOKEN/DRIVE_FOLDER_ID` | `.env` key listing; `config/*.js` |

### Architecture problems (verified)

1. **Two parallel data-access styles:** raw `mysql2` pool for admissions/affiliations/internships/otps vs Sequelize ORM for `contact_messages` only (`query/contactQuery.js` is additionally dead code — the live path is `contactService.js` → model). Two DB connections to the same database.
2. **Massive commented-out duplication:** every backend file and several HTML/JS files contain an entire prior implementation commented out (e.g., `app.js` lines 1–733, `contact.html` lines 1–431, `admin-dashboard.html` lines 1–142). High maintenance/confusion cost.
3. **Hardcoded configuration:** production API URL hardcoded in `admission-online.js:8`, `contact.js:492`, `home.js:203`, `admin-dashboard.js:21`, `internship-online.js:9-12`; only `affiliation.js:2-7` has an env switch. Admin email hardcoded `info@gcarecouncil.in` at `admissionEmailService.js` (~L70, L329) bypassing `ADMIN_EMAIL` env.
4. **No environment separation:** `config/config.js` defines identical dev/test/prod blocks; `config.js` (Sequelize) is loaded only through `models/index.js` which is only used by contact; no `.env.example`.
5. **Insecure configuration:** `GET /api/otp-config-status` publicly discloses which provider keys are configured; `POST /api/debug/contact` is an open echo endpoint; verbose request/PII logging (`ADMISSION REQUEST BODY`, `GENERATED MOBILE OTP`, `AFFILIATION FORM BODY`) writes applicant PII and OTPs to logs.
6. **Inconsistent API structure:** admission/internship status updates use `PUT /:id/status` but affiliation uses `PATCH /:id/status`; contact uses `PATCH /:id` for update. Response shapes differ (`{data}` vs `{count, data}` vs `{applicationId}`).
7. **Missing validation:** admission endpoint validates only required files + branch whitelist; no backend validation of mobile/email/aadhaar/pincode/age for admissions (all client-side only). Contact endpoint validates presence only — no format checks.
8. **Inconsistent error handling:** some routes return raw `error.message` to clients (leaking env-missing details); OTP send routes leak internal errors; affiliation returns `error` field; others return generic messages.
9. **Dead code layer:** `query/contactQuery.js`, `checkSchema.js`, `config/google-service-account.json` (present locally, gitignored, appears unused — Drive uses OAuth2 not the service account), a stray `Documents - Shortcut.lnk` inside `query/`, `uploads/admissions/internships` stray subdirectory.
10. **Unused dependency:** `nodemailer` is in `package.json` but no code imports it.

---

## 3. WEBSITE MODULE SCOPE ANALYSIS

| Module | Current Status | Existing Features | Missing Features | Issues | Recommended Enhancement |
|---|---|---|---|---|---|
| Home (`index.html`) | Existing | Hero slideshow, intro, gallery preview, register/login modal with email+mobile OTP | Server-side user registration (see §9 — registration is localStorage-only) | OTP calls work; `/api/check-email` call 404s silently (`home.js:365`) | Wire registration to a real users API or remove the modal |
| About (`about.html`) | Existing | Vision/mission, framework, governance — 26 sections of real content | — | Static copy-paste nav | CMS or leave static |
| Advisory/Team (`advisory.html`) | Existing | Member profiles + animation | — | LMS link points to `faculty-dashboard.html` while other pages use `href="#"` — nav drift | Normalize nav |
| Chairman (`chairman.html`) | Existing | Chairman's message | — | Same nav drift | — |
| Programmes (`programmes.html` + `programmes.js`) | Existing | ~1800-line hardcoded catalogue; tabs/cards/modal; syllabus links | Backend-driven catalogue | `defaultProgrammeImage` undefined (`programmes.js:2151`); entire old page commented out (lines 1–344) | Move catalogue to DB/CMS; fix undefined var |
| Training (`training-centers.html`) | Existing | 30 hardcoded district centres | — | Hardcoded data | CMS |
| Nursing programmes | Existing | `programmes.html#nursing` + `nursing-syllabus.html`, `diploma-nursing-syllabus.html` | — | Static syllabus duplication | Generate from one template/data source |
| Engineering programmes | Existing | `engineering/civil/mechanical/electrical-syllabus.html` | — | — | Same |
| Other programmes | Existing | 17 more syllabus pages (paramedical, xray, lab-tech, d-pharm, computer, teachers, home-science, 11 skill-sector pages) | — | `d-pharm` syllabus link broken; `beautician-syllabus-new.html` unlinked duplicate; `xray-syllabus.html` loads `syllabus.js` twice | Fix link map; remove duplicate |
| Admission (`admission-online.html`) | Existing | Full online form, OTP gating, uploads, pincode autofill | Status tracking for applicant; backend duplicate check | See §4 | See §4 |
| Affiliation (`affiliation.html`) | Existing | ~155-field form, conditional uploads, Drive storage, DB insert | Admin review UI; acknowledgement email; applicant status check | See §5 | See §5 |
| Contact/Enquiry (`contact.html`) | Partially Available | Enquiry form + dual OTP flow → `POST /api/contact` stored in DB | Separate enquiry module; course/enquiryType fields (commented out); admin notification email | Old 431-line commented version inside same file; no email notification on new enquiry | Enable enquiry fields + admin notify email |
| Gallery (`gallery.html`) | Existing | ~330 hardcoded images across 9 branches + defaults | Backend gallery management | Hardcoded `galleryData` | CMS/media admin |
| News / Events | **Missing** | — | Entire module | No `news.html`/`events.html` anywhere; no nav links | Build if in scope |
| Downloads (`downloads.html`) | Existing | Card grid + category filter via `download.js`; links to forms + 3 PDFs in `assets/forms/` | — | Hardcoded `formsData` | CMS |
| Footer | Existing | Consistent contact footer; admin-login link | — | © 2024 hardcoded | — |
| Navigation/submenu | Partially Available | 2-level nested programme submenu on 11 pages | — | 3 divergent nav variants (dropdown / flat / none); dead `href="#"` LMS links on several pages; `script.js` runtime-patches LMS link | Single shared nav partial or build step |
| Responsive design | Enhancement Required | All 17 CSS files have ≥1 `@media` query; viewport meta on all 43 pages | — | Weak coverage: `admin-login.css` (480 only), `syllabus.css` (768 only), `style.css` (992/768 only); `affiliation.css:219` `min-width:760px` table relies on scroll wrapper | Audit forms/tables on ≤480px |

Additional modules discovered: **Community Colleges** (`community-colleges.html`, 9 hardcoded branches), **Internship application** (`internship-online.html`), **Admin dashboard** (`admin-dashboard.html`), **Faculty dashboard** (`faculty-dashboard.html`, mockup), **LMS dashboard** (`lms-dashboard.html`, stub).

---

## 4. STUDENT ADMISSION MODULE

**Flow:** `admission-online.html` + `js/admission-online.js` (~3800 lines) → `POST /api/admissions` (multipart) → `controllers/admissionController.js` → `services/admissionService.js` → `query/admissionQuery.js` → `admissions` + `admission_documents` tables → `admissionEmailService.js` (admin notification).

| Aspect | Status | Evidence / Notes |
|---|---|---|
| Online admission form | ✅ Implemented | `admissionForm`, ~37 named fields (`admission-online.html:297`) |
| Personal details | ✅ | title, fullName, parentName, nationality, caste/otherCaste |
| Course selection | ✅ | `courseName` hidden field set via custom dropdown + `branch_name` select (9 branches, server-validated against whitelist — `admissionService.js:312-447`) |
| DOB / age | ✅ | `dob` + `dobDisplay` (DD-MM-YYYY auto-format), `age` readonly auto-calc |
| Age validation | ⚠️ Frontend only | 15–40 enforced in JS (`admission-online.js:3252-3280`); **not re-validated server-side** |
| Gender | ✅ | `gender` select |
| Blood group | ❌ Missing | Not present in form or schema |
| Mobile | ✅ | `mobile` (+`alternateOne`, `alternateTwo`); pattern `[6-9]\d{9}` client-side; **no backend format check** |
| Email | ✅ | client regex; **no backend format check** |
| Address / Pincode / District / State | ✅ | `presentAddress`, `permanentAddress`, `sameAddress`, `pinCode`, `state`, `district`, `place`; live autofill via `api.postalpincode.in` |
| Educational details | ✅ | academicLevel, educationCourse/Board/Subjects/Year/Grade |
| Document uploads | ✅ | `photoUpload` (jpg/png), `aadhaarUpload` (pdf), `educationCertificateUpload` (pdf), `parentSignature` (jpg/png); multer 5 MB, MIME filter (`admissionRoutes.js:129-160`) |
| Student photograph | ✅ | stored to `uploads/admissions/`; metadata in `admission_documents` |
| Student ID/document handling | ✅ | `application_no` UNIQUE; documents linked by `admission_id` FK (ON DELETE CASCADE) |
| Submit | ✅ | multipart POST; requires both OTPs client-side |
| Database storage | ✅ | `admissions` (33 cols) + `admission_documents` — verified in `admissionQuery.js` + `setupTables.js` |
| Duplicate validation | ❌ Missing | No unique check on email/mobile/aadhaar; `application_no` generated client-side from `GET /api/admissions` (`admission-online.js:166`) — **race condition + PII exposure** |
| API validation | ⚠️ Partial | Backend validates only: required files, branch whitelist. Everything else trusted from client |
| Backend validation | ⚠️ Partial | As above — aadhaar pattern, mobile, email, age, pincode not enforced server-side |
| Error handling | ✅ | Multer errors → 400 with friendly message; validation → 400; others → 500 |
| Confirmation | ✅ | JSON 201 + admin email flag |
| Email acknowledgement | ⚠️ Partial | Admin notification sent (`admissionEmailService.js`); **no acknowledgement email to the applicant on submission** (only on approve/reject) |
| Admin-side viewing | ✅ | `admin-dashboard.html` lists/searches/views/documents + approve/reject/delete |
| Status tracking | ⚠️ Admin-only | `status` Pending/Approved/Rejected via `PUT /:id/status`; applicant cannot check status |

**Frontend fields not stored:** `mobileOtpVerified`, `emailOtpVerified`, `mobileOtpType` are appended to FormData (`admission-online.js:3522-3551`) but `insertAdmission` has no columns for them — OTP verification is **not persisted**. `dobDisplay`, `courseSearchInput` are UI-only (fine). `declarationAccepted` checkbox is required client-side but has no DB column.

**Backend columns without direct frontend field:** `has_aadhaar` (present), `other_caste` (present), `telephone` (exists in schema; check form), `application_no` generated client-side rather than server-side.

**Critical issues:**
- `GET /api/admissions` is called **from the public admission page** to compute the next application number — the full applicant list (names, mobiles, emails) is retrievable by anyone, and the number can collide under concurrent submissions.
- Files stored on local disk `uploads/admissions` → **lost on Railway redeploy** (ephemeral FS); Drive integration exists but is only used for affiliation.

---

## 5. AFFILIATION MODULE

**Flow:** `affiliation.html` (~155 fields) + `js/affiliation.js` → `POST /api/affiliations` (multipart, memoryStorage) → `controllers/affiliationController.js` → Google Drive upload per file (`driveService.js`) → `services/affiliationService.js` → `affiliation_applications` table (auto-created via `CREATE TABLE IF NOT EXISTS` on every call).

| Aspect | Status | Evidence / Notes |
|---|---|---|
| Application form | ✅ | institution details, recognition sought, courses, building, power/water/toilets/tools, staff (staffA/staffB ×6), declarations, 13 enclosures |
| Institution details | ✅ | `institutionNameAddress`, `institutionSeekingRecognition`, `institutionType`, `applicationCategory` |
| Recognition details | ✅ | `recognitionFromDate`, `availableArea`, `yearFirstStarting`, sought/existing courses (JSON in `sought_courses`/`existing_courses`) |
| Building details | ✅ | `buildingType` (Own/Rent), `approvedPlan`, `stabilityCertificate`, `fireCertificate` |
| Infrastructure | ✅ | powerPhase, serviceConnectionNo, powerLoadKW, waterSupply, toilets, toolsList, separateWorkshopClassrooms |
| Required documents | ✅ | conditional: saleDeedFile if Own, rentalAgreementFile if Rent, buildingDocumentsFile if Available; signature always required |
| Institution head signature | ✅ | `institutionHeadSignature` required server-side (`affiliationController.js:722-728`) |
| Declaration | ✅ | `declarationAccept`/`declarationAccepted` accepted values true/on/1/yes (L697-720) |
| Frontend validation | ✅ | file-extension checks, conditional required uploads, declaration `setCustomValidity` (`affiliation.js`); **no file-size or text-field validation client-side** |
| Backend API | ✅ | POST/GET/GET:id/PATCH status/DELETE (`affiliationRoutes.js`) |
| Controller | ✅ | Required-field loop (16 fields), conditional file rules, staff/course row builders, enclosure builder |
| Service | ✅ | `affiliationService.js` — but **very thin**: only `executeQuery` wrapper + ensure-table; no field-level validation, no email logic |
| DB storage | ✅ **Verified insert path** | `insertAffiliationQuery` (32 columns) into `affiliation_applications`; courses/staff/enclosures/files stored as JSON in `LONGTEXT` columns |
| Google Drive storage | ✅ | `uploadAllFiles` → `uploadFileToDrive` per file → `{id, fileId, name, mimeType, webViewLink}` stored in `uploaded_files` JSON |
| Email acknowledgement | ❌ Missing | No email service imported in affiliation flow — neither applicant nor admin gets notified |
| Admin review | ❌ Missing | `admin-dashboard.js` has **zero affiliation code** (the commented-out v1 dashboard had it); API GET/PATCH/DELETE exist but unused |
| Approval/rejection | ⚠️ API exists | `PATCH /:id/status` accepts Pending/Approved/Rejected; no UI, no status email |
| Status tracking | ❌ Missing | No applicant-side check |

**MySQL storage answer:** yes — submissions are actually inserted into `affiliation_applications` (insert path fully wired: route → controller → service → query). The table is created idempotently on each request.

**Broken/incomplete flows:**
- Affiliation is a **write-only silo**: data goes in, nothing comes out to any UI or inbox. Admins would never know an application arrived (no email, no dashboard).
- **Method inconsistency:** affiliation status uses `PATCH`; admission/internship use `PUT` — a future admin UI must special-case it.
- Drive upload failure throws → entire submission 500s **after** some files may already be in Drive (partial orphan files; no compensation/cleanup).
- `enclosure_file_1`/`enclosure_file_2`/`enclosure_file_8` are **not in the multer field list** (`affiliationRoutes.js:193-250`) — enclosure 1/2/8 files are silently dropped if the form ever submits them.
- `google-service-account.json` exists locally but Drive uses OAuth2 — dead credential file (gitignored, but indicates confusion).

---

## 6. FORM AND API ANALYSIS

| Form | Frontend | API | Backend Controller | Service | DB Storage | Validation | Email/SMS | Status |
|---|---|---|---|---|---|---|---|---|
| Admission (`admissionForm`) | ✅ `admission-online.js` | ✅ `POST /api/admissions` | ✅ `admissionController` | ✅ `admissionService` | ✅ `admissions` + `admission_documents` | ⚠️ Files+branch only (server); rich client-side | ⚠️ Admin notify only; OTPs unenforced | **Works, insecure & partial validation** |
| Affiliation (`affiliationForm`) | ✅ `affiliation.js` | ✅ `POST /api/affiliations` | ✅ `affiliationController` | ✅ `affiliationService` | ✅ `affiliation_applications` | ⚠️ Required-fields + conditional files | ❌ None | **Works end-to-end; write-only** |
| Internship (`internshipForm`) | ✅ `internship-online.js` | ✅ `POST /api/internships` | ✅ `internshipController` | — (controller does it all) | ⚠️ `internship_applications` — **no setup script** | ✅ Strong server-side (age 15–20, PIN, phone, email) | ✅ Applicant + admin emails | **Works; age-rule mismatch w/ frontend (15–35)** |
| Contact (`enquiryForm`) | ✅ `contact.js` | ✅ `POST /api/contact` | ✅ `contactController` | ✅ `contactService` | ✅ `contact_messages` (Sequelize) | ⚠️ Presence-only (server) | ❌ None | **Works; OTP flow cosmetic** |
| OTP send/verify (all forms) | ✅ in 4 JS files | ✅ `/api/send-email-otp`, `/api/verify-email-otp`, `/api/send-mobile-otp`, `/api/verify-mobile-otp`, legacy `/api/send-otp`, `/api/verify-otp` | — (in route file) | `emailService`, Fast2SMS inline | ✅ `otps` table | ✅ format checks | Brevo + Fast2SMS | **Works; not enforced on submit** |
| Registration modal (`registrationForm`) | ✅ `home.js` | ❌ **`/api/check-email` 404**; OTPs OK | ❌ No user API | ❌ | ❌ localStorage | ✅ client-side | OTP emails | **Fake — client-side only** |
| Login modal (`loginForm`) | ✅ `home.js` | ❌ No API | ❌ | ❌ | ❌ localStorage plaintext password | ✅ | — | **Fake** |
| Admin login (`adminLoginForm`) | ✅ `admin-login.js` | ❌ No API | ❌ | ❌ | — | Hardcoded creds | — | **Fake, credentials exposed** |

**API/config risks:**
- `/api/check-email` — missing endpoint (silent 404 → treated as "not registered").
- `/api/debug/contact` — open echo endpoint left in production code.
- `/api/otp-config-status` — public info disclosure.
- Method inconsistency: `PUT` (admissions, internships) vs `PATCH` (affiliations) for status; `PATCH` for contact update.
- CORS allowlist: `localhost:5500`, `127.0.0.1:5500`, `localhost:3000`, `gcarecouncil.in`, `www.gcarecouncil.in` — does **not** include the Railway backend origin or any static-host preview domain; also `origin === "null"` explicitly allowed (loosens protection).
- Duplicate endpoints: `/api/send-otp` ↔ `/api/send-email-otp`, `/api/verify-otp` ↔ `/api/verify-email-otp` (both exist; contact/internship use legacy names, admission/home use new names).
- Hardcoded prod base URL in 6 JS files → local dev writes to production DB.
- No pagination on any `GET /` list endpoint (`SELECT *` / `findAll`).

---

## 7. DATABASE ANALYSIS

| Table | Purpose | Main Fields | Related Module | Issues |
|---|---|---|---|---|
| `admissions` | Student applications | `application_no` (UNIQUE), `branch_name`, `course_name`, personal/address/education fields, `status`, `created_at`, `updated_at` | Admission | No unique on mobile/email/aadhaar → duplicates; `application_no` client-generated (race); no `blood_group`; no OTP-verified columns despite flags sent; no indexes beyond PK/UNIQUE |
| `admission_documents` | Uploaded doc metadata | `admission_id` FK→admissions (CASCADE), `document_type`, `file_name`, `file_path`, `mime_type` | Admission | `file_path` is a **local filesystem path** — meaningless after redeploy; no `file_url`/`drive_file_id` |
| `affiliation_applications` | Affiliation submissions | 32 columns incl. `sought_courses`, `existing_courses`, `staff_present`, `staff_existing`, `enclosure_data`, `uploaded_files` (all `LONGTEXT` JSON), `status`, timestamps | Affiliation | JSON blobs → non-normalized, unqueryable; no applicant contact fields at all (no email/phone column → can't notify applicant); created via `CREATE TABLE IF NOT EXISTS` on every query call |
| `internship_applications` | Internship applications | `enrolment_number`, `centre_code`, `student_name`, `father_name`, `sex`, `date_of_birth`, `address`, `pin_code`, `phone_number`, `email`, `employment_details`, `candidate_signature`, `status` | Internship | **No CREATE script anywhere** — table must exist manually; schema only inferable from INSERT column list; no unique on enrolment_number/email; local signature path |
| `contact_messages` | Enquiries | `fullName`, `mobile(15)`, `email`, `address`, `city`, `message`, Sequelize timestamps | Contact | Sequelize `timestamps:true` → `createdAt/updatedAt` (camelCase) vs `created_at` elsewhere — inconsistent; `course`/`enquiryType`/`mobileOtpVerified`/`emailOtpVerified` referenced in dead `contactQuery.js` but not in model; table created only if `syncModels()` is run — **never called from `app.js`** |
| `otps` | OTP records | `email`, `mobile`, `otp`, `expiresAt` (BIGINT), `isVerified`, `otpType`, `createdAt` | OTP | Created/ALTERed on the fly in `routes/otp.js`; OTP **plaintext**; no `attempts` counter, no index on email/mobile (full scan per verify), never cleaned up |

**Missing tables (needed for planned scope):** `users`/`admin_users` (auth), `students`, `faculty`, `courses`, `programmes`, `subjects`, `batches`, `enrolments`, `attendance`, `assignments`, `assignment_submissions`, `exams`, `results`, `certificates`, `announcements`, `notifications`, `enquiries` (distinct from contact), `audit_logs`, `affiliation_documents` (normalized), `admission_status_history`.

**Integrity notes:** Only one FK exists (`admission_documents.admission_id`). No unique constraints beyond `application_no`. No soft-delete anywhere. No status-history/audit columns. Sequelize `sync({alter:false})` helper exists but is never invoked at startup, and `connectDB` is never called — the Sequelize connection for contacts is only established lazily on first query.

---

## 8. FILE UPLOAD / GOOGLE DRIVE ANALYSIS

| Aspect | Admissions | Internships | Affiliations |
|---|---|---|---|
| Storage | Local disk `uploads/admissions` | Local disk `uploads/internships` | **Google Drive** (memoryStorage → `drive.files.create`) |
| DB linkage | `admission_documents` rows w/ `file_path` | `candidate_signature` column path `/uploads/internships/<file>` | `uploaded_files` JSON `{fileId, webViewLink}` per field |
| Served via | `GET /uploads/*` static | `GET /uploads/*` static | Drive `webViewLink` (permissioning unverified — files uploaded to a Drive folder are not explicitly shared/public) |
| Size limit | 5 MB/file | 5 MB/file | 10 MB/file |
| MIME check | jpg/jpeg/png/pdf | jpg/jpeg/png (+extension check) | pdf/jpg/jpeg/png |
| Naming | `<ts>-<rand><ext>` | `candidate-<ts>-<rand><ext>` | `<ts>-<original>` on Drive |
| Failure handling | DB insert of doc row can fail silently (logged, continues) | 400 on multer error | **Throws → whole submission fails; partial Drive orphans possible** |
| Dedup/cleanup | None; deleting admission row leaves files on disk | Same | No Drive delete on application delete |

**Gaps:**
1. **Ephemeral storage risk (Critical for Railway):** `uploads/` lives inside the container filesystem; on redeploy all admission/internship documents vanish while DB rows still point to them.
2. Drive auth uses OAuth2 refresh token tied to a user account — quota/token-revocation fragility; service-account JSON exists but unused.
3. No MIME sniffing/content validation — filter trusts `file.mimetype` from client; a renamed `.exe` with image MIME passes.
4. `uploaded_files` links depend on Drive sharing settings — the code never calls `permissions.create`, so links may be inaccessible to reviewers.
5. Affiliation upload is sequential per file (slow for many enclosures) and non-transactional.

---

## 9. EMAIL / SMS / OTP ANALYSIS

### Email — **Implemented**

| Item | Status | Detail |
|---|---|---|
| Provider | ✅ Brevo HTTP API | `POST https://api.brevo.com/v3/smtp/email` via `fetch`, `api-key` header (`emailService.js`). **Not nodemailer/SMTP** (nodemailer dep unused) |
| Applicant ack | ⚠️ Internship only | `sendInternshipUserEmail`; admission has no submission ack (only status emails); affiliation/contact have none |
| Admin notification | ⚠️ Admission + Internship only | `sendAdminAdmissionNotification`, `sendInternshipAdminEmail`; **affiliation & contact → none** |
| Status emails | ✅ Admission + Internship | approve/reject to applicant + admin copy; sent only on Pending→Approved transition or Rejected |
| Error handling | ✅ | `Promise.allSettled`/try-catch; email failure doesn't fail submission |
| Env vars | ✅ | `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`/`EMAIL_FROM`/`EMAIL_USER`, `BREVO_SENDER_NAME`/`SENDER_NAME`, `ADMIN_EMAIL` |
| Issues | — | `admissionEmailService.js` **hardcodes** `info@gcarecouncil.in` (ignores `ADMIN_EMAIL`), **no HTML escaping** of applicant fields (HTML injection into emails); Brevo transport duplicated in two files |

### SMS / OTP — **Partially Implemented**

| Item | Status | Detail |
|---|---|---|
| Provider | ✅ Fast2SMS | `GET https://www.fast2sms.com/dev/bulkV2`, DLT route; api key in query string |
| OTP generation | ✅ | 6-digit, `Math.random()` (not crypto-secure) |
| Expiry | ✅ | 5 min |
| Resend | ⚠️ Frontend cooldown only | 30 s client-side timers; **no server cooldown/rate limit** |
| Attempt limits | ❌ None | Unlimited verify attempts → 6-digit brute-forceable |
| Verification | ✅ | `otps` table, `isVerified` flag |
| Mobile validation | ✅ | `[6-9]\d{9}` + repeated-digit/blocklist |
| **Enforcement** | ❌ **None** | No submission endpoint checks `isVerified` — verification is purely frontend; flags (`mobileOtpVerified:true`) in FormData are ignored by all controllers |
| Issues | — | OTP plaintext in DB; mobile OTP + Fast2SMS response `console.log`ged; missing env → 500 with raw error to client; `isVerified` record returns success even if the submitted OTP is wrong/would-be expired |
| Production readiness | ⚠️ | Fast2SMS DLT sender/template required (env vars defined); missing config fails hard rather than degrading |

---

## 10. SECURITY GAP ANALYSIS

| # | Finding | Severity | Evidence |
|---|---|---|---|
| 1 | **No authentication on any API** — list/get/update-status/delete for admissions, internships, affiliations, contacts are public; applicant PII + document URLs retrievable by anyone | **Critical** | `routes/*.js` — zero auth middleware; `admin-dashboard.js` sends no credentials |
| 2 | **Fake admin auth** — hardcoded `infotech@gcarecouncil.in`/`admin123` in client JS; `localStorage.adminLoggedIn` gate is trivially bypassed | **Critical** | `js/admin-login.js:33-47`, `js/admin-dashboard.js:7-14` |
| 3 | **`GET /api/admissions` consumed by the public admission page** to derive next application number — full PII list exposed + duplicate-number race | **Critical** | `admission-online.js:164-217`; `admissionQuery.js` `fetchAdmissions` |
| 4 | **OTP system weaknesses** — `Math.random()`, plaintext DB storage, no attempt limit/rate limit/cooldown, OTP `console.log`ged, verification never enforced by any submission endpoint | **High** | `routes/otp.js` L697-701, L784-795, L1307; controllers grep shows no `isVerified` check |
| 5 | **Ephemeral uploads + open `/uploads` static dir** — documents lost on redeploy; directory served with no access control (guessable names are timestamp-random, mitigating enumeration) | **High** | `app.js:946-951`, `routes/admissionRoutes.js`, `routes/internshipRoutes.js` |
| 6 | **PII + secrets in logs** — full request bodies (Aadhaar, addresses), OTPs, Fast2SMS responses, uploaded-file metadata logged | **High** | `admissionController.js:138-148`, `otp.js` L1040/L1307, `affiliationRoutes.js:310-320` |
| 7 | **Info disclosure endpoints** — `/api/otp-config-status` reveals provider config; `/api/debug/contact` echo; 500s return `error.message` (env-missing details) | **Medium** | `app.js:1049-1165`, `otp.js` error handlers, `affiliationController.js:914-917` |
| 8 | **Client-side plaintext password storage** — `gcareRegisteredUsers` in localStorage incl. passwords | **High** | `home.js:256-268, 1037-1047` |
| 9 | **CORS** — `origin === "null"` allowed; whitelist misses Railway/preview origins; `credentials:false` OK | **Medium** | `app.js:751-801` |
| 10 | **No HTML escaping in admission emails** → HTML/stored-XSS injection into admin inbox | **Medium** | `admissionEmailService.js` (cf. `escapeHtml` in `internshipEmailService.js:29-53`) |
| 11 | **File upload hardening** — MIME filter trusts client header; no content sniffing; PDF allow includes any PDF (fine) but no AV scanning; Drive files' share-permissions unset | **Medium** | routes multer configs, `driveService.js` |
| 12 | **No security headers / rate limiting / helmet** | **Medium** | not in `package.json`, not in `app.js` |
| 13 | **Secrets hygiene (repo)** — `.env` and `google-service-account.json` are gitignored ✔ and not tracked ✔; but `.env` contains real-looking keys locally (never commit); hardcoded admin email fallback widespread | **Low-Medium** | `.gitignore`, `git ls-files` |
| 14 | **SQL injection** — all queries parameterized (`?` placeholders / Sequelize) | **Low** | `query/*.js` — clean |
| 15 | **XSS (frontend)** — admin dashboard uses `escapeHtml` for table rendering ✔; mostly `textContent` usage | **Low** | `admin-dashboard.js:254-284` |
| 16 | **CSRF** — tokenless JSON APIs + CORS allowlist; state-changing ops have no CSRF concern without cookies, but no auth at all makes it moot until auth exists | **Low** | — |
| 17 | **Session/JWT, password hashing, RBAC, audit logging, input sanitization lib, secure headers** — all absent | covered above | `package.json` |

---

## 11. UI/UX AND RESPONSIVENESS GAP ANALYSIS

| Area | Finding |
|---|---|
| Desktop | Complete, visually rich pages; consistent branding |
| Tablet | Reasonable — most CSS has 992/768 breakpoints |
| Mobile | **Enhancement Required** — weakest coverage: `admin-login.css` (only 480px), `syllabus.css` (only 768px), `style.css` (only 992/768). `affiliation.css:219` `min-width:760px` tables rely on `.table-scroll` — test on ≤480px |
| Navigation | 3 divergent nav variants (full dropdown on 11 pages / flat on form+syllabus pages / none on dashboards); LMS link inconsistent (`href="#"` dead vs `faculty-dashboard.html`); `script.js` patches it at runtime — fragile |
| Dropdown menus | Nested 2-level programme submenu exists on dropdown variant; syllabus pages get flat nav only |
| Forms | Good client-side UX: inline errors, OTP timers, pincode autofill, custom course dropdown, DD-MM-YYYY formatter |
| Tables | Admin dashboard responsive table + modal; affiliation page wide tables scroll |
| Modals | Registration/login modal, course modal, details modal — `role="dialog"`, `aria-modal` on main modal |
| Buttons/messages | Loading states on submit; success/error banners exist; **fake submit** in `script.js` for `#contactForm` (`alert("Form submitted successfully.")` — dead stub) |
| Accessibility | `<label for>` on main forms; affiliation table inputs lack labels; alt text present on static imgs (JS-injected gallery alts depend on gallery.js); some ARIA on modal/dropdowns; **no skip-nav**; no `aria-current` |
| Visual consistency | Per-page CSS files, mostly consistent theme; `admission-online.html` omits `style.css` → header/nav styling differs from other pages |
| Dead UI | `lms-dashboard.html` orphan stub; `beautician-syllabus-new.html` unlinked duplicate; commented-out markup blocks in contact/programmes/admin-dashboard |

---

## 12. LMS GAP ANALYSIS

**Verdict: no LMS implementation exists.** No React app, no LMS routes/controllers/models, no student/faculty user tables. Only two frontend artifacts exist:

- `lms-dashboard.html` — 67-line placeholder ("Welcome to the LMS dashboard" + Back to Home). Nothing links to it.
- `faculty-dashboard.html` + `faculty-dashboard.js` — static mockup: hardcoded stats/courses/schedule/assignments; sidebar menu routes all non-dashboard items to a generic "under development" placeholder; **zero API calls**.
- `home.js` registration/login — client-side-only fake auth against `localStorage`; login redirects to `faculty-dashboard.html`, which doesn't even check the flag.

| LMS Feature | Student | Faculty | Admin | Status |
|---|---|---|---|---|
| Auth/profiles | ❌ | ❌ | ❌ | Missing (fake localStorage only) |
| Courses/subjects | ❌ | mockup | ❌ | Missing |
| Study materials | ❌ | mockup | ❌ | Missing |
| Attendance | ❌ | mockup | ❌ | Missing |
| Assignments/submission/eval | ❌ | mockup | ❌ | Missing |
| Exams/results/progress | ❌ | mockup | ❌ | Missing |
| Certificates | ❌ | — | ❌ | Missing |
| Announcements/notifications | ❌ | mockup | ❌ | Missing |
| Enrolment/batches/masters | — | — | ❌ | Missing |
| Reports/roles/permissions | — | — | ❌ | Missing |

All LMS features classify as **Missing** except a faculty-dashboard **UI mockup** (Enhancement/throwaway prototype). The planned React.js LMS does not exist in this repo — no `package.json`, `src/`, `vite`/`react` deps anywhere in `gcare-frontend`.

---

## 13. ADMIN PANEL GAP ANALYSIS

`admin-dashboard.html` + `admin-dashboard.js` (real API wiring, behind a fake localStorage "login"):

| Capability | Status | Notes |
|---|---|---|
| View students (admissions) | ✅ | `GET /admissions`, stat counters, table |
| Search students | ✅ | Client-side filter on `searchInput` |
| Edit students | ❌ | No edit endpoint/UI |
| Approve admissions | ✅ | `PUT /admissions/:id/status` Pending/Approved/Rejected + emails |
| View affiliation applications | ❌ | **No affiliation UI** (v1 commented code had it) |
| Review uploaded documents | ⚠️ | Admission docs link to `/uploads/...` (breaks after redeploy); affiliation Drive links not shown anywhere |
| Approve/reject affiliation | ❌ | API exists (`PATCH`), no UI |
| Manage internships | ✅ | list/view/approve/reject/delete |
| Manage programmes/courses | ❌ | Hardcoded in `programmes.js` |
| Manage website content | ❌ | No CMS |
| Manage enquiries | ❌ | `GET /api/contact` exists but no UI consumes it |
| Reports / export | ❌ | None |
| Manage users/roles | ❌ | None |
| Activity logs | ❌ | None |
| Auth protection | ❌ | Fake (see §10) |

---

## 14. DEPLOYMENT AND ENVIRONMENT ANALYSIS

| Item | Finding |
|---|---|
| Local env | `nodemon app.js` (dev script); Live Server `:5500` expected by CORS |
| Prod config | Frontend → `backend-production-c5cb.up.railway.app` (hardcoded); README says Railway — **but no `railway.json`, `nixpacks.toml`, `Procfile`, `Dockerfile`, or CI in repo** |
| Frontend deploy | Static files; unknown host (likely on `gcarecouncil.in`); no build step |
| MySQL | External `DB_HOST` env; no migration runner — manual `setupTables.js`/`createAffiliationTable.js`/`recreateAdmissionTables.js`/`checkSchema.js` scripts; `internship_applications` + `contact_messages` have no setup script |
| Env vars | All config via `.env` (gitignored); no `.env.example`; identical dev/test/prod config blocks |
| Start commands | `npm start` → `node app.js` (exists); engines node≥18 |
| CORS | Allowlist: localhost×3, gcarecouncil.in, www — works for production domain; **local-file (`file:`) + other preview hosts blocked except `"null"` origin** |
| **Local-vs-prod divergence (why things break in prod)** | (1) `uploads/` ephemeral on Railway — works locally, files vanish in prod; (2) only `affiliation.js` switches base URL — all other forms hit prod API even locally; (3) `contact.html` legacy commented script posts to `https://gcarecouncil.in/api/contact` — implies API also expected behind main domain; mismatch between Railway URL and domain URL in different code versions; (4) Drive OAuth refresh token must be valid in prod env; (5) `internship_applications`/`contact_messages` tables only exist if manually created/Sequelize-synced |

---

## 15. TESTING GAP ANALYSIS

No `test`/`spec` files, no test framework (`jest`, `mocha`, `vitest`, `supertest`, `cypress` absent from `package.json`), no `test` script. Zero coverage.

| Testing Area | Existing | Missing | Recommended Test |
|---|---|---|---|
| Unit tests | ❌ | All | service/query layer with mocked db |
| API tests | ❌ | All | supertest: 201/400 paths per endpoint |
| Integration tests | ❌ | All | admission end-to-end incl. document rows |
| Frontend tests | ❌ | All | OTP gating, pincode autofill, conditional uploads |
| Validation tests | ❌ | All | boundary cases (age 15/20, PIN, mobile blocklist) |
| Form submission tests | ❌ | All | multer size/type rejection |
| DB tests | ❌ | All | schema existence, FK cascade, unique `application_no` |
| Smoke tests (prod) | ❌ | All | `/test`, `/api/otp-config-status`, one submit per form on deploy |

---

## 16. MASTER FEATURE GAP TABLE

| No. | Module | Feature | Existing | Partial | Missing | Enhancement | Priority | Recommendation |
|---|---|---|---|---|---|---|---|---|
| 1 | Security | Backend auth (JWT/session) + admin route protection | | | ✔ | | **P0** | PII endpoints are public — must precede anything else |
| 2 | Security | Real admin login (hashed creds, server-issued token) | | | ✔ | | **P0** | Hardcoded client creds visible to all |
| 3 | Files | Durable storage for admission/internship docs (Drive/S3) | | ✔ | | | **P0** | Current files die on redeploy; Drive code already exists — reuse it |
| 4 | API | Stop public `GET /admissions`; server-side `application_no` generation | | | | ✔ | **P0** | PII exposure + race |
| 5 | OTP | Server-side enforcement on submit + attempt limits + crypto RNG | | ✔ | | | **P1** | OTP infra exists but is cosmetic |
| 6 | Affiliation | Admin review UI + notification emails | | ✔ | | | **P1** | Data flows into a silo |
| 7 | Contact | Admin notification + enquiry fields (`course`, `enquiryType`) | | ✔ | | | **P1** | Enquiries are silently stored |
| 8 | Admission | Applicant ack email + status-check page | | ✔ | | | **P1** | UX expectation for applications |
| 9 | Security | Rate limiting + helmet + remove `/api/debug/contact`, restrict `/api/otp-config-status` | | | ✔ | | **P1** | OTP/abuse surface |
| 10 | Frontend | Centralize `API_BASE_URL` (env-driven) | | | | ✔ | **P1** | Local dev writes to prod |
| 11 | Frontend | Fix `d-pharm` syllabus link; undefined `defaultProgrammeImage` | | | | ✔ | **P1** | Live 404 + ReferenceError |
| 12 | Validation | Server-side field validation for admission/contact | | ✔ | | | **P1** | Client checks bypassable |
| 13 | DB | Setup script for `internship_applications`, `contact_messages`; migrations | | ✔ | | | **P1** | Tables exist only if manually created |
| 14 | DB | Unique constraints (mobile/email/aadhaar, enrolment_no) + indexes | | | ✔ | | **P1** | Duplicate prevention |
| 15 | Code | Delete ~50% commented-out dead code; dedupe email transports; drop `query/contactQuery.js`, `checkSchema.js`, service-account JSON, `nodemailer` dep | | | | ✔ | **P2** | Maintenance risk |
| 16 | Admin | Extend dashboard: affiliations + contacts + pagination | | ✔ | | | **P1** | Exists for 2 of 4 modules |
| 17 | Website | News/Events module | | | ✔ | | **P3** | If in scope |
| 18 | Website | CMS for programmes/gallery/centres/downloads | | | ✔ | | **P2** | Currently 4+ hardcoded data arrays |
| 19 | Website | Unify nav (3 variants); consistent LMS link | | | | ✔ | **P2** | Drift already caused dead links |
| 20 | Frontend | Blood group field; fix internship age rule parity (15–20 vs 15–35) | | | | ✔ | **P2** | Spec mismatch between FE/BE |
| 21 | UX | Affiliation/enclosure label a11y; mobile form/table pass ≤480px | | | | ✔ | **P3** | |
| 22 | LMS | Entire LMS (React planned) | | | ✔ | | **P2/P1*** | *P1 if LMS is the business driver; currently nothing exists |
| 23 | Users | `users`/`admin_users` tables, RBAC, audit log | | | ✔ | | **P1** | Prerequisite for admin+LMS |
| 24 | Infra | Deployment manifest + `.env.example` + prod health/monitoring | | | ✔ | | **P2** | Reproducibility |
| 25 | Tests | Test suite (all layers) | | | ✔ | | **P2** | Zero coverage today |
| 26 | Admission | Duplicate-application check (aadhaar/email) | | | ✔ | | **P2** | |
| 27 | Files | MIME sniffing + Drive share-permission handling + delete cleanup | | | | ✔ | **P2** | Reviewers may not be able to open links |
| 28 | OTP | Stop logging OTPs/PII; scrub error messages | | | | ✔ | **P1** | Compliance/log hygiene |

*Priority rationale: P0 = exploitable today or data-loss risk; P1 = core flows incomplete/insecure for real users; P2 = quality/maintainability; P3 = cosmetic/new scope.*

---

## 17. FRONTEND VS BACKEND INTEGRATION MATRIX

| Feature | Frontend | API | Backend Logic | DB Connected | Fully Working | Gap |
|---|---|---|---|---|---|---|
| Admission submit | ✅ | ✅ | ✅ | ✅ | ⚠️ | OTP unenforced; public list exposure; ephemeral files; no applicant email |
| Admission list/status/delete (admin) | ✅ | ✅ | ✅ | ✅ | ✅* | *works but unauthenticated |
| Affiliation submit | ✅ | ✅ | ✅ | ✅ (+Drive) | ✅ | — |
| Affiliation review UI | ❌ | ✅ | ✅ | ✅ | ❌ | API-only; no UI, no email |
| Internship submit | ✅ | ✅ | ✅ | ⚠️ (no DDL script) | ✅ | age-rule FE/BE mismatch; local-file storage |
| Internship admin | ✅ | ✅ | ✅ | ✅ | ✅* | *unauthenticated |
| Contact/enquiry | ✅ | ✅ | ✅ | ✅ | ⚠️ | no notification email; OTP cosmetic |
| Email OTP | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Mobile OTP (Fast2SMS) | ✅ | ✅ | ✅ | ✅ | ⚠️ | weak OTP mechanics; not enforced |
| User registration | ✅ | ❌ | ❌ | ❌ | ❌ | `/api/check-email` 404; localStorage only |
| User login | ✅ | ❌ | ❌ | ❌ | ❌ | fake |
| Admin login | ✅ | ❌ | ❌ | ❌ | ❌ | hardcoded creds |
| Admin dashboard (admission+internship) | ✅ | ✅ | ✅ | ✅ | ⚠️ | no affiliation/contact tabs; no auth |
| Faculty dashboard | ✅(mock) | ❌ | ❌ | ❌ | ❌ | static mockup |
| LMS dashboard | ✅(stub) | ❌ | ❌ | ❌ | ❌ | placeholder |
| Programmes catalogue | ✅ | ❌ | ❌ | ❌ | ✅(static) | UI-only, hardcoded |
| Gallery | ✅ | ❌ | ❌ | ❌ | ✅(static) | hardcoded |
| Training centres | ✅ | ❌ | ❌ | ❌ | ✅(static) | hardcoded |
| Downloads | ✅ | ❌ | ❌ | ❌ | ✅(static) | hardcoded |

**UI-only features:** registration/login, admin login, faculty dashboard, LMS stub, programmes/gallery/centres/downloads (static data).
**Backend-only features:** affiliation list/status/delete APIs, contact CRUD beyond create, `otps` table, `/api/otp-config-status`, `/api/debug/contact`.

---

## 18. CURRENT SCOPE

### Completed Scope (verified working end-to-end)

- Public informational website: home, about, chairman, advisory, community colleges, training centres, programmes + 24 syllabus pages, gallery, downloads, contact pages.
- Student admission: online form → OTP (email+mobile) UX → multipart upload → MySQL `admissions`/`admission_documents` → admin email → admin dashboard review/approve/reject/delete → status emails.
- Affiliation: full form → conditional validation → Google Drive upload → `affiliation_applications` insert → status API.
- Internship: form → validation → upload → `internship_applications` insert → applicant+admin emails → admin review/status/delete.
- Contact enquiry → `contact_messages` insert.
- OTP infrastructure (Brevo + Fast2SMS) with expiry + verification endpoints.
- Health-check + config-status endpoints; CORS allowlist; request logging; global 404/error handlers.

### Partially Completed Scope

- OTP security (works but unenforced/weak mechanics).
- Admin dashboard (covers admissions + internships only).
- Email notifications (missing for affiliation & contact; no applicant ack for admission).
- Responsive design (present but thin on login/syllabus/base CSS).
- Backend validation (strong for internship, weak for admission/contact).
- File storage (affiliation durable; admission/internship ephemeral).

### Development in Progress (evidence of half-done work)

- LMS (stub + faculty mockup).
- User accounts/registration (frontend-only).
- Enquiry module fields (`course`, `enquiryType` — commented out).
- Affiliation admin UI (present in commented v1 dashboard code).
- Duplicate `beautician-syllabus-new.html` draft.

### Planned / Not Started

- React LMS (all of §12), real auth/RBAC, users DB, reports/export, CMS, news/events, audit logging, tests, deployment manifests, server-side duplicate checks, pagination, applicant status tracking.

---

## 19. RECOMMENDED FUTURE SCOPE

Ordered by dependency, mapped to findings:

1. **Authentication & RBAC** — `users`/`admin_users` tables, bcrypt hashing, JWT/session, route middleware, real admin login, role model (admin/faculty/student/centre). *Blocks everything else — all data endpoints are currently public.*
2. **Document management hardening** — migrate admission/internship uploads to Drive (existing `driveService`) or object storage; store URLs/IDs; set Drive sharing permissions; cleanup on delete.
3. **Complete admission workflow** — server-side `application_no`, duplicate check (aadhaar/email/mobile), applicant ack email, applicant status-check page, backend field validation, blood-group field if required.
4. **Complete affiliation workflow** — admin review UI (reuse dashboard pattern), applicant contact fields in schema + ack/notification emails, fix enclosure fields 1/2/8, Drive-failure compensation.
5. **Admin dashboard expansion** — affiliation + contact/enquiry tabs, pagination, export (CSV), activity/audit log.
6. **Notification centre** — unify email transports; applicant acks everywhere; SMS confirmations optional via existing Fast2SMS.
7. **Enquiry management** — enable `course`/`enquiryType` columns + admin notify + admin UI.
8. **OTP hardening** — crypto RNG, hash OTPs, attempt limit + resend cooldown, enforce `isVerified` on submit, stop logging OTPs.
9. **LMS foundation** — auth + users + masters (programmes/courses/subjects/batches) + enrolment, then academic features per §12 target list.
10. **CMS / master data** — move programmes, gallery, training centres, downloads to DB-driven admin-managed content.
11. **Production hardening** — helmet, rate limits, sanitized errors, remove debug endpoints, `.env.example`, deploy manifest, DB migration tool, monitoring/log hygiene.
12. **Automated testing** — per §15 table.
13. **Frontend structure** — single API base config, shared nav partial, remove dead code/pages; consider the planned React migration only for the LMS/admin, keeping the static site lean.

---

## 20. DEVELOPMENT ROADMAP

### Phase 1 – Critical Fixes (P0)
- Add auth middleware + real admin login (bcrypt + JWT); protect all non-POST routes.
- Remove public `GET /api/admissions` usage; move `application_no` generation server-side.
- Move admission/internship file storage to durable storage (Drive/S3); keep `/uploads` for dev only.
- Kill `/api/debug/contact`; restrict `/api/otp-config-status`; stop logging OTPs/PII.
- Fix `d-pharm` syllabus link; fix `defaultProgrammeImage` ReferenceError.

### Phase 2 – Core Website Completion (P1)
- Server-side validation parity for admission/contact; OTP enforcement on submit; OTP attempt/cooldown limits + crypto RNG.
- Applicant ack emails (admission/affiliation/contact); affiliation notification emails + contact notification.
- Create `internship_applications`/`contact_messages` DDL scripts; add unique constraints + indexes; centralize `API_BASE_URL`; unify nav; align internship age rule FE↔BE.
- Enclosure fields 1/2/8 in affiliation multer list; Drive share-permission handling.

### Phase 3 – Admin Management (P1)
- Affiliation + contact modules in admin dashboard; document viewer using durable URLs; pagination + CSV export; enquiry fields; audit log table + middleware.

### Phase 4 – LMS Foundation (P2)
- `users`/roles + login for student/faculty/centre; masters (programme/course/subject/batch); enrolment; separate React app (per plan) consuming secured APIs.

### Phase 5 – LMS Academic Features (P2)
- Study materials, attendance, assignments + submissions, exams, results, progress, certificates, announcements, notifications — per §12 matrix.

### Phase 6 – Production Hardening (P1–P2)
- Helmet, rate limiting, sanitized error responses, secret rotation, DB migrations tool, backups, monitoring, CI, test suite, staging env, dead-code cleanup.

---

## 21. FINAL GAP SUMMARY

1. **What currently works:** static website; admission/internship forms end-to-end incl. DB, uploads, admin review + status emails; affiliation submit → Drive → DB; contact → DB; OTP send/verify (Brevo + Fast2SMS); admin dashboard for 2 of 4 modules.
2. **What partially works:** OTP (functional but unenforced, weak), emails (missing on affiliation/contact), admin panel (2/4 modules), file storage (affiliation durable only), validation (internship-only server-side), responsiveness (thin in places).
3. **What is broken:** `/api/check-email` (404, silent); `d-pharm` syllabus link (404); `defaultProgrammeImage` (ReferenceError); internship age rule FE/BE mismatch; enclosure fields 1/2/8 dropped; registration/login (fake); admin auth (fake); local dev points at prod API.
4. **What is missing:** all authentication/authorization, users/RBAC/audit, entire LMS, affiliation & contact admin UIs + notification emails, applicant status tracking, enquiry fields, news/events, CMS, reports/export, tests, deploy manifests, DB setup for 2 tables, pagination, duplicate checks, rate limiting, security headers.
5. **Fix immediately:** public PII endpoints (auth), hardcoded admin creds, ephemeral uploads, OTP logging + non-enforcement, debug/info endpoints, broken links/JS errors.
6. **Develop next:** admin coverage for affiliation+contact, acknowledgement emails, server-side validation, durable storage migration, then auth/RBAC foundation for LMS.
7. **Production blockers:** (a) unauthenticated PII APIs incl. delete/status; (b) fake admin login; (c) ephemeral document storage on Railway; (d) missing DB tables (`internship_applications`, `contact_messages`) requiring manual creation; (e) no rate limiting on OTP/send endpoints; (f) secrets/PII in logs; (g) hardcoded prod URLs preventing safe local testing.
8. **Recommended architecture improvements:** single config module + `.env.example`; remove ~50% dead code and dual data-access stacks (pick mysql2 promise pool OR Sequelize); shared email transport; shared auth middleware + `requireRole`; normalized document table (`application_documents` with drive_id/url) instead of JSON blobs; migrations (e.g., `node-pg-migrate`-style/sequelize-cli); service layer for OTP verification shared by all submissions; helmet + express-rate-limit; structured logging without PII; paginated list endpoints; a thin admin SPA or server-rendered admin rather than public-page + localStorage model.

---

*Report generated from static source analysis of `gcare-frontend` and `gcare-backend`. Runtime behavior (live Railway deployment, actual env values, real DB state) was not exercised; findings cite repository evidence only.*
