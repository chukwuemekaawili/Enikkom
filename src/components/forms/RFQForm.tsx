import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// The site has no backend, so the form composes a pre-filled enquiry in the
// visitor's own email client (mailto:). Drawings and specs are attached there.
const CONTACT_EMAIL = "info@enikkom.com";

const rfqSchema = z.object({
  fullName: z.string().min(2, "Name is required").max(200, "Name too long"),
  company: z.string().min(2, "Company is required").max(200, "Company name too long"),
  email: z.string().email("Valid email required").max(254, "Email too long"),
  phone: z.string().min(8, "Phone is required").max(30, "Phone number too long"),
  projectType: z.string().min(1, "Select a project type"),
  projectLocation: z.string().min(2, "Location is required").max(500, "Location too long"),
  targetDiameter: z.string().max(100, "Value too long").optional(),
  targetCrossingLength: z.string().max(100, "Value too long").optional(),
  targetDepthCover: z.string().max(100, "Value too long").optional(),
  desiredStartDate: z.string().optional(),
  additionalNotes: z.string().max(5000, "Notes too long").optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted"),
});

type RFQFormData = z.infer<typeof rfqSchema>;

const projectTypeLabels: Record<string, string> = {
  hdd: "HDD",
  pipeline: "Pipeline/Flowline",
  dredging: "Dredging",
  jetty: "Jetty/Quay",
  shore: "Shore Approach",
  other: "Other",
};

/** Build the pre-filled enquiry the visitor sends from their own mail client. */
function buildMailto(data: RFQFormData): string {
  const lines = [
    `Name: ${data.fullName}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Project type: ${projectTypeLabels[data.projectType] ?? data.projectType}`,
    `Location: ${data.projectLocation}`,
  ];
  if (data.targetDiameter) lines.push(`Target diameter: ${data.targetDiameter}`);
  if (data.targetCrossingLength) lines.push(`Crossing length: ${data.targetCrossingLength}`);
  if (data.desiredStartDate) lines.push(`Desired start date: ${data.desiredStartDate}`);
  if (data.additionalNotes) lines.push("", "Notes:", data.additionalNotes);
  lines.push("", "(Please attach alignment sheets, drawings or bid documents to this email.)");

  const subject = `RFQ: ${projectTypeLabels[data.projectType] ?? "Project"} enquiry from ${data.company}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function RFQForm() {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const form = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: { consent: false },
  });

  const onSubmit = (data: RFQFormData) => {
    window.location.href = buildMailto(data);
    toast.success("Your email app should open with the enquiry pre-filled. Attach any drawings there and press send.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact information */}
        <div className="space-y-5">
          <p className="text-sm font-semibold text-foreground">Contact information</p>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem><FormLabel>Company *</FormLabel><FormControl><Input autoComplete="organization" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Work Email *</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="name@company.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" autoComplete="tel" placeholder="+234..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField control={form.control} name="projectType" render={({ field }) => (
              <FormItem><FormLabel>Project Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="hdd">HDD</SelectItem>
                    <SelectItem value="pipeline">Pipeline/Flowline</SelectItem>
                    <SelectItem value="dredging">Dredging</SelectItem>
                    <SelectItem value="jetty">Jetty/Quay</SelectItem>
                    <SelectItem value="shore">Shore Approach</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select><FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="projectLocation" render={({ field }) => (
              <FormItem><FormLabel>Project Location *</FormLabel><FormControl><Input placeholder="City, State, Country" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        {/* Expand/collapse for technical details */}
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          aria-expanded={showTechnicalDetails}
          className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
        >
          <span className="text-sm font-medium text-foreground">
            Technical details <span className="font-normal text-muted-foreground">(optional)</span>
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showTechnicalDetails ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        <AnimatePresence>
          {showTechnicalDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-5 pt-2">
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="targetDiameter" render={({ field }) => (
                    <FormItem><FormLabel>Target Diameter</FormLabel><FormControl><Input placeholder="e.g., 24 inch" {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="targetCrossingLength" render={({ field }) => (
                    <FormItem><FormLabel>Crossing Length</FormLabel><FormControl><Input placeholder="e.g., 500m" {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="desiredStartDate" render={({ field }) => (
                    <FormItem><FormLabel>Desired Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                  <FormItem><FormLabel>Additional Notes</FormLabel><FormControl><Textarea placeholder="Project details, requirements, special conditions..." rows={4} {...field} /></FormControl></FormItem>
                )} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Consent & submit */}
        <div className="space-y-4 pt-2">
          <FormField control={form.control} name="consent" render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">I agree to be contacted about this inquiry and have read the Privacy Policy. *</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )} />

          <Button type="submit" size="lg" className="w-full">
            Compose RFQ Email
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This opens your email app with the enquiry pre-filled, addressed to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            Attach alignment sheets, drawings or bid documents before sending.
          </p>
        </div>
      </form>
    </Form>
  );
}
