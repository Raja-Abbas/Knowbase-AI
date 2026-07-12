import type { Metadata } from "next";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | KnowBase AI",
  description:
    "Learn how KnowBase AI collects, uses, and protects your data. Our commitment to privacy and security for our AI-powered knowledge base platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: July 12, 2026</p>

        <div className="space-y-8 text-base leading-7">
          <p>
            At KnowBase AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our AI-powered knowledge base platform
            and related services (collectively, the &quot;Service&quot;).
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">Account Information</h3>
            <p>
              When you create an account, we collect your name, email address, and password (stored
              in encrypted form). If you sign up via a third-party provider, we receive your name,
              email, and profile image from that provider.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">Workspace and Content Data</h3>
            <p>
              We store the workspaces you create, documents you upload, knowledge sources you
              configure, and conversations you have with the AI assistant. This content is stored
              securely in our databases and is only accessible to authorized members of your
              workspace.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">Usage Data</h3>
            <p>
              We automatically collect information about how you interact with the Service,
              including pages visited, features used, API calls made, timestamps, browser type,
              operating system, and IP address.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">Payment Information</h3>
            <p>
              If you subscribe to a paid plan, our third-party payment processor (Stripe) handles
              your payment card details. We do not store full credit card numbers on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Delivery:</strong> To provide, maintain, and improve the Service,
                including AI-powered responses based on your uploaded knowledge base.
              </li>
              <li>
                <strong>Personalization:</strong> To personalize your experience and deliver
                content relevant to your workspace and usage patterns.
              </li>
              <li>
                <strong>Communication:</strong> To send you service-related notices, respond to
                your inquiries, and (with your consent) send marketing communications.
              </li>
              <li>
                <strong>Security:</strong> To detect, prevent, and address technical issues,
                fraud, and unauthorized access.
              </li>
              <li>
                <strong>Analytics:</strong> To analyze usage trends and improve the Service&apos;s
                functionality and user experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Storage and Security</h2>
            <p>
              Your data is stored on secure cloud infrastructure provided by trusted hosting
              partners. We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>AES-256 encryption for data at rest</li>
              <li>TLS 1.3 encryption for data in transit</li>
              <li>Regular security audits and penetration testing</li>
              <li>Role-based access controls for all internal systems</li>
              <li>Automated backups and disaster recovery procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. AI Processing</h2>
            <p>
              When you use our AI assistant, your queries and the relevant context from your
              knowledge base are sent to third-party AI providers (such as OpenAI, Google, or
              Anthropic) to generate responses. These providers process the data strictly to
              fulfill our requests and do not use your data to train their models under our
              enterprise agreements.
            </p>
            <p className="mt-3">
              We do not use your uploaded documents or conversations to train AI models. Your
              business knowledge remains your intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies for essential functionality (authentication
              sessions), analytics (understanding usage patterns), and preferences (remembering
              your settings). You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Third-Party Services</h2>
            <p>We integrate with the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Stripe:</strong> Payment processing
              </li>
              <li>
                <strong>Vercel:</strong> Application hosting and deployment
              </li>
              <li>
                <strong>AI Providers:</strong> OpenAI, Google Gemini, Anthropic Claude for AI
                processing
              </li>
              <li>
                <strong>PostgreSQL:</strong> Database hosting
              </li>
            </ul>
            <p className="mt-3">
              Each third-party service has its own privacy policy. We encourage you to review
              their policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
            <p>
              We retain your account information and workspace data for as long as your account
              is active. If you delete your account, we remove your personal data within 30 days,
              except where we are legally required to retain certain records. Uploaded documents
              and conversation history are deleted when you remove them or close your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Export your data in a portable format</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at privacy@knowbase.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Children&apos;s Privacy</h2>
            <p>
              The Service is not intended for children under 13 years of age. We do not knowingly
              collect personal information from children. If we learn that we have collected
              personal data from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the &quot;Last
              updated&quot; date. Your continued use of the Service after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Email: privacy@knowbase.ai</li>
              <li>General: support@knowbase.ai</li>
            </ul>
          </section>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
