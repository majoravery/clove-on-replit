import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  AlertTriangle, 
  Package, 
  Plus,
  Carrot,
  Wheat,
  Apple,
  Milk,
  Egg,
  Fish
} from "lucide-react";
import type { InventoryItem, Task } from "@shared/schema";

interface SidebarProps {
  inventory: InventoryItem[];
  tasks: Task[];
}

const iconMap = {
  Carrot,
  Wheat,
  Apple,
  Milk,
  Egg,
  Fish,
  Leaf,
};

export default function Sidebar({ inventory, tasks }: SidebarProps) {
  const lowStockItems = inventory.filter(item => item.status !== "normal");
  const normalStockItems = inventory.filter(item => item.status === "normal");

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Package;
    return IconComponent;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-red-50",
          border: "border-red-100",
          text: "text-red-600",
          badge: "destructive"
        };
      case "low":
        return {
          bg: "bg-amber-50",
          border: "border-amber-100",
          text: "text-amber-600",
          badge: "secondary"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-100",
          text: "text-gray-600",
          badge: "default"
        };
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="p-6 border-b border-gray-200 mt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-4 w-4 text-accent mr-2" />
            Running Low
          </h2>
          <div className="space-y-3">
            {lowStockItems.map((item) => {
              const colors = getStatusColor(item.status);
              const IconComponent = getIcon(item.icon);
              
              return (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 ${colors.bg} rounded-lg border ${colors.border}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
                      <IconComponent className={`${colors.text} h-3 w-3`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className={`text-xs ${colors.text}`}>{item.quantity}</p>
                    </div>
                  </div>
                  <Badge variant={colors.badge as any} className="text-xs">
                    {item.status === "critical" ? "Critical" : "Low"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Inventory */}
      <div className={`flex-1 p-6 overflow-y-auto ${lowStockItems.length === 0 ? 'mt-6' : ''}`}>
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="h-4 w-4 text-gray-500 mr-2" />
          Current Inventory
        </h2>
        
        {inventory.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-4">Your inventory is empty</p>
            <p className="text-xs text-gray-400 mb-4">Add items to track what you have at home</p>
          </div>
        ) : (
          <div className="space-y-2">
            {normalStockItems.map((item) => {
              const IconComponent = getIcon(item.icon);
              
              return (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <IconComponent className="text-gray-500 h-3 w-3" />
                    </div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.quantity}</span>
                </div>
              );
            })}
          </div>
        )}
        
        <Button variant="outline" className="w-full mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
