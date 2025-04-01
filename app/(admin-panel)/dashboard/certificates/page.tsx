// app/certificates/page.js
import { getCertificates } from "@/actions/certificate-actions";
import CertificatesList from "@/components/dash/CertificatesList";
import { Metadata } from "next";

export const metadata = {
  title: "Certificates | DriversEd Admin",
  description: "Manage and view driver certificates",
};

export default async function CertificatesPage() {
  const { certificates, success, error } = await getCertificates();

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view driver certificates
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <CertificatesList certificates={certificates || []} />
        )}
      </div>
    </div>
  );
}
