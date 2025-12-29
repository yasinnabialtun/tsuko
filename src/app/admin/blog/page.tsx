import { prisma } from '@/lib/prisma';
import BlogClient from './client';

export const revalidate = 0;

async function getBlogPosts() {
    return await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    }).catch(() => []);
}

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();

    // Map Prisma objects to plain JS objects for client-side consumption
    const serializedPosts = posts.map(post => ({
        ...post,
        id: post.id,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    }));

    return <BlogClient initialPosts={serializedPosts} />;
}
