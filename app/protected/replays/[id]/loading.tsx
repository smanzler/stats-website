import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="h-4 w-24 bg-muted/70 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-8 w-32 bg-muted/70 rounded animate-pulse" />
        <div className="h-3 w-40 bg-muted/70 rounded animate-pulse mt-2" />
      </CardContent>
    </Card>
  );
}

function TeamTableSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">
          <div className="h-6 w-32 bg-muted/70 rounded animate-pulse" />
        </CardTitle>
        <div className="flex gap-4 text-sm">
          <div className="h-4 w-24 bg-muted/70 rounded animate-pulse" />
          <div className="h-4 w-2 bg-muted/70 rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted/70 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Goals</TableHead>
              <TableHead className="text-right">Assists</TableHead>
              <TableHead className="text-right">Saves</TableHead>
              <TableHead className="text-right">Shots</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 w-32 bg-muted/70 rounded animate-pulse" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-12 bg-muted/70 rounded animate-pulse ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-8 bg-muted/70 rounded animate-pulse ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-8 bg-muted/70 rounded animate-pulse ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-8 bg-muted/70 rounded animate-pulse ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 w-8 bg-muted/70 rounded animate-pulse ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-10 w-64 bg-muted/70 rounded animate-pulse" />
            <div className="h-4 w-48 bg-muted/70 rounded animate-pulse mt-2" />
          </div>
          <Badge variant="outline" className="px-4 py-1">
            <div className="h-4 w-32 bg-muted/70 rounded animate-pulse" />
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <TeamTableSkeleton />
        <TeamTableSkeleton />
      </div>
    </div>
  );
}
