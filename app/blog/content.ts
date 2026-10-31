import { profileImages } from "../profile-data";

export const topics = [
  { slug: "planning", name: "Planning & budgets", description: "Define the brief, understand the scope and compare proposals before work starts.", intro: "A useful renovation plan connects the changes you want with the work they require. Start here to prepare a brief, understand turnkey scope and compare quotations on the same basis." },
  { slug: "kitchens", name: "Kitchens & joinery", description: "Questions to resolve about layout, storage, cabinetry and the quotation.", intro: "Kitchen planning brings storage, appliances, work surfaces and services into one conversation. These guides help you prepare the decisions behind a cabinetry or kitchen renovation brief." },
  { slug: "commercial", name: "Commercial interiors", description: "Plan workspaces around people, daily operations and an agreed fit-out scope.", intro: "A commercial fit-out needs to support the working day. Begin with your team, the rooms they need and the practical requirements of the property before selecting finishes." },
  { slug: "delivery", name: "Execution & handover", description: "Understand project stages, changes, finish checks and the final handover.", intro: "The last stage of renovation is a chance to check the agreed work together. Use these guides to prepare questions, record outstanding items and understand the handover." },
] as const;

export type TopicSlug = (typeof topics)[number]["slug"];
export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  checklist?: string[];
  table?: { headers: string[]; rows: string[][] };
};
export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  topic: TopicSlug;
  image: string;
  imageAlt: string;
  answer: string;
  takeaways: string[];
  sections: GuideSection[];
  questions: { question: string; answer: string }[];
  related: string[];
};

