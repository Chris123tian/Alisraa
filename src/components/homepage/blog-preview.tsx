import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function BlogPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Insights & News</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore the latest trends, expert opinions, and company news from the world of logistics and supply chain management.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/blog">View All Posts <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => {
            const postImage = PlaceHolderImages.find(img => img.id === post.image);
            return (
              <Card key={post.slug} className="overflow-hidden group">
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
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Badge>
                  <CardTitle className="text-xl mb-2 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                  <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                  <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary">
                    <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-12 md:hidden">
            <Button variant="outline" asChild>
                <Link href="/blog">View All Posts <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
