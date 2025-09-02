import { useState } from "react"
import { Database as DatabaseIcon, Search, Play, History, Download, Table as TableIcon, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Database = () => {
  const [query, setQuery] = useState("SELECT * FROM users LIMIT 10;")
  const [searchTerm, setSearchTerm] = useState("")
  
  const tables = [
    { name: "users", records: 2847, size: "45.2 MB", lastModified: "2024-12-14 15:30:22" },
    { name: "vehicles", records: 15632, size: "128.7 MB", lastModified: "2024-12-14 15:25:18" },
    { name: "properties", records: 3421, size: "67.1 MB", lastModified: "2024-12-14 14:45:32" },
    { name: "items", records: 8976, size: "23.8 MB", lastModified: "2024-12-14 13:22:15" },
    { name: "transactions", records: 45123, size: "234.5 MB", lastModified: "2024-12-14 15:28:45" },
    { name: "logs", records: 123456, size: "456.7 MB", lastModified: "2024-12-14 15:30:45" }
  ]

  const queryHistory = [
    {
      id: 1,
      query: "SELECT * FROM users WHERE last_login > '2024-12-01'",
      timestamp: "2024-12-14 15:25:30",
      execution_time: "0.045s",
      rows: 847
    },
    {
      id: 2,
      query: "UPDATE vehicles SET owner_id = 123 WHERE plate = 'ABC123'",
      timestamp: "2024-12-14 15:20:15",
      execution_time: "0.012s",
      rows: 1
    },
    {
      id: 3,
      query: "SELECT COUNT(*) FROM transactions WHERE created_at >= CURDATE()",
      timestamp: "2024-12-14 15:15:22",
      execution_time: "0.234s",
      rows: 1
    }
  ]

  const sampleData = [
    { id: 1, identifier: "steam:110000123456789", firstname: "John", lastname: "Doe", money: 45678, job: "police", last_login: "2024-12-14 15:30:22" },
    { id: 2, identifier: "steam:110000987654321", firstname: "Jane", lastname: "Smith", money: 23456, job: "mechanic", last_login: "2024-12-14 14:25:18" },
    { id: 3, identifier: "steam:110000456789123", firstname: "Mike", lastname: "Wilson", money: 67890, job: "taxi", last_login: "2024-12-14 13:45:32" },
  ]

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Database Management</h1>
        <p className="text-muted-foreground">
          Query and manage your server database
        </p>
      </div>

      <Tabs defaultValue="query" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass bg-card/50 border-primary/20">
          <TabsTrigger value="query">SQL Query</TabsTrigger>
          <TabsTrigger value="tables">Table Browser</TabsTrigger>
          <TabsTrigger value="history">Query History</TabsTrigger>
        </TabsList>

        <TabsContent value="query" className="space-y-6">
          {/* SQL Query Interface */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DatabaseIcon className="h-5 w-5 text-primary" />
                SQL Query Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">SQL Query</label>
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your SQL query here..."
                  className="min-h-32 font-mono glass bg-card/50 border-primary/20 focus:border-primary/50"
                />
              </div>
              
              <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Play className="h-4 w-4 mr-2" />
                  Execute Query
                </Button>
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Eye className="h-4 w-4 mr-2" />
                  Explain Query
                </Button>
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Query Results */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Query Results</span>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">3 rows</Badge>
                  <Badge variant="outline">Execution time: 0.045s</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-primary/20">
                      <TableHead>ID</TableHead>
                      <TableHead>Identifier</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Money</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleData.map((row) => (
                      <TableRow key={row.id} className="border-primary/10">
                        <TableCell className="font-mono">{row.id}</TableCell>
                        <TableCell className="font-mono text-xs">{row.identifier}</TableCell>
                        <TableCell>{row.firstname} {row.lastname}</TableCell>
                        <TableCell className="font-mono">${row.money.toLocaleString()}</TableCell>
                        <TableCell>{row.job}</TableCell>
                        <TableCell className="text-sm">{row.last_login}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="space-y-6">
          {/* Table Browser */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass bg-card/50 border-primary/20 focus:border-primary/50"
              />
            </div>
          </div>

          <Card className="glass-card border-0">
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TableIcon className="h-5 w-5 text-primary" />
              Database Tables
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTables.map((table) => (
                  <div
                    key={table.name}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer border border-primary/10 hover:border-primary/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{table.name}</h3>
                      <Badge variant="outline">{table.records.toLocaleString()} rows</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Size: {table.size}</p>
                      <p>Modified: {table.lastModified}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Browse
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Structure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Query History */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Query History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {queryHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.timestamp}
                      </Badge>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{item.execution_time}</span>
                        <span>•</span>
                        <span>{item.rows} rows affected</span>
                      </div>
                    </div>
                    <code className="text-sm bg-muted/50 p-2 rounded block overflow-x-auto">
                      {item.query}
                    </code>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Re-run
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Copy Query
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Database Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DatabaseIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Total Tables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TableIcon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">198K</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-400/20 flex items-center justify-center">
                <Download className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">956MB</p>
                <p className="text-sm text-muted-foreground">Database Size</p>
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
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Queries Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Database