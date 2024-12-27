"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import MapSection from "@/components/manual-ui/forms/map-section";
import { useForm , FormProvider } from "react-hook-form";
interface FormData {
  fullName: string;
  contactNumber: string;
  email: string;
  organization?: string;
  recipientType: string;
  pickupDate: Date | null;
  quantity: number;
  purpose: string;
  specialRequirements?: string;
  healthSafety: boolean;
  terms: boolean;
}
export default function ClaimDonationPage() {

  const methods = useForm<FormData>({
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      organization: "",
      recipientType: "",
      pickupDate: null,
      quantity: 0,
      purpose: "",
      specialRequirements: "",
      healthSafety: false,
      terms: false,
    },
  });

  
  const [date, setDate] = useState<Date>();
  return (
    <FormProvider {...methods}>
      <div>
        <div className="absolute  top-0 bottom-0 left-0 right-0  min-h-screen bg-transparent text-gray-100   flex align-middle justify-center p-4 sm:p-6 md:p-8 -z-40">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-left">
              Claim Donation
            </h1>
            <form className="space-y-8 border border-gray-700 p-6 rounded-lg w-[1000px] bg-transparent">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recipient Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="bg-white text-black border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="+1234567890"
                      className="bg-white text-black border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-white text-black border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">
                      Organization Name (if applicable)
                    </Label>
                    <Input
                      id="organization"
                      placeholder="NGO Name"
                      className="bg-white text-black border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientType">Recipient Type</Label>
                    <Select>
                      <SelectTrigger className="bg-white text-black border-gray-300">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="shelter">Shelter</SelectItem>
                        <SelectItem value="communityKitchen">
                          Community Kitchen
                        </SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          //   variant="default"
                          className={`w-full justify-start text-left font-normal bg-white text-black border-gray-300 ${
                            !date && "text-gray-500"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Donation Selection</h2>
                <div>
                  <Label htmlFor="quantity">Requested Quantity/Servings</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    className="bg-white text-black border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Additional Recipient Details
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="purpose">Purpose of Claim</Label>
                    <Select>
                      <SelectTrigger className="bg-white text-black border-gray-300">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soupKitchen">
                          Soup Kitchen
                        </SelectItem>
                        <SelectItem value="communityMeal">
                          Community Meal
                        </SelectItem>
                        <SelectItem value="familyEvent">
                          Family Event
                        </SelectItem>
                        <SelectItem value="other">
                          Other (Resale not allowed)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="specialRequirements" className="block mb-2">
                      Special Requirements/Requests
                    </Label>
                    <Textarea
                      id="specialRequirements"
                      placeholder="Any specific requirements"
                      className="bg-white text-black border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Image Upload</h2>
                <div>
                  <Label htmlFor="imageUpload">Upload Image (optional)</Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="bg-white text-black border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Terms and Confirmation
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="healthSafety" />
                    <Label htmlFor="healthSafety">
                      I agree to handle the food responsibly, adhering to food
                      safety guidelines.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">
                      I acknowledge and agree to the platform terms.
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Pickup Location</h2>
                <div className="bg-gray-900 p-4 rounded-md">
                  <p className="text-sm text-gray-300 mb-2">
                    Pickup location will be displayed here upon claim approval.
                  </p>
                  <MapSection />
                  <Button className="w-full">
                    <MapPin className="mr-2 h-4 w-4" /> Open in Maps
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full border p-8 text-lg">
                Submit Claim
              </Button>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
