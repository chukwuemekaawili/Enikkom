import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Image, FileText, Clock, TrendingUp, Users, Globe, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Stats {
  totalRfq: number;
  newRfq: number;
  totalMedia: number;
  totalTeam: number;
  lastUpdated: string | null;
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalRfq: 0,
    newRfq: 0,
    totalMedia: 0,
    totalTeam: 0,
    lastUpdated: null,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch RFQ stats
        const { count: totalRfq } = await supabase
          .from('rfq_submissions')
          .select('*', { count: 'exact', head: true });

        const { count: newRfq } = await supabase
          .from('rfq_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Fetch media stats
        const { count: totalMedia } = await supabase
          .from('media_assets')
          .select('*', { count: 'exact', head: true });

        // Fetch team members count
        const { count: totalTeam } = await supabase
          .from('team_members')
          .select('*', { count: 'exact', head: true });

        // Fetch last settings update
        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('updated_at')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        // Fetch recent submissions
        const { data: submissions } = await supabase
          .from('rfq_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalRfq: totalRfq || 0,
          newRfq: newRfq || 0,
          totalMedia: totalMedia || 0,
          totalTeam: totalTeam || 0,
          lastUpdated: settingsData?.updated_at || null,
        });

        setRecentSubmissions(submissions || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total RFQ Submissions',
      value: stats.totalRfq,
      icon: Mail,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      link: '/admin/dashboard/rfq',
    },
    {
      title: 'New Submissions',
      value: stats.newRfq,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      link: '/admin/dashboard/rfq',
    },
    {
      title: 'Team Members',
      value: stats.totalTeam,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      link: '/admin/dashboard/team',
    },
    {
      title: 'Media Assets',
      value: stats.totalMedia,
      icon: Image,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      link: '/admin/dashboard/media',
    },
  ];

  const quickActions = [
    { label: 'Edit Branding & Contact', href: '/admin/dashboard/branding', icon: Globe },
    { label: 'Manage SEO & Hero', href: '/admin/dashboard/seo', icon: FileText },
    { label: 'Edit All Pages', href: '/admin/dashboard/pages', icon: FileText },
    { label: 'Manage Team', href: '/admin/dashboard/team', icon: Users },
  ];
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to the Enikkom Construction admin panel
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Live Site
          </a>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump to common admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Button key={action.label} asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to={action.href}>
                  <action.icon className="h-5 w-5" />
                  <span className="text-xs text-center">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent RFQ Submissions</CardTitle>
          <CardDescription>Latest quote requests from potential clients</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : recentSubmissions.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No submissions yet
            </p>
          ) : (
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{submission.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.company} • {submission.project_type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        submission.status === 'new'
                          ? 'bg-green-100 text-green-800'
                          : submission.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {submission.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(submission.created_at), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
