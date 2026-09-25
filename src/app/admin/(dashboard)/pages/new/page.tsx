import { PageEditor } from "@/components/admin/PageEditor";
import { PageTitle } from "@/components/admin/ui";

export default function NewPagePage() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Pages" title="New page" sub="Managed pages render with the iDM hero and Markdown body at /p/<slug>." />
      <PageEditor />
    </div>
  );
}
