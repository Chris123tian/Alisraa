'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, initiateAnonymousSignIn, useAuth } from '@/firebase';
import { collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Loader2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function Chat() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Sign in anonymously if no user is present after auth state resolves.
  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  const messagesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'chat_messages');
  }, [firestore]);

  const messagesQuery = useMemoFirebase(() => {
    if (!messagesRef || !user) return null;
    return query(messagesRef, orderBy('timestamp', 'asc'));
  }, [messagesRef, user]);

  const { data: messages, isLoading: isMessagesLoading } = useCollection(messagesQuery);

  // Improved scroll to bottom logic.
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 100);
      }
    }
  }, [messages, isMessagesLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) {
      if (!user && !isUserLoading) {
        toast({ variant: 'destructive', title: 'Authenticating...', description: 'Please wait a moment and try again.' });
      }
      return;
    }

    const messageData = {
      senderId: user.uid,
      displayName: user.isAnonymous ? 'Guest' : (user.displayName || 'Client'),
      message: message,
      timestamp: serverTimestamp(),
    };

    if (messagesRef) {
      addDocumentNonBlocking(messagesRef, messageData);
      setMessage('');
    }
  };
  
  const isLoading = isUserLoading || (user && isMessagesLoading);

  return (
    <div className="flex flex-col h-[500px] bg-background">
      <ScrollArea className="flex-grow p-4 border rounded-t-2xl bg-muted/5 shadow-inner" ref={scrollAreaRef}>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 opacity-50">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest">Connecting to Support...</p>
            </div>
          ) : !messages || messages.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-5 h-5 text-primary/20" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">No messages yet. Send a message to start a conversation with our logistics team.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex items-end gap-2 group',
                  msg.senderId === user?.uid ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.senderId !== user?.uid && (
                  <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                    <AvatarFallback className="bg-accent text-white font-bold text-xs">{msg.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3 shadow-sm transition-all hover:shadow-md',
                    msg.senderId === user?.uid
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-white border rounded-bl-none text-foreground'
                  )}
                >
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <p className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      msg.senderId === user?.uid ? "text-accent/80" : "text-primary/60"
                    )}>{msg.displayName}</p>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <p className={cn(
                    "text-[9px] font-mono opacity-50 mt-1.5 text-right",
                    msg.senderId === user?.uid ? "text-white" : "text-primary"
                  )}>
                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t border-x border-b rounded-b-2xl bg-card shadow-lg">
        <Input
          placeholder={user ? "Type your message..." : "Authenticating session..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!user || isLoading}
          className="flex-grow h-12 rounded-xl bg-muted/30 border-none focus:ring-accent"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!user || !message.trim() || isLoading}
          className="h-12 w-12 rounded-xl bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20 transition-transform active:scale-95"
        >
          <Send className="h-5 w-5 text-white" />
        </Button>
      </form>
    </div>
  );
}
