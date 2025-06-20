
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp, BarChart3, Activity, ShoppingCart } from "lucide-react";
import DashboardOverview from "@/components/DashboardOverview";
import ForecastingModule from "@/components/ForecastingModule";
import EDAModule from "@/components/EDAModule";
import DataVisualization from "@/components/DataVisualization";

const Index = () => {
  const [selectedStore, setSelectedStore] = useState("all");
  const [dateRange, setDateRange] = useState("last30days");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-red-800 shadow-lg border-b border-red-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg p-2">
                <ShoppingCart className="h-8 w-8 text-red-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Trader Joe's Analytics</h1>
                <p className="text-red-100">Retail Demand Forecasting Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="store1">Manhattan - Union Square</SelectItem>
                  <SelectItem value="store2">Brooklyn - Cobble Hill</SelectItem>
                  <SelectItem value="store3">Los Angeles - West Hollywood</SelectItem>
                  <SelectItem value="store4">San Francisco - Noe Valley</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Forecasting
            </TabsTrigger>
            <TabsTrigger value="eda" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              EDA
            </TabsTrigger>
            <TabsTrigger value="visualization" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Visualizations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview selectedStore={selectedStore} dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <ForecastingModule selectedStore={selectedStore} dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="eda" className="space-y-6">
            <EDAModule selectedStore={selectedStore} dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="visualization" className="space-y-6">
            <DataVisualization selectedStore={selectedStore} dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
