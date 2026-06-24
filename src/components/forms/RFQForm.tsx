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
import { Upload, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Online RFQ submission is disabled, the site has no backend. Submissions
// direct the user to contact Enikkom directly instead.
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

export function RFQForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const form = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: { consent: false },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.size <= 25 * 1024 * 1024);
      setFiles(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const onSubmit = () => {
    // Online submission is disabled (no backend). Point the user to email.
    toast.info(`Online submissions are currently unavailable. Please email your request to ${CONTACT_EMAIL}.`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Essential Fields */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">1</div>
            <span className="text-sm font-medium text-foreground">Contact Information</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem><FormLabel>Company *</FormLabel><FormControl><Input placeholder="Company Name" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Work Email *</FormLabel><FormControl><Input type="email" placeholder="john@company.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input placeholder="+234..." {...field} /></FormControl><FormMessage /></FormItem>
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

        {/* Expand/Collapse Button for Technical Details */}
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${showTechnicalDetails ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'}`}>2</div>
            <span className="text-sm font-medium text-foreground">Technical Details</span>
            <span className="text-xs text-muted-foreground">(Optional)</span>
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showTechnicalDetails ? 'rotate-180' : ''}`} />
        </button>

        {/* Step 2: Technical Details (Expandable) */}
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

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Drawings/Specs (PDF, DOCX, XLSX, DWG - Max 25MB)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <input type="file" multiple accept=".pdf,.docx,.xlsx,.dwg" onChange={handleFileChange} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline">Choose files</label>
                    {files.length > 0 && <p className="text-sm text-muted-foreground mt-2">{files.length} file(s) selected</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Consent & Submit */}
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
            Submit Request
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Online submissions are currently unavailable. Please email your request to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </form>
    </Form>
  );
}
