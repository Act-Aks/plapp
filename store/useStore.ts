import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface StockStatement {
  id: string;
  symbol: string;
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  buyingTime: string;
  sellingTime: string;
  profitLoss: number;
}

interface StoreState {
  statements: StockStatement[];
  addStatement: (statement: Omit<StockStatement, "id" | "profitLoss">) => void;
  removeStatement: (id: string) => void;
  hydrate: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      statements: [],
      addStatement: (statement) =>
        set((state) => {
          const profitLoss =
            (statement.sellingPrice - statement.buyingPrice) *
            statement.quantity;
          const newStatement: StockStatement = {
            ...statement,
            id: Date.now().toString(),
            profitLoss,
          };
          return { statements: [...state.statements, newStatement] };
        }),
      removeStatement: (id) =>
        set((state) => ({
          statements: state.statements.filter((s) => s.id !== id),
        })),
      hydrate: async () => {
        try {
          const storedData = await AsyncStorage.getItem(
            "stock-statements-storage"
          );
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            set({ statements: parsedData.state.statements });
          }
        } catch (error) {
          console.error("Error hydrating store:", error);
        }
      },
    }),
    {
      name: "stock-statements-storage",
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: true,
    }
  )
);
