import { useState, useRef, useEffect } from "react"
import { Terminal, Send, History, Download, Trash2, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const Console = () => {
  const [command, setCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "server",
    "refresh",
    "restart esx_menu_default",
    "kick John_Doe Testing kick functionality",
    "ban Mike_Wilson Cheating - speed hacks detected"
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [logs, setLogs] = useState([
    { 
      id: 1, 
      timestamp: "15:30:45", 
      type: "info", 
      source: "server", 
      message: "Server console initialized successfully" 
    },
    { 
      id: 2, 
      timestamp: "15:30:46", 
      type: "success", 
      source: "system", 
      message: "Connected to FiveM server console" 
    },
    { 
      id: 3, 
      timestamp: "15:31:12", 
      source: "admin", 
      type: "command", 
      message: "> server" 
    },
    { 
      id: 4, 
      timestamp: "15:31:12", 
      type: "info", 
      source: "server", 
      message: "Server uptime: 2 days, 14 hours, 23 minutes" 
    },
    { 
      id: 5, 
      timestamp: "15:31:12", 
      type: "info", 
      source: "server", 
      message: "Active players: 47/64" 
    },
    { 
      id: 6, 
      timestamp: "15:32:33", 
      source: "admin", 
      type: "command", 
      message: "> refresh" 
    },
    { 
      id: 7, 
      timestamp: "15:32:34", 
      type: "success", 
      source: "server", 
      message: "Resource cache refreshed successfully" 
    },
    { 
      id: 8, 
      timestamp: "15:33:15", 
      source: "admin", 
      type: "command", 
      message: "> restart esx_menu_default" 
    },
    { 
      id: 9, 
      timestamp: "15:33:16", 
      type: "warning", 
      source: "server", 
      message: "Stopping resource: esx_menu_default" 
    },
    { 
      id: 10, 
      timestamp: "15:33:17", 
      type: "success", 
      source: "server", 
      message: "Started resource: esx_menu_default" 
    },
  ])

  const consoleRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [logs])

  const executeCommand = () => {
    if (command.trim() === "") return

    // Add command to history
    const newHistory = [...commandHistory]
    if (newHistory[newHistory.length - 1] !== command) {
      newHistory.push(command)
      setCommandHistory(newHistory)
    }
    setHistoryIndex(-1)

    // Add command to logs
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
      source: "admin",
      type: "command" as const,
      message: `> ${command}`
    }

    // Simulate command responses
    const responses = []
    if (command === "server") {
      responses.push({
        id: logs.length + 2,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
        type: "info" as const,
        source: "server",
        message: "Server uptime: 2 days, 14 hours, 23 minutes"
      })
      responses.push({
        id: logs.length + 3,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
        type: "info" as const,
        source: "server",
        message: "Active players: 47/64"
      })
    } else if (command === "refresh") {
      responses.push({
        id: logs.length + 2,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
        type: "success" as const,
        source: "server",
        message: "Resource cache refreshed successfully"
      })
    } else if (command.startsWith("restart ")) {
      const resource = command.split(" ")[1]
      responses.push({
        id: logs.length + 2,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
        type: "warning" as const,
        source: "server",
        message: `Stopping resource: ${resource}`
      })
      responses.push({
        id: logs.length + 3,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
        type: "success" as const,
        source: "server",
        message: `Started resource: ${resource}`
      })
    } else {
      responses.push({
        id: logs.length + 2,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8),
        type: "error" as const,
        source: "server",
        message: `Unknown command: ${command}`
      })
    }

    setLogs([...logs, newLog, ...responses])
    setCommand("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand("")
      }
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      case "success":
        return "text-green-400"
      case "command":
        return "text-primary font-bold"
      default:
        return "text-foreground"
    }
  }

  const getLogPrefix = (type: string, source: string) => {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8)
    if (type === "command") return ""
    return `[${timestamp}] [${source}]: `
  }

  const clearConsole = () => {
    setLogs([
      { 
        id: 1, 
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 8), 
        type: "info", 
        source: "system", 
        message: "Console cleared" 
      }
    ])
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Server Console</h1>
        <p className="text-muted-foreground">
          Interactive server console with command history
        </p>
      </div>

      {/* Console Output */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Console Output
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-primary/30">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
              <Button size="sm" variant="outline" onClick={clearConsole} className="border-primary/30">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button size="sm" variant="outline" className="border-primary/30">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={consoleRef}
            className="bg-black/90 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm space-y-1 border border-primary/20"
          >
            {logs.map((log) => (
              <div key={log.id} className={getLogColor(log.type)}>
                <span className="text-muted-foreground text-xs">
                  {getLogPrefix(log.type, log.source)}
                </span>
                {log.message}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Command Input */}
      <Card className="glass-card border-0">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-primary font-mono font-bold">$</span>
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter server command..."
                className="font-mono bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
            </div>
            <Button 
              onClick={executeCommand}
              disabled={command.trim() === ""}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Use ↑/↓ arrow keys to navigate command history • Press Enter to execute
          </div>
        </CardContent>
      </Card>

      {/* Command History & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {commandHistory.slice(-10).reverse().map((cmd, index) => (
                <div 
                  key={index}
                  onClick={() => setCommand(cmd)}
                  className="p-2 rounded bg-muted/30 hover:bg-muted/50 cursor-pointer font-mono text-sm transition-all"
                >
                  {cmd}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCommand("server")}
                className="border-primary/30 hover:bg-primary/10 justify-start"
              >
                Server Status
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCommand("refresh")}
                className="border-primary/30 hover:bg-primary/10 justify-start"
              >
                Refresh Resources
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCommand("players")}
                className="border-primary/30 hover:bg-primary/10 justify-start"
              >
                List Players
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCommand("resources")}
                className="border-primary/30 hover:bg-primary/10 justify-start"
              >
                List Resources
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCommand("ban ")}
                className="border-red-500/30 hover:bg-red-500/10 justify-start text-red-400"
              >
                Ban Player
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCommand("kick ")}
                className="border-yellow-500/30 hover:bg-yellow-500/10 justify-start text-yellow-400"
              >
                Kick Player
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Console Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{commandHistory.length}</p>
                <p className="text-sm text-muted-foreground">Commands Executed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-400/20 flex items-center justify-center">
                <Badge className="bg-green-400 text-green-900">●</Badge>
              </div>
              <div>
                <p className="text-2xl font-bold">Online</p>
                <p className="text-sm text-muted-foreground">Console Status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
                <History className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{logs.length}</p>
                <p className="text-sm text-muted-foreground">Log Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Send className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">47ms</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Console