// src/pages/Terms.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const lastUpdated = 'July 6, 2025';

export default function Terms() {
  useEffect(() =>{
      window.scrollTo(0, 0);
  }, []);
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto  mt-4 rounded-xl shadow-lg bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-2">Terms &amp; Conditions</h1>
      <p className="text-center text-sm text-gray-500 mb-8"><em>Last updated {lastUpdated}</em></p>

      {[
        { id: 'introduction', title: 'Introduction', content:
            <>
            These Terms &amp; Conditions (“Terms”) govern your use of <strong>[HireScript.com]</strong> (“Site”) operated by <strong>[Lets Work]</strong>. By accessing or using the Site—as a job seeker, employer, or visitor—you agree to these Terms.
            </>
        },
        { id: 'eligibility', title: 'Eligibility & Account Registration', content:
            <ul className="list-disc list-inside space-y-1">
              <li>Users must be at least 18 years old and legally eligible to work.</li>
              <li>Accurate registration info is required to post or apply for jobs.</li>
              <li>You’re responsible for your account credentials; notify us of unauthorized use.</li>
            </ul>
        },
        { id: 'use', title: 'Acceptable Use & Prohibited Conduct', content:
            <>
              <p>You agree to use the Site lawfully. Prohibited behavior includes, but isn’t limited to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Fraudulent job postings, spamming, scraping or data harvesting;</li>
                <li>Harassment, discrimination, or uploading harmful content;</li>
                <li>Infringing other users’ intellectual property.</li>
              </ul>
            </>
        },
        { id: 'job-postings', title: 'Job Postings & Employer Obligations', content:
            <ul className="list-disc list-inside space-y-1">
              <li>Employers must post truthful, non-misleading job ads and disclose payment or fees, if any.</li>
              <li>We reserve the right to edit or reject any posting.</li>
            </ul>
        },
        { id: 'user-content', title: 'User Content & Intellectual Property', content:
            <p>You retain ownership of your submissions (resumes, postings). Submitting grants us a license to host and display them. Don’t upload infringing content. We comply with DMCA takedown requests.</p>
        },
        { id: 'fees', title: 'Fees, Payment & Refunds', content:
            <p>Employers may pay to post jobs or access applicant data per our Pricing & Payment page. Unless otherwise specified, fees are non‑refundable. We may update pricing with notice.</p>
        },
        { id: 'privacy', title: 'Privacy', content:
            <p>Your personal data is handled per our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>. Review it carefully.</p>
        },
        { id: 'termination', title: 'Termination & Suspension', content:
            <p>We may suspend or terminate accounts or remove content for violation of Terms. You may also close your account at any time.</p>
        },
        { id: 'liability', title: 'Disclaimers & Limitation of Liability', content:
            <p>The Site and content are provided “as is.” We disclaim all warranties. We are not liable for inaccurate user content or indirect/consequential damages.</p>
        },
        { id: 'indemnification', title: 'Indemnification', content:
            <p>You agree to indemnify us from any claims, damages, or expenses arising from your use of the Site or violation of these Terms.</p>
        },
        { id: 'governing-law', title: 'Governing Law & Dispute Resolution', content:
            <p>These Terms are governed by the laws of [State/Country]. Any disputes will be resolved in [Jurisdiction] courts.</p>
        },
        { id: 'changes', title: 'Changes to the Terms', content:
            <p>We may update these Terms occasionally. Changes take effect when posted. Continued use means you accept the updates.</p>
        },
        { id: 'contact', title: 'Contact Information', content:
            <address className="not-italic">
              [Lets Work]<br/>
              Email: <a href="contactbelalnaim@gmail.com" className="text-blue-600 hover:underline">contactbelalnaim@gmail.com</a><br/>
              Address: [Street, City, State/Country]
            </address>
        },
      ].map(section => (
        <section key={section.id} id={section.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <div className="text-gray-700 space-y-2">{section.content}</div>
        </section>
      ))}

    </div>
  );
}
