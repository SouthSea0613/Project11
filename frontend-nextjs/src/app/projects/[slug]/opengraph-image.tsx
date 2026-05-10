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

/** 빌드 타임에 모든 프로젝트 OG를 사전 생성하기 위한 정적 파라미터 */
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

  // 단일 멤버 프로젝트는 그 멤버 톤(emerald/sky), 공동 프로젝트는 violet.
  const accent =
    project.members.length === 1
      ? project.members[0] === "minyoung"
        ? "sky"
        : "emerald"
      : "violet";

  return renderOgImage({
    kicker: project.role ?? project.period,
    title: project.title,
    subtitle: project.summary,
    footer: authorNames || project.period,
    accent,
    stats: project.metrics.slice(0, 3).map((m, i) => ({
      value: String(i + 1),
      label: m,
    })),
  });
}
