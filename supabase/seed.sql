-- Seed content for the iDM blog and managed pages. Safe to re-run (upserts on slug).

insert into public.idm_posts (slug, title, excerpt, content, cover_image, category, tags, author_name, read_minutes, featured, status, published_at) values
(
  'bulk-id-card-printing-checklist-for-schools',
  'The complete bulk ID card printing checklist for schools',
  'From collecting student data to final dispatch, here is the exact 9-step process schools use to ship thousands of error-free ID cards before the first bell.',
  E'## Why a checklist matters\n\nA school ID card run is deceptively complex: thousands of photos, spelling-sensitive names, class and section mappings, and a hard deadline. Most reprints happen because of data, not printing.\n\n## The 9 steps\n\n1. **Freeze the template.** Lock the design, logo position and field order before collecting data.\n2. **Collect data in one sheet.** Use a single spreadsheet with fixed column headers. iDM''s upload tool validates it automatically.\n3. **Standardise photos.** 300 DPI, plain background, filename = admission number.\n4. **Run validation.** Duplicate admission numbers, missing photos and mismatched sections are caught in seconds.\n5. **Digital proof.** Approve one card per class from the proof gallery.\n6. **Print & laminate.** 0.76 mm PVC, UV-protected lamination.\n7. **QC scan.** Every card is scanned against the data sheet.\n8. **Pack by class.** Cards are bundled per class/section with a manifest.\n9. **Dispatch & track.** Live tracking is shared with the school coordinator.\n\n## Timeline\n\nWith clean data, a 3,000-card school run ships from iDM Siliguri in 3-4 working days.',
  '/assets/industry-education.webp',
  'Guides', array['schools','id-cards','workflow'], 'iDM Team', 6, true, 'published', now() - interval '3 days'
),
(
  'pvc-vs-ntr-sheets-which-one-should-you-print-on',
  'PVC vs NTR sheets: which one should you print on?',
  'Both materials produce a durable card, but they behave very differently in inkjet and laser printers. A practical comparison for print vendors.',
  E'## The short answer\n\nUse **PVC inkjet sheets** if you print on Epson/Canon inkjet printers, and **NTR (non-tearable) sheets** if you print on laser printers or need a thinner, tear-resistant card.\n\n## Durability\n\nPVC cards at 0.76 mm are rigid and feel premium. NTR sheets are thinner (typically 200-300 microns) but cannot be torn by hand.\n\n## Cost per card\n\nNTR is cheaper per card and faster for laser workflows. PVC costs more but is the standard for photo IDs, RFID and smart cards.\n\n## iDM recommendation\n\n- Schools & corporates: PVC 0.76 mm\n- Events & visitor passes: NTR\n- Access control: PVC with RFID inlay',
  '/assets/products/pvc-ntr-sheets.webp',
  'Materials', array['pvc','ntr','materials'], 'iDM Team', 4, false, 'published', now() - interval '9 days'
),
(
  'how-print-vendors-scale-with-idm-software',
  'How print vendors scale from 500 to 50,000 cards a month with iDM software',
  'Order intake, data validation and plant tracking in one place. Here is how partner vendors remove the bottlenecks that cap their growth.',
  E'## The bottleneck is never the printer\n\nVendors usually own enough printing capacity. What limits them is chasing data on WhatsApp, re-entering it in Excel and re-printing errors.\n\n## What changes with the iDM platform\n\n- **Order intake** with a shareable upload link per customer.\n- **Automatic validation** that flags bad photos and duplicate rows.\n- **Plant dashboard** that shows every order''s stage: proof, print, QC, dispatch.\n- **Partner mobile app** to accept jobs and update status from the floor.\n\n## Results we see\n\nPartners typically cut reprints by 70% and turnaround time by half within the first quarter.',
  '/assets/software-platform.webp',
  'Software', array['vendors','software','growth'], 'iDM Team', 5, false, 'published', now() - interval '15 days'
),
(
  'rfid-vs-nfc-cards-for-access-control',
  'RFID vs NFC cards for access control: a buyer''s guide',
  '125 kHz or 13.56 MHz? Understand the difference before you order smart cards for your campus or office.',
  E'## Frequencies explained\n\n**125 kHz (LF RFID)** cards are read-only proximity cards, ideal for simple door access. **13.56 MHz (HF / NFC)** cards like MIFARE can store data and work with phones.\n\n## Choosing\n\n| Need | Pick |\n| --- | --- |\n| Basic door access | 125 kHz |\n| Cashless canteen / library | 13.56 MHz |\n| Phone tap-in | NFC |\n\n## Printing on smart cards\n\niDM prints on pre-inlaid PVC so the chip position never interferes with photos or text.',
  '/assets/products/rfid-nfc.webp',
  'Products', array['rfid','nfc','smart-cards'], 'iDM Team', 4, false, 'published', now() - interval '22 days'
),
(
  'lanyard-buying-guide-satin-tube-and-multicolour',
  'Lanyard buying guide: satin, tube and multicolour explained',
  'Width, material and print method change how a lanyard feels and how long it lasts. A quick guide for schools and event agencies.',
  E'## Materials\n\n- **Satin** — smooth, premium finish; best for corporates.\n- **Tube** — soft woven polyester; the value option for schools.\n- **Multicolour sublimation** — full-colour artwork edge-to-edge; perfect for events.\n\n## Widths\n\n12 mm, 16 mm and 20 mm are standard. 20 mm gives the largest print area for logos.\n\n## Attachments\n\nDog hook, bulldog clip and safety breakaway. Always specify breakaway for schools.',
  '/assets/products/lanyards.webp',
  'Products', array['lanyards','accessories'], 'iDM Team', 3, false, 'published', now() - interval '30 days'
),
(
  'event-badge-printing-in-48-hours',
  'How we print and ship 10,000 event badges in 48 hours',
  'A behind-the-scenes look at the iDM production floor during a large conference run — and the workflow choices that make it possible.',
  E'## The brief\n\nA 10,000-delegate conference, data arriving in batches until the night before.\n\n## Workflow\n\n1. Template locked a week earlier, variable data only.\n2. Batches validated on arrival and queued to multiple printers.\n3. QC scanning per batch instead of per run.\n4. Colour-coded packing by registration desk.\n\n## Lessons\n\nSplit the run, never the template. And print 3% spare blanks for on-site changes.',
  '/assets/industry-events.webp',
  'Case Studies', array['events','case-study'], 'iDM Team', 5, false, 'published', now() - interval '40 days'
)
on conflict (slug) do update set
  title = excluded.title, excerpt = excluded.excerpt, content = excluded.content, cover_image = excluded.cover_image,
  category = excluded.category, tags = excluded.tags, read_minutes = excluded.read_minutes, featured = excluded.featured;

