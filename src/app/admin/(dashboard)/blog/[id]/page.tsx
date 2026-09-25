import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { PageTitle } from "@/components/admin/ui";
import { getPostById } from "@/lib/cms";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Blog" title="Edit article" sub={post.title} />
      <PostEditor post={post} />
    </div>
  );
}
