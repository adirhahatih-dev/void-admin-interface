import { useState } from "react"
import { Shield, Users, UserPlus, Settings, Crown, Star, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Permissions = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  
  const roles = [
    {
      id: "owner",
      name: "Owner",
      description: "Full server access and control",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      permissions: ["*"],
      playerCount: 1
    },
    {
      id: "admin",
      name: "Administrator",
      description: "Server management and moderation",
      color: "bg-gradient-to-r from-purple-500 to-blue-500",
      permissions: ["admin.*", "kick", "ban", "teleport", "noclip"],
      playerCount: 3
    },
    {
      id: "moderator",
      name: "Moderator",
      description: "Player moderation and support",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      permissions: ["kick", "mute", "warn", "spectate"],
      playerCount: 8
    },
    {
      id: "vip",
      name: "VIP",
      description: "Premium player benefits",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      permissions: ["vip.spawn", "vip.vehicles", "priority.queue"],
      playerCount: 23
    },
    {
      id: "user",
      name: "User",
      description: "Default player permissions",
      color: "bg-gradient-to-r from-gray-500 to-gray-600",
      permissions: ["chat", "voice", "spawn"],
      playerCount: 156
    }
  ]

  const players = [
    { name: "John_Doe", steamId: "76561198123456789", role: "admin", lastSeen: "Online" },
    { name: "Jane_Smith", steamId: "76561198987654321", role: "moderator", lastSeen: "2 hours ago" },
    { name: "Mike_Wilson", steamId: "76561198456789123", role: "vip", lastSeen: "Online" },
    { name: "Sarah_Johnson", steamId: "76561198321654987", role: "user", lastSeen: "1 day ago" },
  ]

  const permissions = [
    { name: "admin.*", description: "Full administrative access", category: "Admin" },
    { name: "kick", description: "Kick players from server", category: "Moderation" },
    { name: "ban", description: "Ban players from server", category: "Moderation" },
    { name: "teleport", description: "Teleport to players/locations", category: "Admin" },
    { name: "noclip", description: "Enable noclip mode", category: "Admin" },
    { name: "mute", description: "Mute players in chat", category: "Moderation" },
    { name: "warn", description: "Issue warnings to players", category: "Moderation" },
    { name: "spectate", description: "Spectate other players", category: "Moderation" },
    { name: "vip.spawn", description: "Access VIP spawn locations", category: "VIP" },
    { name: "vip.vehicles", description: "Access VIP vehicles", category: "VIP" },
    { name: "priority.queue", description: "Priority server queue", category: "VIP" },
  ]

  const getRoleIcon = (roleId: string) => {
    switch (roleId) {
      case "owner":
        return Crown
      case "admin":
        return Shield
      case "moderator":
        return Star
      case "vip":
        return Star
      default:
        return User
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Permissions & Roles</h1>
        <p className="text-muted-foreground">
          Manage user roles and permissions for your server
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roles Management */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Server Roles
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass border-primary/20">
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Role name" />
                      <Input placeholder="Role description" />
                      <div className="space-y-2">
                        <p className="font-medium">Permissions</p>
                        {permissions.map((perm) => (
                          <div key={perm.name} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{perm.name}</p>
                              <p className="text-sm text-muted-foreground">{perm.description}</p>
                            </div>
                            <Switch />
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-accent">
                        Create Role
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {roles.map((role) => {
                  const Icon = getRoleIcon(role.id)
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                        selectedRole === role.id 
                          ? "border-primary/50 bg-primary/5" 
                          : "border-primary/20 bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{role.name}</h3>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          {role.playerCount} players
                        </Badge>
                        <Badge variant="outline">
                          {role.permissions.length} permissions
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Player Role Assignments */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Player Role Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead>Player</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, index) => {
                    const role = roles.find(r => r.id === player.role)
                    const Icon = getRoleIcon(player.role)
                    return (
                      <TableRow key={index} className="border-primary/10">
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
                            <div className={`w-6 h-6 rounded ${role?.color} flex items-center justify-center`}>
                              <Icon className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-medium">{role?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={player.lastSeen === "Online" ? "default" : "secondary"}>
                            {player.lastSeen}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="border-primary/30">
                            Change Role
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Details */}
        <div className="space-y-6">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Role Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRole ? (
                <div className="space-y-4">
                  {(() => {
                    const role = roles.find(r => r.id === selectedRole)
                    const Icon = getRoleIcon(selectedRole)
                    return (
                      <>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg ${role?.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{role?.name}</h3>
                            <p className="text-sm text-muted-foreground">{role?.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Permissions</h4>
                          {role?.permissions.map((perm, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                              <span className="font-mono text-sm">{perm}</span>
                              <Switch defaultChecked />
                            </div>
                          ))}
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-primary to-accent">
                          Edit Role
                        </Button>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Select a role to view details
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Permission Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Admin", "Moderation", "VIP", "Basic"].map((category) => (
                  <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">{category}</span>
                    <Badge variant="outline">
                      {permissions.filter(p => p.category === category).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Permissions