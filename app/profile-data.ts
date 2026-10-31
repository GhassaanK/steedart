// Source: company profile supplied by Steed Art, slides 5, 8–18, 20–22.
// Photographs are extracted from that profile. 3D concepts are excluded.
export const profileImages = {
  living: "/images/profile/living-dining.webp", lounge: "/images/profile/living-room.webp",
  kitchen: "/images/profile/kitchen.webp", bedroom: "/images/profile/bedroom.webp",
  office: "/images/profile/office.webp", executive: "/images/profile/executive-office.webp",
  joinery: "/images/profile/joinery.webp", hospitality: "/images/profile/hospitality.webp",
};
export const profileWork = [
  { id: "profile-living", title: "Living & dining", category: "Residential interiors", image: profileImages.living, copy: "Decorative wall treatments, coordinated lounge seating and dining furniture.", gallery: [profileImages.living, profileImages.lounge, "/images/profile/furniture.webp"], scope: ["Wall treatments", "Lounge seating", "Dining furniture"] },
  { id: "profile-office", title: "A connected workplace", category: "Commercial interiors", image: profileImages.office, copy: "Black-framed glass partitions define the rooms while preserving open sightlines.", gallery: [profileImages.office, profileImages.executive, "/images/profile/workstations.webp"], scope: ["Glass partitions", "Workstations", "Architectural finishes"] },
  { id: "profile-kitchen", title: "Everyday, considered", category: "Kitchens & cabinetry", image: profileImages.kitchen, copy: "Dark cabinetry, lighter upper units and integrated appliance housing bring the kitchen together.", gallery: [profileImages.kitchen], scope: ["Cabinetry", "Work surfaces", "Appliance integration"] },
  { id: "profile-bedroom", title: "Room to unwind", category: "Bedrooms & storage", image: profileImages.bedroom, copy: "An upholstered headboard, matching bedside furniture and fitted storage in one coordinated scheme.", gallery: [profileImages.bedroom, "/images/profile/wardrobe.webp"], scope: ["Bedroom furniture", "Wardrobe", "Dressing unit", "Curtains"] },
  { id: "profile-hospitality", title: "A place to pause", category: "Shared spaces & hospitality", image: profileImages.hospitality, copy: "Pendant lighting, textured walls and upholstered seating make use of a narrow dining footprint.", gallery: [profileImages.hospitality], scope: ["Dining furniture", "Decorative finishes", "Lighting", "Seating layout"] },
  { id: "profile-joinery", title: "Character in the detail", category: "Finishes & joinery", image: profileImages.joinery, copy: "Slatted wall finishes and fitted storage coordinated with the wider interior.", gallery: [profileImages.joinery, "/images/profile/bathroom.webp", "/images/profile/fabrication.webp"], scope: ["Wall features", "Fitted storage", "Custom fabrication"] },
];
export const profileServices = [
  { title: "Design & planning", copy: "Space planning, 3D visualization, finish selection and project specifications.", image: profileImages.living },
  { title: "Civil & wet works", copy: "Site preparation, alterations, wall preparation, waterproofing and floor screeding.", image: "/images/profile/bathroom.webp" },
  { title: "Electrical & mechanical", copy: "Wiring, switches, lighting, plumbing, sanitary connections, AC and ventilation.", image: profileImages.executive },
  { title: "Architectural finishes", copy: "Flooring, ceilings, paint, wall treatments, doors, windows and glass partitions.", image: profileImages.office },
  { title: "Joinery & furniture", copy: "Kitchens, wardrobes, vanities, storage, custom furniture and upholstery.", image: profileImages.kitchen },
  { title: "Completion & handover", copy: "Fixture installation, finish checks, snag resolution, cleaning and handover.", image: profileImages.joinery },
];
export const profileProcess = [
  ["Consult", "Understand the site, your priorities and how the space will be used."],
  ["Design", "Develop the layout, review materials and establish the visual direction."],
  ["Specify", "Agree the inclusions, finishes and sequence of work."],
  ["Execute", "Coordinate procurement and trades as work progresses on site."],
  ["Complete", "Review finishes, resolve snags and prepare the space for handover."],
];
