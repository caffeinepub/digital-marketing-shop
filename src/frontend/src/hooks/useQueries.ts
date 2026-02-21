import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Order, Category } from '@/backend';

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

export function useProductsByCategory(category: Category) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMegaBundleProduct() {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['megaBundle'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMegaBundleProduct();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFrequentlyBoughtTogether(productId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['frequentlyBoughtTogether', productId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFrequentlyBoughtTogether(productId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrderDownloadLinks(orderId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['orderDownloadLinks', orderId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrderDownloadLinks(orderId);
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
