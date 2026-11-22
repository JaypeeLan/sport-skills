import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, List, Section, SupportLink } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'The terms for using SportPath, including subscriptions and safety.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="22 November 2026">
      <Section title="These terms">
        <p>
          These terms apply when you use SportPath, run by Syntronware Limited. By creating an account or using the app,
          you agree to them. Our{' '}
          <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">
            privacy policy
          </Link>{' '}
          explains how we handle your data.
        </p>
      </Section>

      <Section title="Your safety comes first">
        <List
          items={[
            'Sport and exercise carry a risk of injury. You practise at your own risk.',
            'Check with a doctor before you start a new activity, especially if you have a health condition, an injury, or are pregnant.',
            'Use the right equipment and a safe place. For water, combat, climbing and other high-risk activities, practise only with qualified supervision.',
            'An AI model writes the lessons. They can contain mistakes. They do not replace a qualified coach or instructor. Stop if something hurts or feels unsafe.',
          ]}
        />
      </Section>

      <Section title="Your account">
        <List
          items={[
            'You must be at least 13 years old. If you are under 18, you need a parent or guardian to agree to these terms and to any purchase.',
            'Keep your password safe. You are responsible for what happens in your account.',
            'You can delete your account at any time in the app, under Profile.',
          ]}
        />
      </Section>

      <Section title="Subscriptions in the mobile app">
        <List
          items={[
            'The mobile app needs a subscription to open lessons. Plans are weekly, monthly or yearly. The app shows each price in your currency before you buy.',
            'New subscribers can start with an introductory trial. The trial opens the first lesson of each track. When it ends, the plan you chose starts and you are charged, unless you cancel before then.',
            'Apple or Google takes payment through your App Store or Google Play account. Subscriptions renew automatically at the end of each period unless you cancel at least 24 hours before it ends.',
            'Cancel or change your plan in your App Store or Google Play account settings. Deleting the app or your SportPath account does not cancel a subscription.',
            'Refunds follow the rules of Apple or Google. Contact them to ask for one.',
            'If a price changes, Apple or Google tells you before it applies, as their rules require.',
          ]}
        />
      </Section>

      <Section title="Acceptable use">
        <p>Do not misuse SportPath. For example, do not:</p>
        <List
          items={[
            'try to get around the paywall, the rate limits or other protections;',
            'copy, resell or publish lessons in bulk;',
            'interfere with the service or other people’s accounts.',
          ]}
        />
        <p>We may suspend or close an account that breaks these terms.</p>
      </Section>

      <Section title="Content">
        <p>
          SportPath and its lessons belong to Syntronware Limited. You may use them for your own learning. Coaching videos
          belong to their creators and play from YouTube under YouTube&apos;s terms.
        </p>
      </Section>

      <Section title="The service">
        <p>
          We work to keep SportPath available and correct, but we provide it as it is, without a promise that it is free
          of errors or always available. As far as the law allows, we are not responsible for injury, loss or damage
          that comes from using SportPath. Nothing in these terms limits rights you have under consumer law.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms. If a change is important, we tell you in the app or by email before it applies. If
          you keep using SportPath after that, the new terms apply.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms: <SupportLink />.
        </p>
      </Section>
    </LegalPage>
  )
}
