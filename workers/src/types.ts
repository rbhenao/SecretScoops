export interface MenuItem {
    id: number;
    name: string;
    price: number;
  }
  
  export interface Order {
    id: number;
    items: MenuItem[];
    total: number;
    status: "Processing" | "Prepared" | "Out for Delivery" | "Delivered";
  }