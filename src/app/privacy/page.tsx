import type { Metadata } from 'next'
import { LegalPage, List, Section, SupportLink } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How SportPath collects, uses and protects your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="22 November 2026">
      <Section title="Who we are">
        <p>
          SportPath is a learning app for sports and physical skills, on the web at sportpath.app and on iOS and
          Android. Syntronware Limited runs SportPath and is responsible for your data. To contact us about privacy,
          email <SupportLink />.
        </p>
      </Section>

      <Section title="Data we collect">
        <List
          items={[
            <>
              <strong className="text-white">Account:</strong> your email address, a secure hash of your password (never
              the password itself), and the name and profile photo you choose to add.
            </>,
            <>
              <strong className="text-white">Sign in with Apple or Google:</strong> the account identifier and email that
              Apple or Google sends us. If you use Hide My Email, we only receive Apple&apos;s relay address.
            </>,
            <>
              <strong className="text-white">Learning:</strong> the activities, goals and experience level you choose, the
              tracks and lessons we create for you, and which lessons you finish and when.
            </>,
            <>
              <strong className="text-white">Subscription:</strong> your plan, whether it is a trial, and when it renews or
              ends. Apple or Google takes the payment. We never see your card details.
            </>,
            <>
              <strong className="text-white">Notifications:</strong> a push token for your device, if you allow
              notifications. Your practice days and reminder times stay on your device.
            </>,
            <>
              <strong className="text-white">Technical data:</strong> your IP address and request times, used to limit
              repeated requests and to keep the service secure.
            </>,
          ]}
        />
      </Section>

      <Section title="How we use your data">
        <List
          items={[
            'To create your account, sign you in, and keep your tracks and progress across your devices.',
            'To write your lessons and find coaching videos for them.',
            'To manage your subscription and open the lessons your plan includes.',
            'To send the emails you ask for, such as sign-in codes, and notifications such as a reminder that your trial ends tomorrow.',
            'To keep the service secure and fix problems.',
          ]}
        />
        <p>We do not sell your data, and we do not use it for advertising.</p>
      </Section>

      <Section title="Lessons written by AI">
        <p>
          An AI model writes your tracks and lessons. We send it only what the lesson needs: the activity, your goal,
          your experience level and the lesson titles. We do not send your email, your name or your photo.
        </p>
      </Section>

      <Section title="Services we use">
        <p>These companies process data for us, only to run SportPath:</p>
        <List
          items={[
            'Render (servers for our API) and Neon (database).',
            'Cloudflare (the website).',
            'OpenRouter (the AI models that write lessons).',
            'Google YouTube Data API (finding coaching videos).',
            'Resend (sending email).',
            'RevenueCat, Apple and Google (subscriptions and payments).',
            'Expo, Apple and Google (push notifications).',
            'Apple and Google (sign-in, if you choose them).',
          ]}
        />
      </Section>

      <Section title="How long we keep data">
        <p>
          We keep your data while you have an account. When you delete your account in the app, we delete your account,
          tracks, progress, photo, ratings, messages and device tokens at once. Apple, Google and RevenueCat keep purchase records under
          their own policies.
        </p>
      </Section>

      <Section title="Your choices and rights">
        <List
          items={[
            'Change your name, photo, email and password in the app, under Profile.',
            <>
              Delete your account and its data in the app, under Profile, or by email. See{' '}
              <a href="/delete-account" className="text-emerald-400 hover:text-emerald-300">
                how to delete your account
              </a>
              .
            </>,
            'Turn notifications off in your device settings.',
            <>
              Ask for a copy of your data, or ask us to correct it, by emailing <SupportLink />.
            </>,
          ]}
        />
      </Section>

      <Section title="Children">
        <p>
          SportPath is not for children under 13, and we do not knowingly collect their data. If you think a child under
          13 has an account, email us and we will delete it.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If we change this policy, we update the date at the top. If the change is important, we also tell you in the
          app or by email.
        </p>
      </Section>
    </LegalPage>
  )
}
