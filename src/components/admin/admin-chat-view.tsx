'use client';

import { useState, useRef, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase, deleteDocumentNonBlocking, addDocumentNonBlocking, useUser } from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Trash2, Send, MessageSquare, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function AdminChatView() {
  const { user } = userUser();
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

  const messageCount = messages?.length || 0;

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="flex flex-col h-[700px] border-none shadow-2xl overflow-hidden rounded-[2rem]">
        <CardHeader className="bg-primary text-white p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                <MessageSquare className="w-6 h-6 text-accent" />
                Live Support Console
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Real-time communication with global clients.
              </CardDescription>
            </div>
            {messageCount > 0 && (
              <Badge className="bg-accent text-white font-bold px-4 py-1.5 rounded-full border-none shadow-lg">
                {messageCount} ACTIVE MESSAGES
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0 bg-white">
          <ScrollArea className="flex-grow p-8" ref={scrollAreaRef}>
            <div className="space-y-6">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Syncing communication stream...</p>
                </div>
              )}
              {!isLoading && messages?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-20">
                  <ShieldAlert className="w-16 h-16 mb-4" />
                  <p className="text-center font-black uppercase tracking-widest">No active support threads.</p>
                </div>
              )}
              {messages?.map((msg) => (
                <div key={msg.id} className={`flex flex-col group ${msg.senderId === user?.uid ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl p-5 shadow-md relative transition-all hover:shadow-lg ${
                    msg.senderId === user?.uid ? 'bg-primary text-white rounded-tr-none' : 'bg-muted/50 text-foreground rounded-tl-none border border-black/5'
                  }`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-2 ${
                      msg.senderId === user?.uid ? 'text-accent' : 'text-primary'
                    }`}>
                      {msg.displayName}
                    </p>
                    <p className="text-sm md:text-base font-medium leading-relaxed">{msg.message}</p>
                    <div className="flex items-center justify-between mt-3 gap-6">
                      <p className="text-[10px] opacity-40 font-mono">
                        {msg.timestamp?.toDate() ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Syncing...'}
                      </p>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)} 
                        className="opacity-0 group-hover:opacity-100 text-destructive/60 hover:text-destructive hover:scale-125 transition-all p-1"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-6 bg-muted/20 border-t">
            <form onSubmit={handleSendReply} className="flex gap-4 max-w-5xl mx-auto">
              <Input 
                placeholder="Type your response as Al-Israa Support..." 
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="bg-white border-primary/10 h-14 text-lg rounded-xl shadow-inner focus:ring-accent"
              />
              <Button type="submit" className="h-14 bg-accent hover:bg-accent/90 px-8 rounded-xl shadow-xl transition-transform hover:scale-105" disabled={!reply.trim()}>
                <Send className="w-5 h-5 mr-2" />
                <span className="font-bold uppercase tracking-widest text-xs">Send Reply</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper to ensure useUser is properly typed
function userUser() {
  const { user, isUserLoading } = useUser();
  return { user, isUserLoading };
}
