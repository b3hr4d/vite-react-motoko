import { QueryClient } from '@tanstack/react-query';
import { ClientManager, Reactor } from '@ic-reactor/react';
import { canisterId, idlFactory } from './declarations/backend';
import { createActorHooks } from '@ic-reactor/react';
import { _SERVICE } from './declarations/backend/backend.did';

const queryClient = new QueryClient();
const clientManager = new ClientManager({
  queryClient,
  withCanisterEnv: true,
});

export const backendReactor = new Reactor<_SERVICE>({
  clientManager,
  name: 'backend',
  canisterId,
  idlFactory,
});

export const {
  useActorQuery: useBackendQuery,
  useActorMutation: useBackendMutation,
} = createActorHooks(backendReactor);
