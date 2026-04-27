import type { ContactDict, FormsDict } from '@/lib/i18n/types'
import { ContactForm } from '@/components/ui/ContactForm'

interface ContactPageProps {
  contact: ContactDict
  forms: FormsDict
  formspreeEndpoint?: string
  calendlyUrl?: string
}

export function ContactPage({
  contact,
  forms,
  formspreeEndpoint,
  calendlyUrl,
}: ContactPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12">
      {/* Form */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
          {contact.formHeading}
        </h2>
        <ContactForm
          contact={contact}
          forms={forms}
          endpoint={formspreeEndpoint}
        />
      </section>

      {/* Calendly */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
          {contact.calendlyHeading}
        </h2>
        {calendlyUrl ? (
          <iframe
            src={`${calendlyUrl}?embed_type=Inline&hide_event_type_details=1`}
            title={contact.calendlyHeading}
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
  )
}
