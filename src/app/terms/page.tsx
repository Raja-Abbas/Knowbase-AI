import type { Metadata } from "next";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export const metadata: Metadata = {
  title: "Terms of Service | KnowBase AI",
  description:
    "Read the terms and conditions governing your use of the KnowBase AI platform and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: July 12, 2026</p>

        <div className="space-y-8 text-base leading-7">
          <p>
            Welcome to KnowBase AI. These Terms of Service (&quot;Terms&quot;) govern your access
            to and use of the KnowBase AI platform, website, and related services (collectively,
            the &quot;Service&quot;). By accessing or using the Service, you agree to be bound by
            these Terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using the Service, you acknowledge that you have read,
              understood, and agree to be bound by these Terms. If you are using the Service on
              behalf of an organization, you represent that you have authority to bind that
              organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p>
              KnowBase AI is a cloud-based platform that enables businesses to create knowledge
              bases, upload and manage documents, and use AI-powered assistants to answer questions
              based on their business knowledge. The Service includes web applications, APIs, and
              related tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You must provide accurate, complete information when creating an account.
              </li>
              <li>
                You are responsible for safeguarding your account credentials and for all
                activity that occurs under your account.
              </li>
              <li>
                You must notify us immediately of any unauthorized use of your account.
              </li>
              <li>
                You may not share your account credentials with others or create multiple
                accounts for circumventing usage limits.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Use the Service for any unlawful purpose or in violation of any regulations</li>
              <li>Upload malware, viruses, or any code designed to disrupt the Service</li>
              <li>Attempt to gain unauthorized access to other users&apos; workspaces or data</li>
              <li>Use the Service to generate content that is harmful, deceptive, or illegal</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Use automated tools to scrape, crawl, or access the Service beyond published APIs</li>
              <li>Resell or redistribute the Service without written authorization</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
            <p>
              The Service, including its software, design, branding, and documentation, is owned
              by KnowBase AI and protected by copyright, trademark, and other intellectual property
              laws. You retain full ownership of all content you upload to the Service. You grant
              us a limited, non-exclusive license to process your content solely for the purpose
              of providing the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Free plans are subject to usage limitations as described on our pricing page.
              </li>
              <li>
                Paid subscriptions are billed in advance on a monthly or annual basis.
              </li>
              <li>
                All fees are non-refundable except as required by applicable law.
              </li>
              <li>
                We reserve the right to change pricing with 30 days&apos; notice for paid plans.
              </li>
              <li>
                Failure to pay may result in suspension or termination of your account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. AI-Generated Content</h2>
            <p>
              The Service uses artificial intelligence to generate responses and content. You
              acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                AI-generated content may contain inaccuracies and should be reviewed before use.
              </li>
              <li>
                You are solely responsible for how you use AI-generated content.
              </li>
              <li>
                We do not guarantee the accuracy, completeness, or reliability of AI-generated
                responses.
              </li>
              <li>
                AI-generated content is provided &quot;as is&quot; and should not be considered
                professional advice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, KnowBase AI shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising out of
              your use of the Service. Our total liability shall not exceed the amount you paid
              for the Service in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless KnowBase AI and its officers, directors,
              employees, and agents from any claims, losses, damages, liabilities, and expenses
              arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
            <p>
              Either party may terminate this agreement at any time. We may suspend or terminate
              your access immediately for breach of these Terms. Upon termination, your right to
              use the Service ceases. We will make your data available for export for 30 days
              following termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California, United States,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms shall be resolved through binding arbitration
              administered by the American Arbitration Association under its Commercial
              Arbitration Rules. The arbitration shall be conducted in San Francisco, California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of
              material changes at least 30 days before they take effect. Continued use of the
              Service after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">14. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Email: legal@knowbase.ai</li>
              <li>General: support@knowbase.ai</li>
            </ul>
          </section>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
