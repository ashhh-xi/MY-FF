"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DonationFormSectionProps {
  title: string;
  children: React.ReactNode;
}

function DonationFormSection({ title, children }: DonationFormSectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg space-y-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default DonationFormSection;
