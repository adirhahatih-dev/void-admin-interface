import { useState } from "react"
import { Search, Filter, Download, AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [logLevel, setLogLevel] = useState("all")
  
  const logs = [
    {
      id: 1,
      timestamp: "2024-12-14 15:30:45",
      level: "error",
      source: "esx_vehicleshop",
      message: "Failed to load vehicle data: MySQL connection timeout",
      details: "Error connecting to database server at mysql://localhost:3306"
    },
    {
      id: 2,
      timestamp: "2024-12-14 15:29:12",
      level: "warning",
      source: "server",
      message: "Player John_Doe disconnected unexpectedly",
      details: "Connection lost during resource loading"
    },
    {
      id: 3,
      timestamp: "2024-12-14 15:28:33",
      level: "info",
      source: "esx_menu_default",
      message: "Resource started successfully",
      details: "All dependencies loaded and initialized"
    },
    {
      id: 4,
      timestamp: "2024-12-14 15:27:54",
      level: "success",
      source: "authentication",
      message: "Player Jane_Smith connected successfully",
      details: "Steam authentication completed, assigned slot #23"
    },
    {
      id: 5,
      timestamp: "2024-12-14 15:26:18",
      level: "error",
      source: "esx_banking",
      message: "Transaction failed: Insufficient funds",
      details: "Player attempted to withdraw $50000, balance: $12450"
    },
    {
      id: 6,
      timestamp: "2024-12-14 15:25:42",
      level: "warning",
      source: "anticheat",
      message: "Suspicious activity detected for player Mike_Wilson",
      details: "Speed hack detected: velocity exceeded 300 units/second"
    },
    {
      id: 7,
      timestamp: "2024-12-14 15:24:15",
      level: "info",
      source: "scheduler",
      message: "Daily restart scheduled for 06:00 AM",
      details: "Auto-restart enabled with 5-minute warning notification"
    }
  ]

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return AlertTriangle
      case "warning":
        return AlertCircle
      case "info":
        return Info
      case "success":
        return CheckCircle
      default:
        return Info
    }
  }

  const getLogColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "info":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "success":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = logLevel === "all" || log.level === logLevel
    return matchesSearch && matchesLevel
  })

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Server Logs</h1>
        <p className="text-muted-foreground">
          Monitor server activity and troubleshoot issues
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass bg-card/50 border-primary/20 focus:border-primary/50"
          />
        </div>
        
        <Select value={logLevel} onValueChange={setLogLevel}>
          <SelectTrigger className="w-48 glass bg-card/50 border-primary/20">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent className="glass border-primary/20">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="error">Errors</SelectItem>
            <SelectItem value="warning">Warnings</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="success">Success</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Logs Display */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Activity Log ({filteredLogs.length} entries)</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-primary/30">
                <Filter className="h-4 w-4 mr-2" />
                Auto-refresh
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                Clear All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredLogs.map((log) => {
              const Icon = getLogIcon(log.level)
              return (
                <div
                  key={log.id}
                  className={`p-4 rounded-lg border ${getLogColor(log.level)} hover:bg-muted/20 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs uppercase tracking-wide">
                            {log.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{log.source}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {log.timestamp}
                        </span>
                      </div>
                      <p className="font-medium mb-1">{log.message}</p>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-400/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Errors Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">34</p>
                <p className="text-sm text-muted-foreground">Warnings Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Info Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-400/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Successful Operations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Logs