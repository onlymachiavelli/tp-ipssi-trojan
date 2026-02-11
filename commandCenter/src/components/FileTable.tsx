import { FileText, Clock, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FileEntry {
  id: number;
  name: string;
  path: string;
  content: string;
  created_at: string;
  updated_at: string;
  victim_id: number;
}

interface FileTableProps {
  files: FileEntry[];
}

const FileTable = ({ files }: FileTableProps) => {
  const formatDate = (d: string) => new Date(d).toLocaleString();

  return (
    <div className="rounded-lg border border-glow bg-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
          Captured Files
        </h3>
        <span className="ml-auto rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary font-display">
          {files.length}
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="font-display text-xs uppercase tracking-wider text-muted-foreground">ID</TableHead>
            <TableHead className="font-display text-xs uppercase tracking-wider text-muted-foreground">Name</TableHead>
            <TableHead className="font-display text-xs uppercase tracking-wider text-muted-foreground">Path</TableHead>
            <TableHead className="font-display text-xs uppercase tracking-wider text-muted-foreground">Content</TableHead>
            <TableHead className="font-display text-xs uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> Created</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id} className="border-border hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono-space text-primary text-sm">#{file.id}</TableCell>
              <TableCell className="font-mono-space text-sm font-medium text-foreground">{file.name}</TableCell>
              <TableCell className="font-mono-space text-xs text-muted-foreground">{file.path}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center gap-1.5 rounded bg-muted px-2.5 py-1 font-mono-space text-xs text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border border-glow max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="font-display text-sm uppercase tracking-wider text-primary">
                        {file.name}
                      </DialogTitle>
                      <p className="font-mono-space text-xs text-muted-foreground">{file.path}</p>
                    </DialogHeader>
                    <pre className="mt-2 max-h-[400px] overflow-auto rounded-md bg-muted p-4 font-mono-space text-sm text-foreground whitespace-pre-wrap break-words">
                      {file.content}
                    </pre>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{formatDate(file.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileTable;
