import { Activity, Users, Server, Zap, TrendingUp, AlertTriangle } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Dashboard = () => {
  const recentPlayers = [
    { id: 1, name: "John_Doe", status: "online", playtime: "3h 45m", ping: 45 },
    { id: 2, name: "Jane_Smith", status: "online", playtime: "2h 12m", ping: 32 },
    { id: 3, name: "Mike_Wilson", status: "away", playtime: "1h 23m", ping: 67 },
    { id: 4, name: "Sarah_Johnson", status: "online", playtime: "4h 56m", ping: 28 },
    { id: 5, name: "Alex_Brown", status: "offline", playtime: "45m", ping: 0 },
  ]

  const serverStatus = [
    { name: "Main Server", status: "online", uptime: "99.9%", load: "45%" },
    { name: "Database", status: "online", uptime: "99.8%", load: "32%" },
    { name: "Voice Chat", status: "warning", uptime: "98.5%", load: "78%" },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your FiveM server administration panel
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Online Players"
          value="47"
          change="+12% from yesterday"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Server Uptime"
          value="99.9%"
          change="Last 30 days"
          icon={Server}
          trend="up"
        />
        <StatsCard
          title="Peak Performance"
          value="128ms"
          change="-5ms from last week"
          icon={Zap}
          trend="up"
        />
        <StatsCard
          title="Revenue"
          value="$2,847"
          change="+23% from last month"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Players */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.playtime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={player.status === "online" ? "default" : player.status === "away" ? "secondary" : "outline"}
                      className="capitalize"
                    >
                      {player.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{player.ping}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Server Status */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Server Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serverStatus.map((server, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      server.status === "online" ? "bg-green-400 shadow-green-400/50 shadow-lg" :
                      server.status === "warning" ? "bg-yellow-400 shadow-yellow-400/50 shadow-lg" :
                      "bg-red-400 shadow-red-400/50 shadow-lg"
                    }`} />
                    <div>
                      <p className="font-medium">{server.name}</p>
                      <p className="text-sm text-muted-foreground">Uptime: {server.uptime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{server.load}</p>
                    <p className="text-sm text-muted-foreground">Load</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg glow">
              Restart Server
            </Button>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              Broadcast Message
            </Button>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              View Logs
            </Button>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              Manage Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard