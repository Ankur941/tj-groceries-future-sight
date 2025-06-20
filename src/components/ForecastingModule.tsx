
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ScatterChart, Scatter } from "recharts";
import { Brain, RefreshCw, Download, Settings } from "lucide-react";
import { useState } from "react";

interface ForecastingModuleProps {
  selectedStore: string;
  dateRange: string;
}

const ForecastingModule = ({ selectedStore, dateRange }: ForecastingModuleProps) => {
  const [forecastModel, setForecastModel] = useState("arima");
  const [forecastHorizon, setForecastHorizon] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

  // Mock forecast data
  const forecastData = [
    { date: "2024-01-01", actual: 45000, predicted: 44800, lower: 42000, upper: 47600 },
    { date: "2024-01-02", actual: 52000, predicted: 51200, lower: 48400, upper: 54000 },
    { date: "2024-01-03", actual: 48000, predicted: 48900, lower: 46100, upper: 51700 },
    { date: "2024-01-04", actual: 61000, predicted: 58200, lower: 55400, upper: 61000 },
    { date: "2024-01-05", actual: 55000, predicted: 56100, lower: 53300, upper: 58900 },
    { date: "2024-01-06", actual: 67000, predicted: 65300, lower: 62500, upper: 68100 },
    { date: "2024-01-07", actual: 58000, predicted: 59400, lower: 56600, upper: 62200 },
    { date: "2024-01-08", actual: null, predicted: 61800, lower: 59000, upper: 64600 },
    { date: "2024-01-09", actual: null, predicted: 56700, lower: 53900, upper: 59500 },
    { date: "2024-01-10", actual: null, predicted: 62300, lower: 59500, upper: 65100 },
  ];

  const modelPerformance = [
    { model: "ARIMA", mape: 5.8, rmse: 2340, mae: 1890, r2: 0.942 },
    { model: "Prophet", mape: 6.2, rmse: 2580, mae: 2010, r2: 0.931 },
    { model: "LSTM", mape: 4.9, rmse: 2150, mae: 1750, r2: 0.956 },
    { model: "Random Forest", mape: 7.1, rmse: 2890, mae: 2340, r2: 0.918 },
  ];

  const handleRunForecast = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-400" />
            Forecasting Configuration
          </CardTitle>
          <CardDescription className="text-slate-400">
            Configure and run demand forecasting models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={forecastModel} onValueChange={setForecastModel}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arima">ARIMA</SelectItem>
                <SelectItem value="prophet">Prophet</SelectItem>
                <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                <SelectItem value="rf">Random Forest</SelectItem>
                <SelectItem value="ensemble">Ensemble Model</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Forecast Horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleRunForecast}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Running..." : "Run Forecast"}
            </Button>

            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Demand Forecast with Confidence Intervals</CardTitle>
          <CardDescription className="text-slate-400">
            Historical data vs predicted values with uncertainty bands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData}>
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
                formatter={(value: any, name: string) => [
                  value ? `$${value.toLocaleString()}` : "N/A", 
                  name
                ]}
                labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
              />
              
              {/* Confidence Interval */}
              <Area
                type="monotone"
                dataKey="upper"
                stackId="1"
                stroke="none"
                fill="#3b82f6"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stackId="1"
                stroke="none"
                fill="#ffffff"
                fillOpacity={0.1}
              />
              
              {/* Actual Data */}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                name="Actual Sales"
                connectNulls={false}
              />
              
              {/* Predicted Data */}
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                name="Forecast"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Model Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Model Performance Comparison</CardTitle>
            <CardDescription className="text-slate-400">
              Accuracy metrics across different forecasting models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modelPerformance.map((model, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    model.model === 'LSTM' 
                      ? 'bg-green-900/20 border-green-700' 
                      : 'bg-slate-700 border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">{model.model}</h4>
                    {model.model === 'LSTM' && (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Best</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">MAPE:</span>
                      <span className="text-white">{model.mape}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">RMSE:</span>
                      <span className="text-white">{model.rmse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">MAE:</span>
                      <span className="text-white">{model.mae}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">R²:</span>
                      <span className="text-white">{model.r2}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Importance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Feature Importance</CardTitle>
            <CardDescription className="text-slate-400">
              Key factors influencing demand predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { feature: "Historical Sales", importance: 0.85, color: "#ef4444" },
                { feature: "Seasonality", importance: 0.72, color: "#f59e0b" },
                { feature: "Day of Week", importance: 0.68, color: "#10b981" },
                { feature: "Weather", importance: 0.54, color: "#3b82f6" },
                { feature: "Promotions", importance: 0.45, color: "#8b5cf6" },
                { feature: "Holidays", importance: 0.38, color: "#ec4899" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.feature}</span>
                    <span className="text-white">{(item.importance * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item.importance * 100}%`,
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

      {/* Forecast Insights */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Forecast Insights & Recommendations</CardTitle>
          <CardDescription className="text-slate-400">
            AI-generated insights based on forecast analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-green-400">Opportunities</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Weekend sales show 23% increase potential</li>
                <li>• Produce category trending +15% above forecast</li>
                <li>• Weather-driven demand spike expected next week</li>
                <li>• Cross-selling opportunities in dairy + bakery</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-orange-400">Risks</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Inventory shortage risk for frozen items (18%)</li>
                <li>• Historical model bias in holiday periods</li>
                <li>• External events impact not fully captured</li>
                <li>• Supply chain delays affecting 12% of SKUs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastingModule;
