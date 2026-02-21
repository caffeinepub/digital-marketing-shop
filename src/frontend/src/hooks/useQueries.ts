import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Order } from '@/backend';

export function useProducts(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProducts(searchTerm);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCheckout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerInfo: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.checkout(customerInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
