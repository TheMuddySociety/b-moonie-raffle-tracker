
import { useState, FC } from "react";
import { Award, Edit, Calendar, Check, CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { RaffleData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Form schema
const raffleFormSchema = z.object({
  currentRound: z.coerce.number().min(1, "Round must be at least 1"),
  endDate: z.string().min(1, "End date is required"),
  prizeDescription: z.string().min(1, "Prize description is required")
});

type RaffleFormValues = z.infer<typeof raffleFormSchema>;

interface RaffleManagerProps {
  raffleData: RaffleData;
}

const RaffleManager: FC<RaffleManagerProps> = ({ raffleData }) => {
  const [currentRaffleData, setCurrentRaffleData] = useState(raffleData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<RaffleFormValues>({
    resolver: zodResolver(raffleFormSchema),
    defaultValues: {
      currentRound: raffleData.currentRound,
      endDate: new Date(raffleData.endDate).toISOString().slice(0, 16), // Format for datetime-local input
      prizeDescription: "0.5 SOL + 5 B-Moonie NFTs" // Example prize
    }
  });
  
  const onSubmit = (data: RaffleFormValues) => {
    setCurrentRaffleData({
      ...currentRaffleData,
      currentRound: data.currentRound,
      endDate: new Date(data.endDate).toISOString()
    });
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Raffle Updated",
      description: "The raffle settings have been successfully updated."
    });
  };

  const drawWinner = () => {
    toast({
      title: "Winner Selected",
      description: "A winner has been randomly selected from the raffle entries.",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={20} className="text-bmoonie-purple" />
              Current Raffle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Round</div>
                  <div className="text-xl font-bold">{currentRaffleData.currentRound}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Entries</div>
                  <div className="text-xl font-bold">{currentRaffleData.totalEntries}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">End Date</div>
                <div className="font-medium">
                  {new Date(currentRaffleData.endDate).toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Prize</div>
                <div className="font-medium">0.5 SOL + 5 B-Moonie NFTs</div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Raffle
                </Button>
                <Button 
                  className="flex-1 bg-bmoonie-gradient hover:opacity-90"
                  onClick={drawWinner}
                >
                  <Award size={16} className="mr-2" />
                  Draw Winner
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleCheck size={20} className="text-bmoonie-purple" />
              Raffle Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Raffle Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-xl font-medium">Active</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Next Winner Draw</div>
                <div className="font-medium">
                  {new Date(currentRaffleData.endDate).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-bmoonie-purple/10 border border-bmoonie-purple/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="text-bmoonie-purple mt-1" size={20} />
                  <div>
                    <div className="font-medium mb-1">Auto-Schedule Next Raffle</div>
                    <div className="text-sm text-muted-foreground">
                      When this raffle ends, automatically start the next one 
                      with an increased round number.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Raffle Settings</DialogTitle>
            <DialogDescription>
              Update the current raffle's settings and prize information.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentRound"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raffle Round</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set the current raffle round number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormDescription>
                      When this raffle will end and winner will be drawn
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="prizeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe the prize for this raffle round
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Check size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RaffleManager;
