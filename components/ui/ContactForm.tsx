'use client'

import { useState } from 'react'
import type { ContactDict, FormsDict } from '@/lib/i18n/types'
import { Button } from './Button'
import { cn } from '@/lib/cn'

interface ContactFormProps {
  contact: ContactDict
  forms: FormsDict
  endpoint?: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ contact, forms, endpoint }: ContactFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { fields, validation } = contact

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {}
    if (!data.get('name')) errs.name = validation.nameRequired
    const email = data.get('email') as string
    if (!email) errs.email = validation.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = validation.emailInvalid
    if (!data.get('message')) errs.message = validation.messageRequired
    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const errs = validate(data)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setState('submitting')

    try {
      const res = await fetch(endpoint!, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl bg-sage-light border border-sage p-6 text-sage-dark text-center">
        {contact.success}
      </div>
    )
  }

  const inputClass = (field: string) =>
    cn(
      'w-full rounded-lg border px-4 py-3 text-charcoal text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-shadow',
      errors[field] ? 'border-red-400' : 'border-border'
    )

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="contact-name">
          {fields.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass('name')}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="contact-email">
          {fields.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass('email')}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-xs text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="contact-message">
          {fields.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={cn(inputClass('message'), 'resize-y')}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-charcoal mb-2">
          {fields.preferredLanguage}
        </legend>
        <div className="flex gap-6">
          {[
            { value: 'en', label: fields.languageEn },
            { value: 'fr', label: fields.languageFr },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="language"
                value={value}
                defaultChecked={value === 'en'}
                className="accent-sage"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {state === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {contact.error}{' '}
          <button
            type="button"
            className="underline"
            onClick={() => setState('idle')}
          >
            {forms.tryAgain}
          </button>
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={state === 'submitting' || !endpoint}
        className="self-start"
      >
        {state === 'submitting' ? forms.submitting : fields.submit}
      </Button>
    </form>
  )
}
