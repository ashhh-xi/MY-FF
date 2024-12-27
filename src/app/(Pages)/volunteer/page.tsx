"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "../../../components/manual-ui/forms/image-upload";

const availabilityOptions = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
] as const;

const activitiesOptions = [
  { value: "food_pickup", label: "Food Pickup" },
  { value: "distribution", label: "Distribution" },
  { value: "event_assistance", label: "Event Assistance" },
  { value: "outreach", label: "Outreach" },
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  gender: z.string(),
  age: z.number().min(18, "You must be at least 18 years old"),
  profilePhoto: z.any().optional(),
  address: z.string().min(10, "Please provide your complete address"),
  availability: z
    .array(z.string())
    .min(1, "Please select at least one availability"),
  activities: z.array(z.string()).min(1, "Please select at least one activity"),
  skills: z.string().min(10, "Please describe your relevant skills"),
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyNumber: z
    .string()
    .min(10, "Please enter a valid emergency contact number"),
  languages: z.string().min(2, "Please list languages you speak"),
  motivation: z.string().min(20, "Please tell us why you want to volunteer"),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export default function VolunteerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: [],
      activities: [],
      agreement: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Volunteer registration submitted successfully!");
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-500  animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-100 via-lime-400 to-lime-300">
              Volunteer Registration
            </h1>
            <p className="text-gray-400 mt-2">
              Join our community of food waste warriors
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto border border-gray-800 shadow-2xl bg-black/40 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 animate-gradient-xy"></div>
          <div className="relative p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">
                      Personal Information
                    </h2>

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="text-white">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              placeholder="John Doe"
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
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Contact Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              placeholder="+1234567890"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="bg-black border-none">
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black border-none text-white">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="non-binary">
                                Non-binary
                              </SelectItem>
                              <SelectItem value="prefer-not-to-say">
                                Prefer not to say
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Age</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              type="number"
                              placeholder="Enter your age"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact & Emergency Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">
                      Contact & Emergency
                    </h2>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Address</FormLabel>
                          <FormControl className="bg-black border-none">
                            <Textarea
                              placeholder="Enter your complete address"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Emergency Contact Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              placeholder="Emergency contact name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Emergency Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              placeholder="Emergency contact number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Languages Spoken</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black border-none"
                              placeholder="e.g., English, Spanish"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Volunteer Preferences */}
                  <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-200">
                      Volunteer Preferences
                    </h2>

                    <FormField 
                      control={form.control}
                      name="availability"
                      render={() => (
                        <FormItem className="text-white">
                          <FormLabel>Availability</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {availabilityOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="availability"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox className="bg-white"
                                          checked={field.value?.includes(
                                            option.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  option.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== option.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Preferred Activities</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange([...field.value, value])
                              }
                              value={field.value?.[0]}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select activities" />
                              </SelectTrigger>
                              <SelectContent>
                                {activitiesOptions.map((activity) => (
                                  <SelectItem
                                    key={activity.value}
                                    value={activity.value}
                                  >
                                    {activity.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Skills & Experience</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your relevant skills and experience"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  className="text-white">Why Do You Want to Volunteer?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your motivation for volunteering"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="profilePhoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Profile Photo</FormLabel>
                          <FormControl>
                            <ImageUpload
                              onChange={(files) => field.onChange(files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox className="bg-white"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white">
                              I agree to the{" "}
                              <a
                                href="/terms"
                                className="text-pink-500 hover:text-pink-400 underline"
                              >
                                terms and conditions
                              </a>
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 bg-gradient-to-r from-green-100 via-lime-400 to-lime-300"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}
