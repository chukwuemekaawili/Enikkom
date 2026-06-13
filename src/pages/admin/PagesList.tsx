import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Eye, Edit, Trash2, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { getPages, deletePage as deletePageService } from '@/services/cms';

const PagesList: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch Pages
    const { data: pages = [], isLoading, error } = useQuery({
        queryKey: ['cms-pages'],
        queryFn: getPages,
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: deletePageService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
            toast.success('Page deleted');
        },
        onError: (err) => {
            console.error('Error deleting page:', err);
            toast.error('Failed to delete page');
        }
    });

    const handleDeletePage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this page?')) return;
        deleteMutation.mutate(id);
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            published: 'default',
            draft: 'secondary',
            archived: 'destructive',
        };
        // @ts-ignore
        return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-destructive">
                <p>Failed to load pages. Please try again.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Pages</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage all pages on your website
                    </p>
                </div>
                <Button onClick={() => navigate('/admin/pages/new/edit')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Page
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Template</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        <FileText className="mx-auto h-12 w-12 mb-2 opacity-50" />
                                        <p>No pages found. Create your first page to get started.</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pages.map((page) => (
                                    <TableRow key={page.id}>
                                        <TableCell className="font-medium">{page.title}</TableCell>
                                        <TableCell className="font-mono text-sm">/{page.slug}</TableCell>
                                        <TableCell className="capitalize">{page.template}</TableCell>
                                        <TableCell>{getStatusBadge(page.status)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDistanceToNow(new Date(page.updated_at), { addSuffix: true })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const url = page.slug === 'home' ? '/?preview=true' : `/${page.slug}?preview=true`;
                                                        window.open(url, '_blank');
                                                    }}
                                                    title="Preview"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigate(`/admin/pages/${page.slug}/edit`)}
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={deleteMutation.isPending}
                                                    onClick={() => handleDeletePage(page.id)}
                                                    title="Delete"
                                                >
                                                    {deleteMutation.isPending ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    )}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PagesList;
