import { useState } from "react"
import { Server, Play, Square, RotateCcw, Cpu, HardDrive, Wifi, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "@/components/stats-card"

const ServerControl = () => {
  const [serverRunning, setServerRunning] = useState(true)
  const [autoRestart, setAutoRestart] = useState(true)
  
  const resources = [
    { name: "esx_menu_default", status: "running", version: "1.9.4", load: 12 },
    { name: "esx_ambulancejob", status: "running", version: "1.8.2", load: 8 },
    { name: "esx_policejob", status: "running", version: "1.7.6", load: 15 },
    { name: "esx_vehicleshop", status: "running", version: "1.6.1", load: 22 },
    { name: "custom_banking", status: "stopped", version: "2.1.0", load: 0 },
    { name: "vrp_basic_menu", status: "error", version: "1.3.2", load: 0 },
  ]

  const performanceMetrics = {
    cpu: 45,
    memory: 68,
    storage: 34,
    network: 23,
    players: 47,
    maxPlayers: 64
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Server Control</h1>
        <p className="text-muted-foreground">
          Manage your FiveM server operations and resources
        </p>
      </div>

      {/* Server Status and Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Server Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Server State</p>
                <p className="text-sm text-muted-foreground">
                  {serverRunning ? "Online and Running" : "Offline"}
                </p>
              </div>
              <Badge 
                variant={serverRunning ? "default" : "destructive"}
                className="px-3 py-1"
              >
                {serverRunning ? "Online" : "Offline"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button 
                onClick={() => setServerRunning(true)}
                disabled={serverRunning}
                className="flex flex-col h-auto py-3 bg-green-600 hover:bg-green-700"
              >
                <Play className="h-5 w-5 mb-1" />
                Start
              </Button>
              <Button 
                onClick={() => setServerRunning(false)}
                disabled={!serverRunning}
                variant="destructive"
                className="flex flex-col h-auto py-3"
              >
                <Square className="h-5 w-5 mb-1" />
                Stop
              </Button>
              <Button 
                className="flex flex-col h-auto py-3 bg-gradient-to-r from-primary to-accent"
              >
                <RotateCcw className="h-5 w-5 mb-1" />
                Restart
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Restart</p>
                <p className="text-sm text-muted-foreground">Restart server daily at 6 AM</p>
              </div>
              <Switch 
                checked={autoRestart} 
                onCheckedChange={setAutoRestart}
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm text-muted-foreground">{performanceMetrics.cpu}%</span>
              </div>
              <Progress value={performanceMetrics.cpu} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-muted-foreground">{performanceMetrics.memory}%</span>
              </div>
              <Progress value={performanceMetrics.memory} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm text-muted-foreground">{performanceMetrics.storage}%</span>
              </div>
              <Progress value={performanceMetrics.storage} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Network Usage</span>
                <span className="text-sm text-muted-foreground">{performanceMetrics.network}%</span>
              </div>
              <Progress value={performanceMetrics.network} className="h-2" />
            </div>

            <div className="pt-2 border-t border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Players Online</span>
                <span className="text-sm text-muted-foreground">
                  {performanceMetrics.players}/{performanceMetrics.maxPlayers}
                </span>
              </div>
              <Progress 
                value={(performanceMetrics.players / performanceMetrics.maxPlayers) * 100} 
                className="h-2 mt-2" 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Management */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              Resource Management
            </span>
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              Reload All Resources
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{resource.name}</h4>
                  <Badge 
                    variant={
                      resource.status === "running" ? "default" :
                      resource.status === "stopped" ? "secondary" :
                      "destructive"
                    }
                  >
                    {resource.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">v{resource.version}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Load: {resource.load}ms</span>
                  <div className="flex gap-1">
                    {resource.status === "running" && (
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        Stop
                      </Button>
                    )}
                    {resource.status === "stopped" && (
                      <Button size="sm" className="h-7 px-2 bg-green-600 hover:bg-green-700">
                        Start
                      </Button>
                    )}
                    {resource.status === "error" && (
                      <Button size="sm" variant="destructive" className="h-7 px-2">
                        Fix
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="h-7 px-2">
                      Restart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Server Load"
          value="45%"
          change="Normal operation"
          icon={Cpu}
          trend="neutral"
        />
        <StatsCard
          title="Memory Usage"
          value="12.4GB"
          change="68% of 18GB"
          icon={HardDrive}
          trend="neutral"
        />
        <StatsCard
          title="Network I/O"
          value="234MB/s"
          change="+12% from baseline"
          icon={Wifi}
          trend="up"
        />
        <StatsCard
          title="Active Warnings"
          value="2"
          change="Resource conflicts"
          icon={AlertTriangle}
          trend="down"
        />
      </div>
    </div>
  )
}

export default ServerControl