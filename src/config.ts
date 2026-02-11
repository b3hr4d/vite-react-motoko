import { QueryClient } from '@tanstack/react-query';
import { ClientManager, Reactor } from '@ic-reactor/react';
import { createActorHooks } from '@ic-reactor/react';

const queryClient = new QueryClient();
const clientManager = new ClientManager({
  queryClient,
  withCanisterEnv: true,
});

export const backendReactor = new Reactor<typeof Backend>({
  clientManager,
  name: 'backend',
  idlFactory: idlFactory,
});

export const {
  useActorQuery: useBackendQuery,
  useActorMutation: useBackendMutation,
} = createActorHooks(backendReactor);
