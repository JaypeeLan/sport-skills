import type { Metadata } from 'next'
import { LegalPage, List, Section, SupportLink } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Delete your account',
  description: 'How to delete your SportPath account and what we delete.',
  alternates: { canonical: '/delete-account' },
}

// Public page for the App Store and Google Play: how to delete an account,
// with or without the app.
export default function DeleteAccountPage() {
  return (
    <LegalPage title="Delete your SportPath account" updated="22 November 2026">
      <Section title="Delete it in the app">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Open SportPath and sign in.</li>
          <li>Go to Profile.</li>
          <li>Scroll down and tap Delete account.</li>
          <li>Confirm with your password, or with Apple or Google if you sign in with them.</li>
        </ol>
        <p>We delete your account at once, and the app signs you out.</p>
      </Section>

      <Section title="Delete it without the app">
        <p>
          Email <SupportLink /> from the email address of your account, with the subject &quot;Delete my account&quot;.
          We may reply to confirm that the account is yours. Then we delete it within 30 days and email you when it is
          done.
        </p>
      </Section>

      <Section title="What we delete">
        <List
          items={[
            'Your account: email address, name, profile photo, password hash and linked Apple or Google sign-in.',
            'Your tracks, lessons, progress and badges.',
            'Your module ratings and the messages you sent us from the app.',
            'Your plan record and the push tokens of your devices.',
          ]}
        />
        <p>
          We do not keep a copy. Apple, Google and RevenueCat keep their own purchase records under their own policies.
        </p>
      </Section>

      <Section title="Cancel your subscription first">
        <p>
          Deleting your account does not cancel a subscription. Apple or Google bills it, so cancel it with them:
        </p>
        <List
          items={[
            'iPhone or iPad: Settings, then your name, then Subscriptions, then SportPath.',
            'Android: Google Play, then your profile picture, then Payments and subscriptions, then Subscriptions.',
          ]}
        />
      </Section>
    </LegalPage>
  )
}
