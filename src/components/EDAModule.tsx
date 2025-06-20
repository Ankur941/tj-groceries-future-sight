
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, PieChart, Pie, Histogram } from "recharts";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { useState } from "react";

interface EDAModuleProps {
  selectedStore: string;
  dateRange: string;
}

const EDAModule = ({ selectedStore, dateRange }: EDAModuleProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [analysisType, setAnalysisType] = useState("distribution");

  // Mock data for EDA
  const salesDistribution = [
    { range: "0-1K", count: 45, percentage: 12 },
    { range: "1K-5K", count: 120, percentage: 32 },
    { range: "5K-10K", count: 85, percentage: 23 },
    { range: "10K-20K", count: 78, percentage: 21 },
    { range: "20K+", count: 47, percentage: 12 },
  ];

  const correlationData = [
    { x: 45000, y: 52000, category: "Produce" },
    { x: 38000, y: 41000, category: "Dairy" },
    { x: 62000, y: 68000, category: "Frozen" },
    { x: 55000, y: 58000, category: "Packaged" },
    { x: 71000, y: 75000, category: "Bakery" },
    { x: 33000, y: 35000, category: "Produce" },
    { x: 49000, y: 52000, category: "Dairy" },
  ];

  const hourlyPattern = [
    { hour: "6 AM", sales: 2800, customers: 45 },
    { hour: "7 AM", sales: 8200, customers: 128 },
    { hour: "8 AM", sales: 15600, customers: 235 },
    { hour: "9 AM", sales: 12400, customers: 198 },
    { hour: "10 AM", sales: 18900, customers: 285 },
    { hour: "11 AM", sales: 22100, customers: 342 },
    { hour: "12 PM", sales: 28500, customers: 428 },
    { hour: "1 PM", sales: 31200, customers: 465 },
    { hour: "2 PM", sales: 25800, customers: 395 },
    { hour: "3 PM", sales: 23600, customers: 368 },
    { hour: "4 PM", sales: 27400, customers: 415 },
    { hour: "5 PM", sales: 35200, customers: 524 },
    { hour: "6 PM", sales: 41800, customers: 612 },
    { hour: "7 PM", sales: 38900, customers: 578 },
    { hour: "8 PM", sales: 28300, customers: 425 },
    { hour: "9 PM", sales: 15700, customers: 248 },
  ];

  const seasonalTrends = [
    { month: "Jan", sales: 485000, growth: -5.2 },
    { month: "Feb", sales: 512000, growth: 5.6 },
    { month: "Mar", sales: 558000, growth: 9.0 },
    { month: "Apr", sales: 592000, growth: 6.1 },
    { month: "May", sales: 634000, growth: 7.1 },
    { month: "Jun", sales: 678000, growth: 6.9 },
    { month: "Jul", sales: 695000, growth: 2.5 },
    { month: "Aug", sales: 682000, growth: -1.9 },
    { month: "Sep", sales: 721000, growth: 5.7 },
    { month: "Oct", sales: 758000, growth: 5.1 },
    { month: "Nov", sales: 895000, growth: 18.1 },
    { month: "Dec", sales: 1240000, growth: 38.5 },
  ];

  const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Search className="h-5 w-5 mr-2 text-green-400" />
            Exploratory Data Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Deep dive into sales patterns, trends, and correlations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="produce">Produce</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="frozen">Frozen</SelectItem>
                <SelectItem value="packaged">Packaged Goods</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Analysis Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distribution">Distribution</SelectItem>
                <SelectItem value="correlation">Correlation</SelectItem>
                <SelectItem value="temporal">Temporal Patterns</SelectItem>
                <SelectItem value="seasonal">Seasonal Analysis</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>

            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Data Summary Statistics</CardTitle>
          <CardDescription className="text-slate-400">
            Key statistical measures of sales data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { label: "Mean Sales", value: "$58,342", color: "text-blue-400" },
              { label: "Median Sales", value: "$54,200", color: "text-green-400" },
              { label: "Std Deviation", value: "$12,580", color: "text-orange-400" },
              { label: "Skewness", value: "0.34", color: "text-purple-400" },
              { label: "Kurtosis", value: "2.1", color: "text-pink-400" },
              { label: "CV", value: "21.6%", color: "text-cyan-400" },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sales Distribution</CardTitle>
            <CardDescription className="text-slate-400">
              Frequency distribution of daily sales values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="range" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1F2937", 
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {salesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Correlation Analysis */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sales vs. Traffic Correlation</CardTitle>
            <CardDescription className="text-slate-400">
              Relationship between customer traffic and sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="x" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <YAxis 
                  dataKey="y"
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1F2937", 
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
                />
                <Scatter dataKey="y" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Patterns */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Hourly Sales Patterns</CardTitle>
            <CardDescription className="text-slate-400">
              Sales and customer traffic throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyPattern}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1F2937", 
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Seasonal Trends */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Seasonal Sales Trends</CardTitle>
            <CardDescription className="text-slate-400">
              Monthly sales performance and growth rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1F2937", 
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Sales"]}
                />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                  {seasonalTrends.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.growth > 10 ? "#10b981" : entry.growth > 0 ? "#3b82f6" : "#ef4444"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Data Insights & Patterns</CardTitle>
          <CardDescription className="text-slate-400">
            Key findings from exploratory data analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-blue-400">Sales Patterns</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Peak sales occur between 5-7 PM</li>
                <li>• Weekend sales 15% higher than weekdays</li>
                <li>• Morning rush (7-9 AM) shows consistent traffic</li>
                <li>• Lunch period (12-2 PM) represents 23% of daily sales</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-green-400">Seasonal Insights</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• December shows 38% sales boost (holidays)</li>
                <li>• Summer months (Jun-Aug) relatively stable</li>
                <li>• Back-to-school period drives September growth</li>
                <li>• Q1 typically shows seasonal decline</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-orange-400">Statistical Observations</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Sales distribution shows slight positive skew</li>
                <li>• Strong correlation (r=0.89) between traffic & sales</li>
                <li>• Coefficient of variation indicates moderate volatility</li>
                <li>• No significant outliers detected in recent data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EDAModule;
