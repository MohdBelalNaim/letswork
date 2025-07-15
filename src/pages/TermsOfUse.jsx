const lastUpdated = 'July 6, 2025';
const sections = [
    {
        id: 'agreement',
        title: '1. Agreement to Terms',
        content: (
            <>
                <p>
                    These Terms of Use (“Terms”) constitute a legally binding agreement between you (“you”, “User”) and <strong>[HireScript.tech]</strong> (“we”, “us”, “our”). These Terms govern your access to and use of our Site and services. By using the Site, you agree to these Terms .
                </p>
            </>
        )
    },
    {
        id: 'use-of-site',
        title: '2. Use of the Site',
        content: (
            <>
                <p>
                    You agree to Use the Site only for lawful purposes and in ways that do not violate any rights or restrict others’ use. Prohibited activities include hacking, scraping, spamming, posting illegal content, or infringing intellectual property
                </p>
            </>
        )
    },
    {
        id: 'account',
        title: '3. Account Registration',
        content: (
            <ul className="list-disc list-inside space-y-1">
                <li>You must register an account with accurate information.</li>
                <li>You are responsible for maintaining confidentiality of login credentials.</li>
                <li>Notify us immediately of any unauthorized use.</li>
            </ul>
        )
    },
    {
        id: 'user-content',
        title: '4. User Content',
        content: (
            <>
                <p>
                    You retain ownership of any content you submit. By posting, you grant us a non‑exclusive license to host and display your content. You warrant that your content does not violate any third‑party rights. We reserve the right to remove infringing content
                </p>
            </>
        )
    },
    {
        id: 'intellectual-property',
        title: '5. Intellectual Property',
        content: (
            <>
                <p>
                    All Site content, design, and trademarks are owned by us or our licensors. You may not copy, reproduce, or distribute without permission
                </p>
            </>
        )
    },
    {
        id: 'links',
        title: '6. Third-Party Links',
        content: (
            <p>
                Our Site may contain links to third-party websites. We are not responsible for their content or policies
            </p>
        )
    },
    {
        id: 'disclaimer',
        title: '7. Disclaimer of Warranties',
        content: (
            <p>
                The Site is provided “as is” and “as available.” We disclaim all warranties, express or implied, to the fullest extent permitted by law
            </p>
        )
    },
    {
        id: 'limitation',
        title: '8. Limitation of Liability',
        content: (
            <p>
                We are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Site
            </p>
        )
    },
    {
        id: 'termination',
        title: '9. Termination',
        content: (
            <p>
                We may suspend or terminate access for any violation of these Terms or misuse of the Site
            </p>
        )
    },
    {
        id: 'governing-law',
        title: '10. Governing Law',
        content: (
            <p>
                These Terms are governed by the laws of [State/Country], and any disputes shall be resolved in its courts
            </p>
        )
    },
    {
        id: 'changes',
        title: '11. Changes to Terms',
        content: (
            <p>
                We may update these Terms anytime. Continued use after posting means you accept the changes
            </p>
        )
    },
    {
        id: 'contact',
        title: '12. Contact Us',
        content: (
            <address className="not-italic">
                [Lets Work]<br />
                Email: <a href="contactbelalnaim@gmail.com" className="text-blue-600 hover:underline">contactbelalnaim@gmail.com</a><br />
                Address: [Street, City, State/Country]
            </address>
        )
    }
];

export default function TermsOfUse() {
    return (
        <div className="px-6 py-8 max-w-5xl mx-auto  mt-4 rounded-xl shadow-lg bg-white text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-2">Terms of Use</h1>
            <p className="text-center text-sm text-gray-500 mb-8"><em>Last updated {lastUpdated}</em></p>

            {sections.map(sec => (
                <section key={sec.id} id={sec.id} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">{sec.title}</h2>
                    <div className="text-gray-700 space-y-2">{sec.content}</div>
                </section>
            ))}

            <p className="text-xs text-gray-500">
                Some clauses adapted from standard Terms of Use templates and guidelines 
            </p>
        </div>
    );
}
