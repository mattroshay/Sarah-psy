import type { ContactDict, FormsDict } from '@/lib/i18n/types'
import { ContactForm } from '@/components/ui/ContactForm'

interface ContactPageProps {
  contact: ContactDict
  forms: FormsDict
  formspreeEndpoint?: string
  discoveryCalendlyUrl?: string
  sessionCalendlyUrl?: string
}

export function ContactPage({
  contact,
  forms,
  formspreeEndpoint,
  discoveryCalendlyUrl,
  sessionCalendlyUrl,
}: ContactPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Form + Calendly Grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form - spans 1 column on desktop, full width on mobile */}
        <section className="lg:col-span-1">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
            {contact.formHeading}
          </h2>
          <ContactForm
            contact={contact}
            forms={forms}
            endpoint={formspreeEndpoint}
          />
        </section>

        {/* Calendly Sections - span 2 columns on desktop, full width on mobile */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
          {/* Discovery Call */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
              {contact.calendlyDiscoveryHeading}
            </h2>
            {contact.calendlyDiscoveryDescription && (
              <p className="text-sm text-muted mb-4">
                {contact.calendlyDiscoveryDescription}
              </p>
            )}
            {discoveryCalendlyUrl ? (
              <iframe
                src={`${discoveryCalendlyUrl}?embed_type=Inline&hide_event_type_details=1`}
                title={contact.calendlyDiscoveryHeading}
                className="w-full rounded-xl border border-border"
                style={{ minHeight: 620 }}
                loading="lazy"
              />
            ) : (
              <div className="rounded-xl border border-border bg-warm p-8 text-center text-muted text-sm">
                {contact.calendlyFallback}
              </div>
            )}
          </section>

          {/* Session Booking */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
              {contact.calendlySessionHeading}
            </h2>
            {contact.calendlySessionDescription && (
              <p className="text-sm text-muted mb-4">
                {contact.calendlySessionDescription}
              </p>
            )}
            {sessionCalendlyUrl ? (
              <iframe
                src={`${sessionCalendlyUrl}?embed_type=Inline&hide_event_type_details=1`}
                title={contact.calendlySessionHeading}
                className="w-full rounded-xl border border-border"
                style={{ minHeight: 620 }}
                loading="lazy"
              />
            ) : (
              <div className="rounded-xl border border-border bg-warm p-8 text-center text-muted text-sm">
                {contact.calendlyFallback}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
