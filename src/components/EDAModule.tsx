
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell } from "recharts";
import { BarChart3, TrendingUp, Download, Filter } from "lucide-react";
import { useState } from "react";

interface EDAModuleProps {
  selectedStore: string;
  dateRange: string;
}

const EDAModule = ({ selectedStore, dateRange }: EDAModuleProps) => {
  const [selectedMetric, setSelectedMetric] = useState("sales");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for EDA
  const salesDistribution = [
    { range: "0-1K", count: 45, percentage: 12.5 },
    { range: "1-2K", count: 120, percentage: 33.3 },
    { range: "2-3K", count: 95, percentage: 26.4 },
    { range: "3-4K", count: 68, percentage: 18.9 },
    { range: "4-5K", count: 22, percentage: 6.1 },
    { range: "5K+", count: 10, percentage: 2.8 },
  ];

  const correlationData = [
    { variable: "Weather", correlation: 0.72, color: "#10b981" },
    { variable: "Day of Week", correlation: 0.68, color: "#3b82f6" },
    { variable: "Promotions", correlation: 0.45, color: "#f59e0b" },
    { variable: "Seasonality", correlation: 0.83, color: "#ef4444" },
    { variable: "Holidays", correlation: 0.38, color: "#8b5cf6" },
  ];

  const timeSeriesData = [
    { date: "2024-01-01", sales: 45000, customers: 890, avgBasket: 50.56 },
    { date: "2024-01-02", sales: 52000, customers: 980, avgBasket: 53.06 },
    { date: "2024-01-03", sales: 48000, customers: 920, avgBasket: 52.17 },
    { date: "2024-01-04", sales: 61000, customers: 1150, avgBasket: 53.04 },
    { date: "2024-01-05", sales: 55000, customers: 1040, avgBasket: 52.88 },
    { date: "2024-01-06", sales: 67000, customers: 1250, avgBasket: 53.60 },
    { date: "2024-01-07", sales: 58000, customers: 1100, avgBasket: 52.73 },
  ];

  const outlierData = [
    { date: "2024-01-15", sales: 120000, expected: 55000, deviation: 2.8 },
    { date: "2024-01-22", sales: 15000, expected: 58000, deviation: -2.1 },
    { date: "2024-01-28", sales: 95000, expected: 60000, deviation: 2.2 },
  ];

  const categoryBoxPlot = [
    { category: "Produce", q1: 8000, median: 12000, q3: 16000, min: 5000, max: 22000 },
    { category: "Dairy", q1: 6000, median: 9000, q3: 12000, min: 4000, max: 18000 },
    { category: "Frozen", q1: 7000, median: 10500, q3: 14000, min: 4500, max: 20000 },
    { category: "Packaged", q1: 9000, median: 13500, q3: 18000, min: 6000, max: 25000 },
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
            Exploratory Data Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Statistical analysis and data exploration tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Revenue</SelectItem>
                <SelectItem value="customers">Customer Count</SelectItem>
                <SelectItem value="transactions">Transactions</SelectItem>
                <SelectItem value="avgBasket">Average Basket Size</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="produce">Produce</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="frozen">Frozen</SelectItem>
                <SelectItem value="packaged">Packaged Foods</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <Bar 
                  dataKey="count" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Correlation Analysis</CardTitle>
            <CardDescription className="text-slate-400">
              Feature correlation with sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {correlationData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.variable}</span>
                    <span className="text-white font-medium">{item.correlation.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.abs(item.correlation) * 100}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Analysis */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Time Series Patterns</CardTitle>
          <CardDescription className="text-slate-400">
            Trend analysis and temporal patterns in sales data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
                labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                name="Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Outlier Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Outlier Detection</CardTitle>
            <CardDescription className="text-slate-400">
              Anomalous sales patterns and statistical outliers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {outlierData.map((outlier, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-slate-700 border border-slate-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">
                      {new Date(outlier.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      outlier.deviation > 0 
                        ? 'bg-red-900 text-red-200' 
                        : 'bg-blue-900 text-blue-200'
                    }`}>
                      {outlier.deviation > 0 ? '+' : ''}{outlier.deviation}σ
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Actual:</span>
                      <span className="text-white ml-2">${outlier.sales.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Expected:</span>
                      <span className="text-white ml-2">${outlier.expected.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Statistical Summary</CardTitle>
            <CardDescription className="text-slate-400">
              Key statistical metrics and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-300">Central Tendency</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mean:</span>
                      <span className="text-white">$55,142</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Median:</span>
                      <span className="text-white">$54,320</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mode:</span>
                      <span className="text-white">$52,000</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-300">Variability</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Std Dev:</span>
                      <span className="text-white">$8,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Variance:</span>
                      <span className="text-white">67.98M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CV:</span>
                      <span className="text-white">14.95%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-300">Distribution Shape</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Skewness:</span>
                    <span className="text-white">0.12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kurtosis:</span>
                    <span className="text-white">-0.45</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EDAModule;
