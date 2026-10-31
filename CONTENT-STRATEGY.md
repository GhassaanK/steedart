# Steed Art content and discovery roadmap

## What is implemented

- `/blog`: journal hub, with server-rendered guide cards, client-side title/description search and topic filters.
- Six original question-led guide pages at `/blog/[slug]`.
- `/blog/editorial-policy`: sources, AI assistance disclosure, photography context and limits of general planning guidance.
- Homepage journal preview and navigation/footer links.
- A four-column desktop Renovation Guide menu, with matching mobile topic accordions. Navigation is generated from the same article and section registry: full-guide links open article pages and links marked 'In the guide' open specific sections. Topic headings link to the journal's topic overviews.
- Unique titles, descriptions, canonicals, social metadata, Blog/BlogPosting structured data and visible breadcrumbs matching BreadcrumbList markup.
- Sitemap entries derived from the content registry. No invented publication or review dates.

All full article bodies are server-rendered. Topic filters do not create indexable query-string variants. Unknown article slugs return a real not-found response. Existing authentication, forms and database writes are unchanged.

The articles are file-managed in `app/blog/content.ts`. They are not yet editable through the Firebase admin dashboard. Add a complete `Guide` entry to that registry to generate its article, card, sitemap entry and metadata together. Existing article slugs should remain stable; use a permanent redirect if a URL must change. Dates should be added only when actual publication/update dates are recorded, and should be visible on the page as well as in metadata.

## Editorial scope

The initial article set is based on the supplied company profile and practical questions about the service scope. It does not claim field testing, a named expert reviewer, measured project outcomes or verified current market prices. The general recommendations are not technical installation instructions.

Future specialist articles need actual input from the business and suitable primary sources. Material comparisons should cite the exact manufacturers' specifications and distinguish cabinet core, visible finish, edging, hardware and installation. Pricing articles need dated local quotations, a measurement basis, clearly stated inclusions and a plan to maintain them. Project case studies need verified scope, permission to publish and photographs of the actual project.

## Site structure to expand towards

| Page type | Purpose | Evidence needed |
| --- | --- | --- |
| Service page | Explain what Steed Art offers, who it suits and what to discuss | Business-confirmed scope and relevant work |
| Planning guide | Answer a distinct customer question before enquiry | Useful original guidance, practical checklist |
| Material comparison | Help choose between specific options | Current product specifications, samples and relevant experience |
| Case study | Show how a real problem was resolved | Actual brief, photos, scope and confirmed results |
| Local service information | Explain genuine delivery arrangements for a location | Real service capability and useful location-specific information |
| Author/reviewer profile | Identify the real person responsible for specialist advice | Name, role and verifiable experience supplied by the business |

Do not create a separate article for every wording variation. One strong guide can answer a group of related questions. Split pages when they support different decisions and each can offer substantial useful information. Add topic landing pages when a topic has enough distinct material to warrant its own overview; the initial library groups topics in one hub to avoid thin category pages.

## Candidate questions for the next content cycle

These are editorial candidates, not claims of measured search volume. Prioritize with actual customer enquiries and, after deployment, Search Console data.

### Planning and scope

- What information should I send before an interior design consultation?
- What happens during a renovation site assessment?
- What should be included in a room-by-room renovation scope?
- What is the difference between a design service and turnkey execution?
- What should be decided before site work starts?
- How should changes to the scope be recorded?
- Can renovation work be phased while a property is occupied?
- How should retained furniture and appliances be included in a design brief?

### Budget and quotations

- Why do two renovation quotations differ?
- What is an allowance in a renovation quotation?
- What questions should I ask about a square-foot rate?
- How should a cabinetry quotation describe its measurement basis?
- Which costs sit outside a renovation contractor's agreed scope?
- What information is needed for a realistic project estimate?

### Kitchens, storage and furniture

- What should a kitchen appliance schedule include?
- What should I ask about cabinet hardware and internal fittings?
- How should a wardrobe brief describe clothes and storage needs?
- What should a fitted-furniture drawing show before approval?
- Which kitchen finish options are available from Steed Art? [Business confirmation]
- How do specified laminate, polyester and PVC products compare? [Manufacturer evidence]
- What should I know about the stated warranty for my chosen hardware? [Product evidence]

### Commercial interiors

- How do we prepare an office room and workstation schedule?
- What questions should we ask before choosing office partitions?
- What belongs in a reception-area brief?
- How should data, equipment and power requirements be coordinated?
- What should we ask building management before an office fit-out?
- What should an executive-office furniture brief include?

### Delivery and aftercare

- How do design approvals connect with site execution?
- What should a project progress update record?
- What should a snag list include?
- Which documents should be requested at handover?
- How do we find the right care instructions for a selected finish? [Product evidence]
- Who should we contact about a supplied product after handover? [Business confirmation]

### Actual project stories

- Living and dining: confirmed brief, scope and completed photographs.
- Kitchen: actual storage requirements and installed cabinetry details.
- Workplace: confirmed requirements, partition layout and furniture scope.
- Custom fabrication: actual drawings, workshop photographs and installed use.

Do not invent case-study budgets, dates, before images or client quotations. Do not imply unrelated images show the same project. Do not publish identical neighbourhood pages with only a location name changed.

## Workflow for future articles

1. Identify one main reader question and the decision the article should support.
2. Check whether an existing article already answers it; improve that article when appropriate.
3. Gather company input, original photographs and any necessary primary product or technical sources.
4. Draft a direct answer, detailed explanation, decision checklist and related questions.
5. Have the responsible business professional verify claims before adding their name as a reviewer.
6. Link the article to its relevant service, actual work, related guides and a useful next action.
7. Record genuine publication/update dates when the production publishing workflow supports them.
8. Review price, product and specification pages when the underlying information changes.

## Search and AI discovery

Google says its AI search experiences use the same core SEO requirements. Clear answers, indexable text, internal links, source transparency and accurate markup support discoverability; none guarantees indexing, rankings or AI citations. Structured data must describe the visible content. Do not add fake reviews, unsupported credentials or special 'AI ranking' schema. No `llms.txt` or similar file is required for Google's AI features.

Official references checked for this implementation:

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/article

## Production follow-through

- Verify ownership in Google Search Console and Bing Webmaster Tools using the business's accounts.
- Submit the production sitemap and inspect representative guide URLs after deployment.
- Check CDN/hosting crawler access as well as application robots rules.
- Keep the real business name, address and contact information consistent across the website and the business's official profiles.
- Confirm the actual Google Business Profile details with the owner; do not create or alter listings without authorization.
- Measure useful enquiries, not only visits. Define form-success, telephone and WhatsApp events before choosing an analytics setup and any required consent handling.
- Use real query and enquiry data to select the next guide. Avoid publishing large volumes simply to create more URLs.
- Add translations only with a language-specific editorial workflow, translated content and correct canonical/hreflang implementation.

No analytics identifiers, account verification, crawler firewall rules or external business profiles were changed in this local implementation.
