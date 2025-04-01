// app/dashboard/page.tsx
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  Award,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import CertificatesChart from "@/components/dash/CertificatesChart";
import QuickActions from "@/components/dash/QuickActions";
import { getDashboardStats } from "@/actions/certificate-actions";

export const metadata: Metadata = {
  title: "Dashboard | DriversEd Admin",
  description: "Overview of your certificate system",
};

export default async function DashboardPage() {
  // Fetch data from your database
  const stats = await getDashboardStats();

  // Calculate the current date for display
  const currentDate = formatDate(new Date());

  return (
    <div className="pt-12 space-y-6 md:pt-0">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          <span className="certificate-name">{currentDate}</span> - Overview of
          your certificate system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Certificates
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.totalCertificates}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-primary/10">
                <Award className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Valid Certificates
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.validCertificates}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-green-50">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Score
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.averageScore.toFixed(1)}%
                </h2>
              </div>
              <div className="p-2 rounded-full bg-blue-50">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Expiring Soon
                </p>
                <h2 className="text-3xl font-bold">
                  {stats.expiringCertificates}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-amber-50">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Certificates Chart - Client Component */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Certificates</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <CertificatesChart data={stats.monthlyStats} />
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Certificates</CardTitle>
            <form action="/dashboard/certificates">
              <Button variant="ghost" size="sm" type="submit">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentCertificates.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between pb-3 border-b last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {cert.name} {cert.surname}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date(cert.date))}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{cert.result}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Client Component */}
      <QuickActions />
    </div>
  );
}