// Original planning guidance based on the supplied Steed Art company profile.
// No invented project outcomes, price ranges, reviewer credentials or timelines.
export const guides: Guide[] = [
  {
    slug: "what-does-turnkey-renovation-include",
    title: "What does a turnkey renovation actually include?",
    seoTitle: "What Does Turnkey Renovation Include in Karachi?",
    description: "Understand Steed Art's turnkey scope, from design and services to joinery and handover, and the inclusions to confirm before work starts.",
    topic: "planning",
    image: profileImages.living,
    imageAlt: "Living and dining interior photographed in the Steed Art company profile",
    answer: "For Steed Art, turnkey renovation brings the interior work after the grey structure into one agreed scope. That can include design, civil and wet works, electrical and mechanical services, finishes, joinery, furniture and handover. The word turnkey does not replace a written list of inclusions: your project agreement defines what is covered.",
    takeaways: ["Confirm the scope room by room, including the work behind finished surfaces.", "Separate included items from allowances, client purchases and exclusions.", "Agree how design approvals, changes and completion will be recorded."],
    sections: [
      { id: "scope", title: "The six parts of Steed Art's turnkey scope", paragraphs: ["The company profile describes a coordinated service after the grey structure. The point is to connect design decisions with the trades, materials and final details needed to carry them out. A project may include all six areas below or a smaller agreed selection."], table: { headers: ["Area", "Items to discuss"], rows: [["Design & planning", "Layout, 3D visualization, finish selection and specifications"], ["Civil & wet works", "Site preparation, alterations, wall preparation, waterproofing and screeding"], ["Electrical & mechanical", "Wiring, switches, lighting, plumbing, sanitary connections, AC and ventilation"], ["Architectural finishes", "Flooring, ceilings, paint, wall treatments, doors, windows and glass partitions"], ["Joinery & furniture", "Kitchens, wardrobes, vanities, storage, custom furniture and upholstery"], ["Completion & handover", "Fixture installation, finish checks, snag resolution, cleaning and handover"]] } },
      { id: "boundaries", title: "Start with the boundaries of the work", paragraphs: ["Write down which rooms are included and what needs to change in each one. A kitchen brief might cover cabinetry alone, or it might also involve the floor, ceiling, lighting and service positions. Those are different scopes even when both are described as a kitchen renovation.", "Identify items you want to retain. Existing appliances, furniture or fittings should be recorded early so the proposed design can account for them. Ask who will assess their condition and whether removal, protection or reinstallation belongs in the agreement."], checklist: ["Rooms and spaces included", "Items retained, removed or replaced", "Supply, installation and finishing responsibilities", "Access, protection, waste removal and cleaning arrangements"] },
      { id: "exclusions", title: "Ask what is excluded or still undecided", paragraphs: ["A proposal is easier to evaluate when it names the items outside the price. Ask whether appliances, loose furniture, decorative lighting and specialist work are included, supplied by you or left for later selection. Do not assume one answer applies to every contractor or package.", "Where a selection remains open, request a clear allowance or a description of how it will be priced. Record the specification that the quoted amount assumes and what happens if you choose a different product. This gives both sides a reference when the design develops."] },
      { id: "sequence", title: "Understand the route from design to handover", paragraphs: ["Steed Art's stated process is Consult, Design, Specify, Execute and Complete. Use those stages to ask what you will receive and what you need to approve at each point. For example, establish which drawings, finish selections and inclusions should be settled before execution begins.", "Ask how changes will be recorded, including their effect on the price and programme. At completion, arrange a joint review of the agreed scope and a written list of any outstanding items. A clear handover closes the loop between the initial brief and the finished space."] },
    ],
    questions: [
      { question: "Does turnkey mean furniture and appliances are automatically included?", answer: "No. Confirm each item in the written scope. Steed Art offers joinery, furniture and fixture installation, but final inclusions follow the project agreement." },
      { question: "Does Steed Art only work on complete homes?", answer: "The company profile covers complete residential interiors, focused upgrades and commercial fit-outs. Discuss the property and the specific work you need so the scope can be defined." },
    ],
    related: ["home-renovation-planning-checklist-karachi", "how-to-compare-renovation-quotes", "renovation-handover-checklist"],
  },
  {
    slug: "home-renovation-planning-checklist-karachi",
    title: "How do you plan a home renovation in Karachi?",
    seoTitle: "Home Renovation Planning Checklist for Karachi",
    description: "Prepare a clear renovation brief: room priorities, existing conditions, measurements, budget questions and approvals to discuss with your team.",
    topic: "planning", image: profileImages.lounge,
    imageAlt: "Residential living space with coordinated seating from the Steed Art profile",
    answer: "Begin with the problems you want to solve, the rooms involved and the items you want to keep. Gather photographs and any existing plans, set out a working budget and describe how the property will be used during the work. Ask the renovation team to turn that brief into a defined scope before agreeing a price or programme.",
    takeaways: ["Describe daily problems before selecting decorative finishes.", "Treat your budget and desired dates as inputs to scope discussions.", "Confirm site conditions, access and responsibilities before execution."],
    sections: [
      { id: "brief", title: "Write a brief that describes how you live", paragraphs: ["Begin room by room. Explain what currently gets in the way: storage that is difficult to reach, furniture that blocks movement, a kitchen that does not support the way you cook, or rooms that do not feel connected. Be specific about the activities the space needs to support.", "Separate essential changes from preferences. If your main priority is storage, make that visible in the brief. If a finish or furniture item is optional, say so. This gives the designer something useful to protect when discussing different ways to use the budget."], checklist: ["People using the property and their everyday needs", "Rooms included in the renovation", "Problems to solve and essential outcomes", "Furniture, appliances or fittings to retain", "Reference images with a short note explaining what you like"] },
      { id: "site", title: "Gather information about the existing property", paragraphs: ["Take clear photographs of each room, including the connections between rooms and any areas of concern. Share existing plans if available, but identify anything that has changed since they were drawn. Photographs and rough information help start a conversation; detailed design should use confirmed site information.", "Tell the team whether the property is occupied and how access works. For an apartment, ask the building management about working hours, deliveries, use of common areas and any approval process. For a rented property, discuss proposed alterations with the owner. Requirements depend on the property, so verify them directly rather than relying on a generic checklist."], checklist: ["Photographs and existing plans", "Known leaks, damage or previous alterations to discuss on site", "Access, lift and delivery arrangements", "Items or rooms that need protection", "Property-owner or building-management requirements to verify"] },
      { id: "budget", title: "Discuss a budget against a defined scope", paragraphs: ["Share the amount you are comfortable allocating and ask which parts of the brief it should cover. Distinguish the renovation work from purchases you intend to make separately. A budget discussion becomes much more useful when everyone knows whether furniture, appliances and decorative items are inside or outside the figure.", "Ask how unknown conditions will be assessed and how any additional work would be approved. Avoid treating an early estimate as a final quotation when measurements, selections or site investigations remain open. Request a clear list of assumptions so you can see what still needs a decision."] },
      { id: "programme", title: "Plan decisions as well as site activity", paragraphs: ["Explain any dates that matter to you, including moving, travel or the need to use particular rooms. Ask the team which approvals and selections are needed before it can commit to a programme. A target date should be discussed with the actual scope and site conditions in view.", "Agree who can approve drawings, samples and changes. Keep a shared record of current decisions rather than relying on separate message threads. Before execution, ask for the scope, specifications and responsibilities to be brought together in a form both sides can refer to."] },
    ],
    questions: [
      { question: "Do I need exact measurements before contacting Steed Art?", answer: "You can begin with photographs, existing plans if available and a description of the rooms involved. Ask how the detailed site measurement and assessment will be arranged." },
      { question: "Should I buy finishes before the design is agreed?", answer: "Discuss purchases with your team first. Ask it to confirm the required specification, quantities and compatibility with the proposed design before you place an order." },
    ],
    related: ["what-does-turnkey-renovation-include", "how-to-compare-renovation-quotes", "kitchen-renovation-planning-checklist"],
  },
  {
    slug: "how-to-compare-renovation-quotes",
    title: "How do you compare renovation quotations fairly?",
    seoTitle: "How to Compare Renovation Quotes: Scope & Cost Checklist",
    description: "Compare renovation quotes using the same scope, measurements, material specifications, exclusions and change process, rather than the total alone.",
    topic: "planning", image: profileImages.joinery,
    imageAlt: "Slatted wall finish and fitted storage shown in the Steed Art company profile",
    answer: "Compare quotations against the same room-by-room scope and specifications. Check quantities, materials, supply and installation responsibilities, exclusions, payment stages and the process for changes. If two totals differ, first establish whether they describe the same work. An incomplete quotation cannot be made comparable by looking at its final number alone.",
    takeaways: ["Use one written brief when requesting proposals.", "Make allowances and exclusions visible before comparing totals.", "Resolve unclear wording and record the agreed version before work starts."],
    sections: [
      { id: "same-brief", title: "Give each team the same brief", paragraphs: ["Prepare one list of rooms, required changes and retained items. Share the same drawings and reference information with each team, and explain which selections are still open. If the brief changes during discussions, update the comparison so you are not evaluating different versions of the project.", "Ask each proposal to distinguish design services from execution and supply. One quotation may include design development or furniture while another only covers site work. Both may be valid offers, but they answer different briefs until those differences are made explicit."] },
      { id: "comparison", title: "Use a line-by-line comparison", paragraphs: ["A comparison sheet helps turn vague differences into questions you can resolve. Where a specification is missing, ask for it rather than filling in your own assumption. Keep the contractor's written clarification with the proposal."], table: { headers: ["Check", "Question to ask"], rows: [["Scope", "Are the same rooms, items and tasks included?"], ["Measurement", "What quantity and unit are used, and how were they measured?"], ["Specification", "Which product, material, finish or approved allowance is assumed?"], ["Responsibility", "Who supplies, installs, protects and completes each item?"], ["Exclusions", "What must be purchased or arranged separately?"], ["Changes", "How are revised selections or additional work approved and priced?"], ["Completion", "What checks, outstanding-item process and handover documents are included?"]] } },
      { id: "allowances", title: "Separate fixed selections from allowances", paragraphs: ["An allowance leaves a decision to be completed later. Ask which items use allowances, what they cover and whether the quoted sum includes installation or associated work. Record how the final selection will be compared with the allowance.", "For joinery, request enough detail to understand what is being made: units, dimensions, internal storage, finish, hardware and installation. A description such as 'kitchen cabinets' leaves too many questions open for a fair comparison. The same principle applies to finishes and fixtures: describe the agreed item rather than relying on a broad label."] },
      { id: "agreement", title: "Read payment and change arrangements alongside the price", paragraphs: ["Ask what each payment stage relates to and what evidence or approval accompanies it. Discuss what happens if the brief changes, an existing condition needs further work or a chosen item becomes unavailable. Record who can authorize a change and when its price and programme effect will be confirmed.", "Before proceeding, request a final coordinated version of the scope and quotation. Check it against the decisions made during discussion. The useful outcome is a proposal you understand and can refer to throughout the work, with clear next steps for anything still unresolved."] },
    ],
    questions: [
      { question: "Can I compare renovation prices using a square-foot rate alone?", answer: "A rate only becomes meaningful when its measurement basis, specification and inclusions are clear. Ask for the scope and quantities behind it before using it to compare proposals." },
      { question: "What information is needed for a complete renovation quotation?", answer: "A complete quotation needs a defined scope, confirmed measurements, material selections and clear supply and installation responsibilities. Ask which items remain provisional before agreeing the proposal." },
    ],
    related: ["what-does-turnkey-renovation-include", "home-renovation-planning-checklist-karachi", "renovation-handover-checklist"],
  },
  {
    slug: "kitchen-renovation-planning-checklist",
    title: "What should you decide before renovating a kitchen?",
    seoTitle: "Kitchen Renovation Planning Checklist: Layout to Cabinetry",
    description: "Prepare a kitchen renovation brief covering daily use, appliances, storage, cabinetry, services and quote inclusions before choosing finishes.",
    topic: "kitchens", image: profileImages.kitchen,
    imageAlt: "Dark kitchen cabinetry and lighter upper units from the Steed Art company profile",
    answer: "Start with how you cook, what needs storing and which appliances will be used. Then discuss the layout, confirmed appliance dimensions, service positions and cabinetry specification together. Choose finishes within that plan, and confirm whether worktops, hardware, installation and associated room finishes are included in the quotation.",
    takeaways: ["Bring an appliance and storage list to the design discussion.", "Check the cabinet interiors and hardware as carefully as the fronts.", "Clarify whether the brief covers cabinetry alone or the whole room."],
    sections: [
      { id: "daily-use", title: "Describe the kitchen you need to use", paragraphs: ["Explain who cooks, whether more than one person uses the room at the same time and what happens there beyond preparing food. Make a note of the items that are awkward to store or reach in the current kitchen. This information gives the designer a useful starting point for the layout.", "Make a storage inventory by activity: everyday dishes, cooking equipment, groceries, cleaning items and occasional-use appliances. Rather than asking only for more cabinets, discuss where those items should live and how they will be accessed."], checklist: ["People using the kitchen and their routines", "Items that need dedicated storage", "Existing problems with movement or access", "Appliances to keep, replace or add", "Eating, serving or laundry functions included in the room"] },
      { id: "appliances", title: "Confirm appliances before final joinery decisions", paragraphs: ["Create an appliance schedule with the chosen model and manufacturer information. Ask the team to check the dimensions, connection needs and installation instructions against the proposed cabinetry. An approximate appliance size is a planning input, not a substitute for the information needed to finalize its housing.", "Discuss electrical, plumbing, lighting and ventilation requirements with the people responsible for those systems. Identify any proposed service changes before treating the cabinet layout as final. The detailed arrangement should follow the actual products and assessed site conditions rather than a generic internet dimension."] },
      { id: "cabinetry", title: "Specify what is inside the cabinets", paragraphs: ["Steed Art's profile highlights pull-out storage and appliance integration alongside the visible cabinetry finish. Use that as a reminder to ask about shelves, drawers, fittings and internal arrangements. A cabinet front does not explain how its storage works.", "Request a cabinet schedule or drawing that identifies the units, dimensions, internal fittings, finish and hardware. Ask what samples or drawings you will approve and how the final specification will be recorded. Where alternatives are proposed, compare them against the same storage requirements."], checklist: ["Cabinet layout and internal arrangements", "Carcass and visible finish specifications", "Handles, hinges, drawer fittings and pull-outs", "Worktop and backsplash scope", "Appliance housings and associated installation requirements"] },
      { id: "quote", title: "Check where the kitchen quotation stops", paragraphs: ["A cabinetry quotation and a room renovation quotation can cover very different work. Ask whether removal, making good, service alterations, flooring, ceilings, lighting, painting and final cleaning are included. If different teams handle parts of the work, identify who coordinates the interfaces.", "Request a quotation for the work you actually need. Before ordering, ask for the confirmed measurements, final selections and written inclusions. Keep the approved version available when reviewing the completed installation."] },
    ],
    questions: [
      { question: "Should I choose a cabinet finish before the layout?", answer: "You can bring finish references to the first discussion, but resolve the room's use, storage and appliance requirements alongside the visual direction. Confirm the full specification before ordering." },
      { question: "Does a cabinet-door estimate include the whole kitchen?", answer: "No. Confirm the frame, internal fittings, hardware, worktops, appliances, service work and installation separately. Request each inclusion in the written quotation." },
    ],
    related: ["how-to-compare-renovation-quotes", "what-does-turnkey-renovation-include", "renovation-handover-checklist"],
  },
  {
    slug: "office-fit-out-planning-checklist",
    title: "What belongs in an office fit-out brief?",
    seoTitle: "Office Fit-Out Planning Checklist for Karachi Businesses",
    description: "Plan an office fit-out around headcount, work settings, storage, services, partitions, property requirements and a clear execution scope.",
    topic: "commercial", image: profileImages.office,
    imageAlt: "Black-framed glazed office partitions from the Steed Art company profile",
    answer: "An office fit-out brief should describe your team, daily activities, room requirements, equipment and storage before specifying desks and finishes. Include property information, landlord or building requirements to verify, the services each space needs and how the business will operate during the work. Ask for a coordinated scope covering the agreed layout, furniture, partitions and finishes.",
    takeaways: ["Plan for activities and room use, alongside the number of desks.", "Discuss service requirements before approving furniture and partition positions.", "Confirm the property's conditions and work arrangements directly with the relevant parties."],
    sections: [
      { id: "work-settings", title: "Describe the working day", paragraphs: ["List the team members using the office and the activities they need to carry out. Identify tasks that require collaboration, focused work, client meetings or private discussion. Add reception, shared areas and storage requirements where they belong in the brief.", "Explain the relationships between rooms. For example, describe who needs regular access to meeting rooms or shared equipment, and where visitor movement should be considered. If headcount may change, discuss that as a planning requirement rather than assuming the current desk count is the whole brief."], checklist: ["Current team size and anticipated changes", "Workstations, cabins and meeting spaces", "Visitor, reception and waiting requirements", "Shared equipment, filing and storage", "Break areas and other supporting spaces"] },
      { id: "services", title: "Connect furniture planning with service requirements", paragraphs: ["Prepare a list of equipment and the connections it requires. Ask the project team to coordinate power, lighting, data, AC, ventilation and other relevant services with the proposed room and furniture layouts. Identify who is responsible for each part rather than assuming it belongs to the fit-out contractor.", "Steed Art's commercial profile includes workstations, matching storage, executive spaces and glazed partitions. When reviewing examples, discuss what your own office needs from privacy, visibility and storage. A photograph can help describe a visual direction; it does not establish the performance specification for a different property."] },
      { id: "property", title: "Verify what the property allows", paragraphs: ["Gather existing plans and ask the owner or building management what information and permissions it requires for proposed works. Discuss working hours, deliveries, common areas and any restrictions on alterations. Do not assume requirements are identical between buildings.", "Ask the appropriate qualified professionals to identify the requirements relevant to the property and proposed use, including building systems and safety arrangements. This guide is a briefing checklist, not a technical design or a substitute for project-specific approvals. Make responsibility for checking these matters explicit in the scope."] },
      { id: "delivery", title: "Agree how the business will operate during the fit-out", paragraphs: ["Tell the team whether the office will be empty or remain in use. Identify equipment, records or work areas that need protection or continued access. Ask what work arrangements are feasible once the scope and property conditions have been assessed.", "Before execution, coordinate the approved layout, finish selections, furniture schedule and service responsibilities. Ask how changes will be handled and what the completion review will include. The agreed brief should remain a reference throughout delivery, rather than being replaced by a collection of disconnected purchases."] },
    ],
    questions: [
      { question: "Does Steed Art handle commercial interiors as well as homes?", answer: "Yes. The company profile covers office interiors and commercial fit-outs, including workstations, enclosed cabins, executive spaces, glass partitions and shared areas." },
      { question: "Can we set a fit-out duration before reviewing the site?", answer: "Treat your desired completion date as part of the brief. Ask for a programme based on the assessed property, agreed scope, approvals and selections rather than relying on a generic duration." },
    ],
    related: ["what-does-turnkey-renovation-include", "how-to-compare-renovation-quotes", "renovation-handover-checklist"],
  },
  {
    slug: "renovation-handover-checklist",
    title: "What should you check at renovation handover?",
    seoTitle: "Renovation Handover Checklist: Scope, Snags & Documents",
    description: "Prepare for a renovation handover with a room-by-room scope check, a written snag list, document requests and agreed follow-up arrangements.",
    topic: "delivery", image: profileImages.bedroom,
    imageAlt: "Bedroom furniture and coordinated finishes in the Steed Art company profile",
    answer: "Review the completed work against the agreed scope, approved drawings and selections. Walk through the space with your project team, record outstanding items in a written snag list and agree who will resolve them and when. Request the documents, operating information and aftercare contacts relevant to the products and work included in your project.",
    takeaways: ["Use the agreed specification as the reference for completion.", "Record outstanding items with their location, action and responsible party.", "Clarify documents and aftercare arrangements before closing the project."],
    sections: [
      { id: "prepare", title: "Prepare the documents you will check against", paragraphs: ["Bring the agreed scope, approved drawings, finish selections and authorized changes together before the walkthrough. If something changed during execution, include the current approved version. This helps distinguish an outstanding item from work that was never part of the agreement.", "Arrange a joint review with the team responsible for delivery. Give yourself a way to record each room and each relevant scope item. Photographs can help identify a location, but a short written description should explain what action is needed."] },
      { id: "walkthrough", title: "Walk through room by room", paragraphs: ["Review visible finishes, fitted furniture and installed items against the agreed specification. Ask the team to demonstrate the normal operation of the fittings and equipment it has installed. Specialist systems should be checked and documented by the responsible professionals; a general walkthrough does not replace their work.", "For joinery, discuss doors, drawers, handles, shelves and agreed internal fittings. For surfaces and fixtures, note any incomplete areas or items that differ from the approved selection. Keep the review tied to the actual project scope."], checklist: ["Agreed rooms and tasks accounted for", "Approved materials, finishes and fittings checked", "Doors, drawers and storage demonstrated", "Relevant installation or commissioning information requested", "Cleaning, remaining materials and waste arrangements confirmed"] },
      { id: "snags", title: "Make the snag list useful", paragraphs: ["Give each outstanding item a clear location and description. Record the proposed action, responsible party and agreed follow-up date. If an item needs investigation before a remedy can be agreed, record that next step rather than leaving it as an unclear complaint.", "Keep the list in one shared version and confirm when each item has been addressed. Ask how completed actions will be reviewed. A written record helps both sides understand what remains open after the main work is finished."], table: { headers: ["Record", "What to include"], rows: [["Location", "Room and specific item"], ["Observation", "What is incomplete or needs review"], ["Action", "Agreed remedy or next investigation"], ["Responsibility", "Person or team handling the action"], ["Follow-up", "Agreed date and method of confirmation"]] } },
      { id: "documents", title: "Request the information you will need afterwards", paragraphs: ["Ask which manuals, product details, care instructions and warranty documents apply to the supplied items. Confirm the contact for follow-up questions and how any agreed aftercare will work. Avoid assuming a standard warranty period: the terms depend on the product, supplier and project agreement.", "Where updated drawings or records are part of the scope, confirm that they are included in the handover. Steed Art's company profile describes finish checks, snag resolution, cleaning and handover as part of completion; the final project agreement should identify what that means for your space."] },
    ],
    questions: [
      { question: "What is a snag list?", answer: "It is a written record of outstanding items identified during a project review. For each item, record the location, required action, responsibility and agreed follow-up." },
      { question: "Is there one standard warranty for every renovation item?", answer: "Do not assume a single term applies to everything. Ask for the terms and contact details relevant to each supplied product and the work described in your agreement." },
    ],
    related: ["how-to-compare-renovation-quotes", "what-does-turnkey-renovation-include", "kitchen-renovation-planning-checklist"],
  },
];

export function getGuide(slug: string) {
  return guides.find(guide => guide.slug === slug);
}
export function getTopic(slug: string) {
  return topics.find(topic => topic.slug === slug);
}
export function readingMinutes(guide: Guide) {
  const text = [guide.answer, ...guide.takeaways, ...guide.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.checklist || []), ...(section.table?.rows.flat() || [])]), ...guide.questions.flatMap(item => [item.question, item.answer])].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
