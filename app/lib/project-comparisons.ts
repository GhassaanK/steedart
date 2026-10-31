import type { CmsProject } from "./cms";

export type ProjectComparison = {
  id: string;
  title: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

export function hasVerifiedComparison(project: CmsProject): boolean {
  return project.comparisonVerified === true
    && Boolean(project.title?.trim())
    && Boolean(project.beforeImage?.trim())
    && Boolean(project.afterImage?.trim())
    && project.beforeImage.trim() !== project.afterImage.trim();
}

export function verifiedProjectComparisons(projects: CmsProject[]): ProjectComparison[] {
  return projects.filter(hasVerifiedComparison).slice(0, 4).map(project => ({
    id: project.id,
    title: project.title,
    before: project.beforeImage,
    after: project.afterImage,
    beforeAlt: `${project.title}: the space before renovation`,
    afterAlt: `${project.title}: the same space after renovation`,
  }));
}
