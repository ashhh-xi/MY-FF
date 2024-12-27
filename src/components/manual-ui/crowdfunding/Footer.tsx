import { HelpCircle, Mail, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-800 pt-12 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-emerald-500" />
            Terms & Conditions
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Donation Guidelines</li>
            <li>Privacy Policy</li>
            <li>User Agreement</li>
            <li>Legal Information</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-emerald-500" />
            FAQs
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>How to Donate</li>
            <li>Voting System</li>
            <li>Fund Distribution</li>
            <li>Campaign Creation</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-emerald-500" />
            Contact Support
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>support@feedforward.com</li>
            <li>Discord Community</li>
            <li>Twitter Support</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} FeedForward. All rights reserved.
      </div>
    </footer>
  );
}