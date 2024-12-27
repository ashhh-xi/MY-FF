"use client";
import { useState } from "react";
import { Wallet, TrendingUp, History, Plus, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import WalletBalance from "../../../components/manual-ui/crowdfunding/WalletBalance";
import DonationRequests from "../../../components/manual-ui/crowdfunding/DonationRequests";
import ActiveCampaigns from "../../../components/manual-ui/crowdfunding/ActiveCampaigns";
import DonationHistory from "../../../components/manual-ui/crowdfunding/DonationHistory";
import RequestDonationModal from "../../../components/manual-ui/crowdfunding/RequestDonationModal";
import AddDonationModal from "../../../components/manual-ui/crowdfunding/AddDonationModal";
import Footer from "../../../components/manual-ui/crowdfunding/Footer";

export default function CrowdfundingPage() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAddDonationModalOpen, setIsAddDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-[80vw] bg-black text-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Rest of the component remains the same */}
        <div className="flex justify-between items-center mb-12">
          <Button
            onClick={() => setIsRequestModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6"
          >
            <FileText className="mr-2 h-5 w-5" />
            Request Donation
          </Button>
          <Button
            onClick={() => setIsAddDonationModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Donation
          </Button>
        </div>

        <div className="space-y-12">
          <WalletBalance />

          <section>
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 mr-3 text-emerald-500" />
              <h2 className="text-2xl font-bold">Active Requests</h2>
            </div>
            <DonationRequests />
          </section>

          <section>
            <div className="flex items-center mb-6">
              <Wallet className="h-6 w-6 mr-3 text-emerald-500" />
              <h2 className="text-2xl font-bold">Active Campaigns</h2>
            </div>
            <ActiveCampaigns />
          </section>

          <section>
            <div className="flex items-center mb-6">
              <History className="h-6 w-6 mr-3 text-emerald-500" />
              <h2 className="text-2xl font-bold">Donation History</h2>
            </div>
            <DonationHistory />
          </section>
        </div>

        <Footer />
      </div>

      <RequestDonationModal
        open={isRequestModalOpen}
        onOpenChange={setIsRequestModalOpen}
      />

      <AddDonationModal
        open={isAddDonationModalOpen}
        onOpenChange={setIsAddDonationModalOpen}
      />
    </div>
  );
}
