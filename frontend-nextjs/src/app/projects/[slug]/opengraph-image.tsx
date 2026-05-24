import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import {
  getProjectBySlug,
  portfolioProjects,
  teamMembers,
} from "@/lib/portfolioData";

export const runtime = "nodejs";
export const alt = "HaeYoungLab Project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpengraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return renderOgImage({
      kicker: "Project",
      title: "Project Not Found",
      accent: "amber",
    });
  }

  const authorNames = teamMembers
    .filter((m) => project.members.includes(m.id))
    .map((m) => m.name)
    .join(" · ");

  return renderOgImage({
    kicker: project.role ?? project.period,
    title: project.title,
    subtitle: project.summary,
    footer: authorNames || project.period,
    accent: "sky",
    stats: project.metrics.slice(0, 3).map((m, i) => ({
      value: String(i + 1),
      label: m,
    })),
  });
}
