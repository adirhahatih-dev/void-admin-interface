import { TrendingUp, Users, Clock, DollarSign, Activity, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const Analytics = () => {
  const playerData = [
    { time: "00:00", players: 12 },
    { time: "04:00", players: 8 },
    { time: "08:00", players: 25 },
    { time: "12:00", players: 45 },
    { time: "16:00", players: 58 },
    { time: "20:00", players: 62 },
    { time: "24:00", players: 35 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 2800 },
    { month: "Apr", revenue: 3800 },
    { month: "May", revenue: 4200 },
    { month: "Jun", revenue: 3900 },
  ]

  const jobDistribution = [
    { name: "Police", value: 23, color: "#3b82f6" },
    { name: "EMS", value: 15, color: "#ef4444" },
    { name: "Mechanic", value: 18, color: "#f59e0b" },
    { name: "Taxi", value: 12, color: "#10b981" },
    { name: "Civilian", value: 32, color: "#8b5cf6" },
  ]

  const performanceData = [
    { time: "00:00", cpu: 45, memory: 62, network: 23 },
    { time: "04:00", cpu: 32, memory: 58, network: 18 },
    { time: "08:00", cpu: 67, memory: 72, network: 45 },
    { time: "12:00", cpu: 78, memory: 82, network: 67 },
    { time: "16:00", cpu: 85, memory: 89, network: 78 },
    { time: "20:00", cpu: 92, memory: 94, network: 82 },
    { time: "24:00", cpu: 56, memory: 68, network: 45 },
  ]

  const topPlayers = [
    { name: "John_Doe", playtime: "124h 23m", money: "$67,890", job: "Police Chief" },
    { name: "Jane_Smith", playtime: "98h 45m", money: "$45,670", job: "EMS Captain" },
    { name: "Mike_Wilson", playtime: "87h 12m", money: "$38,920", job: "Mechanic" },
    { name: "Sarah_Johnson", playtime: "76h 34m", money: "$52,340", job: "Taxi Owner" },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Server performance metrics and player statistics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Peak Players Today"
          value="62"
          change="+12% from yesterday"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Average Session"
          value="2h 34m"
          change="+8 minutes from last week"
          icon={Clock}
          trend="up"
        />
        <StatsCard
          title="Daily Revenue"
          value="$1,247"
          change="+18% from yesterday"
          icon={DollarSign}
          trend="up"
        />
        <StatsCard
          title="Server Performance"
          value="96.2%"
          change="Excellent uptime"
          icon={Activity}
          trend="up"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Player Activity Chart */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Player Activity (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={playerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="players" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Distribution */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Job Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={jobDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {jobDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Players */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Players (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.job}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{player.playtime}</p>
                    <p className="text-sm text-muted-foreground">{player.money}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Performance Metrics */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Server Performance (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="CPU %"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Memory %"
              />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Network %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">This Week</h3>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">New Players</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Concurrent</span>
                <span className="font-medium">64/64</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg Session Time</span>
                <span className="font-medium">2h 34m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Server Uptime</span>
                <span className="font-medium">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Economy</h3>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Money</span>
                <span className="font-medium">$2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Daily Transactions</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">VIP Revenue</span>
                <span className="font-medium">$847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg Player Balance</span>
                <span className="font-medium">$12,456</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Resources</h3>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Resources</span>
                <span className="font-medium">47/52</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Memory Usage</span>
                <span className="font-medium">2.4GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Script Errors</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg Load Time</span>
                <span className="font-medium">127ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics