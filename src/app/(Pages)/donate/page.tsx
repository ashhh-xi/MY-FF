"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { toast } from "sonner";
import { CalendarIcon, Utensils } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "../../../components/manual-ui/forms/image-upload";
import DonationFormSection from "@/components/manual-ui/forms/donation-form-section";
import MapSection from "@/components/manual-ui/forms/map-section";
import DonationPage from "../donateCards/page";
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  donationDate: z.date({
    required_error: "Please select a donation date",
  }),
  expiryDate: z.date({
    required_error: "Please select an expiry date",
  }),
  donorType: z.string(),
  foodType: z.string(),
  description: z.string().min(10, "Please provide a detailed description"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  dietaryCategory: z.string(),
  foodCategory: z.string(),
  foodTemperature: z.string(),
  storageConditions: z.string(),
  foodSource: z.string(),
  pickupLocation: z
    .string()
    .min(5, "Please provide a detailed pickup location"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.any().optional(),
});

export default function DonationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Donation posted successfully!");
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-black text-white ">
      <div className="container mx-auto px-4 py-8 w-full">
        <div className="flex items-center mb-8  ">
          <Utensils className="h-9 w-9 text-primary mr-4 text-white" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Post a Food Donation
            </h1>
            <p className="text-muted-foreground mt-1">
              Share your surplus food with those in need
            </p>
          </div>
        </div>

        <Card style={{ backgroundColor: "black", color: "white" }}>
          <CardHeader>
            <CardTitle>Donation Details</CardTitle>
            <CardDescription>
              Please fill out the form below with accurate information about
              your food donation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DonationFormSection title="Donor Information">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              className="text-black"
                              placeholder="Krishna"
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
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              className="text-black"
                              type="tel"
                              placeholder="+91-934567890"
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              className="text-black"
                              type="email"
                              placeholder="krish@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pickupLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location</FormLabel>
                          {/* <FormControl>
                            <Textarea
                              placeholder="Enter detailed address for food pickup"
                              className="resize-none text-black"
                              {...field}
                            />
                          </FormControl> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <MapSection />
                  </DonationFormSection>

                  <DonationFormSection title="Food Details">
                    <FormField
                      control={form.control}
                      name="foodType"
                      render={({ field }) => (
                        <FormItem className="text-black">
                          <FormLabel className="text-white">
                            Food Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select food type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cooked">
                                Cooked Meal
                              </SelectItem>
                              <SelectItem value="packaged">
                                Packaged Goods
                              </SelectItem>
                              <SelectItem value="raw">
                                Raw Ingredients
                              </SelectItem>
                              <SelectItem value="baked">Baked Goods</SelectItem>
                              <SelectItem value="beverages">
                                Beverages
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foodTemperature"
                      render={({ field }) => (
                        <FormItem className="text-black">
                          <FormLabel className="text-white">
                            Food Temperature
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select temperature" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hot">Hot</SelectItem>
                              <SelectItem value="cold">Cold</SelectItem>
                              <SelectItem value="room">
                                Room Temperature
                              </SelectItem>
                              <SelectItem value="frozen">Frozen</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foodSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Source</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Restaurant, Catering Event, Personal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col text-black">
                          <FormLabel className="text-white">
                            Expiry Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  className={cn(
                                    "w-full pl-3 text-left font-normal border-2 border-transparent transition-all",
                                    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate",
                                    "p-[1px]",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <div className="bg-background w-full h-full rounded-md px-3 py-2 ">
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick expiry date</span>
                                    )}
                                    <CalendarIcon
                                      className="ml-auto
                                    h-4 w-4 opacity-0
                                    absolute   "
                                    />
                                  </div>
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="storageConditions"
                      render={({ field }) => (
                        <FormItem className="text-black">
                          <FormLabel className="text-white">
                            Storage Conditions
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe ideal storage temperature and conditions"
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
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Images</FormLabel>
                          <FormControl>
                            <ImageUpload
                              onChange={(files) => field.onChange(files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </DonationFormSection>
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-white text-black sm:w-auto"
                  >
                    Post Donation
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <DonationPage />
    </div>
  );
}
