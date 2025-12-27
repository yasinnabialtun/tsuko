
/**
 * Simple Markdown to HTML converter
 * Supports basic syntax: # Headers, **bold**, *italic*, [link](url), ![image](url), - Lists
 */
export function markdownToHtml(markdown: string): string {
    if (!markdown) return '';

    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-black mt-12 mb-8">$1</h1>')

        // Bold & Italic
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')

        // Links & Images
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='w-full rounded-2xl my-8' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' class='text-clay underline hover:text-charcoal'>$1</a>")

        // Lists (Unordered)
        .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')

        // Paragraphs (Double newline to p, single to br)
        .replace(/\n\n/gim, '</p><p class="mb-4">')
        .replace(/\n/gim, '<br />');

    // Wrap in initial paragraph if no block tags
    if (!html.startsWith('<h') && !html.startsWith('<p')) {
        html = '<p>' + html + '</p>';
    }

    return html;
}
