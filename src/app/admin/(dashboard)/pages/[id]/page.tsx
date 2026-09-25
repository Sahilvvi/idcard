import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/PageEditor";
import { PageTitle } from "@/components/admin/ui";
import { getPageById } from "@/lib/cms";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(id);
  if (!page) notFound();
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Pages" title="Edit page" sub={page.title} />
      <PageEditor page={page} />
    </div>
  );
}
