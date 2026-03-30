import { redirect } from 'next/navigation';
import { caseStudies } from '../data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) {
    redirect('/case-studies');
  }
  redirect(`/demo/${cs.demoSlug}`);
}
