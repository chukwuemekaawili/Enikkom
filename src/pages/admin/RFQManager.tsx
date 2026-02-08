import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Search, Eye, Mail, Phone, MapPin, Calendar, FileText, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface RFQSubmission {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  project_type: string;
  project_location: string;
  target_diameter: string | null;
  target_crossing_length: string | null;
  target_depth_cover: string | null;
  desired_start_date: string | null;
  additional_notes: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-green-100 text-green-800',
  reviewed: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  quoted: 'bg-orange-100 text-orange-800',
  closed: 'bg-gray-100 text-gray-800',
};

const RFQManager: React.FC = () => {
  const [submissions, setSubmissions] = useState<RFQSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<RFQSubmission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchSubmissions = async () => {
    try {
      let query = supabase
        .from('rfq_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data || [];
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.full_name.toLowerCase().includes(search) ||
            s.company.toLowerCase().includes(search) ||
            s.email.toLowerCase().includes(search)
        );
      }

      setSubmissions(filtered);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSubmissions();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('rfq_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success('Status updated');
      fetchSubmissions();
      
      if (selectedSubmission?.id === id) {
        setSelectedSubmission((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase.from('rfq_submissions').delete().eq('id', id);
      if (error) throw error;

      toast.success('Submission deleted');
      setIsDetailOpen(false);
      fetchSubmissions();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete submission');
    }
  };

  const openDetail = (submission: RFQSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">RFQ Submissions</h1>
        <p className="text-muted-foreground mt-1">
          Manage and respond to quote requests
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No submissions found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{submission.full_name}</p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{submission.company}</TableCell>
                    <TableCell>{submission.project_type}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {submission.project_location}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[submission.status] || 'bg-gray-100'}>
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(submission.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetail(submission)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>RFQ Details</span>
                  <Badge className={statusColors[selectedSubmission.status] || 'bg-gray-100'}>
                    {selectedSubmission.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {selectedSubmission.full_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{selectedSubmission.full_name}</p>
                      <p className="text-sm text-muted-foreground">{selectedSubmission.company}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                        {selectedSubmission.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedSubmission.phone}`} className="text-primary hover:underline">
                        {selectedSubmission.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Project Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Project Type</p>
                      <p className="font-medium">{selectedSubmission.project_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedSubmission.project_location}
                      </p>
                    </div>
                    {selectedSubmission.target_diameter && (
                      <div>
                        <p className="text-sm text-muted-foreground">Target Diameter</p>
                        <p className="font-medium">{selectedSubmission.target_diameter}</p>
                      </div>
                    )}
                    {selectedSubmission.target_crossing_length && (
                      <div>
                        <p className="text-sm text-muted-foreground">Crossing Length</p>
                        <p className="font-medium">{selectedSubmission.target_crossing_length}</p>
                      </div>
                    )}
                    {selectedSubmission.target_depth_cover && (
                      <div>
                        <p className="text-sm text-muted-foreground">Depth of Cover</p>
                        <p className="font-medium">{selectedSubmission.target_depth_cover}</p>
                      </div>
                    )}
                    {selectedSubmission.desired_start_date && (
                      <div>
                        <p className="text-sm text-muted-foreground">Desired Start Date</p>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(selectedSubmission.desired_start_date), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedSubmission.additional_notes && (
                  <>
                    <hr />
                    <div className="space-y-2">
                      <h3 className="font-semibold">Additional Notes</h3>
                      <p className="text-sm bg-muted p-4 rounded-lg whitespace-pre-wrap">
                        {selectedSubmission.additional_notes}
                      </p>
                    </div>
                  </>
                )}

                <hr />

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Update Status:</span>
                    <Select
                      value={selectedSubmission.status}
                      onValueChange={(value) => updateStatus(selectedSubmission.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSubmission(selectedSubmission.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Submitted on {format(new Date(selectedSubmission.created_at), 'MMMM d, yyyy at h:mm a')}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RFQManager;
