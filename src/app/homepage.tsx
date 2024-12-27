import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  Leaf,
  TrendingUp,
  Wallet,
  Globe,
  Hexagon,
  Coins,
  Award,
  Users,
  Bell,
  Search,
  Menu,
  User,
} from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Hexagon className="h-8 w-8 text-green-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            FeedForward
          </span>
        </div>
        <nav className="hidden md:flex ml-auto space-x-4">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Donate
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Find Food
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Marketplace
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Governance
          </Button>
        </nav>
        <div className="flex items-center ml-auto md:ml-4 space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
              <DropdownMenuLabel className="text-gray-300">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                FeedCoin Balance
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                Donation History
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="hidden md:flex bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
              Revolutionizing Food Donation with Blockchain
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl mb-8">
              Join our decentralized platform to reduce food waste, help those
              in need, and earn FeedCoins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                Start Donating
              </Button>
              <Button
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-900 hover:text-white"
              >
                Find Donations
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              How It Works
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="bg-gray-800 border-green-500 hover:border-green-400 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-green-500" />
                    <span>Decentralized Donations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Leverage blockchain technology for transparent and efficient
                    food distribution.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-green-500 hover:border-green-400 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="h-6 w-6 text-green-500" />
                    <span>Earn FeedCoins</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Get rewarded with FeedCoins for every successful donation or
                    distribution.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-green-500 hover:border-green-400 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <span>Track Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Monitor your contributions and environmental impact in
                    real-time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              FeedCoin Ecosystem
            </h2>
            <Tabs defaultValue="earn" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="earn">Earn</TabsTrigger>
                <TabsTrigger value="spend">Spend</TabsTrigger>
                <TabsTrigger value="govern">Govern</TabsTrigger>
              </TabsList>
              <TabsContent value="earn" className="mt-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Earn FeedCoins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Donate surplus food</li>
                      <li>Distribute food to those in need</li>
                      <li>Achieve milestones and earn badges</li>
                      <li>Participate in special events and food drives</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="spend" className="mt-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Spend FeedCoins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Purchase items in our marketplace</li>
                      <li>Donate to NGOs and charitable causes</li>
                      <li>Convert to other cryptocurrencies or fiat</li>
                      <li>Unlock exclusive NFTs and digital collectibles</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="govern" className="mt-4">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle>Participate in Governance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Vote on platform updates and new features</li>
                      <li>Propose partnerships with NGOs and corporations</li>
                      <li>Influence the direction of FeedForward</li>
                      <li>
                        Join our Decentralized Autonomous Organization (DAO)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              Join Our Web3 Community
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-300 mb-8">
              Connect your Web3 wallet to start donating, earning FeedCoins, and
              making a real impact in your community.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 border-t border-gray-800">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 FeedForward. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Badge
              variant="outline"
              className="text-green-400 border-green-400"
            >
              Web3
            </Badge>
            <Badge
              variant="outline"
              className="text-green-400 border-green-400"
            >
              Blockchain
            </Badge>
            <Badge
              variant="outline"
              className="text-green-400 border-green-400"
            >
              FeedCoin
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
