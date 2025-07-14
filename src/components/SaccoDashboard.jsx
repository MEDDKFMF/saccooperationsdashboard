import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const SaccoDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  // Enhanced dummy data with more realistic patterns
  const loanDisbursementsData = [
    { month: 'Jan', amount: 4500000, target: 5000000 },
    { month: 'Feb', amount: 5200000, target: 5000000 },
    { month: 'Mar', amount: 4800000, target: 5000000 },
    { month: 'Apr', amount: 6100000, target: 5500000 },
    { month: 'May', amount: 5500000, target: 5500000 },
    { month: 'Jun', amount: 6800000, target: 6000000 },
    { month: 'Jul', amount: 7200000, target: 6000000 },
    { month: 'Aug', amount: 6500000, target: 6000000 },
    { month: 'Sep', amount: 7800000, target: 6500000 },
    { month: 'Oct', amount: 8200000, target: 6500000 },
    { month: 'Nov', amount: 7500000, target: 6500000 },
    { month: 'Dec', amount: 8900000, target: 7000000 }
  ];

  const monthlyRepaymentsData = [
    { month: 'Jan', repaid: 3800000, expected: 4200000, overdue: 400000 },
    { month: 'Feb', repaid: 4100000, expected: 4500000, overdue: 350000 },
    { month: 'Mar', repaid: 3900000, expected: 4300000, overdue: 420000 },
    { month: 'Apr', repaid: 5200000, expected: 5600000, overdue: 380000 },
    { month: 'May', repaid: 4800000, expected: 5200000, overdue: 420000 },
    { month: 'Jun', repaid: 6100000, expected: 6500000, overdue: 390000 },
    { month: 'Jul', repaid: 6500000, expected: 6900000, overdue: 400000 },
    { month: 'Aug', repaid: 5800000, expected: 6200000, overdue: 420000 },
    { month: 'Sep', repaid: 7200000, expected: 7600000, overdue: 380000 },
    { month: 'Oct', repaid: 7600000, expected: 8000000, overdue: 400000 },
    { month: 'Nov', repaid: 6900000, expected: 7300000, overdue: 410000 },
    { month: 'Dec', repaid: 8200000, expected: 8600000, overdue: 380000 }
  ];

  // Loan portfolio distribution
  const loanPortfolioData = [
    { name: 'Personal Loans', value: 45, color: '#3b82f6' },
    { name: 'Business Loans', value: 30, color: '#10b981' },
    { name: 'Education Loans', value: 15, color: '#f59e0b' },
    { name: 'Emergency Loans', value: 10, color: '#ef4444' }
  ];

  // Enhanced KPI data with trends
  const [kpiData, setKpiData] = useState({
    totalMembers: 2847,
    activeLoans: 1893,
    defaultRate: 3.2,
    liquidityRatio: 78.5,
    totalAssets: 1250000000,
    averageLoanSize: 450000,
    memberGrowth: 15.3,
    loanApprovalRate: 87.5
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prev => ({
        ...prev,
        totalMembers: prev.totalMembers + Math.floor(Math.random() * 3),
        activeLoans: prev.activeLoans + Math.floor(Math.random() * 2) - 1,
        defaultRate: Math.max(2.8, Math.min(3.8, prev.defaultRate + (Math.random() - 0.5) * 0.2)),
        liquidityRatio: Math.max(75, Math.min(82, prev.liquidityRatio + (Math.random() - 0.5) * 0.5))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-KE').format(value);
  };

  const handleExport = async () => {
    setIsLoading(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowExportModal(false);
    setIsLoading(false);
    alert(`Report exported successfully as ${exportFormat.toUpperCase()}`);
  };

  const getPerformanceColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) {
      return (
        <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              SACCO Operations Dashboard
            </h1>
            <p className="text-gray-600">
              Real-time insights and performance metrics
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">Live Data</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Period Selector */}
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            {/* Export Button */}
            <button 
              onClick={() => setShowExportModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Enhanced KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Members */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatNumber(kpiData.totalMembers)}
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  {getTrendIcon(12)}
                  +12% from last month
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Loans */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Loans</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatNumber(kpiData.activeLoans)}
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  {getTrendIcon(8)}
                  +8% from last month
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Default Rate */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Loan Default Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {kpiData.defaultRate.toFixed(1)}%
                </p>
                <p className="text-sm text-red-600 mt-1 flex items-center">
                  {getTrendIcon(-0.3)}
                  +0.3% from last month
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Liquidity Ratio */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Liquidity Ratio</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {kpiData.liquidityRatio.toFixed(1)}%
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  {getTrendIcon(2.1)}
                  +2.1% from last month
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Loan Disbursements Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Loan Disbursements vs Target</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={loanDisbursementsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#9ca3af" 
                  fill="#9ca3af" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Enhanced Monthly Repayments Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Monthly Repayments Analysis</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Repaid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Expected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Overdue</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRepaymentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="repaid" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                  name="Repaid"
                />
                <Bar 
                  dataKey="expected" 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]}
                  name="Expected"
                />
                <Bar 
                  dataKey="overdue" 
                  fill="#ef4444" 
                  radius={[4, 4, 0, 0]}
                  name="Overdue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Loan Portfolio Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Portfolio Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanPortfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanPortfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Portfolio Share']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loan Approval Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{kpiData.loanApprovalRate}%</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.3 days</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Additional Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Loan Size</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(kpiData.averageLoanSize)}
                </p>
                <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(kpiData.totalAssets)}
                </p>
                <p className="text-sm text-green-600 mt-1">+8.7% from last month</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Member Growth</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  +{kpiData.memberGrowth}%
                </p>
                <p className="text-sm text-green-600 mt-1">+2.1% from last month</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select 
                  value={exportFormat} 
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleExport}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Exporting...' : 'Export'}
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaccoDashboard; 