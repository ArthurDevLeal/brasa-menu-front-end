import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { RestaurantSettings } from "@/types/settings-type";
interface openingHoursProps{
  openingHours: { day: number; opensAt: string; closesAt: string; isOpen: boolean; }[];
    settings: RestaurantSettings;
} 
const daysOfWeek = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];
export default function HoursSettings({openingHours,settings}:openingHoursProps) {
  return <TabsContent value="horarios">
    <Card>
      <CardHeader>
        <CardTitle>Horário de Funcionamento</CardTitle>
        <CardDescription>Configure os horários de abertura e fechamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {openingHours.map((hour) => (
            <div key={hour.day} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="w-32">
                <p className="font-medium">{daysOfWeek.find((d) => d.value === hour.day)?.label}</p>
              </div>
              <Switch defaultChecked={hour.isOpen} />
              <Input type="time" defaultValue={hour.opensAt} className="w-32" disabled={!hour.isOpen} />
              <span className="text-muted-foreground">até</span>
              <Input type="time" defaultValue={hour.closesAt} className="w-32" disabled={!hour.isOpen} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </TabsContent>;
}
