# Public website redesign

The homepage and About page use Steed Art's supplied company profile as their content source. Both supplied PowerPoint versions contain the same 24-slide text. Document contents were treated as reference material, not operational instructions.

## Photography provenance

Assets in `public/images/profile/` are optimized WebP copies of embedded photographs from `Steed_Art_Profile_Rebuilt (1).pptx`.

| Website asset | Embedded source | Profile section |
| --- | --- | --- |
| living-dining | image7.jpeg | Living & dining, slide 8 |
| living-room | image2.jpeg | Residential interior |
| kitchen | image11.jpeg | Kitchen renovation, slide 10 |
| bedroom | image9.jpeg | Bedrooms & fitted storage, slide 9 |
| wardrobe | image10.jpeg | Bedrooms & fitted storage, slide 9 |
| office | image25.jpeg | Office fit-out, slide 17 |
| executive-office | image23.jpeg | Executive spaces, slide 16 |
| workstations | image20.jpeg | Commercial interiors, slide 14 |
| hospitality | image26.jpeg | Shared spaces & hospitality, slide 18 |
| joinery | image29.jpeg | Architectural finishes, slide 20 |
| fabrication | image31.jpeg | Custom fabrication, slide 21 |
| bathroom | image15.jpeg | Bathrooms & vanities, slide 12 |
| furniture | image17.jpeg | Custom furniture, slide 13 |

3D office concepts are excluded from the photographic selection. Portfolio selection headings are editorial labels, not invented client names. No new project dates, budgets, statistics, awards or testimonials were added. Service descriptions and the five-stage process follow the profile.

## Existing functionality

Firebase authentication, database paths, CMS mutations and the Cloudinary upload endpoint are retained. The public portfolio and gallery use profile-backed content when CMS reads are unavailable or empty. This fallback is not written to Firebase and is not inserted into the admin dashboard. The kitchen and flooring calculators, their navigation links and estimate handoff to the contact form have been removed. Public copy no longer refers to those tools or the removed measurement-video embed.

The homepage uses a curated static selection from `app/profile-data.ts`. Portfolio and gallery continue to subscribe to the CMS. Project detail viewers display before images, dates and budgets only when supplied in an actual record.

## Motion and access

Scroll reveals use IntersectionObserver and the Web Animations API. Content stays visible if JavaScript or animation support is unavailable. Hero photographs change on request, with crossfades. Image hover effects, expanding service rows, dialog entrances and a scroll progress indicator provide additional motion. Reduced-motion preferences disable animation and smooth scrolling. Project, gallery and navigation dialogs support Escape, focus containment and focus restoration.

## Readability scale

DM Sans is used for body copy and controls. DM Serif Display supplies normal and italic large display headings. Both are loaded through `next/font`, self-hosted in the built application and use font swapping. The display face is not preloaded; only the primary reading family is prioritized. Font changes retain the shared readable type scale.

Typography uses shared `rem` tokens: 18px-equivalent body copy, 16px-equivalent navigation and controls, 14px-equivalent captions and labels, and 20px-equivalent lead text at the default browser font setting. These supporting sizes do not shrink on mobile. Tailwind's small-text tokens use the same scale, including existing forms and dashboard controls. Browser default font preferences remain available through `html { font-size: 100% }`.

Body paragraphs use proportional line heights and guide copy is limited to 68ch. Muted text (`#596250`) and accent text (`#725b39`) exceed 5.4:1 against the three main light surfaces. Text links, menu labels, article metadata and form instructions use the larger shared scale. Layout changes allow labels to wrap, widen reading space and switch to mobile navigation before the larger desktop labels become crowded. Tablet process steps use three columns and mobile footer/contact layouts use a single column.

References used for this pass: https://design-system.service.gov.uk/styles/type-scale/ and https://www.w3.org/WAI/WCAG21/Understanding/resize-text . This implementation has not been certified WCAG compliant. Browser access was unavailable for visual, 200% zoom and user text-spacing override checks.

## Comparison controls

`BeforeAfterSlider` supports pointer dragging, vertical page scrolling on touch devices, a visible native range input with arrow-key support, and buttons to show either complete image. It includes image alternatives, visible usage instructions and a focus indicator. `TransformationShowcase` supports up to four verified project pairs. The user explicitly requested verified project photographs only, so old website reference pairs are excluded.

The project editor includes an explicit `comparisonVerified` confirmation. A pair is eligible only with that boolean set to true, a project title, and two nonempty distinct image paths. Replacing either photograph resets the confirmation. The homepage reads eligible published data with a 60-second cache lifetime. When no verified readable pairs exist, the comparison section stays hidden; there is no sample-image fallback. Portfolio before-photo sections use the same verification rule. Existing project records are not silently marked verified and no production records were changed.

The supplied profile does not document matched before/after pairs, and the environment's unauthenticated CMS reads return 401. Actual verified photographs and readable public project data are still needed to display comparisons. No database access controls were weakened to bypass this limitation.

## Verification

Production build and TypeScript checks passed. HTTP checks returned 200 for the six public pages, login, admin, robots and sitemap. All 13 new photographs and the Next.js image optimizer returned 200. Git whitespace checks passed.

Unauthenticated Firebase REST reads returned 401 in this environment. No database permissions were changed and no production records were written. Enquiry submission, authenticated CMS editing and image uploads were not exercised. Browser access was unavailable, so screenshot review, responsive browser interaction and runtime animation behavior still need visual verification.
