
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell, Treemap } from "recharts";
import { BarChart3, PieChart as PieIcon, TrendingUp, Grid3X3, Download, Settings } from "lucide-react";
import { useState } from "react";

interface DataVisualizationProps {
  selectedStore: string;
  dateRange: string;
}

const DataVisualization = ({ selectedStore, dateRange }: DataVisualizationProps) => {
  const [chartType, setChartType] = useState("combined");
  const [metric, setMetric] = useState("sales");

  // Mock data for advanced visualizations
  const salesPerformanceData = [
    { month: "Jan", sales: 485000, target: 500000, profit: 72750, margin: 15 },
    { month: "Feb", sales: 512000, target: 520000, profit: 81920, margin: 16 },
    { month: "Mar", sales: 558000, target: 540000, profit: 89280, margin: 16 },
    { month: "Apr", sales: 592000, target: 580000, profit: 106560, margin: 18 },
    { month: "May", sales: 634000, target: 610000, profit: 120460, margin: 19 },
    { month: "Jun", sales: 678000, target: 650000, profit: 122040, margin: 18 },
  ];

  const categoryTreemapData = [
    { name: "Produce", size: 2840000, children: [
      { name: "Organic Fruits", size: 1200000 },
      { name: "Vegetables", size: 980000 },
      { name: "Herbs", size: 380000 },
      { name: "Salads", size: 280000 },
    ]},
    { name: "Dairy", size: 1890000, children: [
      { name: "Milk Products", size: 840000 },
      { name: "Cheese", size: 620000 },
      { name: "Yogurt", size: 430000 },
    ]},
    { name: "Frozen", size: 1650000, children: [
      { name: "Frozen Meals", size: 780000 },
      { name: "Ice Cream", size: 520000 },
      { name: "Vegetables", size: 350000 },
    ]},
  ];

  const radialData = [
    { name: "Sales Target", value: 85, fill: "#10b981" },
    { name: "Profit Margin", value: 92, fill: "#3b82f6" },
    { name: "Customer Satisfaction", value: 78, fill: "#f59e0b" },
    { name: "Inventory Turnover", value: 95, fill: "#ef4444" },
  ];

  const heatmapData = [
    { day: "Mon", hour6: 12, hour8: 45, hour10: 78, hour12: 125, hour14: 95, hour16: 134, hour18: 189, hour20: 156 },
    { day: "Tue", hour6: 15, hour8: 52, hour10: 83, hour12: 142, hour14: 108, hour16: 145, hour18: 195, hour20: 167 },
    { day: "Wed", hour6: 18, hour8: 48, hour10: 89, hour12: 138, hour14: 112, hour16: 152, hour18: 201, hour20: 172 },
    { day: "Thu", hour6: 22, hour8: 58, hour10: 95, hour12: 156, hour14: 125, hour16: 168, hour18: 215, hour20: 185 },
    { day: "Fri", hour6: 28, hour8: 68, hour10: 115, hour12: 185, hour14: 148, hour16: 195, hour18: 258, hour20: 225 },
    { day: "Sat", hour6: 35, hour8: 82, hour10: 145, hour12: 225, hour14: 189, hour16: 242, hour18: 295, hour20: 268 },
    { day: "Sun", hour6: 32, hour8: 75, hour10: 132, hour12: 208, hour14: 172, hour16: 228, hour18: 285, hour20: 248 },
  ];

  const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
            Advanced Data Visualizations
          </CardTitle>
          <CardDescription className="text-slate-400">
            Interactive charts and visual analytics for comprehensive insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="combined">Combined Charts</SelectItem>
                <SelectItem value="treemap">Treemap</SelectItem>
                <SelectItem value="radial">Radial Charts</SelectItem>
                <SelectItem value="heatmap">Heatmap</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Primary Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Revenue</SelectItem>
                <SelectItem value="profit">Profit Margin</SelectItem>
                <SelectItem value="units">Units Sold</SelectItem>
                <SelectItem value="customers">Customer Count</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Grid3X3 className="h-4 w-4 mr-2" />
              Customize View
            </Button>

            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export Charts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Combined Sales & Profit Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sales Performance vs Targets</CardTitle>
            <CardDescription className="text-slate-400">
              Monthly sales, targets, and profit margins comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={salesPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1F2937", 
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                />
                <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar yAxisId="left" dataKey="target" fill="#64748b" radius={[2, 2, 0, 0]} opacity={0.6} />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radial Performance Metrics */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
            <CardDescription className="text-slate-400">
              Key performance indicators in radial format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
                <RadialBar 
                  dataKey="value" 
                  cornerRadius={10} 
                  fill="#8884d8"
                  label={{ position: 'insideStart', fill: '#fff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1F2937", 
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                  formatter={(value: any) => [`${value}%`, ""]}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {radialData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-sm text-slate-300">{item.name}</span>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Treemap */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Sales Distribution by Category</CardTitle>
            <CardDescription className="text-slate-400">
              Hierarchical view of sales performance across categories and subcategories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <Treemap
                data={categoryTreemapData}
                dataKey="size"
                aspectRatio={4/3}
                stroke="#374151"
                fill="#3b82f6"
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Heatmap */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Sales Heatmap - Day vs Hour</CardTitle>
          <CardDescription className="text-slate-400">
            Visual representation of sales intensity throughout the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Hours Header */}
            <div className="grid grid-cols-9 gap-2 text-center">
              <div className="text-xs text-slate-400"></div>
              {['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'].map(hour => (
                <div key={hour} className="text-xs text-slate-400">{hour}</div>
              ))}
            </div>
            
            {/* Heatmap Grid */}
            {heatmapData.map((row, dayIndex) => (
              <div key={row.day} className="grid grid-cols-9 gap-2">
                <div className="text-xs text-slate-400 flex items-center">{row.day}</div>
                {Object.entries(row).filter(([key]) => key !== 'day').map(([hour, value], hourIndex) => {
                  const intensity = (value as number) / 300; // Normalize to 0-1
                  return (
                    <div
                      key={hour}
                      className="h-8 rounded flex items-center justify-center text-xs font-medium"
                      style={{
                        backgroundColor: `rgba(239, 68, 68, ${intensity})`,
                        color: intensity > 0.5 ? '#fff' : '#000'
                      }}
                      title={`${row.day} ${hour.replace('hour', '').padStart(2, '0')}:00 - ${value} sales`}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            ))}
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <span className="text-xs text-slate-400">Low</span>
              <div className="flex space-x-1">
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: `rgba(239, 68, 68, ${intensity})` }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">High</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics Insights */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Advanced Analytics Insights</CardTitle>
          <CardDescription className="text-slate-400">
            AI-powered insights from visual data analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-blue-400">Performance Trends</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Sales exceeded targets in 4/6 months</li>
                <li>• Profit margins trending upward (+2.8%)</li>
                <li>• Q2 performance strongest overall</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-green-400">Category Insights</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Produce leads revenue generation</li>
                <li>• Organic fruits show highest growth</li>
                <li>• Frozen category underperforming</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-orange-400">Temporal Patterns</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Friday-Saturday peak periods</li>
                <li>• 6-8 PM highest sales window</li>
                <li>• Morning rush (8-10 AM) consistent</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-purple-400">Optimization Opportunities</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Staffing optimization for peak hours</li>
                <li>• Inventory rebalancing recommendations</li>
                <li>• Cross-selling potential identified</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
