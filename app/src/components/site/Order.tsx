import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/mini';
import { PhoneIcon, MailIcon, CircleAlertIcon } from 'lucide-react';
import { bnNumeral, site, type Section } from '@/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionHead } from './SectionHead';

type SelectDef = {
  id: 'flavour' | 'size' | 'when';
  label: string;
  options: { value: string; label: string }[];
};
type Consent = { name: 'allergy' | 'contact'; text: string; quiet: string; required?: boolean };

function OrderForm({ s }: { s: Section }) {
  const f = s.form;
  const e = f.errors;
  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().check(z.trim(), z.minLength(2, e.name)),
        email: z.email(e.email),
        phone: z.optional(z.string()),
        flavour: z.string().check(z.minLength(1, e.flavour)),
        size: z.string().check(z.minLength(1, e.size)),
        when: z.optional(z.string()),
        message: z.optional(z.string()),
        allergy: z.boolean(),
        contact: z.boolean().check(z.refine((v) => v, e.contact)),
      }),
    [e],
  );
  type Values = z.infer<typeof schema>;

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      flavour: '',
      size: '',
      when: '',
      message: '',
      allergy: false,
      contact: false,
    },
  });
  const [unsent, setUnsent] = React.useState(false);
  const noticeRef = React.useRef<HTMLDivElement>(null);

  // Valid input still goes nowhere: the form is not wired to a backend yet,
  // and saying so plainly is the whole point. No fake "thank you".
  const onSubmit = () => {
    setUnsent(true);
    requestAnimationFrame(() => noticeRef.current?.focus());
  };

  const selects = f.selects as SelectDef[];
  const consents = f.consents as Consent[];

  return (
    <Form {...form}>
      <form
        id={f.id}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        aria-describedby={`${f.id}-intro`}
        className="grid gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{f.fields.name.label}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete={f.fields.name.autocomplete}
                    className="h-11 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{f.fields.email.label}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete={f.fields.email.autocomplete}
                    className="h-11 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {f.fields.phone.label}
                <span className="font-normal text-stone">({f.fields.phone.optional})</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  autoComplete={f.fields.phone.autocomplete}
                  className="h-11 bg-white sm:max-w-[calc(50%-0.75rem)]"
                  {...field}
                />
              </FormControl>
              <FormDescription>{f.phoneHint}</FormDescription>
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {selects.map((sel) => (
            <FormField
              key={sel.id}
              control={form.control}
              name={sel.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{sel.label}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full bg-white" onBlur={field.onBlur}>
                        <SelectValue placeholder={f.selectPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sel.options.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{f.textarea.label}</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={f.textarea.placeholder}
                  className="min-h-32 bg-white"
                  {...field}
                />
              </FormControl>
              <FormDescription>{f.textarea.hint}</FormDescription>
            </FormItem>
          )}
        />

        <div className="grid gap-4">
          {consents.map((c) => (
            <FormField
              key={c.name}
              control={form.control}
              name={c.name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3 rounded-md border border-line bg-white p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      onBlur={field.onBlur}
                      className="mt-0.5 size-5 border-line-strong data-[state=checked]:border-leaf data-[state=checked]:bg-leaf"
                    />
                  </FormControl>
                  <div className="grid gap-1">
                    <FormLabel className="text-[0.97rem] font-medium leading-snug">
                      {c.text}
                    </FormLabel>
                    <FormDescription>{c.quiet}</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button type="submit" className="h-12 rounded-full px-8 text-base">
            {f.submitLabel}
          </Button>
          <p className="text-[0.92rem] text-stone">{s.formNote}</p>
        </div>

        <div aria-live="polite">
          {unsent && (
            <div
              ref={noticeRef}
              tabIndex={-1}
              role="alert"
              className="flex gap-3 rounded-lg border border-gur/40 bg-apricot-wash p-5 text-charcoal"
            >
              <CircleAlertIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gur" />
              <div>
                <p className="font-semibold text-leaf-ink">{f.noSubmitHeading}</p>
                <p className="mt-1 leading-relaxed">{f.noSubmit}</p>
                <a
                  href={site.contact.phoneHref}
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-leaf underline underline-offset-4"
                >
                  <PhoneIcon aria-hidden="true" className="size-4" />
                  {site.contact.phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

export function Order({ s }: { s: Section }) {
  const steps = s.steps as { title: string; body: string }[];
  const a = s.aside;
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="bg-apricot-wash/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead id={s.id} eyebrow={s.eyebrow} heading={s.heading} lede={s.lede} />

        {/* The one real sequence on the page, so the one place for numerals:
            Bengali ones. */}
        <div className="mt-14" data-reveal>
          <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-stone">
            {s.stepsHeading}
          </h3>
          <ol className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {steps.map((st, i) => (
              <li key={st.title} className="border-t-2 border-leaf pt-5">
                <span
                  aria-hidden="true"
                  lang="bn"
                  className="bn block text-[3.4rem] leading-none text-gur"
                >
                  {bnNumeral(i + 1)}
                </span>
                <p className="mt-4 font-display text-[1.45rem] leading-tight text-leaf-ink">
                  {st.title}
                </p>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-charcoal">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Card
            className="gap-0 rounded-xl border-line bg-milk py-0 shadow-none lg:col-span-8"
            data-reveal
          >
            <CardHeader className="px-6 pb-6 pt-8 sm:px-10 sm:pt-10">
              <CardTitle className="font-display text-3xl font-normal text-leaf-ink">
                <h3>{s.form.heading}</h3>
              </CardTitle>
              <CardDescription id={`${s.form.id}-intro`} className="text-[0.97rem] text-stone">
                {s.form.intro}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-10 sm:px-10">
              <OrderForm s={s} />
            </CardContent>
          </Card>

          <aside className="self-start lg:sticky lg:top-28 lg:col-span-4" aria-labelledby={`${s.id}-aside`} data-reveal>
            <img
              src={a.image.src}
              alt={a.image.alt}
              width={1600}
              height={679}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover object-[40%_50%]"
            />
            <h3 id={`${s.id}-aside`} className="mt-8 font-display text-3xl text-leaf-ink">
              {a.heading}
            </h3>
            <p className="mt-3 leading-relaxed text-charcoal">{a.body}</p>
            <div className="mt-6 grid gap-3">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-3 font-display text-3xl text-leaf underline decoration-apricot decoration-2 underline-offset-[6px] hover:decoration-leaf"
              >
                <PhoneIcon aria-hidden="true" className="size-5" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-3 break-all text-leaf-ink underline decoration-line-strong underline-offset-4 hover:decoration-leaf"
              >
                <MailIcon aria-hidden="true" className="size-4 shrink-0" />
                {site.contact.email}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
