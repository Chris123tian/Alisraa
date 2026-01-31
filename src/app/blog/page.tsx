import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Our Blog" breadcrumb={[{ href: '/blog', label: 'Blog' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const postImage = PlaceHolderImages.find(img => img.id === post.image);
              return (
                <Card key={post.slug} className="overflow-hidden group flex flex-col">
                  <CardHeader className="p-0">
                    <Link href={`/blog/${post.slug}`} className="block relative h-56 w-full">
                      {postImage && (
                        <Image
                          src={postImage.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={postImage.imageHint}
                        />
                      )}
                    </Link>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <Badge variant="secondary" className="mb-2 self-start">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Badge>
                    <CardTitle className="text-xl mb-2 leading-tight flex-grow">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                    </CardTitle>
                    <p className="text-muted-foreground mb-4 text-sm flex-grow">{post.excerpt}</p>
                    <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary self-start">
                      <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
