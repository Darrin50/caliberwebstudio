import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Caliber Web Studio" },
  description:
    "Privacy Policy for Caliber Web Studio. Learn how we collect, use, and protect your personal data.",
  alternates: { canonical: "https://www.caliberwebstudio.com/privacy" },
  openGraph: {
    title: "Privacy Policy | Caliber Web Studio",
    description:
      "Privacy Policy for Caliber Web Studio — how we collect, use, and protect your data.",
    url: "https://www.caliberwebstudio.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "80px",
          background: "var(--bg)",
        }}
      >
        {/* Hero */}
        <section
          style={{
            padding: "clamp(60px, 10vw, 100px) clamp(20px, 6vw, 80px) 48px",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle top gradient */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,61,143,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
            <div
              className="fu"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--accent)",
                }}
              />
              Legal
            </div>
            <h1
              className="fu"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--white)",
                marginBottom: "20px",
              }}
            >
              Privacy Policy
            </h1>
            <p
              className="fu"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                color: "var(--dim)",
                letterSpacing: "0.05em",
              }}
            >
              Last Updated: March 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section
          style={{
            padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px)",
          }}
        >
          <div
            className="fu"
            style={{
              maxWidth: "780px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "48px",
            }}
          >
            {/* Intro */}
            <div className="legal-section">
              <p>
                This Privacy Policy describes how{" "}
                <strong style={{ color: "var(--silver)" }}>
                  Caliber Web Studio
                </strong>
                , operated by{" "}
                <strong style={{ color: "var(--silver)" }}>
                  High Caliber Operations LLC
                </strong>{" "}
                ("we," "us," or "our"), collects, uses, and protects information
                about you when you visit{" "}
                <span style={{ color: "var(--accent)" }}>
                  caliberwebstudio.com
                </span>{" "}
                or use our services. We are committed to protecting your privacy
                and handling your data with care and transparency.
              </p>
            </div>

            <Section title="1. Information We Collect">
              <Subsection title="1.1 Information You Provide">
                <p>
                  When you contact us, request a quote, or sign up for our
                  services, we may collect:
                </p>
                <ul>
                  <li>Full name and business name</li>
                  <li>Email address and phone number</li>
                  <li>Business address and location</li>
                  <li>Website URL and social media profiles</li>
                  <li>Payment information (processed securely via Stripe)</li>
                  <li>
                    Any content or materials you submit as part of onboarding
                  </li>
                </ul>
              </Subsection>
              <Subsection title="1.2 Information Collected Automatically">
                <p>
                  When you visit our website, we automatically collect certain
                  technical data, including:
                </p>
                <ul>
                  <li>IP address and approximate geographic location</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited, time on site, and referral source</li>
                  <li>Device type and screen resolution</li>
                  <li>
                    Interaction data (clicks, scroll depth, form submissions)
                  </li>
                </ul>
                <p>
                  This data is collected via cookies and analytics tools
                  described in Section 4.
                </p>
              </Subsection>
              <Subsection title="1.3 AI Chatbot Interactions">
                <p>
                  Our website may include an AI-powered chatbot. Conversations
                  with the chatbot are processed in real time to generate
                  responses. Please note:
                </p>
                <ul>
                  <li>
                    Chatbot conversations are processed by OpenAI's API
                    services.
                  </li>
                  <li>
                    We do not permanently store chatbot conversation transcripts
                    on our servers beyond what is necessary to generate a
                    response and capture a lead (name, email, phone number, if
                    voluntarily provided).
                  </li>
                  <li>
                    Do not share sensitive personal information (financial
                    account numbers, passwords, government ID numbers) in the
                    chatbot.
                  </li>
                  <li>
                    OpenAI's data processing is subject to their own Privacy
                    Policy and Data Processing Agreement.
                  </li>
                </ul>
              </Subsection>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Deliver services:
                  </strong>{" "}
                  Build and maintain your website, operate AI tools, manage your
                  digital presence.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Communicate with you:
                  </strong>{" "}
                  Send project updates, billing notifications, support
                  responses, and service-related announcements.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Process payments:
                  </strong>{" "}
                  Manage subscription billing through our payment processor.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Improve our services:
                  </strong>{" "}
                  Analyze usage patterns to improve website performance and user
                  experience.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Marketing:
                  </strong>{" "}
                  With your consent, send promotional emails about new services
                  or offers. You can opt out at any time.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Legal compliance:
                  </strong>{" "}
                  Meet our obligations under applicable law, respond to legal
                  requests, and protect our rights.
                </li>
              </ul>
            </Section>

            <Section title="3. Cookies &amp; Analytics">
              <Subsection title="3.1 Cookies">
                <p>
                  We use cookies — small text files stored on your device — to
                  operate and improve our website. Cookie types we use:
                </p>
                <ul>
                  <li>
                    <strong style={{ color: "var(--silver)" }}>
                      Essential cookies:
                    </strong>{" "}
                    Required for the site to function. These cannot be disabled.
                  </li>
                  <li>
                    <strong style={{ color: "var(--silver)" }}>
                      Analytics cookies:
                    </strong>{" "}
                    Help us understand how visitors interact with our site.
                  </li>
                  <li>
                    <strong style={{ color: "var(--silver)" }}>
                      Preference cookies:
                    </strong>{" "}
                    Remember settings such as your theme preference (dark/light
                    mode).
                  </li>
                </ul>
                <p>
                  You can manage or disable cookies through your browser
                  settings. Disabling analytics cookies will not affect core
                  site functionality.
                </p>
              </Subsection>
              <Subsection title="3.2 Google Analytics">
                <p>
                  We use Google Analytics to collect aggregated, anonymized
                  data about site traffic and user behavior. Google Analytics
                  may set cookies and collect data in accordance with Google's
                  Privacy Policy. We have configured Google Analytics with IP
                  anonymization enabled. You can opt out of Google Analytics
                  tracking by installing the{" "}
                  <span style={{ color: "var(--accent)" }}>
                    Google Analytics Opt-out Browser Add-on
                  </span>
                  .
                </p>
              </Subsection>
            </Section>

            <Section title="4. Third-Party Services">
              <p>
                We use the following third-party services in operating our
                business. Each is subject to its own privacy practices:
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                {[
                  {
                    name: "Vercel",
                    purpose: "Website hosting and infrastructure",
                  },
                  {
                    name: "OpenAI",
                    purpose: "AI chatbot responses and content generation",
                  },
                  {
                    name: "Stripe",
                    purpose: "Payment processing and subscription billing",
                  },
                  {
                    name: "Resend",
                    purpose: "Transactional email delivery",
                  },
                  {
                    name: "Twilio",
                    purpose: "SMS notifications and communication",
                  },
                  {
                    name: "Google",
                    purpose:
                      "Analytics, Search Console, and Business Profile services",
                  },
                ].map((svc) => (
                  <div
                    key={svc.name}
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      background:
                        "var(--card-bg, rgba(255,255,255,0.04))",
                      border:
                        "1px solid var(--border-color, rgba(255,255,255,0.08))",
                      borderRadius: "10px",
                      padding: "14px 18px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        letterSpacing: "0.05em",
                        minWidth: "80px",
                        paddingTop: "1px",
                      }}
                    >
                      {svc.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {svc.purpose}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "20px" }}>
                We do not sell your personal data to third parties. We only
                share data with these providers as necessary to deliver our
                services.
              </p>
            </Section>

            <Section title="5. Data Retention">
              <p>We retain your personal data for as long as:</p>
              <ul>
                <li>Your subscription is active and services are ongoing.</li>
                <li>
                  Required to fulfill our legal, accounting, or reporting
                  obligations (typically 7 years for financial records).
                </li>
                <li>
                  Necessary to resolve disputes, enforce agreements, or comply
                  with legal requests.
                </li>
              </ul>
              <p>
                Upon cancellation of services, we will retain your data for up
                to 90 days to allow for data export requests, after which
                personal data not required for legal compliance will be deleted
                or anonymized.
              </p>
            </Section>

            <Section title="6. Your Rights">
              <p>
                Depending on your location and applicable law, you may have the
                following rights with respect to your personal data:
              </p>
              <ul>
                <li>
                  <strong style={{ color: "var(--silver)" }}>Access:</strong>{" "}
                  Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>Correction:</strong>{" "}
                  Request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>Deletion:</strong>{" "}
                  Request deletion of your personal data, subject to legal
                  retention requirements.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Opt-out of marketing:
                  </strong>{" "}
                  Unsubscribe from promotional emails at any time via the
                  unsubscribe link in any email, or by contacting us directly.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Data portability:
                  </strong>{" "}
                  Request a machine-readable export of your data where
                  technically feasible.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:darrin@caliberwebstudio.com"
                  style={{ color: "var(--accent)" }}
                >
                  darrin@caliberwebstudio.com
                </a>
                . We will respond to verifiable requests within 30 days.
              </p>
            </Section>

            <Section title="7. CCPA — California Residents">
              <p>
                If you are a California resident, the California Consumer
                Privacy Act (CCPA) provides you with additional rights regarding
                your personal information:
              </p>
              <ul>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Right to Know:
                  </strong>{" "}
                  You may request disclosure of the categories and specific
                  pieces of personal information we have collected, the sources
                  of that information, our business purpose for collecting it,
                  and the categories of third parties with whom we share it.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Right to Delete:
                  </strong>{" "}
                  You may request deletion of personal information we have
                  collected, subject to certain exceptions.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Right to Non-Discrimination:
                  </strong>{" "}
                  We will not discriminate against you for exercising your CCPA
                  rights.
                </li>
                <li>
                  <strong style={{ color: "var(--silver)" }}>
                    Do Not Sell:
                  </strong>{" "}
                  We do not sell personal information as defined under the CCPA.
                </li>
              </ul>
              <p>
                To submit a CCPA request, contact us at{" "}
                <a
                  href="mailto:darrin@caliberwebstudio.com"
                  style={{ color: "var(--accent)" }}
                >
                  darrin@caliberwebstudio.com
                </a>
                .
              </p>
            </Section>

            <Section title="8. Data Security">
              <p>
                We implement reasonable technical and organizational measures to
                protect your personal data against unauthorized access,
                alteration, disclosure, or destruction. These measures include
                HTTPS encryption, access controls, and use of reputable
                third-party infrastructure providers. However, no method of
                transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our services are not directed to individuals under the age of
                13, and we do not knowingly collect personal data from children
                under 13. If you believe we have inadvertently collected
                information from a child, please contact us immediately and we
                will take steps to delete it.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy periodically to reflect
                changes in our practices or applicable law. We will post the
                updated policy on this page with a revised "Last Updated" date.
                For significant changes, we will notify active clients by email.
                Your continued use of our services after changes take effect
                constitutes acceptance of the revised policy.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                For questions, requests, or concerns regarding this Privacy
                Policy or your personal data, please contact us:
              </p>
              <div
                style={{
                  background: "var(--card-bg, rgba(255,255,255,0.04))",
                  border:
                    "1px solid var(--border-color, rgba(255,255,255,0.08))",
                  borderRadius: "12px",
                  padding: "24px",
                  marginTop: "16px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--dim)",
                  lineHeight: 1.9,
                  letterSpacing: "0.03em",
                }}
              >
                <strong style={{ color: "var(--silver)" }}>
                  High Caliber Operations LLC
                </strong>
                <br />
                dba Caliber Web Studio
                <br />
                Detroit, MI
                <br />
                <a
                  href="mailto:darrin@caliberwebstudio.com"
                  style={{ color: "var(--accent)" }}
                >
                  darrin@caliberwebstudio.com
                </a>
                <br />
                <a
                  href="https://www.caliberwebstudio.com"
                  style={{ color: "var(--accent)" }}
                >
                  caliberwebstudio.com
                </a>
              </div>
              <p style={{ marginTop: "24px" }}>
                Also see our{" "}
                <a href="/terms" style={{ color: "var(--accent)" }}>
                  Terms of Service
                </a>
                .
              </p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .legal-section p {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0 0 14px 0;
        }
        .legal-section ul {
          margin: 12px 0 14px 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .legal-section ul li {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .legal-section a {
          transition: opacity 0.2s;
        }
        .legal-section a:hover {
          opacity: 0.8;
        }
        /* Hero .fu stagger */
        .fu:nth-child(1) { transition-delay: 0s; }
        .fu:nth-child(2) { transition-delay: 0.1s; }
        .fu:nth-child(3) { transition-delay: 0.2s; }
        /* Content block fades in slightly after hero */
        section + section .fu { transition-delay: 0.15s; }
      `}</style>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="legal-section">
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          fontWeight: 800,
          color: "var(--silver)",
          letterSpacing: "-0.01em",
          marginBottom: "16px",
          paddingBottom: "10px",
          borderBottom: "1px solid var(--border)",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div>{children}</div>
    </div>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--chrome)",
          marginBottom: "8px",
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      <div className="legal-section">{children}</div>
    </div>
  );
}
