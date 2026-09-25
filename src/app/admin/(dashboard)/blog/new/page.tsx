import { PostEditor } from "@/components/admin/PostEditor";
import { PageTitle } from "@/components/admin/ui";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Blog" title="New article" sub="Write in Markdown, preview, then publish to /blog." />
      <PostEditor />
    </div>
  );
}
