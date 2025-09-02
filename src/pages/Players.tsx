import { useState } from "react"
import { Search, Filter, MoreHorizontal, Ban, MessageCircle, UserX, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("")
  
  const players = [
    { 
      id: 1, 
      name: "John_Doe", 
      steamId: "76561198123456789",
      status: "online", 
      playtime: "124h 23m", 
      ping: 45,
      location: "Los Santos",
      job: "Police Officer",
      money: "$45,678",
      warnings: 0,
      joinDate: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Jane_Smith", 
      steamId: "76561198987654321",
      status: "online", 
      playtime: "89h 12m", 
      ping: 32,
      location: "Sandy Shores",
      job: "Mechanic",
      money: "$23,456",
      warnings: 1,
      joinDate: "2024-02-03"
    },
    { 
      id: 3, 
      name: "Mike_Wilson", 
      steamId: "76561198456789123",
      status: "away", 
      playtime: "156h 45m", 
      ping: 67,
      location: "Paleto Bay",
      job: "Taxi Driver",
      money: "$12,789",
      warnings: 0,
      joinDate: "2024-01-08"
    },
    { 
      id: 4, 
      name: "Sarah_Johnson", 
      steamId: "76561198321654987",
      status: "offline", 
      playtime: "78h 34m", 
      ping: 0,
      location: "Mirror Park",
      job: "Doctor",
      money: "$67,890",
      warnings: 2,
      joinDate: "2024-02-20"
    },
  ]

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.steamId.includes(searchTerm) ||
    player.job.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Player Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage all players on your server
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players by name, Steam ID, or job..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass bg-card/50 border-primary/20 focus:border-primary/50"
          />
        </div>
        <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Players Table */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Active Players ({filteredPlayers.length})</span>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Broadcast to All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20 hover:bg-muted/50">
                <TableHead>Player</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Money</TableHead>
                <TableHead>Playtime</TableHead>
                <TableHead>Warnings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.map((player) => (
                <TableRow key={player.id} className="border-primary/10 hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.steamId.slice(0, 12)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(player.status)}`} />
                      <Badge
                        variant={player.status === "online" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {player.status}
                      </Badge>
                      {player.status === "online" && (
                        <span className="text-sm text-muted-foreground">{player.ping}ms</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{player.location}</TableCell>
                  <TableCell>{player.job}</TableCell>
                  <TableCell className="font-mono">{player.money}</TableCell>
                  <TableCell>{player.playtime}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={player.warnings === 0 ? "default" : player.warnings >= 3 ? "destructive" : "secondary"}
                    >
                      {player.warnings}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-primary/20">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-yellow-400">
                          <UserX className="h-4 w-4 mr-2" />
                          Kick Player
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Ban Player
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Players