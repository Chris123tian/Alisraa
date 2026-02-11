'use client';

import { useState, useRef, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase, deleteDocumentNonBlocking, addDocumentNonBlocking, useUser } from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Trash2, Send, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

export function AdminChatView() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [reply, setReply] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const messagesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'chat_messages');
  }, [firestore]);
  
  const messagesQuery = useMemoFirebase(() => {
    if (!messagesRef) return null;
    return query(messagesRef, orderBy('timestamp', 'asc'));
  }, [messagesRef]);

  const { data: messages, isLoading } = useCollection(messagesQuery);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleDeleteMessage = (messageId: string) => {
    if (!firestore) return;
    const messageDocRef = doc(firestore, 'chat_messages', messageId);
    deleteDocumentNonBlocking(messageDocRef);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !firestore || !user || !messagesRef) return;

    const messageData = {
      senderId: user.uid,
      displayName: 'Support Agent (Admin)',
      message: reply,
      timestamp: serverTimestamp(),
    };

    addDocumentNonBlocking(messagesRef, messageData);
    setReply('');
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="flex flex-col h-[700px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Live Support Console
              </CardTitle>
              <CardDescription>Real-time communication with global clients.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0">
          <ScrollArea className="flex-grow p-6 border-y" ref={scrollAreaRef}>
            <div className="space-y-4">
              {isLoading && (
                <p className="text-center text-muted-foreground py-10">Syncing communication stream...</p>
              )}
              {!isLoading && messages?.length === 0 && (
                <p className="text-center text-muted-foreground py-10">No active support threads.</p>
              )}
              {messages?.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.senderId === user?.uid ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                    msg.senderId === user?.uid ? 'bg-primary text-white rounded-tr-none' : 'bg-muted rounded-tl-none'
                  }`}>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">
                      {msg.displayName}
                    </p>
                    <p className="text-sm font-medium">{msg.message}</p>
                    <div className="flex items-center justify-between mt-1 gap-4">
                      <p className="text-[9px] opacity-50">
                        {msg.timestamp?.toDate() ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Syncing...'}
                      </p>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="opacity-0 group-hover:opacity-100 text-destructive hover:scale-110 transition-all">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendReply} className="p-4 bg-muted/30 flex gap-2">
            <Input 
              placeholder="Type your response as Al-Israa Support..." 
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="bg-white border-primary/20 h-12"
            />
            <Button type="submit" className="h-12 bg-accent hover:bg-accent/90 px-6" disabled={!reply.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}