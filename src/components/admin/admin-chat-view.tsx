'use client';

import { useFirestore, useCollection, useMemoFirebase, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AdminChatView() {
  const firestore = useFirestore();

  const messagesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'chat_messages');
  }, [firestore]);
  
  const messagesQuery = useMemoFirebase(() => {
    if (!messagesRef) return null;
    return query(messagesRef, orderBy('timestamp', 'desc'));
  }, [messagesRef]);

  const { data: messages, isLoading } = useCollection(messagesQuery);

  const handleDeleteMessage = (messageId: string) => {
    if (!firestore) return;
    const messageDocRef = doc(firestore, 'chat_messages', messageId);
    deleteDocumentNonBlocking(messageDocRef);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Chat Messages</CardTitle>
        <CardDescription>View and manage messages from the live chat.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Sender</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead className="w-[50px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Loading messages...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && messages?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No messages yet.
                  </TableCell>
                </TableRow>
              )}
              {messages?.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium">{msg.displayName}</TableCell>
                  <TableCell>{msg.message}</TableCell>
                  <TableCell>{msg.timestamp?.toDate().toLocaleString() ?? 'Sending...'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete message</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
