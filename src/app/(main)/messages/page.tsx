import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-4">বার্তা</h1>
      <div className="flex flex-col items-center py-16 text-center">
        <MessageCircle className="w-12 h-12 text-muted-foreground/20 mb-3" />
        <p className="text-sm text-muted-foreground">
          আপনার বার্তাসমূহ এখানে দেখাবে
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          (ফেজ ৩-এ সক্রিয় হবে)
        </p>
      </div>
    </div>
  );
}
