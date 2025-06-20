
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Target } from "lucide-react";

interface DashboardOverviewProps {
  selectedStore: string;
  dateRange: string;
}

const DashboardOverview = ({ selectedStore, dateRange }: DashboardOverviewProps) => {
  // Mock data for demonstration
  const revenueData = [
    { date: "2024-01-01", revenue: 45000, forecast: 48000 },
    { date: "2024-01-02", revenue: 52000, forecast: 51000 },
    { date: "2024-01-03", revenue: 48000, forecast: 49000 },
    { date: "2024-01-04", revenue: 61000, forecast: 58000 },
    { date: "2024-01-05", revenue: 55000, forecast: 56000 },
    { date: "2024-01-06", revenue: 67000, forecast: 65000 },
    { date: "2024-01-07", revenue: 58000, forecast: 59000 },
  ];

  const categoryData = [
    { category: "Produce", sales: 120000, color: "#10b981" },
    { category: "Dairy", sales: 85000, color: "#3b82f6" },
    { category: "Frozen", sales: 95000, color: "#f59e0b" },
    { category: "Packaged", sales: 110000, color: "#ef4444" },
    { category: "Bakery", sales: 65000, color: "#8b5cf6" },
  ];

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$1.2M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Units Sold",
      value: "45.2K",
      change: "+8.3%",
      trend: "up",
      icon: Package,
      color: "text-blue-400"
    },
    {
      title: "Customer Count",
      value: "12.8K",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "text-orange-400"
    },
    {
      title: "Forecast Accuracy",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Target,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={kpi.trend === "up" ? "text-green-400" : "text-red-400"}>
                  {kpi.change}
                </span>
                <span className="text-slate-400">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue vs Forecast</CardTitle>
            <CardDescription className="text-slate-400">
              Daily revenue compared to forecast predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
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
                  formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
                  labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  name="Actual Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sales by Category</CardTitle>
            <CardDescription className="text-slate-400">
              Revenue distribution across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="category" 
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
                <Bar 
                  dataKey="sales" 
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Performance Indicators</CardTitle>
          <CardDescription className="text-slate-400">
            Comprehensive view of store performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Sales Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Average Transaction Value</span>
                  <span className="text-white font-medium">$42.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Items per Transaction</span>
                  <span className="text-white font-medium">8.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Conversion Rate</span>
                  <span className="text-white font-medium">78.2%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Inventory Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Inventory Turnover</span>
                  <span className="text-white font-medium">12.4x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stock Out Rate</span>
                  <span className="text-white font-medium">2.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Days of Supply</span>
                  <span className="text-white font-medium">29.5</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Forecast Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">MAPE</span>
                  <span className="text-white font-medium">5.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bias</span>
                  <span className="text-white font-medium">-1.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">R²</span>
                  <span className="text-white font-medium">0.942</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