insert into public.idm_pages (slug, title, description, eyebrow, hero_title, hero_sub, content, cta_label, cta_href, show_in_nav, status) values
(
  'privacy-policy', 'Privacy Policy', 'How iDM collects, uses and protects your information.', 'Legal', 'Privacy Policy',
  'We only collect what we need to fulfil your orders and reply to your enquiries.',
  E'## Information we collect\n\nWhen you fill a form on this website we store your name, phone number, email address, business name and message so that our team can respond.\n\n## How we use it\n\n- To reply to enquiries and prepare quotations.\n- To fulfil and track printing orders.\n- To send occasional product updates (you can opt out any time).\n\n## Storage & security\n\nData is stored in access-controlled databases. We never sell personal data to third parties.\n\n## Contact\n\nWrite to us at the address on our contact page to request access to or deletion of your data.',
  'Contact us', '/contact', false, 'published'
),
(
  'terms-of-service', 'Terms of Service', 'Terms that apply to orders placed with iDM.', 'Legal', 'Terms of Service',
  'Simple, transparent terms for every order.',
  E'## Orders & proofs\n\nProduction begins after written approval of the digital proof. Changes after approval may incur re-setup charges.\n\n## Data accuracy\n\nCustomers are responsible for the accuracy of names, photos and other variable data supplied.\n\n## Delivery\n\nDelivery timelines are estimates from the date of proof approval and full data receipt.\n\n## Payments\n\nAdvance as per quotation; balance before dispatch unless agreed otherwise in writing.',
  'Get a quote', '/contact', false, 'published'
),
(
  'partner-program', 'Partner Program', 'Become an iDM production or channel partner.', 'Partners', 'Grow with the iDM partner network',
  'Print vendors, entrepreneurs and institutions can plug into iDM materials, software and fulfilment.',
  E'## Who can partner\n\n- **Print vendors** who want a steady flow of orders and quality-checked materials.\n- **Entrepreneurs** starting an ID card business with zero inventory.\n- **Institutions** looking for a long-term printing partner.\n\n## What you get\n\n- Access to the iDM order platform and mobile app.\n- Wholesale pricing on PVC, lanyards and accessories.\n- Training and QC standards.\n\n## Next step\n\nFill the contact form and choose "Partnership" — our team will call within one working day.',
  'Apply now', '/contact', true, 'published'
)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description, eyebrow = excluded.eyebrow, hero_title = excluded.hero_title,
  hero_sub = excluded.hero_sub, content = excluded.content, cta_label = excluded.cta_label, cta_href = excluded.cta_href;
